package com.example.PIequipo1.controller;

import com.example.PIequipo1.entity.AuthenticationRequest;
import com.example.PIequipo1.entity.AuthenticationResponse;
import com.example.PIequipo1.entity.TokenBlackList;
import com.example.PIequipo1.entity.Usuario;
import com.example.PIequipo1.repository.TokenBlackListRepository;
import com.example.PIequipo1.security.jwt.JwtUtil;
import com.example.PIequipo1.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@CrossOrigin(origins = "*")
@RestController
public class AuthenticacionController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private TokenBlackListRepository tokenBlackListRepository;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Datos de inicio de sesión incorrectos");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        Usuario usuario = (Usuario) userDetails;
        AuthenticationResponse response = new AuthenticationResponse(jwt, usuario.getId(), usuario.getNombre(),usuario.getApellido(), usuario.getEmail(), usuario.getUsuarioRol());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cerrarSesion")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }

        // Invalidar el token actual y guardarlo en la lista negra
        String jwt = extractJwtFromRequest(request);
        if (jwt != null) {
            // Verificar si el token ya expiró
            if (!jwtUtil.isTokenExpired(jwt)) {
                // Registrar el token en la lista negra
                TokenBlackList tokenBlackList = new TokenBlackList();
                tokenBlackList.setToken(jwt);
                tokenBlackList.setExpirationDate(jwtUtil.extractExpiration(jwt));
                if (tokenBlackListRepository != null) {
                    tokenBlackListRepository.save(tokenBlackList);
                } else {
                    // Manejo de error si tokenBlackListRepository es nulo
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Error interno del servidor al guardar el token en la lista negra.");
                }
            }
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body("Cierre de sesión exitoso");
    }

    // Método para extraer el token JWT del encabezado de la solicitud
    private String extractJwtFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }


}
