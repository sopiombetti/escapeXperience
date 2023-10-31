package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Puntuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuntuacionRepository extends JpaRepository<Puntuacion,Long> {

}
