package br.com.sgc.controller;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.dto.ClienteDTO;
import br.com.sgc.service.ClienteService;
import br.com.sgc.util.MapperUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cliente")
public class ClienteAliasController {

    private final ClienteService clienteService;

    public ClienteAliasController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<Cliente> criar(@Valid @RequestBody ClienteDTO dto) {
        Cliente cliente = MapperUtil.toEntity(dto);
        return ResponseEntity.ok(clienteService.criar(cliente));
    }
}
