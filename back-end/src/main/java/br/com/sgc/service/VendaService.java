package br.com.sgc.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.model.ItemVenda;
import br.com.sgc.domain.model.Produto;
import br.com.sgc.domain.model.Usuario;
import br.com.sgc.domain.model.Venda;
import br.com.sgc.domain.repository.ClienteRepository;
import br.com.sgc.domain.repository.ProdutoRepository;
import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.domain.repository.VendaRepository;
import br.com.sgc.dto.ItemVendaDTO;
import br.com.sgc.dto.VendaDTO;
import br.com.sgc.exception.BusinessException;
import br.com.sgc.exception.ResourceNotFoundException;

@Service
public class VendaService {
	
	private static final Logger log = LoggerFactory.getLogger(VendaService.class);

    private final VendaRepository vendaRepository;
    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProdutoRepository produtoRepository;

    public VendaService(VendaRepository vendaRepository,
                        ClienteRepository clienteRepository,
                        UsuarioRepository usuarioRepository,
                        ProdutoRepository produtoRepository) {
        this.vendaRepository = vendaRepository;
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
        this.produtoRepository = produtoRepository;
    }

    @Transactional
    public Venda criar(VendaDTO dto) {
        log.info("Iniciando criação de venda para cliente ID: {}", dto.getCdCliente());

        Cliente cliente = clienteRepository.findById(dto.getCdCliente())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        Usuario usuario = usuarioRepository.findById(dto.getCdCliente())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setUsuario(usuario);
        venda.setTipoPagamento(dto.getTpPagamento());
        venda.setDataHora(LocalDateTime.now());
        venda.setItens(new ArrayList<>());

        BigDecimal valorTotal = BigDecimal.ZERO;
        if (dto.getItens() != null) {
            for (ItemVendaDTO itemRequest : dto.getItens()) {
                Produto produto = produtoRepository.findById(itemRequest.getProdutoId())
                        .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

                Integer quantidade = itemRequest.getQuantidade();
                if (produto.getEstoque() == null || produto.getEstoque() < quantidade) {
                    throw new BusinessException("Estoque insuficiente para o produto: " + produto.getNome());
                }

                produto.setEstoque(produto.getEstoque() - quantidade);
                produtoRepository.save(produto);

                BigDecimal valorParcial = produto.getPreco().multiply(BigDecimal.valueOf(quantidade));

                ItemVenda itemVenda = new ItemVenda();
                itemVenda.setVenda(venda);
                itemVenda.setProduto(produto);
                itemVenda.setQuantidade(quantidade);
                itemVenda.setValorParcial(valorParcial);

                venda.getItens().add(itemVenda);
                valorTotal = valorTotal.add(valorParcial);
            }
        }

        venda.setValorTotal(valorTotal);
        return vendaRepository.save(venda);
    }

    @Transactional(readOnly = true)
    public Page<Venda> listar(Pageable pageable) {
        return vendaRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Venda buscarPorId(Long id) {
        return vendaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venda não encontrada"));
    }
}
