package br.com.sgc.controller;

<<<<<<< Updated upstream
import br.com.sgc.domain.model.Venda;
import br.com.sgc.dto.VendaDTO;
import br.com.sgc.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    @Autowired
    private VendaService service;

    @PostMapping
    public ResponseEntity<Venda> criar(@Valid @RequestBody VendaDTO dto) {
        return ResponseEntity.ok(service.criar(dto));
    }

    @GetMapping
    public ResponseEntity<Page<Venda>> listar(Pageable pageable) {
        return ResponseEntity.ok(service.listar(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
=======
import br.com.sgc.dto.CriarVendaRequestDto;
import br.com.sgc.dto.VendaResponseDto;
import br.com.sgc.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
>>>>>>> Stashed changes
    }
}
