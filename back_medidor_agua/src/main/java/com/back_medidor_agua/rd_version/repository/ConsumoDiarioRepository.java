package com.back_medidor_agua.rd_version.repository;

import com.back_medidor_agua.rd_version.entity.ConsumoDiario;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ConsumoDiarioRepository extends MongoRepository<ConsumoDiario, String> {

    List<ConsumoDiario> findByDispositivoId(String dispositivoId);
}