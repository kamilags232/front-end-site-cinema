package br.com.sgc.service;

import br.com.sgc.domain.model.*;
import br.com.sgc.domain.repository.ClienteRepository;
import br.com.sgc.domain.repository.ProdutoRepository;
import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.domain.repository.VendaRepository;
import br.com.sgc.dto.ItemVendaDTO;
import br.com.sgc.dto.VendaDTO;
import br.com.sgc.exception.BusinessException;
import br.com.sgc.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

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

        List<ItemVenda> itens = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (ItemVendaDTO itemDTO : dto.getItens()) {

            Produto produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

            if (produto.getEstoque() < itemDTO.getQuantidade()) {
                log.warn("Estoque insuficiente para produto ID: {} - disponível: {}, solicitado: {}",
                        produto.getId(), produto.getEstoque(), itemDTO.getQuantidade());
                throw new BusinessException("Estoque insuficiente para o produto: " + produto.getNome());
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

        Venda vendaSalva = vendaRepository.save(venda);
        log.info("Venda criada com sucesso - ID: {}, Total: {}", vendaSalva.getId(), total);
        return vendaSalva;
    }

    @Transactional(readOnly = true)
    public Page<Venda> listar(Pageable pageable) {
        log.info("Listando vendas com paginação");
        return vendaRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Venda buscarPorId(Long id) {
        log.info("Buscando venda por ID: {}", id);
        return vendaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venda não encontrada"));
    }
}
