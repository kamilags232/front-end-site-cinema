package br.com.sgc.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;


import java.util.List;


public class VendaDTO {

    @NotNull(message = "Cliente ID é obrigatório")
    private Long clienteId;

    @NotNull(message = "Usuário ID é obrigatório")
    private Long usuarioId;

    @NotNull(message = "Tipo de pagamento é obrigatório")
    private String tipoPagamento;

    @NotEmpty(message = "Venda deve conter pelo menos um item")
    @Valid
    private List<ItemVendaDTO> itens;

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