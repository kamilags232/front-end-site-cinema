package br.com.sgc.controller;

import br.com.sgc.dto.CinemaAssentoDto;
import br.com.sgc.service.CinemaJdbcService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assento")
public class AssentoController {

    private final CinemaJdbcService cinemaJdbcService;

    public AssentoController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @GetMapping("/sessao/{sessaoId}")
    public List<CinemaAssentoDto> listarPorSessao(@PathVariable Long sessaoId) {
        return cinemaJdbcService.listarAssentosPorSessao(sessaoId);
    }

    @PostMapping
    public ResponseEntity<CinemaAssentoDto> criar(@RequestBody CinemaAssentoDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cinemaJdbcService.criarAssento(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CinemaAssentoDto> atualizar(@PathVariable Long id, @RequestBody CinemaAssentoDto dto) {
        return ResponseEntity.ok(cinemaJdbcService.atualizarAssento(id, dto));
    }
}
