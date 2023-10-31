package com.example.PIequipo1.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public class ImagenPackDTO {

    private List<MultipartFile> imagenes;
    private Long aventura_id;

    public ImagenPackDTO() {
    }

    public ImagenPackDTO(List<MultipartFile> imagenes, Long aventura_id) {
        this.imagenes = imagenes;
        this.aventura_id = aventura_id;
    }

    public List<MultipartFile> getImagenes() {
        return imagenes;
    }

    public void setImagenes(List<MultipartFile> imagenes) {
        this.imagenes = imagenes;
    }

    public Long getAventura_id() {
        return aventura_id;
    }

    public void setAventura_id(Long aventura_id) {
        this.aventura_id = aventura_id;
    }
}
