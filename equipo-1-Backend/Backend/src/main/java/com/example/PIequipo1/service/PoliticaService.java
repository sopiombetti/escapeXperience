package com.example.PIequipo1.service;

import com.example.PIequipo1.dto.CaracteristicaDTO;
import com.example.PIequipo1.dto.PoliticaDTO;
import com.example.PIequipo1.entity.Caracteristica;
import com.example.PIequipo1.entity.Categoria;
import com.example.PIequipo1.entity.Politica;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.repository.CaracteristicaRepository;
import com.example.PIequipo1.repository.PoliticaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PoliticaService {

    private static final Logger logger = Logger.getLogger(CaracteristicaService.class);

    @Autowired
    private PoliticaRepository politicaRepository;



    public Politica registrarPolitica(PoliticaDTO politicaDTO) throws ResourceNotFoundException {
        Optional<Politica> politicaExistente = politicaRepository.findByTitulo(politicaDTO.getTitulo());
        if (politicaExistente.isPresent()) {
            throw new ResourceNotFoundException("El nombre de la politica ya está en uso.");
        }

        Politica politica = new Politica(politicaDTO.getTitulo(), politicaDTO.getDescripcion());
        politicaRepository.save(politica);

        return politica;
    }



    public Optional<Politica> buscarPolitica(Long id) throws ResourceNotFoundException {
        // logger.info(" Se encontro una aventura con id: "+ id);
        return politicaRepository.findById(id);
    }

    public void eliminarPolitica(Long id) throws ResourceNotFoundException {
        Optional<Politica> politicaAEliminar = buscarPolitica(id);
        if(politicaAEliminar.isPresent()){
            politicaRepository.deleteById(id);
            logger.info("Se elimino correctamente la politica con id: " + id);
        }
        else{
            logger.error("no se puede eliminar la politica con id: "+id);
            throw new ResourceNotFoundException("No se puede eliminar la politica con ID:"+id+".- ya que no existe en nuestra BDD");
        }
    }

    public Politica actualizarPolitica(Politica politica) throws ResourceNotFoundException {
        Optional<Politica> politicaExistente = politicaRepository.findById(politica.getId());

        if (!politicaExistente.isPresent()) {
            throw new ResourceNotFoundException("Política no encontrada con el ID: " + politica.getId());
        }

        Politica politicaActualizada = politicaExistente.get();
        // Actualiza las propiedades de la política existente con los valores de la nueva política
        politicaActualizada.setTitulo(politica.getTitulo());
        politicaActualizada.setDescripcion(politica.getDescripcion());
        // ... Actualiza otras propiedades según sea necesario

        politicaRepository.save(politicaActualizada);
        logger.info("Se actualizó la política con ID: " + politicaActualizada.getId());

        return politicaActualizada;
    }

//    public void actualizarPolitica(Politica politica) throws ResourceNotFoundException {
//        Optional<Politica> politicaExistente = politicaRepository.findById(politica.getId());
//
//        if (!politicaExistente.isPresent()) {
//            throw new ResourceNotFoundException("Politica no encontrada con el ID: " + politica.getId());
//        }
//
//        politica.setId(politicaExistente.get().getId());
//
//        politicaRepository.save(politica);
//        logger.info("Se actualizó la politica con ID: " + politica.getId());
//    }


    public List<Politica> buscarPoliticas() {
        return politicaRepository.findAll();
    }

    public Optional<Politica> findById(Long id) {
        return politicaRepository.findById(id);
    }


}


