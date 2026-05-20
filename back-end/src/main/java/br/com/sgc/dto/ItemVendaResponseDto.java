package br.com.sgc.dto;

import br.com.sgc.domain.model.ItemVenda;

import java.math.BigDecimal;

public class ItemVendaResponseDto {

    private Integer quantidade;
    private BigDecimal valorParcial;

    public ItemVendaResponseDto(ItemVenda itemVenda) {
        this.quantidade = itemVenda.getQuantidade();
        this.valorParcial = itemVenda.getValorParcial();
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public BigDecimal getValorParcial() {
        return valorParcial;
    }
}
