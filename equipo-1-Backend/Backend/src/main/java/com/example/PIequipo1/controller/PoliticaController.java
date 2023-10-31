package com.example.PIequipo1.controller;

import com.example.PIequipo1.dto.CaracteristicaDTO;
import com.example.PIequipo1.dto.PoliticaDTO;
import com.example.PIequipo1.entity.Caracteristica;
import com.example.PIequipo1.entity.Categoria;
import com.example.PIequipo1.entity.Politica;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.service.CategoriaService;
import com.example.PIequipo1.service.PoliticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/politicas")
public class PoliticaController {

    private PoliticaService politicaService;

    @Autowired
    public PoliticaController(PoliticaService politicaService) {
        this.politicaService = politicaService;
    }

//    @PostMapping
//    public ResponseEntity<Politica> registrarPolitica(
//            @RequestBody Politica politica) throws ResourceNotFoundException {
//        Politica politicaGuardada = politicaService.registrarPolitica(politica);
//        return ResponseEntity.ok(politicaGuardada);
//    }

    @PostMapping
    public ResponseEntity<Politica> registrarPolitica(
            @RequestBody PoliticaDTO politicaDTO) throws ResourceNotFoundException {

        Politica politicaGuardada = politicaService.registrarPolitica(politicaDTO);
        return ResponseEntity.ok(politicaGuardada);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Politica> buscarPolitica(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Politica> politicaBuscada = politicaService.buscarPolitica(id);
        if(politicaBuscada.isPresent())
            return ResponseEntity.ok(politicaBuscada.get());
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPolitica(@PathVariable Long id) throws ResourceNotFoundException {
        politicaService.eliminarPolitica(id);
        return ResponseEntity.ok("Se elimino la politica correctamente con el id: " + id);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Politica> actualizarPolitica(@RequestBody Politica politica) throws ResourceNotFoundException {
        // Es preguntar si existe
        Optional<Politica> politicaBuscada = politicaService.buscarPolitica(politica.getId());

        if (politicaBuscada.isPresent()) {
            Politica politicaActualizada = politicaService.actualizarPolitica(politica);
            return ResponseEntity.ok()
                    .body(politicaActualizada);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }

//    @PutMapping("/actualizar/{id}")
//    public ResponseEntity<String> actualizarPolitica(@RequestBody Politica politica) throws ResourceNotFoundException {
//        //es preguntar si existe
//        Optional<Politica> politicaBuscada = politicaService.buscarPolitica(politica.getId());
//
//        if (politicaBuscada.isPresent()) {
//            politicaService.actualizarPolitica(politica);
//            return ResponseEntity.ok("Politica actualizada" + " - titulo de la politica: " + politica.getTitulo());
//        } else {
//            return ResponseEntity.badRequest().body("no se pudo actualizar la politica " + politica.getId() + " -" + politica.getTitulo());
//        }
//    }

    @GetMapping
    public ResponseEntity<List<Politica>> listarPoliticas() {
        return ResponseEntity.ok(politicaService.buscarPoliticas());
    }
}
