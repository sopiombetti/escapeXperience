package com.example.PIequipo1.controller;

import com.example.PIequipo1.entity.Categoria;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<Categoria> registrarCategoria(
            @RequestBody Categoria categoria) throws ResourceNotFoundException {
        Categoria categoriaGuardada = categoriaService.registrarCategoria(categoria);
        return ResponseEntity.ok(categoriaGuardada);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarCategoria(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Categoria> categoriaBuscada = categoriaService.buscarCategoria(id);
        if(categoriaBuscada.isPresent())
            return ResponseEntity.ok(categoriaBuscada.get());
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok("Se elimino la categoria correctamente con el id: " + id);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@RequestBody Categoria categoria) throws ResourceNotFoundException {
        // Es preguntar si existe
        Optional<Categoria> categoriaBuscada = categoriaService.buscarCategoria(categoria.getId());

        if (categoriaBuscada.isPresent()) {
            Categoria categoriaActualizada = categoriaService.actualizarCategoria(categoria);
            return ResponseEntity.ok()
                    .body(categoriaActualizada);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }


    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        return ResponseEntity.ok(categoriaService.buscarCategorias());
    }
}
