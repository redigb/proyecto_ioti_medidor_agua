package com.back_medidor_agua.rd_version.controllers;

import com.back_medidor_agua.rd_version.Exceptions.AlreadyExistException;
import com.back_medidor_agua.rd_version.Exceptions.NotFoundException;
import com.back_medidor_agua.rd_version.entity.Dispositivo;
import com.back_medidor_agua.rd_version.request.UpdateDispositivoRequest;
import com.back_medidor_agua.rd_version.response.ApiResponse;
import com.back_medidor_agua.rd_version.service.dispositivo.IDispositivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${api.prefix}/dispositivos")
public class DispositivoController {

    @Autowired
    private IDispositivoService service;

    @PostMapping
    public ResponseEntity<ApiResponse> crear(@RequestBody Dispositivo dispositivo) {
        try {
            Dispositivo dispositivoRegister = service.save(dispositivo);
            return ResponseEntity.ok(new ApiResponse("registro exitoso", dispositivoRegister));
        } catch (AlreadyExistException e) {
            return ResponseEntity.status(CONFLICT)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping
    public ResponseEntity<List<Dispositivo>> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dispositivo> buscarPorId(@PathVariable String id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> actualizar(@PathVariable String id, @RequestBody UpdateDispositivoRequest d) {
        try {
            Dispositivo dispositivo = service.update(id, d);
            return ResponseEntity.ok(new ApiResponse("dispositivo actualizado", dispositivo));
        } catch (NotFoundException e) {
            return ResponseEntity.status(NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), null));
        } catch (AlreadyExistException e) {
            return ResponseEntity.status(CONFLICT)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> eliminar(@PathVariable String id) {
        try {
            service.deleteById(id);
            return ResponseEntity.ok(new ApiResponse("Dispositivo eliminado", null));
        } catch (NotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
}