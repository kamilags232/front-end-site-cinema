package br.com.sgc.controller;

import br.com.sgc.domain.model.Usuario;
import br.com.sgc.dto.AuthRequestDTO;
import br.com.sgc.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody AuthRequestDTO dto) {
        return ResponseEntity.ok(service.login(dto));
    }
}