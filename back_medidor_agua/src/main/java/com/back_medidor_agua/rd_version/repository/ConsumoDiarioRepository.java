package com.back_medidor_agua.rd_version.repository;

import com.back_medidor_agua.rd_version.entity.ConsumoDiario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface ConsumoDiarioRepository extends MongoRepository<ConsumoDiario, String> {

    List<ConsumoDiario> findByDispositivoId(String dispositivoId);

    List<ConsumoDiario> findAllByDispositivoIdAndFecha(String dispositivoId, LocalDate fecha);

    List<ConsumoDiario> findTop10ByDispositivoIdOrderByFechaDesc(String dispositivoId);

    void deleteByDispositivoId(String id);

    boolean existsByDispositivoIdAndFecha(String dispositivoId, LocalDate fecha);


}