package com.example.PIequipo1.service;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Categoria;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.repository.AventuraRepository;
import com.example.PIequipo1.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    private static final Logger logger = Logger.getLogger(CategoriaService.class);
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private AventuraRepository aventuraRepository;

    public Categoria registrarCategoria(Categoria categoria) throws ResourceNotFoundException {
        Optional<Categoria> categoriaExistente = categoriaRepository.findByNombre(categoria.getNombre());
        if (categoriaExistente.isPresent()) {
            throw new com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException("El nombre de la categoria ya está en uso.");
        }

        categoriaRepository.save(categoria);
        return categoria;
    }

    public Optional<Categoria> buscarCategoria(Long id) throws ResourceNotFoundException {
        // logger.info(" Se encontro una aventura con id: "+ id);
        return categoriaRepository.findById(id);
    }

    /*
    public void eliminarCategoria(Long id) throws ResourceNotFoundException {
        Optional<Categoria> categoriaAEliminar = buscarCategoria(id);
        if(categoriaAEliminar.isPresent()){
            categoriaRepository.deleteById(id);
            logger.info("Se elimino correctamente la categoria con id: " + id);
        }
        else{
            logger.error("no se puede eliminar la categoria con id: "+id);
            throw new ResourceNotFoundException("No se puede eliminar la categoria con ID:"+id+".- ya que no existe en nuestra BDD");
        }
    }

     */

    public void eliminarCategoria(Long id) throws ResourceNotFoundException {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con el ID: " + id));

        // Obtén la categoría "General" por su ID (supongamos que el ID de "General" es 0)
        Categoria categoriaGeneral = categoriaRepository.findById(1L).orElse(null);

        // Obtén todas las aventuras asociadas a la categoría que se va a eliminar
        List<Aventura> aventuras = aventuraRepository.findByCategoria(categoria);

        // Asigna la categoría "General" a todas las aventuras
        for (Aventura aventura : aventuras) {
            aventura.setCategoria(categoriaGeneral);
            aventuraRepository.save(aventura);
        }

        // Finalmente, elimina la categoría
        categoriaRepository.delete(categoria);
    }


    public Categoria actualizarCategoria(Categoria categoria) throws ResourceNotFoundException {
        Optional<Categoria> categoriaExistente = categoriaRepository.findById(categoria.getId());

        if (!categoriaExistente.isPresent()) {
            throw new ResourceNotFoundException("Categoría no encontrada con el ID: " + categoria.getId());
        }

        Categoria categoriaActualizada = categoriaExistente.get();
        categoriaActualizada.setNombre(categoria.getNombre());// Actualiza otras propiedades según sea necesario
        categoriaActualizada.setDescripcion(categoria.getDescripcion());
        categoriaActualizada.setHexColor(categoria.getHexColor());
        categoriaActualizada.setUrlImage(categoria.getUrlImage());

        categoriaRepository.save(categoriaActualizada);
        logger.info("Se actualizó la categoría con ID: " + categoriaActualizada.getId());

        return categoriaActualizada;
    }

    public List<Categoria> buscarCategorias() {
        return categoriaRepository.findAll();
    }
}
