package com.example.PIequipo1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="usuarios")
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;
    @Column
    private String apellido;
    @Column
    private String contrasenia;
    @Column
    private String email;
    @Column
    private Boolean validacion;

    @ManyToOne
    @JoinColumn(name = "rol_id" ,referencedColumnName = "id")
    private UsuarioRol usuarioRol;


    public Usuario(Long id, String nombre, String apellido, String contrasenia, String email, Boolean validacion, UsuarioRol usuarioRol) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
        this.email = email;
        this.validacion = validacion;
        this.usuarioRol = usuarioRol;
    }

    public Usuario(String nombre, String apellido, String contrasenia, String email, Boolean validacion, UsuarioRol usuarioRol) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
        this.email = email;
        this.validacion = validacion;
        this.usuarioRol = usuarioRol;
    }

    public Usuario() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getValidacion() {
        return validacion;
    }

    public void setValidacion(Boolean validacion) {
        this.validacion = validacion;
    }

    public UsuarioRol getUsuarioRol() {
        return usuarioRol;
    }

    public void setUsuarioRol(UsuarioRol usuarioRol) {
        this.usuarioRol = usuarioRol;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority grantedAuthority= new SimpleGrantedAuthority(usuarioRol.getRol());
        return Collections.singletonList(grantedAuthority);
    }

    @Override
    public String getPassword() {
        return contrasenia;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                ", email='" + email + '\'' +
                ", validacion=" + validacion +
                ", usuarioRol=" + usuarioRol +
                '}';
    }
}
