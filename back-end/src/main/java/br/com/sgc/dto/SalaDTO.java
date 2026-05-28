package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CinemaSalaDto {

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
}
