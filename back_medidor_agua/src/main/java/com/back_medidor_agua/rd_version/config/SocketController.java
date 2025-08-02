package com.back_medidor_agua.rd_version.config;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @MessageMapping("/saludo") // Cliente envía a /app/saludo
    @SendTo("/topic/saludos")  // Backend reenvía a /topic/saludos
    public String enviarSaludo(String nombre) {
        return "Hola desde el servidor, " + nombre + "!";
    }
}
