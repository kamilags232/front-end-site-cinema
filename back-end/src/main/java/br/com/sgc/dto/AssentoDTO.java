package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CinemaAssentoDto {

    @JsonProperty("cd_assento")
    private Long cdAssento;

    @JsonProperty("numero_assento")
    private String numeroAssento;

    @JsonProperty("ocupado")
    private Boolean ocupado;

    @JsonProperty("cd_sessao")
    private Long cdSessao;
}
