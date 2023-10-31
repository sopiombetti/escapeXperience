package com.example.PIequipo1.entity;

import lombok.Builder;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="usuario_rol")
public class UsuarioRol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String rol;
    @OneToMany(mappedBy = "usuarioRol")
    private List<Usuario> usuarios;

    @ManyToMany
    @JoinTable(
            name = "rol_atribucion",
            joinColumns = @JoinColumn(name = "rol_id"),
            inverseJoinColumns = @JoinColumn(name = "atribucion_id")
    )
    private List<Atribucion> atribuciones;

     public UsuarioRol(Long id, String rol, List<Usuario> usuarios, List<Atribucion> atribuciones) {
        this.id = id;
        this.rol = rol;
        this.usuarios = usuarios;
        this.atribuciones = atribuciones;
    }

    public UsuarioRol(String rol, List<Usuario> usuarios, List<Atribucion> atribuciones) {
        this.rol = rol;
        this.usuarios = usuarios;
        this.atribuciones = atribuciones;
    }

    public UsuarioRol() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public List<Atribucion> getPermisos() {
        return atribuciones;
    }

    public void setPermisos(List<Atribucion> permisos) {
        this.atribuciones = permisos;
    }

    @Override
    public String toString() {
        return "UsuarioRol{" +
                "id=" + id +
                ", rol='" + rol + '\'' +
                ", usuarios=" + usuarios +
                ", atribuciones=" + atribuciones +
                '}';
    }
}

