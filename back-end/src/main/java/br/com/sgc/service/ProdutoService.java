package br.com.sgc.service;

import br.com.sgc.domain.model.Produto;
import br.com.sgc.domain.repository.ProdutoRepository;
import br.com.sgc.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service

public class ProdutoService {
	
	private static final Logger log = LoggerFactory.getLogger(ProdutoService.class);

    @Autowired
    private ProdutoRepository repository;

    @Transactional
    public Produto criar(Produto produto) {
        log.info("Criando novo produto: {}", produto.getNome());
        return repository.save(produto);
    }

    @Transactional(readOnly = true)
    public Page<Produto> listar(Pageable pageable) {
        log.info("Listando produtos com paginação");
        return repository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Produto buscarPorId(Long id) {
        log.info("Buscando produto por ID: {}", id);
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
    }

    @Transactional
    public Produto atualizar(Long id, Produto produto) {
        log.info("Atualizando produto ID: {}", id);
        Produto existente = buscarPorId(id);

        existente.setNome(produto.getNome());
        existente.setDescricao(produto.getDescricao());
        existente.setPreco(produto.getPreco());
        existente.setEstoque(produto.getEstoque());
        existente.setEstoqueMinimo(produto.getEstoqueMinimo());
        existente.setTipoProduto(produto.getTipoProduto());

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Long id) {
        log.info("Deletando produto ID: {}", id);
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Produto não encontrado");
        }
        repository.deleteById(id);
    }
}