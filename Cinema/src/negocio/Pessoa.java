package negocio;

import persistencia.PessoaDAO;

public class Pessoa {

    private int cdCliente;
    private String cliente;
    private String telefone;
    private String email;
    private String cpf;


    public Pessoa() {}

    public Pessoa(int cdCliente, String cliente, String telefone, String email, String cpf) {
        this.cdCliente = cdCliente;
        this.cliente = cliente;
        this.telefone = telefone;
        this.email = email;
        this.cpf = cpf;
    }

    public int getCdCliente() {
        return cdCliente;
    }

    public void setCdCliente(int cdCliente) {
        this.cdCliente = cdCliente;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void persistir() throws Exception {
        new PessoaDAO().persistir(this);
    }
}