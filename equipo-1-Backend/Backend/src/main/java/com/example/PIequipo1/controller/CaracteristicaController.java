package com.example.PIequipo1.controller;

import com.example.PIequipo1.dto.CaracteristicaDTO;
import com.example.PIequipo1.entity.Caracteristica;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.service.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/caracteristicas")
@CrossOrigin(origins = "*")
public class CaracteristicaController {

    private CaracteristicaService caracteristicaService;

    @Autowired
    public CaracteristicaController(CaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    @PostMapping
    public ResponseEntity<Caracteristica> registrarCaracteristica(
            @RequestBody CaracteristicaDTO caracteristica) throws ResourceNotFoundException {

        Caracteristica caracteristicaGuardada = caracteristicaService.registrarCaracteristica(caracteristica);
        return ResponseEntity.ok(caracteristicaGuardada);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caracteristica> buscarCaracteristica(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Caracteristica> caracteristicaBuscada= caracteristicaService.buscarCaracteristica(id);
        if(caracteristicaBuscada.isPresent())
            return ResponseEntity.ok(caracteristicaBuscada.get());

        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCaracteristica(@PathVariable Long id) throws ResourceNotFoundException {
        caracteristicaService.eliminarCaracteristica(id);

        return ResponseEntity.ok("Se elimino la caracteristica correctamente con el id: " + id);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Caracteristica> actualizarCaracteristica(@RequestBody Caracteristica caracteristica) throws ResourceNotFoundException {
        // Es preguntar si existe
        Optional<Caracteristica> caracteristicaBuscada = caracteristicaService.buscarCaracteristica(caracteristica.getId());

        if (caracteristicaBuscada.isPresent()) {
            Caracteristica caracteristicaActualizada = caracteristicaService.actualizarCaracteristica(caracteristica);
            return ResponseEntity.ok()
                    .body(caracteristicaActualizada);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }



    @GetMapping
    public ResponseEntity<List<Caracteristica>> listarCaracteristicas() {
        return ResponseEntity.ok(caracteristicaService.buscarCaracteristicas());
    }
}
