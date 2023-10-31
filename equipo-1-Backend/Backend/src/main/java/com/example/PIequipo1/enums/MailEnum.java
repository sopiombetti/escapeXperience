package com.example.PIequipo1.enums;

public enum MailEnum {
    VALIDACION_CUENTA("Validación de cuenta"),
    BIENVENIDA("Bienvenido a la aplicación"),
    RESERVA("Reserva realizada");



    private final String asunto;

    MailEnum(String asunto) {
        this.asunto = asunto;
    }

    @Override
    public String toString() {
        return this.asunto;
    }
}
