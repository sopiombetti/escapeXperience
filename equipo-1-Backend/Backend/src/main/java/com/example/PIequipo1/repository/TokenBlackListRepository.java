package com.example.PIequipo1.repository;

import com.example.PIequipo1.entity.TokenBlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenBlackListRepository extends JpaRepository<TokenBlackList,Long> {

    TokenBlackList findByToken(String token);
}
