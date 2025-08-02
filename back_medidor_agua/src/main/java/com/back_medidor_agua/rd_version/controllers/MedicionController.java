package com.back_medidor_agua.rd_version.controllers;

import com.back_medidor_agua.rd_version.Exceptions.NotFoundException;
import com.back_medidor_agua.rd_version.entity.Medicion;
import com.back_medidor_agua.rd_version.response.ApiResponse;
import com.back_medidor_agua.rd_version.service.medicion.IMedicionService;
import com.back_medidor_agua.rd_version.utils.PaginatedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("${api.prefix}/mediciones")
@RequiredArgsConstructor
public class MedicionController {


    private final IMedicionService service;

    // socket
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<ApiResponse> registrar(@RequestBody Medicion medicion) {
        try {
            Medicion medicionRegister = service.save(medicion);
            // Emitir al canal general o específico
            messagingTemplate.convertAndSend("/canal-salida/mediciones/" + medicionRegister.getDispositivoId(), medicionRegister);

            return ResponseEntity.ok(new ApiResponse("--add--", medicionRegister));
        } catch (NotFoundException e) {
            return ResponseEntity.status(NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<Medicion>> listar(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "30") int perPage) {

        Pageable pageable = PageRequest.of(page - 1, perPage, Sort.by("fecha").descending());
        Page<Medicion> medicionesPage = service.findAll(pageable);

        PaginatedResponse<Medicion> response = new PaginatedResponse<>(
                page,
                perPage,
                medicionesPage.getTotalElements(),
                medicionesPage.getContent()
        );
        return ResponseEntity.ok(response);
    }

   /* @GetMapping
    public ResponseEntity<List<Medicion>> listar() {
        return ResponseEntity.ok(service.findAll());
    }*/

    @GetMapping("/dispositivo/{dispositivoId}")
    public ResponseEntity<List<Medicion>> porDispositivo(@PathVariable String dispositivoId) {
        return ResponseEntity.ok(service.findByDispositivoId(dispositivoId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse>eliminar(@PathVariable String id) {
        try {
            service.deleteById(id);
            return ResponseEntity.ok(new ApiResponse("Medicion eliminado", null));
        } catch (NotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
}