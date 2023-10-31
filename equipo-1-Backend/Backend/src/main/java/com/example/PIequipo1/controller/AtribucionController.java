package com.example.PIequipo1.controller;


import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.example.PIequipo1.entity.Atribucion;
import com.example.PIequipo1.service.AtribucionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/atribucion")
@CrossOrigin(origins = "*")
public class AtribucionController {

    private final AtribucionService atribucionService;

    public AtribucionController(AtribucionService atribucionService) {
        this.atribucionService = atribucionService;
    }

    private final Logger logger = Logger.getLogger(AtribucionController.class.getName());


    @PostMapping("/agregar")
    ResponseEntity<Atribucion> AgregarAtribucion(@RequestBody Atribucion atribucion) throws Exception {
          Atribucion atribucionGuardada = atribucionService.guardarAtribucion(atribucion);
        return ResponseEntity.status(HttpStatus.CREATED).body(atribucionGuardada);
    }
    /**/

    @GetMapping("/{id}")
    public ResponseEntity<Atribucion> buscarPermiso(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Atribucion> permisoBuscado = atribucionService.buscarAtribucion(id);
        this.logger.info("Se encontró permiso: " + permisoBuscado.get().toString());
        return ResponseEntity.ok(permisoBuscado.get());
    }

    @GetMapping
    public ResponseEntity<List<Atribucion>> listarPermisos() {
        List<Atribucion> permisos = atribucionService.buscarTodasAtribuciones();
        this.logger.info("Se encontraron " + permisos.size() + " permisos");
        return ResponseEntity.ok(permisos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAtribucion(@PathVariable Long id) throws ResourceNotFoundException {
        atribucionService.eliminarAtribucion(id);
        return ResponseEntity.ok("Se eliminó el rol con id: " + id);
    }

}
