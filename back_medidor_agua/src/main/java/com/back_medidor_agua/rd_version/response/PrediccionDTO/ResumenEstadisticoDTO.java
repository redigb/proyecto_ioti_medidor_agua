package com.back_medidor_agua.rd_version.response.PrediccionDTO;

public record ResumenEstadisticoDTO( double mediana, // en m³
                                     double media,   // en litros
                                     double varianza ) {
}
