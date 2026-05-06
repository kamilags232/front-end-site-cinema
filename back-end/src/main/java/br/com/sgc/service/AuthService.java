package br.com.sgc.service;

import br.com.sgc.domain.model.Usuario;
import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.dto.AuthRequestDTO;
import br.com.sgc.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario login(AuthRequestDTO dto) {

        Usuario usuario = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BusinessException("Email inválido"));

        if (!usuario.getSenha().equals(dto.getSenha())) {
            throw new BusinessException("Senha inválida");
        }

        return usuario;
    }
}