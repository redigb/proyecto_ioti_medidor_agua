package com.back_medidor_agua.rd_version.service.consumoDiario;

import com.back_medidor_agua.rd_version.entity.ConsumoDiario;
import com.back_medidor_agua.rd_version.repository.ConsumoDiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsumoDiarioService implements IConsumoDiarioService{

    @Autowired
    private ConsumoDiarioRepository repository;

    @Override
    public ConsumoDiario save(ConsumoDiario consumo) {
        return repository.save(consumo);
    }

    @Override
    public Optional<ConsumoDiario> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public List<ConsumoDiario> findAll() {
        return repository.findAll();
    }

    @Override
    public List<ConsumoDiario> findByDispositivoId(String dispositivoId) {
        return repository.findByDispositivoId(dispositivoId);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

}
