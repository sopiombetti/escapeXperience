package com.example.PIequipo1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="localizaciones")
public class Localizacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String direccion;
    @Column
    private String ciudad;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "pais_id",referencedColumnName = "id")
    private Pais pais;

    public Localizacion(Long id, String direccion, String ciudad, Pais pais) {
        this.id = id;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
    }

    public Localizacion(String direccion, String ciudad, Pais pais) {
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
    }

    public Localizacion() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public Pais getPais() {
        return pais;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }


}

