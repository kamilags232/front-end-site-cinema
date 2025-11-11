package persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import negocio.Ingresso;

public class IngressoDAO {

    public void persistir(Ingresso obj) throws Exception {
        String sql = "INSERT INTO tb_ingresso (valor_ingresso, assento, tp_ingresso, cd_sessao, nr_recibo) "
                   + "VALUES ( ?, ?, ?, ?, ?)";

        BancoDeDados db = new BancoDeDados();

        try (Connection conn = db.conectar();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setBigDecimal(1, new java.math.BigDecimal("20.00")); // valor padrão do ingresso
            ps.setString(2, obj.getAssento());
            ps.setString(3, "normal"); // tipo de ingresso default
            ps.setInt(4, obj.getCdSessao());
            ps.setInt(5, obj.getNrRecibo());

            ps.executeUpdate();
        }
    }
}
