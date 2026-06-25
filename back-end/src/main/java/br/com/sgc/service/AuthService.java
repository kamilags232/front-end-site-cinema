package br.com.sgc.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.sgc.config.JwtService;
import br.com.sgc.domain.model.Usuario;
import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.dto.AuthRequestDTO;
import br.com.sgc.dto.AuthResponseDTO;
import br.com.sgc.dto.RegisterRequestDTO;
import br.com.sgc.exception.BusinessException;

@Service
public class AuthService {
	
	private static final Logger log = LoggerFactory.getLogger(AuthService.class);

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
        
        return new AuthResponseDTO(token, usuario.getId(), usuario.getEmail(), usuario.getNome(), usuario.getTipo());
    }
    
    public void register(RegisterRequestDTO dto) {
        log.info("Tentando registrar novo usuário com email: {}", dto.getEmail());

        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            log.warn("Tentativa de registro com email já existente: {}", dto.getEmail());
            throw new BusinessException("Este email já está cadastrado.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.getNome());
        novoUsuario.setEmail(dto.getEmail());
        novoUsuario.setTipo(dto.getTipo() != null && !dto.getTipo().isBlank() ? dto.getTipo() : "funcionario");
        
        String senhaCriptografada = passwordEncoder.encode(dto.getSenha());
        novoUsuario.setSenha(senhaCriptografada);

        repository.save(novoUsuario);
        log.info("Usuário registrado com sucesso! Email: {}", dto.getEmail());
    }
}
