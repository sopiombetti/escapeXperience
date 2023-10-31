package com.example.PIequipo1.repository;


import com.example.PIequipo1.entity.Atribucion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface AtribucionRepository extends JpaRepository<Atribucion, Long> {

     Optional<Atribucion> findByNombre(String nombre);



}
