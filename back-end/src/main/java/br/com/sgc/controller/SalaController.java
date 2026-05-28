package br.com.sgc.controller;

import br.com.sgc.dto.CinemaSalaDto;
import br.com.sgc.service.CinemaJdbcService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sala")
public class SalaController {

    private final CinemaJdbcService cinemaJdbcService;

    public SalaController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @GetMapping
    public List<CinemaSalaDto> listar() {
        return cinemaJdbcService.listarSalas();
    }
}
