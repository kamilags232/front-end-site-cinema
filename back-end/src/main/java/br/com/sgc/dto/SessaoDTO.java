package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class SessaoDTO {

    @JsonProperty("cd_sessao")
    private Long cdSessao;

    @JsonProperty("sessao")
    private String sessao;

    @JsonProperty("data_hora")
    private LocalDateTime dataHora;

    @JsonProperty("cd_filme")
    private Long cdFilme;

    @JsonProperty("cd_sala")
    private Long cdSala;

	public Long getCdSessao() {
		return cdSessao;
	}

	public void setCdSessao(Long cdSessao) {
		this.cdSessao = cdSessao;
	}

	public String getSessao() {
		return sessao;
	}

	public void setSessao(String sessao) {
		this.sessao = sessao;
	}

	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}

	public Long getCdFilme() {
		return cdFilme;
	}

	public void setCdFilme(Long cdFilme) {
		this.cdFilme = cdFilme;
	}

	public Long getCdSala() {
		return cdSala;
	}

	public void setCdSala(Long cdSala) {
		this.cdSala = cdSala;
	}
    
    
}