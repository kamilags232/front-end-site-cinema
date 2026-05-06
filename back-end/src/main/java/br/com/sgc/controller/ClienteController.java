package br.com.sgc.controller;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.dto.ClienteDTO;
import br.com.sgc.service.ClienteService;
import br.com.sgc.util.MapperUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public ResponseEntity<Cliente> criar(@RequestBody @Valid ClienteDTO dto) throws Throwable {
        Cliente cliente = MapperUtil.toEntity(dto);
        return ResponseEntity.ok(service.criar(cliente));
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id,
                                             @RequestBody ClienteDTO dto) {
        Cliente cliente = MapperUtil.toEntity(dto);
        return ResponseEntity.ok(service.atualizar(id, cliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}