package com.example.PIequipo1.dto;

import java.util.List;

public class RolDTO {

    private Long id;
    private String rol;
    private List<String> autorizacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public List<String> getAutorizacion() {
        return autorizacion;
    }

    public void setAutorizacion(List<String> autorizacion) {
        this.autorizacion = autorizacion;
    }

    @Override
    public String toString() {
        return "RolDTO{" +
                "id=" + id +
                ", rol='" + rol + '\'' +
                ", autorizacion=" + autorizacion +
                '}';
    }
}

