package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Usuario;
import com.example.PIequipo1.entity.UsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findById(Long id);

}