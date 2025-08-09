package com.back_medidor_agua.rd_version.service.consumoDiario;

import com.back_medidor_agua.rd_version.Exceptions.NotFoundException;
import com.back_medidor_agua.rd_version.entity.ConsumoDiario;
import com.back_medidor_agua.rd_version.entity.Medicion;
import com.back_medidor_agua.rd_version.repository.ConsumoDiarioRepository;
import com.back_medidor_agua.rd_version.repository.MedicionRepository;
import com.back_medidor_agua.rd_version.response.PrediccionDTO.ConsumoDiarioDto;
import com.back_medidor_agua.rd_version.response.PrediccionDTO.ConsumoPorDispositivoDTO;
import com.back_medidor_agua.rd_version.response.PrediccionDTO.PrediccionDTO;
import com.back_medidor_agua.rd_version.response.PrediccionDTO.ResumenEstadisticoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
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

    @Override
    public ConsumoPorDispositivoDTO obtenerResumenDispositivo(String dispositivoId) {
        List<ConsumoDiario> registros = repository.findTop10ByDispositivoIdOrderByFechaDesc(dispositivoId);

        List<ConsumoDiarioDto> dtoList = registros.stream()
                .map(r -> new ConsumoDiarioDto(
                        r.getId(),
                        r.getDispositivoId(),
                        r.getFecha(),
                        r.getConsumoTotal(),
                        r.isExceso()
                )).toList();

        List<Double> consumos = registros.stream()
                .map(ConsumoDiario::getConsumoTotal)
                .toList();

        // Cálculos
        double mediana = redondear(calcularMediana(consumos)); // m³
        double media = redondear(calcularMedia(consumos) * 1000); // L
        double varianza = redondear(calcularVarianza(consumos) * 1000); // L

        ResumenEstadisticoDTO resumen = new ResumenEstadisticoDTO(mediana, media, varianza);

        // Predicción trivial basada en la media
        PrediccionDTO prediccion = new PrediccionDTO(
                LocalDate.now().plusDays(1),
                redondear(media / 1000) // vuelve a m³
        );

        return new ConsumoPorDispositivoDTO(dispositivoId, dtoList, resumen, prediccion);
    }

    private double redondear(double valor) {
        return Math.round(valor * 100.0) / 100.0;
    }
    
    private double calcularMedia(List<Double> valores) {
        return valores.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }

    private double calcularVarianza(List<Double> valores) {
        double media = calcularMedia(valores);
        return valores.stream()
                .mapToDouble(v -> Math.pow(v - media, 2))
                .average()
                .orElse(0.0);
    }

    private double calcularMediana(List<Double> valores) {
        List<Double> sorted = new ArrayList<>(valores);
        Collections.sort(sorted);
        int n = sorted.size();
        if (n == 0) return 0.0;
        return (n % 2 == 0)
                ? (sorted.get(n / 2 - 1) + sorted.get(n / 2)) / 2.0
                : sorted.get(n / 2);
    }
    // Ejecuacion :  "0 10 0 * * ?" -> cada día a las 00:10 AM
    // @Scheduled(cron = "0 10 0 * * ?")
   // @Scheduled(cron = "0 * * * * ?") // cada minuto
    //@Scheduled(cron = "0 */5 * * * ?") // -> cada 5 minutos
     //@Scheduled(cron = "0 * * * * ?") // cada minuto
    public void calcularConsumoHistoricoJunioJulio2025() {
        LocalDate inicioRango = LocalDate.of(2025, 6, 1);
        LocalDate finRango = LocalDate.of(2025, 7, 31);

        for (LocalDate fecha = inicioRango; !fecha.isAfter(finRango); fecha = fecha.plusDays(1)) {
            LocalDateTime inicio = fecha.atStartOfDay();
            LocalDateTime fin = fecha.plusDays(1).atStartOfDay();

            List<Medicion> mediciones = medicionRepository.findByFechaHoraBetween(inicio, fin);
            if (mediciones.isEmpty()) {
                System.out.println("⚠️ No se encontraron mediciones para " + fecha);
                continue;
            }

            Map<String, List<Medicion>> medicionesPorDispositivo =
                    mediciones.stream().collect(Collectors.groupingBy(Medicion::getDispositivoId));

            List<ConsumoDiario> consumosAGuardar = new ArrayList<>();
            for (Map.Entry<String, List<Medicion>> entry : medicionesPorDispositivo.entrySet()) {
                String dispositivoId = entry.getKey();

                // Verifica si ya existe ese día para ese dispositivo
                boolean yaExiste = repository.existsByDispositivoIdAndFecha(dispositivoId, fecha);
                if (yaExiste) {
                    continue;
                }

                double totalVolumen = entry.getValue().stream()
                        .mapToDouble(m -> m.getVolumen() != null ? m.getVolumen() : 0)
                        .sum();

                boolean exceso = totalVolumen > 100;

                ConsumoDiario consumo = new ConsumoDiario();
                consumo.setDispositivoId(dispositivoId);
                consumo.setFecha(fecha);
                consumo.setConsumoTotal(totalVolumen);
                consumo.setExceso(exceso);

                consumosAGuardar.add(consumo);
            }

            if (!consumosAGuardar.isEmpty()) {
                repository.saveAll(consumosAGuardar);
                System.out.println("✅ Guardados " + consumosAGuardar.size() + " consumos diarios para " + fecha);
            } else {
                System.out.println("ℹ️ No hay nuevos consumos diarios para guardar para " + fecha);
            }
        }

        System.out.println("✅ Finalizado el cálculo histórico de junio y julio 2025.");
    }
    /*@Scheduled(cron = "0 10 0 * * ?")
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
    }*/

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
