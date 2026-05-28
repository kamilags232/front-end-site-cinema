package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CinemaIngressoDto {

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
}
