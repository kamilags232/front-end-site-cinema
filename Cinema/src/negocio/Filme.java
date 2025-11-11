package negocio;

public class Filme {

    private int cdFilme;
    private String nome;

    public Filme() {}

    public Filme(int cdFilme, String nome) {
        this.cdFilme = cdFilme;
        this.nome = nome;
    }

    public int getCdFilme() {
        return cdFilme;
    }

    public void setCdFilme(int cdFilme) {
        this.cdFilme = cdFilme;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
