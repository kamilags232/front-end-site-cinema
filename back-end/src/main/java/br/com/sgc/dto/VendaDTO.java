package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class VendaDTO {

    @JsonProperty("nr_recibo")
    private Long nrRecibo;

    @JsonProperty("dt_hr_venda")
    private LocalDateTime dtHrVenda;

    @JsonProperty("valor_total")
    private BigDecimal valorTotal;

    @JsonProperty("cd_cliente")
    private Long cdCliente;

    @JsonProperty("tp_pagamento")
    private String tpPagamento;

	public Long getNrRecibo() {
		return nrRecibo;
	}

	public void setNrRecibo(Long nrRecibo) {
		this.nrRecibo = nrRecibo;
	}

	public LocalDateTime getDtHrVenda() {
		return dtHrVenda;
	}

	public void setDtHrVenda(LocalDateTime dtHrVenda) {
		this.dtHrVenda = dtHrVenda;
	}

	public BigDecimal getValorTotal() {
		return valorTotal;
	}

	public void setValorTotal(BigDecimal valorTotal) {
		this.valorTotal = valorTotal;
	}

	public Long getCdCliente() {
		return cdCliente;
	}

	public void setCdCliente(Long cdCliente) {
		this.cdCliente = cdCliente;
	}

	public String getTpPagamento() {
		return tpPagamento;
	}

	public void setTpPagamento(String tpPagamento) {
		this.tpPagamento = tpPagamento;
	}
    
    
}
