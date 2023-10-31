package com.example.PIequipo1.service;

import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.amazonaws.services.amplify.model.BadRequestException;
import com.example.PIequipo1.dto.UsuarioDTO;
import com.example.PIequipo1.entity.Atribucion;
import com.example.PIequipo1.entity.Usuario;
import com.example.PIequipo1.entity.UsuarioRol;
import com.example.PIequipo1.repository.UsuarioRepository;
import com.example.PIequipo1.repository.UsuarioRolRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    private static final org.apache.log4j.Logger logger= Logger.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;
    private final UsuarioRolRepository usuarioRolRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioRolRepository usuarioRolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioRolRepository = usuarioRolRepository;
    }

    public UsuarioDTO guardarUsuario(UsuarioDTO usuarioDTO) throws BadRequestException {
        if(usuarioDTO.getNombre() != null && usuarioDTO.getApellido() != null && usuarioDTO.getEmail() != null &&
                usuarioDTO.getContrasenia() != null) {

            BCryptPasswordEncoder cifradorContrasena= new BCryptPasswordEncoder();
            usuarioDTO.setContrasenia(cifradorContrasena.encode(usuarioDTO.getContrasenia()));
            usuarioDTO.setRol("USER");

            Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuarioDTO.getEmail());
            if (usuarioExistente.isPresent()) {
                throw new BadRequestException("Error. El email ya está registrado.");
            } else {
                Usuario usuario = convertirUsuarioDTOaUsuario(usuarioDTO);
                return convertirUsuarioaUsuarioDTO(usuarioRepository.save(usuario));
            }

        } else {
           throw new BadRequestException("Error. No se pudo guardar el usuario. Alguno de los campos de registro del usuario está incompleto");
        }
    }


    public Optional<UsuarioDTO> buscarUsuario (Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuarioABuscar=usuarioRepository.findById(id);
        if (usuarioABuscar.isPresent()){
            Optional<UsuarioDTO> usuarioDTO = Optional.of(convertirUsuarioaUsuarioDTO(usuarioABuscar.get()));
            UsuarioRol usuarioRolEncontrado = usuarioRolRepository.findById(usuarioABuscar.get().getUsuarioRol().getId()).get();
            List<String> permisosParaUsuarioDTO = new ArrayList<>();
            for (Atribucion atribucion: usuarioRolEncontrado.getPermisos()) {
                permisosParaUsuarioDTO.add(atribucion.getNombre());
            }
            usuarioDTO.get().setAtribuciones(permisosParaUsuarioDTO);
            return usuarioDTO;
        }else {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }
    }

    public List<UsuarioDTO> buscarTodosUsuarios() {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();
        List<UsuarioDTO> listaUsuariosDTO = new ArrayList<>();
        for (Usuario listaUsuario : listaUsuarios) {
            Optional<UsuarioDTO> usuarioDTO = Optional.of(convertirUsuarioaUsuarioDTO(listaUsuario));
            UsuarioRol usuarioRolEncontrado = usuarioRolRepository.findById(listaUsuario.getUsuarioRol().getId()).get();
            List<String> permisosParaUsuarioDTO = new ArrayList<>();
            for (Atribucion permiso: usuarioRolEncontrado.getPermisos()) {
                permisosParaUsuarioDTO.add(permiso.getNombre());
            }
            usuarioDTO.get().setAtribuciones(permisosParaUsuarioDTO);
            listaUsuariosDTO.add(usuarioDTO.get());
        }
      return listaUsuariosDTO;
    }


    public void eliminarUsuario(Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(id);
        if (usuarioBuscado.isPresent()){
            usuarioRepository.deleteById(id);
        }else{

            throw new ResourceNotFoundException("Error. No existe el usuario con id= "+id);
        }

    }

 @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if (usuario.isPresent()){

            return usuario.get();
        }
        else{

            throw new UsernameNotFoundException("Error. Usuario no encontrado en la BD");
        }
    }

    public UsuarioDTO actualizarUsuario(UsuarioDTO usuarioDTO) throws ResourceNotFoundException {
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(usuarioDTO.getId());
        if (usuarioBuscado.isPresent()){
            Usuario usuario = convertirUsuarioDTOaUsuario(usuarioDTO);

            return convertirUsuarioaUsuarioDTO(usuarioRepository.save(usuario));
        }else{

            throw new ResourceNotFoundException("Error. No existe el usuario con id= "+usuarioDTO.getId());
        }
    }
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }


    private Usuario convertirUsuarioDTOaUsuario(UsuarioDTO usuarioDTO){
        Usuario usuario = new Usuario();
        Optional<UsuarioRol> usuarioRolBuscado;
        usuario.setId(usuarioDTO.getId());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setContrasenia(usuarioDTO.getContrasenia());
        usuarioRolBuscado = usuarioRolRepository.findByRol(usuarioDTO.getRol());
        usuario.setUsuarioRol(usuarioRolBuscado.get());
        usuario.setValidacion(usuarioDTO.getValidacion());
        return usuario;
    }

    private UsuarioDTO convertirUsuarioaUsuarioDTO(Usuario usuario){
        UsuarioDTO usuarioDTO = new UsuarioDTO();

        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setApellido(usuario.getApellido());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setContrasenia(usuario.getContrasenia());
        usuarioDTO.setRol(usuario.getUsuarioRol().getRol());
        usuarioDTO.setValidacion(usuario.getValidacion());

        return usuarioDTO;
    }

}



