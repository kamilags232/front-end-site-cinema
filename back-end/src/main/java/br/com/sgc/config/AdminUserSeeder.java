package br.com.sgc.config;

import br.com.sgc.domain.model.Usuario;
import br.com.sgc.domain.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserSeeder implements CommandLineRunner {

    private static final String ADMIN_EMAIL = "Anna.ns@cinemonroll.com";

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserSeeder(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        Usuario admin = usuarioRepository.findByEmail(ADMIN_EMAIL).orElseGet(() -> {
            Usuario novoAdmin = new Usuario();
            novoAdmin.setNome("Anna Nicolly da Silva");
            novoAdmin.setEmail(ADMIN_EMAIL);
            return novoAdmin;
        });

        admin.setNome("Anna Nicolly da Silva");
        admin.setTipo("admin");
        admin.setSenha(passwordEncoder.encode("@Silva2236!"));
        usuarioRepository.save(admin);
    }
}
