package br.com.sgc.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendaDTO {

    @NotNull(message = "Cliente ID é obrigatório")
    private Long clienteId;

    @NotNull(message = "Usuário ID é obrigatório")
    private Long usuarioId;

    @NotNull(message = "Tipo de pagamento é obrigatório")
    private String tipoPagamento;

    @NotEmpty(message = "Venda deve conter pelo menos um item")
    @Valid
    private List<ItemVendaDTO> itens;
}