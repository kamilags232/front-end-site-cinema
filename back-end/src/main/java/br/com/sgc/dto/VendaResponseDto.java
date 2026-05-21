package br.com.sgc.dto;

import br.com.sgc.domain.model.ItemVenda;
import br.com.sgc.domain.model.Venda;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class VendaResponseDto {

    private Long id;
    private BigDecimal valorTotal;
    private String tipoPagamento;
    private List<ItemVendaResponseDto> itens;

    public VendaResponseDto(Venda venda) {
        this.id = venda.getId();
        this.valorTotal = venda.getValorTotal();
        this.tipoPagamento = venda.getTipoPagamento();
        this.itens = venda.getItens().stream()
                .map(ItemVendaResponseDto::new)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public String getTipoPagamento() {
        return tipoPagamento;
    }

    public List<ItemVendaResponseDto> getItens() {
        return itens;
    }
}
