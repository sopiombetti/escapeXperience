package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Aventura;

import com.example.PIequipo1.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AventuraRepository extends JpaRepository<Aventura,Long> {

    Optional<Aventura> findByNombre(String nombre);
  //  List<Aventura> findByNombreContaining(String palabraClave);
    List<Aventura> findByNombreContainingOrDescripcionContaining(String palabraClave, String palabraClave2);
    //Optional<Aventura> findByEmail(String email);
    List<Aventura> findByFechaInicio(LocalDate fechaInicio);

    List<Aventura> findByCategoria(Categoria categoria);
}
