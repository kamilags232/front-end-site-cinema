package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class VendaLancheDTO {

    @JsonProperty("nr_recibo")
    private Long nrRecibo;

    @JsonProperty("cd_lanche")
    private Long cdLanche;

    @JsonProperty("nome_lanche")
    private String nomeLanche;

    @JsonProperty("quantidade")
    private Integer quantidade;

    @JsonProperty("valor_parcial")
    private BigDecimal valorParcial;

	public Long getNrRecibo() {
		return nrRecibo;
	}

	public void setNrRecibo(Long nrRecibo) {
		this.nrRecibo = nrRecibo;
	}

	public Long getCdLanche() {
		return cdLanche;
	}

	public void setCdLanche(Long cdLanche) {
		this.cdLanche = cdLanche;
	}

	public String getNomeLanche() {
		return nomeLanche;
	}

	public void setNomeLanche(String nomeLanche) {
		this.nomeLanche = nomeLanche;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public BigDecimal getValorParcial() {
		return valorParcial;
	}

	public void setValorParcial(BigDecimal valorParcial) {
		this.valorParcial = valorParcial;
	}
    
    
}
