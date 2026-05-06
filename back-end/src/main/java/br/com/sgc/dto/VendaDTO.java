package br.com.sgc.dto;

import br.com.sgc.domain.model.Cliente;
import br.com.sgc.domain.model.Usuario;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class VendaDTO {

    private Long clienteId;
    private Long usuarioId;
    private String tipoPagamento;
    private List<ItemVendaDTO> itens;

    public VendaDTO() {
    }

    public VendaDTO(Long clienteId, Long usuarioId, String tipoPagamento, List<ItemVendaDTO> itens) {
        this.clienteId = clienteId;
        this.usuarioId = usuarioId;
        this.tipoPagamento = tipoPagamento;
        this.itens = itens;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTipoPagamento() {
        return tipoPagamento;
    }

    public void setTipoPagamento(String tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }

    public List<ItemVendaDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItemVendaDTO> itens) {
        this.itens = itens;
    }
}