package com.example.PIequipo1.service;


import com.example.PIequipo1.dto.ReservaDTO;
import com.example.PIequipo1.dto.UsuarioDTO;
import com.example.PIequipo1.enums.MailEnum;
import com.example.PIequipo1.exception.MailSenderException;
import com.example.PIequipo1.utils.MailUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.logging.Logger;


@Component
@EnableAsync
public class MailService {
    @Autowired
    private JavaMailSender emailSender;

    private final static Logger logger = Logger.getLogger(MailService.class.getName());

    @Value("${spring.mail.username}")
    private String username;

    @Value("${frontend.url}")
    private String frontendUrl;


    private final MailUtils mailUtils = new MailUtils();



    @Async
    public void sendMail(String to, String subject, String body) throws MailSenderException {
        logger.info("Begin sendMail");
        try {
            MimeMessage message = emailSender.createMimeMessage();
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setFrom(new InternetAddress(username));
            message.setSubject(subject);
            message.setContent(body, "text/html");
            emailSender.send(message);
        } catch (Exception e) {
            logger.warning(e.getMessage());
            throw new MailSenderException(e.getMessage());
        } finally {
            logger.info("End sendMail");
        }
    }


    @Async
    public void enviarCorreoValidacion(UsuarioDTO usuarioDTO) throws Exception {
        String url = frontendUrl + "usuario/validar/" + usuarioDTO.getId();
        String body = mailUtils.correoValidacion(url, usuarioDTO.getNombre() + " " + usuarioDTO.getApellido());
        sendMail(usuarioDTO.getEmail(), MailEnum.VALIDACION_CUENTA.toString(), body);
    }
    @Async
    public void enviarCorreoBienvenida(UsuarioDTO usuarioDTO) throws Exception {
        String body = mailUtils.correoBienvenida(usuarioDTO.getNombre() + " " + usuarioDTO.getApellido());
        sendMail(usuarioDTO.getEmail(), MailEnum.BIENVENIDA.toString(), body);
    }


    @Async
    public void enviarCorreoReserva(String email, ReservaDTO reserva) throws Exception {
        String body = mailUtils.correoReserva(reserva);
        sendMail(email, MailEnum.RESERVA.toString(), body);
    }







}

