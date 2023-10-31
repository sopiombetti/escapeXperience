package com.example.PIequipo1.service;

import com.example.PIequipo1.dto.ImagenPackDTO;
import com.example.PIequipo1.entity.*;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.repository.AventuraRepository;
import com.example.PIequipo1.repository.ImagenRepository;
import com.example.PIequipo1.utils.ConvertMultipartToFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.Set;

import static com.example.PIequipo1.utils.S3Util.uploadFile;

@Service
public class ImagenService {

    @Autowired
    private AventuraRepository aventuraRepository;
    @Autowired
    private ImagenRepository imagenRepository;
    public String guardarImagen(ImagenPackDTO imagenes) throws IOException, ResourceNotFoundException {
        Optional<Aventura> aventura = aventuraRepository.findById(imagenes.getAventura_id());
        if (!aventura.isPresent()) {
            throw new ResourceNotFoundException("Aventura no encontrada con el ID: " + imagenes.getAventura_id());
        }
        try {
            for (MultipartFile imagen : imagenes.getImagenes()) {
                File img = ConvertMultipartToFile.toFile(imagen);
                String url = uploadFile(img.getName(), new FileInputStream(img));
                Imagen imagen1 = new Imagen(url, aventura.get());
                imagenRepository.save(imagen1);
                img.delete();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "Se guardaron las imagenes correctamente";
    }

    public void eliminarImagenPorId(Long id) throws ResourceNotFoundException {
        imagenRepository.deleteById(id);
    }

    public String actualizarImagenes(ImagenPackDTO imagenes) throws IOException, ResourceNotFoundException {
        Optional<Aventura> aventura = aventuraRepository.findById(imagenes.getAventura_id());
        if (!aventura.isPresent()) {
            throw new ResourceNotFoundException("Aventura no encontrada con el ID: " + imagenes.getAventura_id());
        }
        try {
            aventura.get().getImagenes().forEach(imagen -> {
                try {
                    Imagen imagen_bd = imagenRepository.findById(imagen.getId()).get();
                    imagen_bd.setAventura(null);
                    imagenRepository.save(imagen_bd);
                    eliminarImagenPorId(imagen.getId());
                } catch (ResourceNotFoundException e) {
                    e.printStackTrace();
                }
            });

            for (MultipartFile imagen : imagenes.getImagenes()) {
                File img = ConvertMultipartToFile.toFile(imagen);
                String url = uploadFile(img.getName(), new FileInputStream(img));
                Imagen imagen1 = new Imagen(url, aventura.get());
                imagenRepository.save(imagen1);
                img.delete();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "Se guardaron las imagenes correctamente";
    }
}
