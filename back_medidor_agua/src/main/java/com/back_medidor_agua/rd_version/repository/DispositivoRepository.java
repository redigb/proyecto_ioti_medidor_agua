package com.back_medidor_agua.rd_version.repository;

import com.back_medidor_agua.rd_version.entity.Dispositivo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DispositivoRepository extends MongoRepository<Dispositivo, String> {

    Optional<Dispositivo> findByNombre(String nombre);

    Optional<Dispositivo> findByEsp32Mac(String esp32Mac);

}
