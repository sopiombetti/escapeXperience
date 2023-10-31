package com.example.PIequipo1.service;

import com.example.PIequipo1.dto.AventuraDTO;
import com.example.PIequipo1.entity.*;
//import com.example.PIequipo1.entity.Categoria;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.repository.*;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.persistence.CascadeType;
import javax.persistence.FetchType;

import java.time.LocalDate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AventuraService {

    private static final Logger logger = Logger.getLogger(AventuraService.class);
    @Autowired
    private AventuraRepository aventuraRepository;
    @Autowired
    private CategoriaRepository categoriaRepository; // Suponiendo que tienes un repositorio para Categoria
    @Autowired
    private LocalizacionRepository localizacionRepository;
    @Autowired
    private ImagenRepository imagenRepository;
    @Autowired
    private CaracteristicaRepository caracteristicaRepository;
    @Autowired
    private PoliticaRepository politicaRepository;
    @Autowired
    private PuntuacionRepository puntuacionRepository;


    public List<Aventura> searchAdventuresByKeyword(String palabraClave) {
        return aventuraRepository.findByNombreContainingOrDescripcionContaining(palabraClave, palabraClave);
    }


    public Aventura asignarCategoriaAventura(Aventura aventura, Long categoriaId) throws com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException {
        Optional<Categoria> categoriaBuscada = categoriaRepository.findById(categoriaId);

        if (!categoriaBuscada.isPresent()) {
            throw new com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException("Categoría no encontrada con el ID: " + categoriaId);
        }

        Categoria categoria = categoriaBuscada.get();

        // Asigna la categoría a la aventura
        aventura.setCategoria(categoria);

        // Guarda la aventura actualizada y devuelve la aventura guardada
        return aventuraRepository.save(aventura);
    }

    public Aventura guardarAventura(AventuraDTO aventuraDTO) throws ResourceNotFoundException {
        Optional<Aventura> aventuraExistente = aventuraRepository.findByNombre(aventuraDTO.getNombre());
        if (aventuraExistente.isPresent()) {
            throw new ResourceNotFoundException("El nombre del producto ya está en uso.");
        }
        // Obtener las instancias persistentes de Categoria y Localizacion si existen

        Long categoria_id = aventuraDTO.getCategoria_id();
        // Long politica_id = aventuraDTO.getPolitica_id();

        Optional<Categoria> categoriaBuscada = categoriaRepository.findById(categoria_id);
        if (categoriaBuscada.isPresent()) {
            Aventura aventura = new Aventura();
            aventura.setNombre(aventuraDTO.getNombre());
            aventura.setDescripcion(aventuraDTO.getDescripcion());
            aventura.setOperador(aventuraDTO.getOperador());
            aventura.setPrecio(aventuraDTO.getPrecio());
            aventura.setUbicacion(aventuraDTO.getUbicacion());
            aventura.setFechaInicio(aventuraDTO.getFechaInicio());

            aventura.setCategoria(categoriaBuscada.get());

            for (Long caracteristica_id : aventuraDTO.getCaracteristicas_id()) {
                Caracteristica caracteristica = caracteristicaRepository.findById(caracteristica_id).orElseThrow(() -> new ResourceNotFoundException("Caracteristica con id: " + caracteristica_id + " no encontrada"));
                aventura.addCaracteristica(caracteristica);
            }

            for (Long politica_id : aventuraDTO.getPoliticas_id()) {
                Politica politica = politicaRepository.findById(politica_id).orElseThrow(() -> new ResourceNotFoundException("Politica con id: " + politica_id + " no encontrada"));
               // aventura.getPoliticas().add(politica);

                aventura.addPolitica(politica);
            }

            aventura = aventuraRepository.save(aventura);
            for (String url_imagen : aventuraDTO.getImagenes()) {
                Imagen imagen = new Imagen(url_imagen, aventura);
                imagen = imagenRepository.save(imagen);
                aventura.addImagen(imagen);
            }
           // return aventura;

            if (aventura.getPuntuaciones() != null ) {
                aventuraDTO.setCantidadPuntuaciones(aventura.getPuntuaciones().size());
                aventuraDTO.setPromedioPuntuacion(aventura.getPromedioPuntuacion());
            } else {
                aventuraDTO.setCantidadPuntuaciones(0);
                aventuraDTO.setPromedioPuntuacion(0);
            }

            return aventura;

        } else {
            throw new ResourceNotFoundException("Se debe pasar una id de Categoria");
        }

        /*Localizacion localizacion = aventuraDTO.getLocalizacion();
        if (localizacion != null && localizacion.getId() != null) {
            localizacion = localizacionRepository.findById(localizacion.getId()).orElse(null);
            aventuraDTO.setLocalizacion(localizacion);
        }*/

    }


    public List<Aventura> obtenerAventurasAleatorias(int count) {
        List<Aventura> todasLasAventuras = aventuraRepository.findAll();

        if (todasLasAventuras.size() <= count) {
            return todasLasAventuras; // Si el número de aventuras disponibles es menor o igual al número requerido, retornar todas.
        }

        List<Aventura> aventurasAleatorias = new ArrayList<>();
        List<Integer> indicesAleatorios = new ArrayList<>();

        while (aventurasAleatorias.size() < count) {
            int indiceAleatorio = (int) (Math.random() * todasLasAventuras.size());

            if (!indicesAleatorios.contains(indiceAleatorio)) {
                indicesAleatorios.add(indiceAleatorio);
                aventurasAleatorias.add(todasLasAventuras.get(indiceAleatorio));
            }
        }

        return aventurasAleatorias;
    }


    public Optional<Aventura> buscarAventura(Long id)  throws ResourceNotFoundException {
      // logger.info(" Se encontro una aventura con id: "+ id);
        Optional<Aventura> aventuraBuscada= aventuraRepository.findById(id);
        if(aventuraBuscada.isPresent()){
            return aventuraRepository.findById(id);
        }
        else {
            throw new ResourceNotFoundException("No se pudo buscar la aventura con ID:"+id+".- ya que no existe en nuestra BDD");
        }

    }


    public void eliminarAventura(Long id) throws ResourceNotFoundException {
        Optional<Aventura> aventuraAEliminar = buscarAventura(id);
        if(aventuraAEliminar.isPresent()){
            aventuraAEliminar.get().setCaracteristicas(null);
            aventuraAEliminar.get().setCategoria(null);
            aventuraAEliminar.get().setPoliticas(null);
            aventuraRepository.save(aventuraAEliminar.get());
            aventuraRepository.deleteById(id);
            logger.info("Se elimino correctamente una aventura con id: " + id);
        }
        else{
            logger.error("no se puede eliminar la aventura con id: "+id);
            throw new ResourceNotFoundException("No se puede eliminar la aventura con ID:"+id+".- ya que no existe en nuestra BDD");
        }
    }

    public Aventura actualizarAventura(AventuraDTO aventuraDTO) throws ResourceNotFoundException {
        Optional<Aventura> aventuraExistente = aventuraRepository.findById(aventuraDTO.getId());
        if (!aventuraExistente.isPresent()) {
            throw new ResourceNotFoundException("la aventura no existe");
        }

        Aventura aventura = aventuraExistente.get();
        aventura.setNombre(aventuraDTO.getNombre());
        aventura.setDescripcion(aventuraDTO.getDescripcion());
        aventura.setOperador(aventuraDTO.getOperador());
        aventura.setPrecio(aventuraDTO.getPrecio());
        aventura.setUbicacion(aventuraDTO.getUbicacion());
        aventura.setFechaInicio(aventuraDTO.getFechaInicio());
        Categoria categoria = categoriaRepository.findById(aventuraDTO.getCategoria_id()).orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));
        aventura.setCategoria(categoria);
        aventura.setCaracteristicas(new HashSet<>());
        for ( Long caracteristica_id : aventuraDTO.getCaracteristicas_id()) {
            Caracteristica caracteristica = caracteristicaRepository.findById(caracteristica_id).orElseThrow(() -> new ResourceNotFoundException("Caracteristica con id: " + caracteristica_id + " no encontrada"));
            aventura.addCaracteristica(caracteristica);
        }


        for( Imagen image : aventura.getImagenes()){
            imagenRepository.deleteById(image.getId());
        }
        aventura.setImagenes(new HashSet<>());
        aventura = aventuraRepository.save(aventura);


        for ( String url_imagen : aventuraDTO.getImagenes()) {
            Imagen imagen = imagenRepository.save(new Imagen(url_imagen, aventura));
            aventura.addImagen(imagen);
        }

        for ( Long politica_id : aventuraDTO.getPoliticas_id()) {
            Politica politica = politicaRepository.findById(politica_id).orElseThrow(() -> new ResourceNotFoundException("Politica con id: " + politica_id + " no encontrada"));
            aventura.addPolitica(politica);
        }

        logger.info(" Se actualizo una aventura con id: "+ aventura.getId());

        return aventura;
    }

    public Optional<Aventura> findById(Long id) {
        return aventuraRepository.findById(id);
    }



    public List<Aventura> buscarAventuras() {

        return aventuraRepository.findAll();

    }


    public List<Aventura> buscarAventurasPorFecha(LocalDate fechaInicio) {
        // Lógica para buscar aventuras por fecha en tu repositorio de datos.
        return aventuraRepository.findByFechaInicio(fechaInicio);
    }

}





