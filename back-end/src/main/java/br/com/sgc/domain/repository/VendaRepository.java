package br.com.sgc.domain.repository;

import br.com.sgc.domain.model.Venda;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VendaRepository extends JpaRepository<Venda, Long> {
    @Override
    @EntityGraph(attributePaths = {"cliente", "usuario", "itens", "itens.produto"})
    Page<Venda> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"cliente", "usuario", "itens", "itens.produto"})
    Optional<Venda> findById(Long id);
}
