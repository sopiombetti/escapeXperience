package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.Aventura;
import com.example.PIequipo1.entity.Localizacion;
import com.example.PIequipo1.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva,Long> {
    static List<Reserva> findById() {
        return null;
    }


    @Query(value = "SELECT * FROM reservas WHERE usuario_id = ?1", nativeQuery = true)
    List<Reserva> findByUsuarioId(Long id);

}
