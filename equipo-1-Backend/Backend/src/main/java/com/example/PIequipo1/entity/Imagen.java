package com.example.PIequipo1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="imagenes")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aventura_id")
    @JsonIgnore
    private Aventura aventura;

    public Imagen(String url, Aventura aventura) {
        this.url = url;
        this.aventura = aventura;
    }

    public Imagen() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Aventura getAventura() {
        return aventura;
    }

    public void setAventura(Aventura aventura) {
        this.aventura = aventura;
    }
}
