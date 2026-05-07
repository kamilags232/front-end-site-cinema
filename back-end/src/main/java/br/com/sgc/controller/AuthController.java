package br.com.sgc.controller;

import br.com.sgc.dto.AuthRequestDTO;
import br.com.sgc.dto.AuthResponseDTO;
import br.com.sgc.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO dto) {
        return ResponseEntity.ok(service.login(dto));
    }
}