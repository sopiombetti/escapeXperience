package com.example.PIequipo1.utils;

import com.example.PIequipo1.dto.ReservaDTO;
import com.example.PIequipo1.entity.Politica;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;


import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MailUtils {
    @Value("http://bucket1escapexperince.s3-website.us-east-2.amazonaws.com")
    private String frontendUrl;

    private final ClassLoader classLoader = getClass().getClassLoader();

    public MailUtils() {
    }



    public String correoValidacion(String url, String user) throws IOException {
        String template = new String(classLoader.getResourceAsStream("Templates/validacion.html").readAllBytes(),
                StandardCharsets.UTF_8);

        Document doc = Jsoup.parse(template, "UTF-8");

        Elements homeLinks = doc.getElementsByClass("home-link");
        homeLinks.attr("href", frontendUrl);

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + user + "!</h2>");

        Element validateLink = doc.getElementById("validate-link");
        if (validateLink == null) {
            throw new IOException("No se ha encontrado el elemento con id validate-link");
        }
        validateLink.attr("href", url);

        return doc.toString();
    }

    public String correoBienvenida(String user) throws IOException {
        String template = new String(classLoader.getResourceAsStream("Templates/bienvenida.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h1 id='main-title'>Hola " + user + "!</h1>");

        return doc.toString();
    }


    public String correoReserva(ReservaDTO reserva) throws Exception {
        String template = new String(classLoader.getResourceAsStream("Templates/reserva.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element aventura = doc.getElementById("aventura");
        aventura.after("<p>" + reserva.getAventuraNombre() + "</p>");

        Element operador = doc.getElementById("operador");
        operador.after("<p>" + reserva.getOperador() + "</p>");

        Element precio = doc.getElementById("precio");
        precio.after("<p>" + reserva.getPrecio() + "</p>");

        Element fechaReserva = doc.getElementById("fechaReserva");
        fechaReserva.after("<p>" + reserva.getFechaReserva() + "</p>");

        Element ubicacion = doc.getElementById("ubicacion");
        ubicacion.after("<p>" + reserva.getUbicacion() + "</p>");

        Element fechaReservaAventura = doc.getElementById("fechaReservaAventura");
        fechaReservaAventura.after("<p>" + reserva.getFechaReservaAventura() + "</p>");


        Element cantidadPersonas = doc.getElementById("cantidadPersonas");
        cantidadPersonas.after("<p>" + reserva.getCantidadPersonas() + "</p>");

        Element fechaInicioAventura = doc.getElementById("fechaInicioAventura");
        fechaInicioAventura.after("<p>" + reserva.getFechaInicioAventura() + "</p>");


        Element usuarioNombre = doc.getElementById("usuarioNombre");
        usuarioNombre.after("<p>" + reserva.getUsuarioNombre() + "</p>");

        Element usuarioApellido = doc.getElementById("usuarioApellido");
        usuarioApellido.after("<p>" + reserva.getUsuarioApellido() + "</p>");

        // Agrega las políticas al HTML
        Element politicasElement = doc.getElementById("politicas");
        if (politicasElement != null) {
            for (Politica politica : reserva.getPoliticas()) {
                politicasElement.after("<p>" + politica.toString() + "</p>");
            }
        }


        return doc.toString();
    }

}
