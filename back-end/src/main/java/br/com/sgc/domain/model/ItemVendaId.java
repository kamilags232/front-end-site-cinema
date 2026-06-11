package br.com.sgc.domain.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ItemVendaId implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 3936585940869309849L;
	private Long nrRecibo;
    private Long cdProduto;

    public ItemVendaId() {
    }

    public ItemVendaId(Long nrRecibo, Long cdProduto) {
        this.nrRecibo = nrRecibo;
        this.cdProduto = cdProduto;
    }

    public Long getNrRecibo() {
        return nrRecibo;
    }

    public void setNrRecibo(Long nrRecibo) {
        this.nrRecibo = nrRecibo;
    }

    public Long getCdProduto() {
        return cdProduto;
    }

    public void setCdProduto(Long cdProduto) {
        this.cdProduto = cdProduto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemVendaId)) return false;
        ItemVendaId that = (ItemVendaId) o;
        return Objects.equals(nrRecibo, that.nrRecibo) &&
                Objects.equals(cdProduto, that.cdProduto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nrRecibo, cdProduto);
    }
}