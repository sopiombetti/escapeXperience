package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Imagen;
import com.example.PIequipo1.entity.Localizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen,Long> {
}
