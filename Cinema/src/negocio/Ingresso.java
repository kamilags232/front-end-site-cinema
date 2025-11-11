package negocio;

import persistencia.IngressoDAO;

public class Ingresso {

    private int cdIngresso;
    private String assento;
    private int cdSessao;
    private int nrRecibo;

    public Ingresso() {}

    public Ingresso(String assento, int cdSessao, int nrRecibo) {
        this.assento = assento;
        this.cdSessao = cdSessao;
        this.nrRecibo = nrRecibo;
    }

    public int getCdIngresso() {
        return cdIngresso;
    }

    public String getAssento() {
        return assento;
    }

    public int getCdSessao() {
        return cdSessao;
    }

    public int getNrRecibo() {
        return nrRecibo;
    }

    public void persistir() throws Exception {
        new IngressoDAO().persistir(this);
    }
}
