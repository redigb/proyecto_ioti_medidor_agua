package com.back_medidor_agua.rd_version.service.medicion;

import com.back_medidor_agua.rd_version.entity.Medicion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IMedicionService {

    Medicion save(Medicion medicion);

    Optional<Medicion> findById(String id);

    Page<Medicion> findAll(Pageable pageable);

    List<Medicion> findByDispositivoId(String dispositivoId);

    void deleteById(String id);

}
