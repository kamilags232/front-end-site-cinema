package br.com.sgc.controller;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.dto.ClienteDTO;
import br.com.sgc.service.ClienteService;
import br.com.sgc.util.MapperUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public ResponseEntity<Cliente> criar(@Valid @RequestBody ClienteDTO dto) {
        Cliente cliente = MapperUtil.toEntity(dto);
        return ResponseEntity.ok(service.criar(cliente));
    }

    @GetMapping
    public ResponseEntity<Page<Cliente>> listar(Pageable pageable) {
        return ResponseEntity.ok(service.listar(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id,
                                             @Valid @RequestBody ClienteDTO dto) {
        Cliente cliente = MapperUtil.toEntity(dto);
        return ResponseEntity.ok(service.atualizar(id, cliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}