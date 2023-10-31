package com.example.PIequipo1.dto;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Categoria;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

public class CaracteristicaDTO {
    private String nombre;
    private String icono;




    public CaracteristicaDTO(String nombre, String icono) {
        this.nombre = nombre;
        this.icono = icono;

    }

    public CaracteristicaDTO() {
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


}

