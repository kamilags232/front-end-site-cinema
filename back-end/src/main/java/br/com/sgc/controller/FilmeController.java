package br.com.sgc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.sgc.dto.FilmeDTO;
import br.com.sgc.service.CinemaJdbcService;

@RestController
@RequestMapping("/filme")
public class FilmeController {

    private final CinemaJdbcService cinemaJdbcService;

    public FilmeController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @GetMapping
    public List<FilmeDTO> listar() {
        return cinemaJdbcService.listarFilmes();
    }
}
