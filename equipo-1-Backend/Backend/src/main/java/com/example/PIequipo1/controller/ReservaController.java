package com.example.PIequipo1.controller;

import com.example.PIequipo1.dto.ReservaDTO;
import com.example.PIequipo1.dto.ReservaRequestDTO;
import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Politica;
import com.example.PIequipo1.entity.Reserva;
import com.example.PIequipo1.entity.Usuario;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.service.*;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reserva")
public class ReservaController {

    private final ReservaService reservaService;

    private final UsuarioService usuarioService;

    private final AventuraService aventuraService;

    private final MailService mailService;

    private final PoliticaService politicaService;

    @Autowired
    public ReservaController(ReservaService reservaService, UsuarioService usuarioService, AventuraService aventuraService, MailService mailService, PoliticaService politicaService) {
        this.reservaService = reservaService;
        this.usuarioService = usuarioService;
        this.aventuraService = aventuraService;
        this.mailService = mailService;
        this.politicaService = politicaService;
    }


    @PostMapping("/registrar")
    public ResponseEntity<ReservaDTO> registrarReserva(@RequestBody ReservaRequestDTO reservaRequestDTO) throws Exception {
        Long usuarioId = reservaRequestDTO.getUsuarioId();
        Long aventuraId = reservaRequestDTO.getAventuraId();
        LocalDate fechaReserva = reservaRequestDTO.getFechaReserva();
        LocalDate fechaReservaAventura = reservaRequestDTO.getFechaReservaAventura();
        String cantidad_personas= reservaRequestDTO.getCantidadPersonas();


    // Buscar el usuario y la aventura por sus IDs
    Usuario usuario = usuarioService.findById(usuarioId).orElse(null);
    Aventura aventura = aventuraService.findById(aventuraId).orElse(null);

    if (usuario == null || aventura == null) {
        throw new ResourceNotFoundException("No se pudo encontrar el usuario o la aventura con los IDs proporcionados");
    }

    // Crear una nueva Reserva
        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setAventura(aventura);
        reserva.setCantidadPersonas(cantidad_personas);
        reserva.setFechaReservaAventura(fechaReservaAventura);


    // Guardar la reserva
    ReservaDTO reservaGuardadaDTO = reservaService.guardarReserva(reserva);

        // TODO: Enviar correo de registro de reserva
        mailService.enviarCorreoReserva(usuario.getEmail(), reservaGuardadaDTO);


    // Devolver el ReservaDTO con todos los detalles
    return ResponseEntity.status(HttpStatus.CREATED).body(reservaGuardadaDTO);
}

    private Reserva convertirReservaDTOaReserva(ReservaDTO reservaDTO) {
        Reserva reserva = new Reserva();
        reserva.setId(reservaDTO.getId());
        reserva.setFechaReserva(reservaDTO.getFechaReserva());
        reserva.setFechaReservaAventura(reservaDTO.getFechaReservaAventura());
        reserva.setCantidadPersonas(reservaDTO.getCantidadPersonas());

        // Buscar el usuario por su ID y asignarlo a la reserva
        Usuario usuario = usuarioService.findById(reservaDTO.getUsuarioId()).orElse(null);
        reserva.setUsuario(usuario);

        // Buscar la aventura por su ID y asignarla a la reserva
        Aventura aventura = aventuraService.findById(reservaDTO.getAventuraId()).orElse(null);
        reserva.setAventura(aventura);

        return reserva;

    }

    @DeleteMapping("/eliminar/{reservaId}")
    public ResponseEntity<?> eliminarReserva(@PathVariable Long reservaId) {
        reservaService.eliminarReserva(reservaId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/listar")
    public ResponseEntity<List<ReservaDTO>> listarTodasLasReservas() {
        List<ReservaDTO> reservas = reservaService.listarTodasLasReservas();
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/buscar/{reservaId}")
    public ResponseEntity<ReservaDTO> buscarReservaPorId(@PathVariable Long reservaId) throws ResourceNotFoundException {
        ReservaDTO reserva = reservaService.buscarReservaPorId(reservaId);
        return ResponseEntity.ok(reserva);
    }



    /**
     * Endpoint para listar las reservas de un usuario
     * @param usuarioId Id del usuario
     * @return ResponseEntity con la lista de reservas del usuario
     */
    @GetMapping("/buscar-logueado/{usuarioId}")
    public ResponseEntity<List<ReservaDTO>> buscarReservasUsuario(@PathVariable Long usuarioId) throws Exception {
       // this.logger.info("Buscando reservas del usuario con id " + usuarioId);

        Optional<Usuario> usuario = usuarioService.findById(usuarioId);
        if (usuario.isEmpty()) {
           // this.logger.warning("No existe el usuario con id " + usuarioId);
            throw new ResourceNotFoundException("No existe el usuario con id " + usuarioId);
        }

        List<ReservaDTO> reservas = reservaService.findByUserId(usuarioId);
        //this.logger.info("Reservas encontradas: " + reservas.size());

        return ResponseEntity.ok(reservas);
    }

}
