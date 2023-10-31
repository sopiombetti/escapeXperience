package com.example.PIequipo1.dto;

import com.example.PIequipo1.entity.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


public class AventuraDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private String operador;
    private Double precio;

    private String ubicacion;
    private LocalDate fechaInicio;
    private Long categoria_id;
    private Set<Long> caracteristicas_id = new HashSet<>();
    private Set<Puntuacion> puntuaciones;
    private double promedioPuntuacion;
    private Integer cantidadPuntuaciones;
    private Set<String> imagenes = new HashSet<>();

    private List<Long> politicas_id = new ArrayList<>();


    public AventuraDTO() {
    }

    public AventuraDTO(String nombre, String descripcion, String operador, Double precio, String ubicacion, LocalDate fechaInicio, Long categoria_id, Set<Long> caracteristicas_id, Set<Puntuacion> puntuaciones, double promedioPuntuacion, Integer cantidadPuntuaciones, Set<String> imagenes, List<Long> politicas_id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.operador = operador;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.fechaInicio = fechaInicio;
        this.categoria_id = categoria_id;
        this.caracteristicas_id = caracteristicas_id;
        this.puntuaciones = puntuaciones;
        this.promedioPuntuacion = promedioPuntuacion;
        this.cantidadPuntuaciones = cantidadPuntuaciones;
        this.imagenes = imagenes;
        this.politicas_id = politicas_id;
    }

    public AventuraDTO(Long id, String nombre, String descripcion, String operador, Double precio, String ubicacion, LocalDate fechaInicio, Long categoria_id, Set<Long> caracteristicas_id, Set<Puntuacion> puntuaciones, double promedioPuntuacion, Integer cantidadPuntuaciones, Set<String> imagenes, List<Long> politicas_id) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.operador = operador;
        this.precio = precio;
        this.ubicacion= ubicacion;
        this.fechaInicio = fechaInicio;
        this.categoria_id = categoria_id;
        this.caracteristicas_id = caracteristicas_id;
        this.puntuaciones = puntuaciones;
        this.promedioPuntuacion = promedioPuntuacion;
        this.cantidadPuntuaciones = cantidadPuntuaciones;
        this.imagenes = imagenes;
        this.politicas_id = politicas_id;
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

    public Long getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Long categoria_id) {
        this.categoria_id = categoria_id;
    }

    public Set<Long> getCaracteristicas_id() {
        return caracteristicas_id;
    }

    public void setCaracteristicas_id(Set<Long> caracteristicas_id) {
        this.caracteristicas_id = caracteristicas_id;
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

    public Integer getCantidadPuntuaciones() {
        return cantidadPuntuaciones;
    }

    public void setCantidadPuntuaciones(Integer cantidadPuntuaciones) {
        this.cantidadPuntuaciones = cantidadPuntuaciones;
    }

    public Set<String> getImagenes() {
        return imagenes;
    }

    public void setImagenes(Set<String> imagenes) {
        this.imagenes = imagenes;
    }

    public List<Long> getPoliticas_id() {
        return politicas_id;
    }

    public void setPoliticas_id(List<Long> politicas_id) {
        this.politicas_id = politicas_id;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
}
