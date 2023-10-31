package com.example.PIequipo1.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "puntuaciones")
public class Puntuacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "puntuacion")
    private int puntuacion;

    @ManyToOne
    @JoinColumn(name = "aventura_id", referencedColumnName = "id")
    @JsonBackReference
    private Aventura aventura;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @Column(name = "critica")
    private String critica;

    public Puntuacion() {
    }

    public Puntuacion(Long id, int puntuacion, Aventura aventura, Usuario usuario, String critica) {
        this.id = id;
        this.puntuacion = puntuacion;
        this.aventura = aventura;
        this.usuario = usuario;
        this.critica = critica;
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

    public Aventura getAventura() {
        return aventura;
    }

    public void setAventura(Aventura aventura) {
        this.aventura = aventura;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getCritica() {
        return critica;
    }

    public void setCritica(String critica) {
        this.critica = critica;
    }
}
