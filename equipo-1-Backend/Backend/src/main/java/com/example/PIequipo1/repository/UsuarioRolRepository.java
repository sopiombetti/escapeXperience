package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.UsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRolRepository extends JpaRepository<UsuarioRol,Long> {
    Optional<UsuarioRol> findByRol(String rol);

}
