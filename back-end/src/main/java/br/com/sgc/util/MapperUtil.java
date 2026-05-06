package br.com.sgc.util;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.model.Produto;
import br.com.sgc.dto.ClienteDTO;
import br.com.sgc.dto.ProdutoDTO;

public class MapperUtil {

    public static Cliente toEntity(ClienteDTO dto) {
        Cliente c = new Cliente();
        c.setNome(dto.getNome());
        c.setEmail(dto.getEmail());
        c.setCpf(dto.getCpf());
        c.setTelefone(dto.getTelefone());
        c.setEndereco(dto.getEndereco());
        return c;
    }

    public static Produto toEntity(ProdutoDTO dto) {
        Produto p = new Produto();
        p.setNome(dto.getNome());
        p.setDescricao(dto.getDescricao());
        p.setPreco(dto.getPreco());
        p.setEstoque(dto.getEstoque());
        p.setEstoqueMinimo(dto.getEstoqueMinimo());
        p.setTipoProduto(dto.getTipoProduto());
        return p;
    }
}
