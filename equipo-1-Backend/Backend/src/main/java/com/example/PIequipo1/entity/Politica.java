package com.example.PIequipo1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="politicas")
public class Politica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true) // Esto asegura que el titulo sea único
    private String titulo;
    @Lob
    @Column(length = 1500)
    private String descripcion;

    @ManyToMany(mappedBy = "politicas")
    @JsonIgnore
    private Set<Aventura> aventuras = new HashSet<>();


    public Politica(Long id, String titulo, String descripcion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public Politica(String titulo, String descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public Politica() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Aventura> getAventuras() {
        return aventuras;
    }

    public void setAventuras(Set<Aventura> aventuras) {
        this.aventuras = aventuras;
    }

    @Override
    public String toString() {
        return
                "titulo: " + titulo + '\'' +
                "; descripcion: " + descripcion + '\'';
    }
}
