package com.example.PIequipo1.service;

import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.amazonaws.services.amplify.model.BadRequestException;
import com.example.PIequipo1.dto.PuntuacionDTO;
import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Puntuacion;
import com.example.PIequipo1.entity.Usuario;
import com.example.PIequipo1.repository.AventuraRepository;
import com.example.PIequipo1.repository.PuntuacionRepository;
import com.example.PIequipo1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PuntuacionService {

    private UsuarioRepository usuarioRepository;
    private PuntuacionRepository puntuacionRepository;
    private AventuraRepository aventuraRepository;

    @Autowired
    public PuntuacionService(UsuarioRepository usuarioRepository, PuntuacionRepository puntuacionRepository, AventuraRepository aventuraRepository) {
        this.usuarioRepository = usuarioRepository;
        this.puntuacionRepository = puntuacionRepository;
        this.aventuraRepository = aventuraRepository;
    }

    public PuntuacionDTO guardarPuntuacion(PuntuacionDTO puntuacionDTO) throws BadRequestException {
        if(puntuacionDTO.getPuntuacion() >= 1 && puntuacionDTO.getPuntuacion()<=5){
            Optional<Aventura> aventura = aventuraRepository.findById(puntuacionDTO.getAventura_id());

            Puntuacion puntuacion = puntuacionRepository.save(convertirPuntuacionDTOAPuntuacion(puntuacionDTO));

            aventura.get().setPromedioPuntuacion(aventura.get().calculoPromedioCalificacion());
            aventura.get().setCantidadPuntuaciones(aventura.get().getPuntuaciones().size());
            aventuraRepository.save(aventura.get());

            return convertirPuntuacionAPuntuacionDTO(puntuacion);
        }else {

            throw new BadRequestException("Error. Puntuación no esta en rango de 1 a 5");
        }
    }

    public Optional<PuntuacionDTO> buscarPuntuacion(Long id) throws ResourceNotFoundException {
        Optional<Puntuacion> puntuacionABuscar = puntuacionRepository.findById(id);
        if (puntuacionABuscar.isPresent()) {
            return Optional.of(convertirPuntuacionAPuntuacionDTO(puntuacionABuscar.get()));
        } else {
            throw new ResourceNotFoundException("No se encontró la puntuacion con id: " + id);
        }

    }

    public List<PuntuacionDTO> buscarPuntuaciones() {
        List<Puntuacion> listaPuntuaciones = puntuacionRepository.findAll();
        List<PuntuacionDTO> listaPuntuacionesDTO = new ArrayList<>();

        for (Puntuacion listaPuntuacion : listaPuntuaciones) {
            listaPuntuacionesDTO.add(convertirPuntuacionAPuntuacionDTO(listaPuntuacion));
        }
        return listaPuntuacionesDTO;
    }

    private Puntuacion convertirPuntuacionDTOAPuntuacion(PuntuacionDTO puntuacionDTO){
        Puntuacion puntuacion = new Puntuacion();

        puntuacion.setId(puntuacionDTO.getId());
        puntuacion.setPuntuacion(puntuacionDTO.getPuntuacion());
        puntuacion.setCritica(puntuacionDTO.getCritica());
        Optional<Aventura> aventuraBuscada = aventuraRepository.findById(puntuacionDTO.getAventura_id());
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(puntuacionDTO.getUsuario_id());
        puntuacion.setAventura(aventuraBuscada.get());
        puntuacion.setUsuario(usuarioBuscado.get());

        return puntuacion;
    }

    private PuntuacionDTO convertirPuntuacionAPuntuacionDTO(Puntuacion puntuacion){
        PuntuacionDTO puntuacionDTO = new PuntuacionDTO();

        puntuacionDTO.setId(puntuacion.getId());
        puntuacionDTO.setPuntuacion(puntuacion.getPuntuacion());
        puntuacionDTO.setAventura_id(puntuacion.getAventura().getId());
        puntuacionDTO.setUsuario_id(puntuacion.getUsuario().getId());
        puntuacionDTO.setCritica(puntuacion.getCritica());
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(puntuacion.getUsuario().getId());
        puntuacionDTO.setNombreUsuario(usuarioBuscado.get().getNombre());

        return puntuacionDTO;
    }

}
