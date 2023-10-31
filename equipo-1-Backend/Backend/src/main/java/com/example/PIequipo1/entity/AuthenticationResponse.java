package com.example.PIequipo1.entity;


public class AuthenticationResponse {


    private final String jwt;
    private final Long id;
    private String nombre;
    private String apellido;
    private final String email;
    private UsuarioRol usuarioRol;


    public AuthenticationResponse(String jwt, Long id, String nombre, String apellido, String email, UsuarioRol usuarioRol) {
        this.jwt = jwt;
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.usuarioRol = usuarioRol;
    }

    public String getJwt() {
        return jwt;
    }

    public Long getId() {
        return id;
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

    public String getEmail() {
        return email;
    }

    public UsuarioRol getUsuarioRol() {
        return usuarioRol;
    }

    public void setUsuarioRol(UsuarioRol usuarioRol) {
        this.usuarioRol = usuarioRol;
    }
}

