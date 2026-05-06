package br.com.sgc.service;

import br.com.sgc.domain.model.*;
import br.com.sgc.domain.repository.ClienteRepository;
import br.com.sgc.domain.repository.ProdutoRepository;
import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.domain.repository.VendaRepository;
import br.com.sgc.dto.ItemVendaDTO;
import br.com.sgc.dto.VendaDTO;
import br.com.sgc.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public Venda criar(VendaDTO dto) {

        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setUsuario(usuario);
        venda.setTipoPagamento(dto.getTipoPagamento());
        venda.setDataHora(LocalDateTime.now());

        List<ItemVenda> itens = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (ItemVendaDTO itemDTO : dto.getItens()) {

            Produto produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

            if (produto.getEstoque() < itemDTO.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente");
            }

            BigDecimal valorParcial = produto.getPreco()
                    .multiply(BigDecimal.valueOf(itemDTO.getQuantidade()));

            ItemVenda item = new ItemVenda();
            item.setVenda(venda);
            item.setProduto(produto);
            item.setQuantidade(itemDTO.getQuantidade());
            item.setValorParcial(valorParcial);

            itens.add(item);
            total = total.add(valorParcial);
        }

        venda.setItens(itens);
        venda.setValorTotal(total);

        return vendaRepository.save(venda);
    }

    public List<Venda> listar() {
        return vendaRepository.findAll();
    }
}
