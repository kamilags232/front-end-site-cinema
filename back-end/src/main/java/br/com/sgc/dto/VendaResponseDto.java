package br.com.sgc.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import br.com.sgc.domain.model.Venda;

public class VendaResponseDto {

    private Long id;
    private Long nrRecibo;
    private LocalDateTime dataHora;
    private BigDecimal valorTotal;
    private String tipoPagamento;
    private PessoaResumoDto cliente;
    private PessoaResumoDto usuario;
    private List<ItemVendaResponseDto> itens;

    public VendaResponseDto(Venda venda) {
        this.id = venda.getId();
        this.nrRecibo = venda.getId();
        this.dataHora = venda.getDataHora();
        this.valorTotal = venda.getValorTotal();
        this.tipoPagamento = venda.getTipoPagamento();
        this.cliente = venda.getCliente() == null
                ? null
                : new PessoaResumoDto(venda.getCliente().getId(), venda.getCliente().getNome(), venda.getCliente().getEmail(), null);
        this.usuario = venda.getUsuario() == null
                ? null
                : new PessoaResumoDto(venda.getUsuario().getId(), venda.getUsuario().getNome(), venda.getUsuario().getEmail(), venda.getUsuario().getTipo());
        this.itens = venda.getItens() == null
        ? new ArrayList<>()
        : venda.getItens().stream()
            .map(ItemVendaResponseDto::new)
            .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public Long getNrRecibo() {
        return nrRecibo;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public String getTipoPagamento() {
        return tipoPagamento;
    }

    public PessoaResumoDto getCliente() {
        return cliente;
    }

    public PessoaResumoDto getUsuario() {
        return usuario;
    }

    public List<ItemVendaResponseDto> getItens() {
        return itens;
    }

    public static class PessoaResumoDto {
        private Long id;
        private String nome;
        private String email;
        private String tipo;

        public PessoaResumoDto(Long id, String nome, String email, String tipo) {
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.tipo = tipo;
        }

        public Long getId() {
            return id;
        }

        public String getNome() {
            return nome;
        }

        public String getEmail() {
            return email;
        }

        public String getTipo() {
            return tipo;
        }
    }
}
