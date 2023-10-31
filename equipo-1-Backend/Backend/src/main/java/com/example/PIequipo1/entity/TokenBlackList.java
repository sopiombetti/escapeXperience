package com.example.PIequipo1.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="tokenBlackList")
public class TokenBlackList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String token;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;

    public TokenBlackList(Long id, String token, Date expirationDate) {
        this.id = id;
        this.token = token;
        this.expirationDate = expirationDate;
    }

    public TokenBlackList() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }
}
