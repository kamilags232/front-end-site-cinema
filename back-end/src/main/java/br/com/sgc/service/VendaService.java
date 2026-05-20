package br.com.sgc.service;

<<<<<<< Updated upstream
import br.com.sgc.domain.model.*;
=======
import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.model.ItemVenda;
import br.com.sgc.domain.model.Produto;
import br.com.sgc.domain.model.Usuario;
import br.com.sgc.domain.model.Venda;
>>>>>>> Stashed changes
import br.com.sgc.domain.repository.ClienteRepository;
import br.com.sgc.domain.repository.ProdutoRepository;
import br.com.sgc.domain.repository.UsuarioRepository;
import br.com.sgc.domain.repository.VendaRepository;
<<<<<<< Updated upstream
import br.com.sgc.dto.ItemVendaDTO;
import br.com.sgc.dto.VendaDTO;
import br.com.sgc.exception.BusinessException;
import br.com.sgc.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
=======
import br.com.sgc.dto.ItemVendaRequestDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
>>>>>>> Stashed changes
import java.util.ArrayList;
import java.util.List;

@Service
public class VendaService {
<<<<<<< Updated upstream
	
	private static final Logger log = LoggerFactory.getLogger(VendaService.class);

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
        log.info("Iniciando criação de venda para cliente ID: {}", dto.getClienteId());

        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
=======

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
    public Venda criarVenda(Long clienteId,
                            Long usuarioId,
                            String tipoPagamento,
                            List<ItemVendaRequestDto> itens) {

        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + clienteId));
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado: " + usuarioId));
>>>>>>> Stashed changes

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setUsuario(usuario);
<<<<<<< Updated upstream
        venda.setTipoPagamento(dto.getTipoPagamento());
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
=======
        venda.setTipoPagamento(tipoPagamento);
        venda.setItens(new ArrayList<>());

        BigDecimal valorTotal = BigDecimal.ZERO;
        if (itens != null) {
            for (ItemVendaRequestDto itemRequest : itens) {
                Produto produto = produtoRepository.findById(itemRequest.getProdutoId())
                        .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado: " + itemRequest.getProdutoId()));

                Integer quantidade = itemRequest.getQuantidade();
                if (produto.getEstoque() == null || produto.getEstoque() < quantidade) {
                    throw new IllegalArgumentException("Estoque insuficiente para o produto: " + produto.getNome());
                }

                produto.setEstoque(produto.getEstoque() - quantidade);
                produtoRepository.save(produto);

                ItemVenda itemVenda = new ItemVenda();
                itemVenda.setProduto(produto);
                itemVenda.setQuantidade(quantidade);
                itemVenda.setValorParcial(produto.getPreco().multiply(BigDecimal.valueOf(quantidade)));
                itemVenda.setVenda(venda);
                venda.getItens().add(itemVenda);

                valorTotal = valorTotal.add(itemVenda.getValorParcial());
            }
        }

        venda.setValorTotal(valorTotal);
        return vendaRepository.save(venda);
>>>>>>> Stashed changes
    }
}
