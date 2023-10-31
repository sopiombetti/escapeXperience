package com.example.PIequipo1.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestRoles {

    @GetMapping("/accesUser")

    public String accesUser(){
        return "Eres un user";
    }

    @GetMapping("/accesAdmin")

    public String accesAdmin(){
        return "Eres un admin";
    }

    @GetMapping("/accesSuperAdmin")

    public String accesSuperAdmin(){
        return "Eres un SuperAdmin";
    }

}
