package com.example.PIequipo1.controller;


import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.amazonaws.services.amplify.model.BadRequestException;
import com.example.PIequipo1.dto.RolDTO;
import com.example.PIequipo1.service.RolService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rol")
@CrossOrigin(origins = "*")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    /**/
    @PostMapping("/agregar")
    public ResponseEntity<RolDTO> guardarRol(@RequestBody RolDTO rolDTO) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(rolService.guardarRol(rolDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RolDTO> buscarRol(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<RolDTO> rolBuscado = rolService.buscarRol(id);
        return ResponseEntity.ok(rolBuscado.get());
    }

    @GetMapping
    public ResponseEntity<List<RolDTO>> listarRoles() {
        List<RolDTO> roles = rolService.buscarTodosRoles();
        return ResponseEntity.ok(roles);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<RolDTO> actualizarRol(@PathVariable Long id,@RequestBody RolDTO rolDTO) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(rolService.actualizarRol(rolDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable Long id) throws ResourceNotFoundException {
        rolService.eliminarRol(id);
        return ResponseEntity.ok("Se eliminó el rol con id: " + id);
    }

}
