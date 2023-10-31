package com.example.PIequipo1.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column
    private LocalDate fechaReserva;
    @Column
    private String cantidadPersonas;
    @Column
    private LocalDate fechaReservaAventura;
    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "aventura_id", referencedColumnName = "id")
    private Aventura aventura;


    public Reserva(Long id, String cantidadPersonas, LocalDate fechaReservaAventura, Usuario usuario, Aventura aventura) {
        this.id = id;
        this.fechaReserva = LocalDate.now();
        this.cantidadPersonas = cantidadPersonas;
        this.fechaReservaAventura = fechaReservaAventura;
        this.usuario = usuario;
        this.aventura = aventura;
    }



    public Reserva() {
        this.fechaReserva = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Aventura getAventura() {
        return aventura;
    }

    public void setAventura(Aventura aventura) {
        this.aventura = aventura;
    }

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public String getCantidadPersonas() {
        return cantidadPersonas;
    }

    public void setCantidadPersonas(String cantidadPersonas) {
        this.cantidadPersonas = cantidadPersonas;
    }

    public LocalDate getFechaReservaAventura() {
        return fechaReservaAventura;
    }

    public void setFechaReservaAventura(LocalDate fechaReservaAventura) {
        this.fechaReservaAventura = fechaReservaAventura;
    }
}
