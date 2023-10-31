package com.example.PIequipo1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name="caracteristicas")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;

    @Column
    private String icono;

    @ManyToMany(mappedBy = "caracteristicas")
    private Set<Aventura> aventuras = new HashSet<>();



    public Caracteristica(String nombre, String icono) {
        this.nombre = nombre;
        this.icono = icono;
    }

    public Caracteristica() {
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

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }

  /*  public Set<Aventura> getAventuras() {
        return aventuras;
    }

    public void setAventuras(Set<Aventura> aventuras) {
        this.aventuras = aventuras;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

   */
}
