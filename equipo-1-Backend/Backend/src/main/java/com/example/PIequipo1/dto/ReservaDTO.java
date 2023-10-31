package com.example.PIequipo1.dto;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Politica;
import com.example.PIequipo1.entity.Reserva;
import com.example.PIequipo1.entity.Usuario;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ReservaDTO {


        private Long id;
        private LocalDate fechaReserva;
        private String cantidadPersonas;

        private LocalDate fechaReservaAventura;
        private Long usuarioId;
        private String usuarioNombre;
        private String usuarioApellido;
        private String email;
        private Long aventuraId;

        private LocalDate fechaInicioAventura;
        private String aventuraNombre;

        private String operador;
        private Double precio;

        private String ubicacion;

        private List<Politica> politicas;


    public ReservaDTO(Long id, LocalDate fechaReserva, String cantidadPersonas, LocalDate fechaReservaAventura, Long usuarioId, String usuarioNombre, String usuarioApellido, String email, Long aventuraId, LocalDate fechaInicioAventura, String aventuraNombre, String operador, Double precio, String ubicacion, List<Politica> politicas) {
        this.id = id;
        this.fechaReserva = fechaReserva;
        this.cantidadPersonas = cantidadPersonas;
        this.fechaReservaAventura = fechaReservaAventura;
        this.usuarioId = usuarioId;
        this.usuarioNombre = usuarioNombre;
        this.usuarioApellido = usuarioApellido;
        this.email = email;
        this.aventuraId = aventuraId;
        this.fechaInicioAventura = fechaInicioAventura;
        this.aventuraNombre = aventuraNombre;
        this.operador = operador;
        this.precio = precio;
        this.ubicacion= ubicacion;
        this.politicas = politicas;
    }

    public ReservaDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }

    public String getUsuarioApellido() {
        return usuarioApellido;
    }

    public void setUsuarioApellido(String usuarioApellido) {
        this.usuarioApellido = usuarioApellido;
    }

    public Long getAventuraId() {
        return aventuraId;
    }

    public void setAventuraId(Long aventuraId) {
        this.aventuraId = aventuraId;
    }

    public String getAventuraNombre() {
        return aventuraNombre;
    }

    public void setAventuraNombre(String aventuraNombre) {
        this.aventuraNombre = aventuraNombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public LocalDate getFechaInicioAventura() {
        return fechaInicioAventura;
    }

    public void setFechaInicioAventura(LocalDate fechaInicioAventura) {
        this.fechaInicioAventura = fechaInicioAventura;
    }

    public List<Politica> getPoliticas() {
        return politicas;
    }

    public void setPoliticas(List<Politica> politicas) {
        this.politicas = politicas;
    }

    public LocalDate getFechaReservaAventura() {
        return fechaReservaAventura;
    }

    public void setFechaReservaAventura(LocalDate fechaReservaAventura) {
        this.fechaReservaAventura = fechaReservaAventura;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public static ReservaDTO convertirDesdeReserva(Reserva reserva) {
        ReservaDTO reservaDTO = new ReservaDTO();
        reservaDTO.setId(reserva.getId());

        // Convierte la fecha de reserva a LocalDate
        LocalDate fechaReserva = reserva.getFechaReserva();
        reservaDTO.setFechaReserva(fechaReserva);
        reservaDTO.setCantidadPersonas(reserva.getCantidadPersonas());
        reservaDTO.setFechaReservaAventura(reserva.getFechaReservaAventura());

        // Convierte el objeto Usuario a los campos requeridos
        Usuario usuario = reserva.getUsuario();
        if (usuario != null) {
            reservaDTO.setUsuarioId(usuario.getId());
            reservaDTO.setUsuarioNombre(usuario.getNombre());
            reservaDTO.setUsuarioApellido(usuario.getApellido());
            reservaDTO.setEmail(usuario.getEmail());
        }

        // Convierte el objeto Aventura a los campos requeridos
        Aventura aventura = reserva.getAventura();
        if (aventura != null) {
            reservaDTO.setAventuraId(aventura.getId());
            reservaDTO.setAventuraNombre(aventura.getNombre());
            reservaDTO.setOperador(aventura.getOperador());
            reservaDTO.setPrecio(aventura.getPrecio());
            reservaDTO.setUbicacion(aventura.getUbicacion());
            reservaDTO.setFechaInicioAventura(aventura.getFechaInicio());

        }
        // Asigna las políticas asociadas a la aventura

        if (aventura != null) {
            reservaDTO.setPoliticas(aventura.getPoliticas());
        }



        return reservaDTO;
    }


}

