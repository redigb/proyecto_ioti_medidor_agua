package com.back_medidor_agua.rd_version.response.PrediccionDTO;

import java.time.LocalDate;

public record PrediccionDTO(LocalDate fecha,
                            double valor) {
}
