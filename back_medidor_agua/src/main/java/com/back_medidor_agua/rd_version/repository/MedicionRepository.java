package com.back_medidor_agua.rd_version.repository;

import com.back_medidor_agua.rd_version.entity.Medicion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MedicionRepository extends MongoRepository<Medicion, String> {

    List<Medicion> findByDispositivoId(String dispositivoId);

}
