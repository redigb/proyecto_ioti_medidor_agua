package com.back_medidor_agua.rd_version.repository;

import com.back_medidor_agua.rd_version.entity.Medicion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MedicionRepository extends MongoRepository<Medicion, String> {

    Page<Medicion> findAll(Pageable pageable);

    List<Medicion> findAllByOrderByFechaHoraDesc();

    List<Medicion> findByDispositivoId(String dispositivoId);

    List<Medicion> findByFechaHoraBetween(LocalDateTime inicio, LocalDateTime fin);

    void deleteByDispositivoId(String id);

}
