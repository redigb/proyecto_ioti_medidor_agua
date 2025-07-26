package com.back_medidor_agua.rd_version.service.medicion;

import com.back_medidor_agua.rd_version.entity.Medicion;

import java.util.List;
import java.util.Optional;

public interface IMedicionService {

    Medicion save(Medicion medicion);

    Optional<Medicion> findById(String id);

    List<Medicion> findAll();

    List<Medicion> findByDispositivoId(String dispositivoId);

    void deleteById(String id);

}
