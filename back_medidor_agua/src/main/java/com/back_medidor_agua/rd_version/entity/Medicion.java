package com.back_medidor_agua.rd_version.entity;

import com.back_medidor_agua.rd_version.ValueObject.Niveles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Document("mediciones")
public class Medicion {
    @Id
    private String id;

    private String dispositivoId;
    private Double distancia;
    private Double volumen;
    private Niveles nivel;
    private LocalDateTime fechaHora;
}