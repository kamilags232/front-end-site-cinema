package negocio;

import persistencia.PessoaDAO;

public class Pessoa {

    private int cdCliente;
    private String cpf;
    private String nome;
    private String telefone;
    private String email;

    public Pessoa() {}

    public Pessoa(int cdCliente, String cpf, String nome, String telefone, String email) {
        this.cdCliente = cdCliente;
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }

    public int getCdCliente() {
        return cdCliente;
    }

    public void setCdCliente(int cdCliente) {
        this.cdCliente = cdCliente;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void persistir() throws Exception {
        new PessoaDAO().persistir(this);
    }
}