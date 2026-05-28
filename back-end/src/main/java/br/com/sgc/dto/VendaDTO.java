package br.com.sgc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CinemaVendaDto {

    @JsonProperty("nr_recibo")
    private Long nrRecibo;

    @JsonProperty("dt_hr_venda")
    private LocalDateTime dtHrVenda;

    @JsonProperty("valor_total")
    private BigDecimal valorTotal;

    @JsonProperty("cd_cliente")
    private Long cdCliente;

    @JsonProperty("tp_pagamento")
    private String tpPagamento;
}
