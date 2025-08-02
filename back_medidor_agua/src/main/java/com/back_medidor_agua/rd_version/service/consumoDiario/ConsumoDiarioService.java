package com.back_medidor_agua.rd_version.service.consumoDiario;

import com.back_medidor_agua.rd_version.Exceptions.NotFoundException;
import com.back_medidor_agua.rd_version.entity.ConsumoDiario;
import com.back_medidor_agua.rd_version.entity.Medicion;
import com.back_medidor_agua.rd_version.repository.ConsumoDiarioRepository;
import com.back_medidor_agua.rd_version.repository.MedicionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsumoDiarioService implements IConsumoDiarioService{

    private final ConsumoDiarioRepository repository;
    private final MedicionRepository medicionRepository;

    @Override
    public ConsumoDiario save(ConsumoDiario consumo) {
        return repository.save(consumo);
    }

    // Ejecuacion :  "0 10 0 * * ?" -> cada día a las 00:10 AM
    // @Scheduled(cron = "0 10 0 * * ?")
   // @Scheduled(cron = "0 * * * * ?") // cada minuto
    @Scheduled(cron = "0 */5 * * * ?") // -> cada 5 minutos
    public void calcularConsumoDiario() {
        LocalDate hoy = LocalDate.now(); // o ayer si lo deseas
        LocalDateTime inicio = hoy.atStartOfDay();
        LocalDateTime fin = hoy.plusDays(1).atStartOfDay();

        List<Medicion> mediciones = medicionRepository.findByFechaHoraBetween(inicio, fin);
        if (mediciones.isEmpty()) {
            System.out.println("⚠️ No se encontraron mediciones para " + hoy);
            return;
        }
        Map<String, List<Medicion>> medicionesPorDispositivo =
                mediciones.stream().collect(Collectors.groupingBy(Medicion::getDispositivoId));
        List<ConsumoDiario> consumosAGuardar = new ArrayList<>();
        for (Map.Entry<String, List<Medicion>> entry : medicionesPorDispositivo.entrySet()) {
            String dispositivoId = entry.getKey();

            // Evitar duplicados
            List<ConsumoDiario> existentes = repository.findAllByDispositivoIdAndFecha(dispositivoId, hoy);
            if (!existentes.isEmpty()) {
                continue; // Ya existe un registro para hoy
            }

            double totalVolumen = entry.getValue().stream()
                    .mapToDouble(m -> m.getVolumen() != null ? m.getVolumen() : 0)
                    .sum();

            boolean exceso = totalVolumen > 100;

            ConsumoDiario consumo = new ConsumoDiario();
            consumo.setDispositivoId(dispositivoId);
            consumo.setFecha(hoy);
            consumo.setConsumoTotal(totalVolumen);
            consumo.setExceso(exceso);

            consumosAGuardar.add(consumo);
        }

        if (!consumosAGuardar.isEmpty()) {
            repository.saveAll(consumosAGuardar);
            System.out.println("✅ Guardados " + consumosAGuardar.size() + " consumos diarios para " + hoy);
        } else {
            System.out.println("ℹ️ No hay nuevos consumos diarios para guardar.");
        }
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
        ConsumoDiario consumoDiario = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("No se encontro el consumo diario: " + id));
        repository.deleteById(consumoDiario.getId());
    }

}
