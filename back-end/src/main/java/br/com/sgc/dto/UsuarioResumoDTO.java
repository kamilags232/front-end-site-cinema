package br.com.sgc.dto;

import br.com.sgc.domain.model.Usuario;

public class UsuarioResumoDTO {

    private Long id;
    private String nome;
    private String email;
    private String tipo;

    public UsuarioResumoDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.tipo = usuario.getTipo();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTipo() {
        return tipo;
    }
}
