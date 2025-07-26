package com.back_medidor_agua.rd_version.controllers;


@RestController
@RequestMapping("/api/dispositivos")
@CrossOrigin
public class DispositivoController {

    @Autowired
    private IDispositivoService service;

    @PostMapping
    public ResponseEntity<Dispositivo> crear(@Valid @RequestBody Dispositivo dispositivo) {
        return ResponseEntity.ok(service.save(dispositivo));
    }

    @GetMapping
    public ResponseEntity<List<Dispositivo>> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dispositivo> buscar(@PathVariable String id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dispositivo> actualizar(@PathVariable String id, @Valid @RequestBody Dispositivo d) {
        return ResponseEntity.ok(service.update(id, d));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}