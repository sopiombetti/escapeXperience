package com.example.PIequipo1.dto;

import java.util.List;

public class UsuarioDTO {

    private Long id;
    private String nombre;
    private String apellido;
    private String contrasenia;
    private String email;
    private Boolean validacion;
    private List<String> atribuciones;
    private String rol;

    public UsuarioDTO(String nombre, String apellido, String contrasenia, String email, Boolean validacion, List<String> atribuciones, String rol) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
        this.email = email;
        this.validacion = validacion;
        this.atribuciones = atribuciones;
        this.rol = rol;
    }

    public UsuarioDTO() {

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

    public List<String> getAtribuciones() {
        return atribuciones;
    }

    public void setAtribuciones(List<String> atribuciones) {
        this.atribuciones = atribuciones;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "UsuarioDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                ", email='" + email + '\'' +
                ", validacion=" + validacion +
                ", atribuciones=" + atribuciones +
                ", rol='" + rol + '\'' +
                '}';
    }
}
