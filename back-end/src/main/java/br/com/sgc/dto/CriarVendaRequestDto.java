package br.com.sgc.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CriarVendaRequestDto {

    @NotNull(message = "ClienteId é obrigatório")
    private Long clienteId;

    @NotNull(message = "UsuarioId é obrigatório")
    private Long usuarioId;

    @NotBlank(message = "Tipo de pagamento é obrigatório")
    private String tipoPagamento;

    @NotEmpty(message = "Itens da venda são obrigatórios")
    @Valid
    private List<ItemVendaRequestDto> itens;

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

    public List<ItemVendaRequestDto> getItens() {
        return itens;
    }

    public void setItens(List<ItemVendaRequestDto> itens) {
        this.itens = itens;
    }
}
