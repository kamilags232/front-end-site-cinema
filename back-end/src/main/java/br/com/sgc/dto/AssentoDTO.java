package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;


public class AssentoDTO {

    @JsonProperty("cd_assento")
    private Long cdAssento;

    @JsonProperty("numero_assento")
    private String numeroAssento;

    @JsonProperty("ocupado")
    private Boolean ocupado;

    @JsonProperty("cd_sessao")
    private Long cdSessao;

	public Long getCdAssento() {
		return cdAssento;
	}

	public void setCdAssento(Long cdAssento) {
		this.cdAssento = cdAssento;
	}

	public String getNumeroAssento() {
		return numeroAssento;
	}

	public void setNumeroAssento(String numeroAssento) {
		this.numeroAssento = numeroAssento;
	}

	public Boolean getOcupado() {
		return ocupado;
	}

	public void setOcupado(Boolean ocupado) {
		this.ocupado = ocupado;
	}

	public Long getCdSessao() {
		return cdSessao;
	}

	public void setCdSessao(Long cdSessao) {
		this.cdSessao = cdSessao;
	}
    
    
}
