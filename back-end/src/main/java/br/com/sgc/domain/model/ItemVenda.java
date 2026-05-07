package br.com.sgc.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "rl_venda_produto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemVenda {

    @EmbeddedId
    private ItemVendaId id;

    @ManyToOne
    @MapsId("nrRecibo")
    @JoinColumn(name = "nr_recibo")
    private Venda venda;

    @ManyToOne
    @MapsId("cdProduto")
    @JoinColumn(name = "cd_produto")
    private Produto produto;

    private Integer quantidade;

    @Column(name = "valor_parcial")
    private BigDecimal valorParcial;
}

