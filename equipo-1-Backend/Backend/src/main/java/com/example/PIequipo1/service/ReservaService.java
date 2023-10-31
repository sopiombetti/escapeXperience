package com.example.PIequipo1.service;

import com.example.PIequipo1.dto.ReservaDTO;
import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Reserva;
import com.example.PIequipo1.entity.Usuario;
import com.example.PIequipo1.exception.ResourceNotFoundException;
import com.example.PIequipo1.repository.AventuraRepository;
import com.example.PIequipo1.repository.ReservaRepository;
import com.example.PIequipo1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.PIequipo1.dto.ReservaDTO.convertirDesdeReserva;

@Service
public class ReservaService {

   private ReservaRepository reservaRepository;
   private UsuarioRepository usuarioRepository;
   private AventuraRepository aventuraRepository;

   @Autowired
    public ReservaService(ReservaRepository reservaRepository, UsuarioRepository usuarioRepository, AventuraRepository aventuraRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.aventuraRepository = aventuraRepository;
    }

    public ReservaDTO guardarReserva(Reserva reserva) {
        Reserva reservaGuardada = reservaRepository.save(reserva);
        return convertirDesdeReserva(reservaGuardada);
    }


    public List<ReservaDTO> findByUserId(Long id) {
        List<Reserva> reservas = reservaRepository.findByUsuarioId(id);
        List<ReservaDTO> reservasDTO = new ArrayList<>();
        for (Reserva reserva : reservas) {
            reservasDTO.add(convertirDesdeReserva(reserva));
        }

        return reservasDTO;
    }

    public void eliminarReserva(Long reservaId) {
        reservaRepository.deleteById(reservaId);
    }
    public List<ReservaDTO> listarTodasLasReservas() {
        List<Reserva> reservas = reservaRepository.findAll();
        List<ReservaDTO> reservasDTO = new ArrayList<>();
        for (Reserva reserva : reservas) {
            reservasDTO.add(convertirDesdeReserva(reserva));
        }
        return reservasDTO;
    }
    public ReservaDTO buscarReservaPorId(Long reservaId) throws ResourceNotFoundException {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con el ID: " + reservaId));
        return convertirDesdeReserva(reserva);

    }





}
