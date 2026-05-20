package br.com.sgc.domain.repository;

import br.com.sgc.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

<<<<<<< Updated upstream
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
=======
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
>>>>>>> Stashed changes
