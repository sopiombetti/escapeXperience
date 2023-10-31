package com.example.PIequipo1.service;

import com.example.PIequipo1.dto.CaracteristicaDTO;
import com.example.PIequipo1.entity.Caracteristica;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.repository.CaracteristicaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService {

    private static final Logger logger = Logger.getLogger(CaracteristicaService.class);

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;


    public Caracteristica registrarCaracteristica(CaracteristicaDTO caracteristicaDTO) throws ResourceNotFoundException {
        Optional<Caracteristica> caracteristicaExistente = caracteristicaRepository.findByNombre(caracteristicaDTO.getNombre());
        if (caracteristicaExistente.isPresent()) {
            throw new com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException("El nombre de la característica ya está en uso.");
        }

        Caracteristica caracteristica = new Caracteristica(caracteristicaDTO.getNombre(), caracteristicaDTO.getIcono());
        caracteristicaRepository.save(caracteristica);

        return caracteristica;
    }


    public Optional<Caracteristica> buscarCaracteristica(Long id) throws ResourceNotFoundException {
        return caracteristicaRepository.findById(id);

    }

    public void eliminarCaracteristica(Long id) throws ResourceNotFoundException {
        Optional<Caracteristica> caracteristicaAEliminar = buscarCaracteristica(id);
        if (caracteristicaAEliminar.isPresent()) {
            caracteristicaRepository.deleteById(id);
            logger.info("Se eliminó correctamente la característica con id: " + id);
        } else {
            logger.error("No se puede eliminar la característica con id: " + id);
            throw new ResourceNotFoundException("No se puede eliminar la característica con ID: " + id + " ya que no existe en nuestra BDD");
        }

    }

    public Caracteristica actualizarCaracteristica(Caracteristica caracteristica) throws ResourceNotFoundException {
        Optional<Caracteristica> caracteristicaExistente = caracteristicaRepository.findById(caracteristica.getId());

        if (!caracteristicaExistente.isPresent()) {
            throw new ResourceNotFoundException("Característica no encontrada con el ID: " + caracteristica.getId());
        }

        Caracteristica caracteristicaActualizada = caracteristicaExistente.get();
        // Actualiza las propiedades de la característica existente con los valores de la nueva característica
        caracteristicaActualizada.setNombre(caracteristica.getNombre());
        caracteristicaActualizada.setIcono(caracteristica.getIcono());
        // ... Actualiza otras propiedades según sea necesario

        caracteristicaRepository.save(caracteristicaActualizada);
        logger.info("Se actualizó la característica con ID: " + caracteristicaActualizada.getId());

        return caracteristicaActualizada;
    }

//    public void actualizarCaracteristica(Caracteristica caracteristica) throws ResourceNotFoundException {
//        Optional<Caracteristica> caracteristicaExistente = caracteristicaRepository.findById(caracteristica.getId());
//
//        if (!caracteristicaExistente.isPresent()) {
//            throw new ResourceNotFoundException("Característica no encontrada con el ID: " + caracteristica.getId());
//        }
//
//        caracteristicaRepository.save(caracteristica);
//        logger.info("Se actualizó la característica con ID: " + caracteristica.getId());
//
//    }

    public List<Caracteristica> buscarCaracteristicas() {
        return caracteristicaRepository.findAll();
    }
}
