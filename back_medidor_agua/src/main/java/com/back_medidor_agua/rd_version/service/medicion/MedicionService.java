package com.back_medidor_agua.rd_version.service.medicion;

import com.back_medidor_agua.rd_version.entity.Medicion;
import com.back_medidor_agua.rd_version.repository.MedicionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicionService implements IMedicionService{

    @Autowired
    private MedicionRepository repository;

    @Override
    public Medicion save(Medicion medicion) {
        return repository.save(medicion);
    }

    @Override
    public Optional<Medicion> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public List<Medicion> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Medicion> findByDispositivoId(String dispositivoId) {
        return repository.findByDispositivoId(dispositivoId);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

}
