package br.com.sgc.controller;

import br.com.sgc.dto.CinemaFilmeDto;
import br.com.sgc.service.CinemaJdbcService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/filme")
public class FilmeController {

    private final CinemaJdbcService cinemaJdbcService;

    public FilmeController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @GetMapping
    public List<CinemaFilmeDto> listar() {
        return cinemaJdbcService.listarFilmes();
    }
}
