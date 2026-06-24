package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class IngressoDTO {

    @JsonProperty("cd_ingresso")
    private Long cdIngresso;

    @JsonProperty("valor_ingresso")
    private BigDecimal valorIngresso;

    @JsonProperty("tp_ingresso")
    private String tpIngresso;

    @JsonProperty("cd_sessao")
    private Long cdSessao;

    @JsonProperty("cd_assento")
    private Long cdAssento;

    @JsonProperty("nr_recibo")
    private Long nrRecibo;

	public Long getCdIngresso() {
		return cdIngresso;
	}

	public void setCdIngresso(Long cdIngresso) {
		this.cdIngresso = cdIngresso;
	}

	public BigDecimal getValorIngresso() {
		return valorIngresso;
	}

	public void setValorIngresso(BigDecimal valorIngresso) {
		this.valorIngresso = valorIngresso;
	}

	public String getTpIngresso() {
		return tpIngresso;
	}

	public void setTpIngresso(String tpIngresso) {
		this.tpIngresso = tpIngresso;
	}

	public Long getCdSessao() {
		return cdSessao;
	}

	public void setCdSessao(Long cdSessao) {
		this.cdSessao = cdSessao;
	}

	public Long getCdAssento() {
		return cdAssento;
	}

	public void setCdAssento(Long cdAssento) {
		this.cdAssento = cdAssento;
	}

	public Long getNrRecibo() {
		return nrRecibo;
	}

	public void setNrRecibo(Long nrRecibo) {
		this.nrRecibo = nrRecibo;
	}
    
    
}
