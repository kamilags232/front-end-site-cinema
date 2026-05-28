package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CinemaSessaoDto {

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
}
