package com.back_medidor_agua.rd_version.service.medicion;

import com.back_medidor_agua.rd_version.Exceptions.NotFoundException;
import com.back_medidor_agua.rd_version.entity.Medicion;
import com.back_medidor_agua.rd_version.repository.DispositivoRepository;
import com.back_medidor_agua.rd_version.repository.MedicionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicionService implements IMedicionService{

    private final MedicionRepository repository;
    private final DispositivoRepository dispositivoRepository;

    @Override
    public Medicion save(Medicion medicion) {
        dispositivoRepository.findById(medicion.getDispositivoId())
                .orElseThrow(() -> new NotFoundException("No se encontro el dispositivo: "+ medicion.getDispositivoId()));
        return repository.save(medicion);
    }

    @Override
    public Optional<Medicion> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public Page<Medicion> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }


    @Override
    public List<Medicion> findByDispositivoId(String dispositivoId) {
        return repository.findByDispositivoId(dispositivoId);
    }

    @Override
    public void deleteById(String id) {
        Medicion medicion = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("No se encontro la medicion: "+ id));
        repository.deleteById(medicion.getId());
    }

}
