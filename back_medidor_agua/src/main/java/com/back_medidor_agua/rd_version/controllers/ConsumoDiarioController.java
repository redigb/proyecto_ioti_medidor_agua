package com.back_medidor_agua.rd_version.controllers;

import com.back_medidor_agua.rd_version.entity.ConsumoDiario;
import com.back_medidor_agua.rd_version.service.consumoDiario.IConsumoDiarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consumos")
@CrossOrigin
public class ConsumoDiarioController {

    @Autowired
    private IConsumoDiarioService service;

    @PostMapping
    public ResponseEntity<ConsumoDiario> crear(@RequestBody ConsumoDiario consumo) {
        return ResponseEntity.ok(service.save(consumo));
    }

    @GetMapping
    public ResponseEntity<List<ConsumoDiario>> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/dispositivo/{dispositivoId}")
    public ResponseEntity<List<ConsumoDiario>> porDispositivo(@PathVariable String dispositivoId) {
        return ResponseEntity.ok(service.findByDispositivoId(dispositivoId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}