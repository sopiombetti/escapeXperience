package com.example.PIequipo1.controller;


import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.amazonaws.services.amplify.model.BadRequestException;
import com.example.PIequipo1.dto.PuntuacionDTO;
import com.example.PIequipo1.repository.UsuarioRepository;
import com.example.PIequipo1.service.PuntuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/puntuacion")
@CrossOrigin(origins = "*")
public class PuntuacionController {

    private final PuntuacionService puntuacionService;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public PuntuacionController(PuntuacionService puntuacionService, UsuarioRepository usuarioRepository) {
        this.puntuacionService = puntuacionService;
        this.usuarioRepository = usuarioRepository;
    }

   @PostMapping("/agregar")
    public ResponseEntity<PuntuacionDTO> guardarPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(puntuacionService.guardarPuntuacion(puntuacionDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PuntuacionDTO> buscarPuntuacion(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<PuntuacionDTO> puntuacionBuscada = puntuacionService.buscarPuntuacion(id);
        if (puntuacionBuscada.isEmpty()) {

            throw new ResourceNotFoundException("Puntuación con id: " + id +" no encontrada");
        }

        return ResponseEntity.ok(puntuacionBuscada.get());
    }

    @GetMapping
    public ResponseEntity<List<PuntuacionDTO>> listarPuntuaciones() {

        List<PuntuacionDTO> puntuaciones = puntuacionService.buscarPuntuaciones();

        return ResponseEntity.ok(puntuaciones);
    }

    @GetMapping("/puntuaciones/{id}")
    public ResponseEntity<List<PuntuacionDTO>> buscarPuntuacionesPorIdProducto(@PathVariable Long id) throws ResourceNotFoundException {
        List<PuntuacionDTO> todasLasPuntuaciones = puntuacionService.buscarPuntuaciones();
        List<PuntuacionDTO> puntuacionAventura = new ArrayList<>();

        for (PuntuacionDTO puntuacionEncontrada : todasLasPuntuaciones) {
            if (puntuacionEncontrada.getAventura_id().equals(id)){
                puntuacionAventura.add(puntuacionEncontrada);
            }
        }
       return ResponseEntity.ok(puntuacionAventura);
    }

}
