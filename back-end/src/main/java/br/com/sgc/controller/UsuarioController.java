package br.com.sgc.controller;

import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.dto.UsuarioResumoDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<UsuarioResumoDTO> listar() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioResumoDTO::new)
                .toList();
    }
}
