package com.back_medidor_agua.rd_version.service.dispositivo;

import com.back_medidor_agua.rd_version.Exceptions.AlreadyExistException;
import com.back_medidor_agua.rd_version.Exceptions.NotFoundException;
import com.back_medidor_agua.rd_version.Exceptions.ResourceNotFoundException;
import com.back_medidor_agua.rd_version.entity.Dispositivo;
import com.back_medidor_agua.rd_version.repository.ConsumoDiarioRepository;
import com.back_medidor_agua.rd_version.repository.DispositivoRepository;
import com.back_medidor_agua.rd_version.repository.MedicionRepository;
import com.back_medidor_agua.rd_version.request.UpdateDispositivoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DispositivoService implements IDispositivoService{

    private final DispositivoRepository repository;

    private final ConsumoDiarioRepository consumoDiarioRepository;

    private final MedicionRepository medicionRepository;

    @Override
    public Dispositivo save(Dispositivo dispositivo) {
        if (repository.findByNombre(dispositivo.getNombre()).isPresent()) {
            throw new AlreadyExistException("Ya existe un dispositivo con ese nombre");
        }
        if (dispositivo.getEsp32Mac() != null &&
                repository.findByEsp32Mac(dispositivo.getEsp32Mac()).isPresent()) {
            throw new AlreadyExistException("Ya existe un dispositivo con esa dirección MAC");
        }
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
    public Dispositivo update(String id, UpdateDispositivoRequest dispositivo) {
        Optional<Dispositivo> dispositivoConMismoNombre = repository.findByNombre(dispositivo.getNombre());
        if (dispositivoConMismoNombre.isPresent() && !dispositivoConMismoNombre.get().getId().equals(id)) {
            throw new AlreadyExistException("Ya existe un dispositivo con ese nombre");
        }
        return repository.findById(id).map(existingDispositivo -> {
            existingDispositivo.setNombre(dispositivo.getNombre());
            existingDispositivo.setCodigo(dispositivo.getCodigo());
            existingDispositivo.setUbicacion(dispositivo.getUbicacion());
            return repository.save(existingDispositivo);
        }).orElseThrow(() -> new NotFoundException("Dispositivo no encontrado"));
    }

    @Override
    public void deleteById(String id) {
        Dispositivo dispositivo = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("No se encuentra el dispositivo"));
        // 1. Eliminar mediciones relacionadas
        medicionRepository.deleteByDispositivoId(id);
        // 2. Eliminar consumos diarios relacionados
        consumoDiarioRepository.deleteByDispositivoId(id);
        repository.deleteById(dispositivo.getId());
    }
}
