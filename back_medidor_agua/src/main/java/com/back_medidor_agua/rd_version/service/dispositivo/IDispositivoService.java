package com.back_medidor_agua.rd_version.service.dispositivo;

import com.back_medidor_agua.rd_version.entity.Dispositivo;
import com.back_medidor_agua.rd_version.request.UpdateDispositivoRequest;

import java.util.List;
import java.util.Optional;

public interface IDispositivoService {

    Dispositivo save(Dispositivo dispositivo);

    Optional<Dispositivo> findById(String id);

    List<Dispositivo> findAll();

    Dispositivo update(String id, UpdateDispositivoRequest dispositivo);

    void deleteById(String id);
}
