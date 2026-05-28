package br.com.sgc.controller;

import br.com.sgc.dto.CinemaVendaDto;
import br.com.sgc.service.CinemaJdbcService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/venda")
public class VendaCinemaController {

    private final CinemaJdbcService cinemaJdbcService;

    public VendaCinemaController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @PostMapping
    public ResponseEntity<CinemaVendaDto> criar(@RequestBody CinemaVendaDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cinemaJdbcService.criarVenda(dto));
    }

    @PutMapping("/recalcular/{nrRecibo}")
    public ResponseEntity<CinemaVendaDto> recalcular(@PathVariable Long nrRecibo) {
        return ResponseEntity.ok(cinemaJdbcService.recalcularVenda(nrRecibo));
    }
}
