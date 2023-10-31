package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica,Long> {

    Optional<Caracteristica> findByNombre(String nombre);
}
