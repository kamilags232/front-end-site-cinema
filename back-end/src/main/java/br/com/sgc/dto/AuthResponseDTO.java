package br.com.sgc.dto;



public class AuthResponseDTO {
    private String token;
    private String email;
    private String nome;
    private String tipo;
    
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public AuthResponseDTO(String token, String email, String nome, String tipo) {
		super();
		this.token = token;
		this.email = email;
		this.nome = nome;
		this.tipo = tipo;
	}
    
}
