package br.com.sgc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.sgc.config.JwtService;
import br.com.sgc.domain.model.Usuario;
import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.dto.AuthRequestDTO;
import br.com.sgc.dto.AuthResponseDTO;
import br.com.sgc.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponseDTO login(AuthRequestDTO dto) {
        log.info("Tentando login para email: {}", dto.getEmail());
        
        Usuario usuario = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> {
                    log.warn("Email não encontrado: {}", dto.getEmail());
                    return new BusinessException("Email ou senha inválidos");
                });

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
            log.warn("Senha inválida para email: {}", dto.getEmail());
            throw new BusinessException("Email ou senha inválidos");
        }

        String token = jwtService.generateToken(usuario.getEmail());
        log.info("Login bem-sucedido para email: {}", dto.getEmail());
        
        return new AuthResponseDTO(token, usuario.getEmail(), usuario.getNome());
    }
}