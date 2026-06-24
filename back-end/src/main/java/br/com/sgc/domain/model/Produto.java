package br.com.sgc.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "tb_produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cd_produto")
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "descricao", length = 255)
    private String descricao;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.0", inclusive = true, message = "Preço não pode ser negativo")
    @Column(name = "preco", nullable = false, precision = 19, scale = 2)
    private BigDecimal preco;

    @NotNull(message = "Estoque é obrigatório")
    @Min(value = 0, message = "Estoque não pode ser negativo")
    @Column(name = "estoque", nullable = false)
    private Integer estoque = 0;

    @Column(name = "estoque_minimo")
    private Integer estoqueMinimo = 5;

    @NotBlank(message = "Tipo de produto é obrigatório")
    @Column(name = "tipo_produto")
    private String tipoProduto;
    
    

	public Produto() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public Integer getEstoque() {
		return estoque;
	}

	public void setEstoque(Integer estoque) {
		this.estoque = estoque;
	}

	public Integer getEstoqueMinimo() {
		return estoqueMinimo;
	}

	public void setEstoqueMinimo(Integer estoqueMinimo) {
		this.estoqueMinimo = estoqueMinimo;
	}

	public String getTipoProduto() {
		return tipoProduto;
	}

	public void setTipoProduto(String tipoProduto) {
		this.tipoProduto = tipoProduto;
	}

	public Produto(Long id, @NotBlank(message = "Nome é obrigatório") String nome, String descricao,
			@NotNull(message = "Preço é obrigatório") @DecimalMin(value = "0.0", inclusive = true, message = "Preço não pode ser negativo") BigDecimal preco,
			@NotNull @Min(value = 0, message = "Estoque não pode ser negativo") Integer estoque, Integer estoqueMinimo,
			@NotBlank String tipoProduto) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.estoque = estoque;
		this.estoqueMinimo = estoqueMinimo;
		this.tipoProduto = tipoProduto;
	}
    
	
    
}
