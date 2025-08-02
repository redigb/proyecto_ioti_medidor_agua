package com.back_medidor_agua.rd_version.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Document("consumos")
public class ConsumoDiario {

    @Id
    private String id;

    private String dispositivoId; // --> referencia al _id del dispositivo

    private LocalDate fecha;
    private Double consumoTotal;
    private Boolean exceso;

}