package br.com.sgc.dto;

public class RegisterRequestDTO {
	private String nome;
    private String email;
    private String senha;

    
    public RegisterRequestDTO() {}


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
