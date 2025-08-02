package com.back_medidor_agua.rd_version.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDispositivoRequest {
    private String nombre;
    private String codigo;
    private String ubicacion;
}
