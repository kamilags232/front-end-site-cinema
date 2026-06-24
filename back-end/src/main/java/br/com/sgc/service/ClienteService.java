package br.com.sgc.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.repository.ClienteRepository;
import br.com.sgc.exception.BusinessException;
import br.com.sgc.exception.ResourceNotFoundException;

@Service
public class ClienteService {
	
	private static final Logger log = LoggerFactory.getLogger(ClienteService.class);

    @Autowired
    private ClienteRepository repository;

    @Transactional
    public Cliente criar(Cliente cliente) {
        if (repository.existsByCpf(cliente.getCpf())) {
            log.warn("Tentativa de criar cliente com CPF duplicado: {}", cliente.getCpf());
            throw new BusinessException("CPF já cadastrado");
        }
        log.info("Criando novo cliente: {}", cliente.getEmail());
        return repository.save(cliente);
    }

    @Transactional(readOnly = true)
    public Page<Cliente> listar(Pageable pageable) {
        log.info("Listando clientes com paginação");
        return repository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Cliente buscarPorId(Long id) {
        log.info("Buscando cliente por ID: {}", id);
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));
    }

    @Transactional
    public Cliente atualizar(Long id, Cliente cliente) {
        log.info("Atualizando cliente ID: {}", id);
        Cliente existente = buscarPorId(id);

        existente.setNome(cliente.getNome());
        existente.setEmail(cliente.getEmail());
        existente.setTelefone(cliente.getTelefone());
        existente.setEndereco(cliente.getEndereco());

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Long id) {
        log.info("Deletando cliente ID: {}", id);
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Cliente não encontrado");
        }
        repository.deleteById(id);
    }
}
