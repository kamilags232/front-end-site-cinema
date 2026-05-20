package br.com.sgc.controller;

import br.com.sgc.dto.CriarVendaRequestDto;
import br.com.sgc.dto.VendaResponseDto;
import br.com.sgc.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendas")
@Validated
public class VendaController {

    private final VendaService vendaService;

    public VendaController(VendaService vendaService) {
        this.vendaService = vendaService;
    }

    @PostMapping
    public ResponseEntity<VendaResponseDto> criarVenda(@Valid @RequestBody CriarVendaRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new VendaResponseDto(vendaService.criarVenda(
                        request.getClienteId(),
                        request.getUsuarioId(),
                        request.getTipoPagamento(),
                        request.getItens()
                )));
    }

    @GetMapping
    public ResponseEntity<Page<VendaResponseDto>> listar(Pageable pageable) {
        return ResponseEntity.ok(vendaService.listar(pageable).map(VendaResponseDto::new));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendaResponseDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(new VendaResponseDto(vendaService.buscarPorId(id)));
    }
}
