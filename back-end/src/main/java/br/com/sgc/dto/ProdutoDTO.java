package br.com.sgc.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class ProdutoDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;

    @Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres")
    private String descricao;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    private BigDecimal preco;

    @NotNull(message = "Estoque é obrigatório")
    @Min(value = 0, message = "Estoque não pode ser negativo")
    private Integer estoque;

    @Min(value = 0, message = "Estoque mínimo não pode ser negativo")
    private Integer estoqueMinimo;

    @NotBlank(message = "Tipo de produto é obrigatório")
    private String tipoProduto;

    public ProdutoDTO() {
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

	public ProdutoDTO(
			@NotBlank(message = "Nome é obrigatório") @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres") String nome,
			@Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres") String descricao,
			@NotNull(message = "Preço é obrigatório") @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero") BigDecimal preco,
			@NotNull(message = "Estoque é obrigatório") @Min(value = 0, message = "Estoque não pode ser negativo") Integer estoque,
			@Min(value = 0, message = "Estoque mínimo não pode ser negativo") Integer estoqueMinimo,
			@NotBlank(message = "Tipo de produto é obrigatório") String tipoProduto) {
		super();
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.estoque = estoque;
		this.estoqueMinimo = estoqueMinimo;
		this.tipoProduto = tipoProduto;
	}
    
    
	
}
