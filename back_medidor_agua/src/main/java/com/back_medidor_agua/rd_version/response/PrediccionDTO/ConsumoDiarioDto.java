package com.back_medidor_agua.rd_version.response.PrediccionDTO;

import java.time.LocalDate;

public record ConsumoDiarioDto(
        String id,
        String dispositivoId,
        LocalDate fecha,
        double consumoTotal,
        boolean exceso
) {
}
