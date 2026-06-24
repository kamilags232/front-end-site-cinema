package br.com.sgc.controller;

import br.com.sgc.dto.SessaoDTO;
import br.com.sgc.service.CinemaJdbcService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sessao")
public class SessaoController {

    private final CinemaJdbcService cinemaJdbcService;

    public SessaoController(CinemaJdbcService cinemaJdbcService) {
        this.cinemaJdbcService = cinemaJdbcService;
    }

    @GetMapping
    public List<SessaoDTO> listar() {
        return cinemaJdbcService.listarSessoes();
    }
}
