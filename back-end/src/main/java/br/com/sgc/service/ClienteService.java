package br.com.sgc.service;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.repository.ClienteRepository;

import br.com.sgc.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public Cliente criar(Cliente cliente) {
        if (repository.existsByCpf(cliente.getCpf())) {
            throw new BusinessException("CPF já cadastrado");
        }

        return repository.save(cliente);
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow();
    }

    public Cliente atualizar(Long id, Cliente cliente) {
        Cliente existente = buscarPorId(id);

        existente.setNome(cliente.getNome());
        existente.setEmail(cliente.getEmail());
        existente.setTelefone(cliente.getTelefone());
        existente.setEndereco(cliente.getEndereco());

        return repository.save(existente);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
