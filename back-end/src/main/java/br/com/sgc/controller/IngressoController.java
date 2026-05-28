package br.com.sgc.controller;

import br.com.sgc.dto.CinemaIngressoDto;
import br.com.sgc.service.CinemaJdbcService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ingresso")
public class IngressoController {

    private final CinemaJdbcService cinemaJdbcService;

    public IngressoController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @PostMapping
    public ResponseEntity<CinemaIngressoDto> criar(@RequestBody CinemaIngressoDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cinemaJdbcService.criarIngresso(dto));
    }
}
