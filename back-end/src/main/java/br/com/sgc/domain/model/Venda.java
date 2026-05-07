package br.com.sgc.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_venda")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nr_recibo")
    private Long id;

    @Column(name = "dt_hr_venda")
    private LocalDateTime dataHora;

    @Column(name = "valor_total")
    private BigDecimal valorTotal;

    @ManyToOne
    @JoinColumn(name = "cd_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "cd_usuario")
    private Usuario usuario;

    @Column(name = "tp_pagamento")
    private String tipoPagamento;

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL)
    private List<ItemVenda> itens;
}