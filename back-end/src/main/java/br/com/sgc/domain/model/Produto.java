package br.com.sgc.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_produto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cd_produto")
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @Column(length = 255)
    private String descricao;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.0", inclusive = true, message = "Preço não pode ser negativo")
    @Column(nullable = false)
    private BigDecimal preco;

    @NotNull
    @Min(value = 0, message = "Estoque não pode ser negativo")
    @Column(nullable = false)
    private Integer estoque;

    @Column(name = "estoque_minimo")
    private Integer estoqueMinimo = 5;

    @NotBlank
    @Column(name = "tipo_produto")
    private String tipoProduto;
}