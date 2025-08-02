package com.back_medidor_agua.rd_version.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class TestController {

    @MessageMapping("/test") // Cliente envía a /canal-usuario/test
    @SendTo("/topic/test") // Cliente se suscribe a /canal-interno/test
    public String test(String mensaje) {
        System.out.println("Mensaje recibido por STOMP: " + mensaje);
        return "Eco: " + mensaje;
    }

    @MessageMapping("/medir")
    @SendTo("/topic/mediciones")
    public String enviarMedicion(String mensaje) {
        return "Respuesta: " + mensaje;
    }

}
