package com.back_medidor_agua.rd_version.repository;

import com.back_medidor_agua.rd_version.entity.Dispositivo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DispositivoRepository extends MongoRepository<Dispositivo, String> {}
