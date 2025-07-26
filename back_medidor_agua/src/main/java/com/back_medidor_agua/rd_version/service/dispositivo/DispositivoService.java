package com.back_medidor_agua.rd_version.service.dispositivo;

import com.back_medidor_agua.rd_version.entity.Dispositivo;
import com.back_medidor_agua.rd_version.repository.DispositivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DispositivoService implements IDispositivoService{

    @Autowired
    private DispositivoRepository repository;

    @Override
    public Dispositivo save(Dispositivo dispositivo) {
        return repository.save(dispositivo);
    }

    @Override
    public Optional<Dispositivo> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public List<Dispositivo> findAll() {
        return repository.findAll();
    }

    @Override
    public Dispositivo update(String id, Dispositivo dispositivo) {
        dispositivo.setId(id);
        return repository.save(dispositivo);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }
}
