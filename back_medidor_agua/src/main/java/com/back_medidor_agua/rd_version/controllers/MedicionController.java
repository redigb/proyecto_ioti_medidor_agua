package com.back_medidor_agua.rd_version.controllers;

@RestController
@RequestMapping("/api/mediciones")
@CrossOrigin
public class MedicionController {

    @Autowired
    private IMedicionService service;

    @PostMapping
    public ResponseEntity<Medicion> registrar(@Valid @RequestBody Medicion medicion) {
        return ResponseEntity.ok(service.save(medicion));
    }

    @GetMapping
    public ResponseEntity<List<Medicion>> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/dispositivo/{dispositivoId}")
    public ResponseEntity<List<Medicion>> porDispositivo(@PathVariable String dispositivoId) {
        return ResponseEntity.ok(service.findByDispositivoId(dispositivoId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}