package persistencia;

import java.sql.*;

public class FilmeDAO {

    public static int getCodigoDoFilme(String nomeFilme) throws Exception {
        String sql = "SELECT cd_filme FROM tb_filme WHERE filme = ?";
        BancoDeDados db = new BancoDeDados();

        try (Connection conn = db.conectar();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, nomeFilme);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return rs.getInt("cd_filme");
            } else {
                throw new Exception("Filme não encontrado!");
            }
        }
    }

    public static int getSessaoPorFilme(int cdFilme) throws Exception {
        String sql = "SELECT cd_sessao FROM tb_sessao WHERE cd_filme = ? LIMIT 1";
        BancoDeDados db = new BancoDeDados();

        try (Connection conn = db.conectar();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, cdFilme);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return rs.getInt("cd_sessao");
            } else {
                throw new Exception("Nenhuma sessão foi encontrada para esse filme!");
            }
        }
    }
}
