package br.com.sgc.domain.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "rl_venda_produto")

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
    
    
}

