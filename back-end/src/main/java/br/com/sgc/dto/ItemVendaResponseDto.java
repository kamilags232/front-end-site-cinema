package br.com.sgc.dto;

import br.com.sgc.domain.model.ItemVenda;
import br.com.sgc.domain.model.Produto;

import java.math.BigDecimal;

public class ItemVendaResponseDto {

    private Integer quantidade;
    private BigDecimal valorParcial;
    private ProdutoInfoDto produto;

    public ItemVendaResponseDto(ItemVenda itemVenda) {
        this.quantidade = itemVenda.getQuantidade();
        this.valorParcial = itemVenda.getValorParcial();
        this.produto = new ProdutoInfoDto(itemVenda.getProduto());
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public BigDecimal getValorParcial() {
        return valorParcial;
    }

    public ProdutoInfoDto getProduto() {
        return produto;
    }

    public static class ProdutoInfoDto {

        private Long id;
        private String nome;

        public ProdutoInfoDto(Produto produto) {
            this.id = produto.getId();
            this.nome = produto.getNome();
        }

        public Long getId() {
            return id;
        }

        public String getNome() {
            return nome;
        }
    }
}
