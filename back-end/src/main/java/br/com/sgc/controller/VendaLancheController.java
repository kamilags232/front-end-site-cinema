package br.com.sgc.controller;

import br.com.sgc.dto.CinemaVendaLancheDto;
import br.com.sgc.service.CinemaJdbcService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/venda-lanche")
public class VendaLancheController {

    private final CinemaJdbcService cinemaJdbcService;

    public VendaLancheController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @PostMapping
    public ResponseEntity<CinemaVendaLancheDto> criar(@RequestBody CinemaVendaLancheDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cinemaJdbcService.criarVendaLanche(dto));
    }
}
