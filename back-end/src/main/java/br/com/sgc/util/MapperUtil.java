package br.com.sgc.util;

import org.springframework.stereotype.Component;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.model.Produto;
import br.com.sgc.dto.ClienteDTO;
import br.com.sgc.dto.ProdutoDTO;

@Component
public class MapperUtil {

    public static Cliente toEntity(ClienteDTO dto) {
        if (dto == null) {
            return null;
        }
        return new Cliente(null, dto.getNome(), dto.getEmail(), dto.getCpf(), 
                          dto.getTelefone(), dto.getEndereco());
    }

    public static Produto toEntity(ProdutoDTO dto) {
        if (dto == null) {
            return null;
        }
        return new Produto(null, dto.getNome(), dto.getDescricao(), dto.getPreco(),
                          dto.getEstoque(), dto.getEstoqueMinimo(), dto.getTipoProduto());
    }

    public static ClienteDTO toDTO(Cliente cliente) {
        if (cliente == null) {
            return null;
        }
        return new ClienteDTO(cliente.getNome(), cliente.getEmail(), cliente.getCpf(),
                             cliente.getTelefone(), cliente.getEndereco());
    }

    public static ProdutoDTO toDTO(Produto produto) {
        if (produto == null) {
            return null;
        }
        return new ProdutoDTO(produto.getNome(), produto.getDescricao(), produto.getPreco(),
                             produto.getEstoque(), produto.getEstoqueMinimo(), produto.getTipoProduto());
    }
}
