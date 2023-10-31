package com.example.PIequipo1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="aventuras")
public class Aventura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true) // Esto asegura que el nombre sea único
    private String nombre;

    @Lob
    @Column(length = 1500)
    private String descripcion;

    @Column
    private String operador;

    @Column
    private Double precio;
    @Column
    private  String ubicacion;
    @Column
    private LocalDate fechaInicio;

    @ManyToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    private Categoria categoria;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "aventura_caracteristica",
            joinColumns = @JoinColumn(name = "aventura_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id")
    )
    private Set<Caracteristica> caracteristicas = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "aventura_id")
    @JsonManagedReference
    private Set<Puntuacion> puntuaciones;


    @Column(name = "promedio_puntuacion")
    private double promedioPuntuacion;

    @Column(name = "cantidad_Puntuaciones")
    private int cantidadPuntuaciones;

    @OneToMany(mappedBy = "aventura", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private Set<Imagen> imagenes = new HashSet<>();

    public double calculoPromedioCalificacion() {
        if (puntuaciones.isEmpty()) {
            return 0.0;
        }
        int totalPuntuaciones = puntuaciones.size();
        int sumaPuntuaciones = 0;
        for (Puntuacion puntuacion : puntuaciones) {
            sumaPuntuaciones += puntuacion.getPuntuacion();
        }
        double promedio = (double) sumaPuntuaciones / totalPuntuaciones;
        return Math.round(promedio * 10.0) / 10.0;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "aventura_politica",
            joinColumns = @JoinColumn(name = "aventura_id"),
            inverseJoinColumns = @JoinColumn(name = "politica_id")
    )
    private List<Politica> politicas = new ArrayList<>();


    public Aventura() {
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getOperador() {
        return operador;
    }

    public void setOperador(String operador) {
        this.operador = operador;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Set<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(Set<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public Set<Puntuacion> getPuntuaciones() {
        return puntuaciones;
    }

    public void setPuntuaciones(Set<Puntuacion> puntuaciones) {
        this.puntuaciones = puntuaciones;
    }

    public double getPromedioPuntuacion() {
        return promedioPuntuacion;
    }


    public void setPromedioPuntuacion(double promedioPuntuacion) {
        this.promedioPuntuacion = promedioPuntuacion;
    }
//    public Calificacion getCalificacion() {
//        return calificacion;
//    }

    public int getCantidadPuntuaciones() {
        return cantidadPuntuaciones;
    }

    public void setCantidadPuntuaciones(int cantidadPuntuaciones) {
        this.cantidadPuntuaciones = cantidadPuntuaciones;
    }

    public Set<Imagen> getImagenes() {
        return imagenes;
    }

    public void setImagenes(Set<Imagen> imagenes) {
        this.imagenes = imagenes;
    }


    public List<Politica> getPoliticas() {
        return politicas;
    }

    public void setPoliticas(List<Politica> politicas) {
        this.politicas = politicas;
    }

    public void addPolitica(Politica politica) {
        this.politicas.add(politica);
    }

    public void addCaracteristica(Caracteristica caracteristica){
        this.caracteristicas.add(caracteristica);
    }
    public void addImagen(Imagen imagen){
        this.imagenes.add(imagen);
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
}

