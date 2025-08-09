package com.back_medidor_agua.rd_version.service.consumoDiario;

import com.back_medidor_agua.rd_version.entity.ConsumoDiario;
import com.back_medidor_agua.rd_version.response.PrediccionDTO.ConsumoPorDispositivoDTO;

import java.util.List;
import java.util.Optional;

public interface IConsumoDiarioService {

    ConsumoDiario save(ConsumoDiario consumo);

    ConsumoPorDispositivoDTO obtenerResumenDispositivo(String dispositivoId);

    Optional<ConsumoDiario> findById(String id);

    List<ConsumoDiario> findAll();

    List<ConsumoDiario> findByDispositivoId(String dispositivoId);

    void deleteById(String id);

}
