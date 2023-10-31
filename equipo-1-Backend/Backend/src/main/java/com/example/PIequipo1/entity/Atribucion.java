package com.example.PIequipo1.entity;


import javax.persistence.*;

@Entity
@Table(name = "atribuciones")
public class Atribucion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;

    public Atribucion(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Atribucion(String nombre) {
        this.nombre = nombre;
    }

    public Atribucion() {

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

    @Override
    public String toString() {
        return "Atribucion{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
