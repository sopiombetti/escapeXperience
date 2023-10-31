package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Politica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PoliticaRepository extends JpaRepository<Politica,Long> {

    Optional<Politica> findByTitulo(String titulo);

}
