package br.com.sgc.domain.model;

import java.math.BigDecimal;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "rl_venda_produto")

public class ItemVenda {

    @EmbeddedId
    private ItemVendaId id = new ItemVendaId();

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @Column(name = "valor_parcial", nullable = false, precision = 19, scale = 2)
    private BigDecimal valorParcial;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("cdProduto")
    @JoinColumn(name = "cd_produto", nullable = false)
    private Produto produto;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("nrRecibo")
    @JoinColumn(name = "nr_recibo", nullable = false)
    private Venda venda;

	public ItemVendaId getId() {
		return id;
	}

	public void setId(ItemVendaId id) {
		this.id = id;
	}

	public Venda getVenda() {
		return venda;
	}

	public void setVenda(Venda venda) {
		this.venda = venda;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public BigDecimal getValorParcial() {
		return valorParcial;
	}

	public void setValorParcial(BigDecimal valorParcial) {
		this.valorParcial = valorParcial;
	}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemVenda)) return false;
        ItemVenda itemVenda = (ItemVenda) o;
        return Objects.equals(id, itemVenda.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
