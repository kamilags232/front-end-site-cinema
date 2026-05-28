package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CinemaVendaLancheDto {

    @JsonProperty("nr_recibo")
    private Long nrRecibo;

    @JsonProperty("cd_lanche")
    private Long cdLanche;

    @JsonProperty("quantidade")
    private Integer quantidade;

    @JsonProperty("valor_parcial")
    private BigDecimal valorParcial;
}
