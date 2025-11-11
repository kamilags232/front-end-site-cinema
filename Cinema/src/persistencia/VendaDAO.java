package persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import negocio.Venda;

public class VendaDAO {

    public int persistir(Venda obj) throws Exception {
        String sql = "INSERT INTO tb_venda (dt_hr_venda, valor_total, cd_cliente) "
                   + "VALUES (NOW(), ?, ?)";

        BancoDeDados db = new BancoDeDados();
        int reciboGerado = 0;

        try (Connection conn = db.conectar();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setBigDecimal(1, obj.getValorTotal());
            ps.setInt(2, obj.getCdCliente());

            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                reciboGerado = rs.getInt(1);
            }
        }

        obj.setNrRecibo(reciboGerado);
        return reciboGerado;
    }
}
