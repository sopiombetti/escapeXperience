package com.example.PIequipo1.service;

import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.amazonaws.services.amplify.model.BadRequestException;
import com.example.PIequipo1.dto.RolDTO;
import com.example.PIequipo1.entity.Atribucion;
import com.example.PIequipo1.entity.UsuarioRol;
import com.example.PIequipo1.repository.AtribucionRepository;
import com.example.PIequipo1.repository.UsuarioRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    private final UsuarioRolRepository usuarioRolRepository;

    private final AtribucionRepository atribucionRepository;


    @Autowired
    public RolService(UsuarioRolRepository usuarioRolRepository, AtribucionRepository permisoRepository) {
        this.usuarioRolRepository = usuarioRolRepository;
        this.atribucionRepository = permisoRepository;
    }
    public RolDTO guardarRol(RolDTO rolDTO) throws BadRequestException {
        if (rolDTO.getRol() != null && rolDTO.getRol().length() > 0) {
            String rolFormateado = rolDTO.getRol().replaceAll("\\s+", "").toUpperCase();
            rolDTO.setRol(rolFormateado);
            Optional<UsuarioRol> usuarioRolEncontrado = usuarioRolRepository.findByRol(rolDTO.getRol());
            if (!usuarioRolEncontrado.isPresent()) {
                UsuarioRol usuarioRol = convertirRolDTOaRol(rolDTO);


                return convertirRolaRolDTO(usuarioRolRepository.save(usuarioRol));
            } else {

                throw new BadRequestException("Error. No se pudo guardar el rol porque está repetido.");
            }
        } else {

            throw new BadRequestException("Error. No se pudo guardar el rol. Alguno de los campos de registro del rol está incompleto.");
        }
    }


    public Optional<RolDTO> buscarRol (Long id) throws ResourceNotFoundException {
        Optional<UsuarioRol> rolABuscar = usuarioRolRepository.findById(id);
        if (rolABuscar.isPresent()){

            return  Optional.of(convertirRolaRolDTO(rolABuscar.get()));
        }else {

            throw new ResourceNotFoundException("No se encontró el rol con id: " + id);
        }
    }

    public List<RolDTO> buscarTodosRoles() {
        List<UsuarioRol> listaRoles = usuarioRolRepository.findAll();
        List<RolDTO> listaRolesDTO = new ArrayList<>();
        for (UsuarioRol listaUsuarioRol : listaRoles) {
            listaRolesDTO.add(convertirRolaRolDTO(listaUsuarioRol));
        }

        return listaRolesDTO;
    }

    public RolDTO actualizarRol(RolDTO rolDTO) throws ResourceNotFoundException, BadRequestException {
        Optional<UsuarioRol> rolBuscado = usuarioRolRepository.findById(rolDTO.getId());
        if (rolBuscado.isPresent()){
            UsuarioRol usuarioRol = convertirRolDTOaRol(rolDTO);

            return convertirRolaRolDTO(usuarioRolRepository.save(usuarioRol));

        }else{

            throw new ResourceNotFoundException("Error. No existe el rol con id= "+ rolDTO.getId());
        }
    }

    public void eliminarRol(Long id) throws ResourceNotFoundException {
        Optional<UsuarioRol> rolBuscado = usuarioRolRepository.findById(id);
        if (rolBuscado.isPresent()){
            usuarioRolRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Error. No existe el rol con id = "+id);
        }
    }

    private UsuarioRol convertirRolDTOaRol(RolDTO rolDTO){
        UsuarioRol usuarioRol = new UsuarioRol("SUPER_ADMIN", new ArrayList<>(), new ArrayList<>());
        List<Atribucion> permisosEncontrados = new ArrayList<>();

        usuarioRol.setId(rolDTO.getId());
        usuarioRol.setRol(rolDTO.getRol());
        List<String> permisos = rolDTO.getAutorizacion();
        for (String permiso:permisos ) {
            permisosEncontrados.add(atribucionRepository.findByNombre(permiso).get());
        }
        usuarioRol.setPermisos(permisosEncontrados);

        return usuarioRol;
    }

    private RolDTO convertirRolaRolDTO(UsuarioRol usuarioRol){
        RolDTO rolDTO = new RolDTO();
        List<String> permisosEncontrados = new ArrayList<>();

        rolDTO.setId(usuarioRol.getId());
        rolDTO.setRol(usuarioRol.getRol());
        List<Atribucion> permisos = usuarioRol.getPermisos();
        for (Atribucion permiso:permisos ) {
            permisosEncontrados.add(permiso.getNombre());
        }
        rolDTO.setAutorizacion(permisosEncontrados);

        return rolDTO;
    }
}
