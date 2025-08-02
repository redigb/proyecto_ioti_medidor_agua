package com.back_medidor_agua.rd_version.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Document("dispositivos")
public class Dispositivo {
    @Id
    private String id;

    private String nombre;
    private String codigo;
    private String ubicacion;

    @Field("esp32_mac")
    private String esp32Mac;
}
