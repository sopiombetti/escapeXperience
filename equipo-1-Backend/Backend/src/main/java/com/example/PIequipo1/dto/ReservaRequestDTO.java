package com.example.PIequipo1.dto;

import com.example.PIequipo1.entity.Politica;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

public class ReservaRequestDTO {

    private LocalDate fechaReserva; // Asegúrate de que el tipo sea LocalDate
    private LocalDate fechaReservaAventura;
    private String cantidadPersonas;
    private Long usuarioId;
    private Long aventuraId;



    public ReservaRequestDTO() {
        this.fechaReserva = LocalDate.now();
    }

    public ReservaRequestDTO(LocalDate fechaReserva, LocalDate fechaReservaAventura, String cantidadPersonas, Long usuarioId, Long aventuraId) {
        this.fechaReserva = fechaReserva;
        this.fechaReservaAventura = fechaReservaAventura;
        this.cantidadPersonas = cantidadPersonas;
        this.usuarioId = usuarioId;
        this.aventuraId = aventuraId;

    }

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getAventuraId() {
        return aventuraId;
    }

    public void setAventuraId(Long aventuraId) {
        this.aventuraId = aventuraId;
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
