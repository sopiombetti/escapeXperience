package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Localizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalizacionRepository extends JpaRepository<Localizacion,Long> {
}
