package br.com.sgc.domain.repository;

import br.com.sgc.domain.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
<<<<<<< Updated upstream
        boolean existsByCpf(String cpf);
}
=======
}
>>>>>>> Stashed changes
