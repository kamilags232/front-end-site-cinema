package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;


import java.time.LocalTime;


public class FilmeDTO {

    @JsonProperty("cd_filme")
    private Long cdFilme;

    @JsonProperty("filme")
    private String filme;

    @JsonProperty("duracao")
    private LocalTime duracao;

    @JsonProperty("classe_etaria")
    private String classeEtaria;

    @JsonProperty("tp_filme")
    private String tpFilme;

	public Long getCdFilme() {
		return cdFilme;
	}

	public void setCdFilme(Long cdFilme) {
		this.cdFilme = cdFilme;
	}

	public String getFilme() {
		return filme;
	}

	public void setFilme(String filme) {
		this.filme = filme;
	}

	public LocalTime getDuracao() {
		return duracao;
	}

	public void setDuracao(LocalTime duracao) {
		this.duracao = duracao;
	}

	public String getClasseEtaria() {
		return classeEtaria;
	}

	public void setClasseEtaria(String classeEtaria) {
		this.classeEtaria = classeEtaria;
	}

	public String getTpFilme() {
		return tpFilme;
	}

	public void setTpFilme(String tpFilme) {
		this.tpFilme = tpFilme;
	}
    
    
}
