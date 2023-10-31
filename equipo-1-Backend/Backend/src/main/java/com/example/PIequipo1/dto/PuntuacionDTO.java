package com.example.PIequipo1.dto;

public class PuntuacionDTO {

    private Long id;
    private int puntuacion;
    private Long aventura_id;

    private Long usuario_id;

    private String critica;

    private String nombreUsuario;

    public PuntuacionDTO() {
    }

    public PuntuacionDTO(Long id, int puntuacion, Long aventura_id, Long usuario_id, String critica, String nombreUsuario) {
        this.id = id;
        this.puntuacion = puntuacion;
        this.aventura_id = aventura_id;
        this.usuario_id = usuario_id;
        this.critica = critica;
        this.nombreUsuario = nombreUsuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }

    public Long getAventura_id() {
        return aventura_id;
    }

    public void setAventura_id(Long aventura_id) {
        this.aventura_id = aventura_id;
    }

    public Long getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public String getCritica() {
        return critica;
    }

    public void setCritica(String critica) {
        this.critica = critica;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    @Override
    public String toString() {
        return "PuntuacionDTO{" +
                "id=" + id +
                ", puntuacion=" + puntuacion +
                ", aventura_id=" + aventura_id +
                ", usuario_id=" + usuario_id +
                ", critica='" + critica + '\'' +
                ", nombreUsuario='" + nombreUsuario + '\'' +
                '}';
    }
}
