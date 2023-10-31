package com.example.PIequipo1.dto;

public class PoliticaDTO {

    private String titulo;
    private String descripcion;

    public PoliticaDTO(String titulo, String descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public PoliticaDTO() {

    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public String toString() {
        return
                "titulo:'" + titulo + '\'' +
                "; descripcion:'" + descripcion + '\'';
    }
}
