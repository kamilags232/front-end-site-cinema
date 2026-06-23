package br.com.sgc.dto;

import jakarta.validation.constraints.NotBlank;

public class RegisterRequestDTO {
	
	@NotBlank
	private String nome;
	@NotBlank
	private String email;
	@NotBlank 
	private String senha;
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}

	
}
