package com.example.PIequipo1.controller;

import com.example.PIequipo1.dto.AventuraDTO;
import com.example.PIequipo1.dto.ImagenPackDTO;
import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.service.AventuraService;
import com.example.PIequipo1.service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/aventuras")
public class AventuraController {


    private AventuraService aventuraService;

    private ImagenService imagenService;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    public AventuraController(AventuraService aventuraService, ImagenService imagenService) {
        this.aventuraService = aventuraService;
        this.imagenService = imagenService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Aventura>> searchAdventures(@RequestParam("palabra-clave") String palabraClave) {
        List<Aventura> aventuras = aventuraService.searchAdventuresByKeyword(palabraClave);
        return ResponseEntity.ok(aventuras);
    }

    @PostMapping
    public ResponseEntity<Aventura> registrarAventura(@RequestBody AventuraDTO aventura) throws ResourceNotFoundException {
        return ResponseEntity.ok(aventuraService.guardarAventura(aventura));
    }

    @PostMapping(value = "/imagenes/{id_aventura}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> registrarImagenesDeAventura(
            @RequestBody List<MultipartFile> imagenes,
            @PathVariable("id_aventura") Long id_aventura
    ) throws ResourceNotFoundException, IOException {
        return ResponseEntity.ok(imagenService.guardarImagen(new ImagenPackDTO(imagenes, id_aventura)));
    }

    @PutMapping(value = "/imagenes/{id_aventura}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> actualizarImagenesDeAventura(
            @RequestBody List<MultipartFile> imagenes,
            @PathVariable("id_aventura") Long id_aventura
    ) throws ResourceNotFoundException, IOException {
        return ResponseEntity.ok(imagenService.actualizarImagenes(new ImagenPackDTO(imagenes, id_aventura)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAventura(@PathVariable Long id) throws ResourceNotFoundException {
        aventuraService.eliminarAventura(id);
        return ResponseEntity.ok("Se elimino la aventura correctamente con el id: " + id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aventura> buscarAventura(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Aventura> aventuraBuscada = aventuraService.buscarAventura(id);
        if(aventuraBuscada.isPresent())
            return ResponseEntity.ok(aventuraBuscada.get());
        else
            return ResponseEntity.notFound().build();
    }

    @GetMapping("/aleatorias")
    public List<Aventura> obtenerAventurasAleatorias() {
        int count = 5; // Número predefinido de aventuras aleatorias que deseas mostrar
        List<Aventura> todasLasAventuras = aventuraService.obtenerAventurasAleatorias(count);
        return todasLasAventuras;
    }


    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Aventura> actualizarAventura(@RequestBody AventuraDTO aventura) throws ResourceNotFoundException {
        //es preguntar si existe
        Optional<Aventura> aventuraBuscada = aventuraService.buscarAventura(aventura.getId());

        if (aventuraBuscada.isPresent()) {
            Aventura aventuraResponse = aventuraService.actualizarAventura(aventura);
            return ResponseEntity.ok(aventuraResponse);
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<List<Aventura>> listarAventuras() {
       return ResponseEntity.ok(aventuraService.buscarAventuras());
    }

    @GetMapping("/por-fecha/{fechaInicio}")
    public ResponseEntity<List<Aventura>> listarAventurasPorFecha (@PathVariable("fechaInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaInicio) {

        if (fechaInicio != null) {
            // Si se proporciona la fecha, llama al servicio para filtrar aventuras por esa fecha.
            List<Aventura> aventurasFiltradas = aventuraService.buscarAventurasPorFecha(fechaInicio);
            return ResponseEntity.ok(aventurasFiltradas);
        } else {
            // Si no se proporciona la fecha, devuelve todas las aventuras.
            return ResponseEntity.ok(aventuraService.buscarAventuras());
        }
    }
}
