package com.example.PIequipo1.controller;


import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.amazonaws.services.amplify.model.BadRequestException;
import com.example.PIequipo1.dto.RolDTO;
import com.example.PIequipo1.dto.UsuarioDTO;
import com.example.PIequipo1.entity.Usuario;
import com.example.PIequipo1.exception.MailSenderException;
import com.example.PIequipo1.repository.UsuarioRepository;
import com.example.PIequipo1.service.MailService;
import com.example.PIequipo1.service.RolService;
import com.example.PIequipo1.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {
//    @Value("${frontend.url}")
    @Autowired
    private final UsuarioService usuarioService;

    private final UsuarioRepository usuarioRepository;

    private final MailService mailService;

    private final RolService rolService;

//agregue al constructor mailservice, rm
    @Autowired
    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository, MailService mailService, RolService rolService) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.mailService = mailService;
        this.rolService = rolService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioDTO> guardarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws Exception {
        // Almacenamos el usuario
        UsuarioDTO usuarioGuardado = usuarioService.guardarUsuario(usuarioDTO);

        // Enviamos el correo de validación de cuenta
        mailService.enviarCorreoValidacion(usuarioGuardado);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuario(@PathVariable Long id) throws ResourceNotFoundException {

        Optional<UsuarioDTO> usuarioBuscado = usuarioService.buscarUsuario(id);
        if (usuarioBuscado.isEmpty()) {

            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }

        return ResponseEntity.status(HttpStatus.OK).body(usuarioBuscado.get());
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {

        List<UsuarioDTO> usuarios = usuarioService.buscarTodosUsuarios();

        return ResponseEntity.ok(usuarios);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok("Se eliminó el usuario con id: " + id);
    }

    @GetMapping("/detalle")
    public ResponseEntity<UsuarioDTO> user() throws Exception {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UsuarioDTO usuario = new UsuarioDTO();
        RolDTO rolDTO = new RolDTO();
        usuario.setEmail(userDetails.getUsername());

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmail(userDetails.getUsername());
        if (usuarioEncontrado.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el usuario con email: " + userDetails.getUsername());
        }

        usuario.setId(usuarioEncontrado.get().getId());
        usuario.setNombre(usuarioEncontrado.get().getNombre());
        usuario.setApellido(usuarioEncontrado.get().getApellido());
        usuario.setRol(usuarioEncontrado.get().getUsuarioRol().getRol());
        usuario.setValidacion(usuarioEncontrado.get().getValidacion());
        rolDTO = rolService.buscarRol(usuarioEncontrado.get().getUsuarioRol().getId()).get();
        usuario.setAtribuciones(rolDTO.getAutorizacion());

        return ResponseEntity.status(HttpStatus.OK).body(usuario);
    }

    /**
     * Válida la cuenta de un usuario
     * @param id id del usuario
     * @return ResponseEntity con el mensaje de éxito
     */

    /*
    @GetMapping("/validar/{id}")
    public ResponseEntity<String> validarCuenta(@PathVariable Long id) throws Exception {
        // Checamos si existe el usuario
        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        if (usuario.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }

        // Checamos si la cuenta ya está validada
        if (usuario.get().getValidacion() != null && usuario.get().getValidacion()) {
            throw new BadRequestException("La cuenta ya está validada");
        }

        // Actualizamos el campo de validación de la cuenta en la base de datos
        UsuarioDTO usuarioDTO = usuario.get();
        usuarioDTO.setValidacion(true);
        usuarioDTO = usuarioService.actualizarUsuario(usuarioDTO);

        // Enviamos correo de bienvenida
        mailService.enviarCorreoBienvenida(usuarioDTO);


      return ResponseEntity.ok("Se validó la cuenta del usuario con id: " + id);
    }
    */


    @GetMapping("/validar/{id}")
    public ResponseEntity<String> validarCuenta(@PathVariable Long id) throws Exception {
        // Checamos si existe el usuario
        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        if (usuario.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }

        // Checamos si la cuenta ya está validada
        if (usuario.get().getValidacion() != null && usuario.get().getValidacion()) {
            return ResponseEntity.badRequest().body("La cuenta ya está validada");
        }

        // Actualizamos el campo de validación de la cuenta en la base de datos
        UsuarioDTO usuarioDTO = usuario.get();
        usuarioDTO.setValidacion(true);
        usuarioDTO = usuarioService.actualizarUsuario(usuarioDTO);

        // Enviamos correo de bienvenida
        mailService.enviarCorreoBienvenida(usuarioDTO);

        return ResponseEntity.ok("Se validó la cuenta del usuario con id: " + id);
    }








    /**
     * Actualizar un usuario
     * @param id id del usuario
     * @return ResponseEntity con el usuarioDTO
     */
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<UsuarioDTO> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) throws Exception {
        // Checamos si existe el usuario
        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        //Traer datos que no se envían desde el formulario de actualizar
        usuarioDTO.setContrasenia(usuario.get().getContrasenia());
        usuarioDTO.setValidacion(usuario.get().getValidacion());
        if (usuario.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }

        return ResponseEntity.ok(usuarioService.actualizarUsuario(usuarioDTO));
    }

    /**
     * Maneja la excepción SQLException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de SQLException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLException(SQLException exc) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exc.getMessage());
    }

    /**
     * Maneja la excepción ResourceNotFoundException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de ResourceNotFoundException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException exc) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exc.getMessage());
    }

    /**
     * Maneja la excepción MailSenderException y retorna un ResponseEntity con el mensaje de error
     * @param exc Mensaje de la excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(MailSenderException.class)
    public ResponseEntity<String> handleMailSenderException(String exc) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(exc);
    }

    /**
     * Maneja la excepción IOException y retorna un ResponseEntity con el mensaje de error
     * @param exc Mensaje de la excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(String exc) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exc);
    }
}



