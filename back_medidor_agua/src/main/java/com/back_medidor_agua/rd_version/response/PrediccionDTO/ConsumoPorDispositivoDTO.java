package com.back_medidor_agua.rd_version.response.PrediccionDTO;

import java.util.List;

public record ConsumoPorDispositivoDTO(
        String dispositivoId,
        List<ConsumoDiarioDto> ultimosConsumos,
        ResumenEstadisticoDTO estadisticas,
        PrediccionDTO prediccion) {
}
