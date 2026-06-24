package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SalaDTO {

    @JsonProperty("cd_sala")
    private Long cdSala;

    @JsonProperty("sala")
    private Integer sala;

    @JsonProperty("capacidade")
    private Integer capacidade;

    @JsonProperty("tp_sala")
    private String tpSala;

    @JsonProperty("dublagem")
    private String dublagem;

	public Long getCdSala() {
		return cdSala;
	}

	public void setCdSala(Long cdSala) {
		this.cdSala = cdSala;
	}

	public Integer getSala() {
		return sala;
	}

	public void setSala(Integer sala) {
		this.sala = sala;
	}

	public Integer getCapacidade() {
		return capacidade;
	}

	public void setCapacidade(Integer capacidade) {
		this.capacidade = capacidade;
	}

	public String getTpSala() {
		return tpSala;
	}

	public void setTpSala(String tpSala) {
		this.tpSala = tpSala;
	}

	public String getDublagem() {
		return dublagem;
	}

	public void setDublagem(String dublagem) {
		this.dublagem = dublagem;
	}
    
    
}
