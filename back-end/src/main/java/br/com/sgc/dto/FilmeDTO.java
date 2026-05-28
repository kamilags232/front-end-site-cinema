package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalTime;

@Data
public class CinemaFilmeDto {

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
}
