package com.example.PIequipo1.service;


import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.amazonaws.services.amplify.model.BadRequestException;
import com.example.PIequipo1.entity.Atribucion;
import com.example.PIequipo1.entity.UsuarioRol;
import com.example.PIequipo1.repository.AtribucionRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AtribucionService {

    private static final org.apache.log4j.Logger logger= Logger.getLogger(AtribucionService.class);
    @Autowired
    private final AtribucionRepository atribucionRepository;

    @Autowired
    public AtribucionService(AtribucionRepository atribucionRepository) {
        this.atribucionRepository = atribucionRepository;
    }

    public Atribucion guardarAtribucion(Atribucion atribucion) throws BadRequestException {
        if (atribucion.getNombre() != null && atribucion.getNombre().length() > 0) {
            String permisoFormateado = atribucion.getNombre().replaceAll("\\s+", "").toUpperCase();
            atribucion.setNombre(permisoFormateado);
            Optional<Atribucion> permisoEncontrado = atribucionRepository.findByNombre(permisoFormateado);
            if (!permisoEncontrado.isPresent()) {
                logger.info("Guardando rol: " + atribucion.toString());

                return atribucionRepository.save(atribucion);
            } else {

                throw new BadRequestException("Error. No se pudo guardar el permiso porque está repetido.");
            }
        } else {

            throw new BadRequestException("Error. No se pudo guardar el permiso. Alguno de los campos de registro del permiso está incompleto.");
        }
    }

    public Optional<Atribucion> buscarAtribucion (Long id) throws ResourceNotFoundException {
        Optional<Atribucion> permisoABuscar = atribucionRepository.findById(id);
        if (permisoABuscar.isPresent()){
            return permisoABuscar;
        }else {
            throw new ResourceNotFoundException("No se encontró el permiso con id: " + id);
        }
    }

    public List<Atribucion> buscarTodasAtribuciones() {
        List<Atribucion> listaPermisos = atribucionRepository.findAll();
        return listaPermisos;

    }

    public void eliminarAtribucion(Long id) throws ResourceNotFoundException {
        Optional<Atribucion> atribucionBuscado = atribucionRepository.findById(id);
        if (atribucionBuscado.isPresent()){
            atribucionRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Error. No existe el rol con id = "+id);
        }
    }

}
