package persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import negocio.Pessoa;

public class PessoaDAO {

    public void persistir(Pessoa objPessoa) throws Exception {
        String sql = "INSERT INTO tb_cliente (cliente, telefone, email, cpf) VALUES (?, ?, ?, ?)";
        BancoDeDados db = new BancoDeDados();

        try (Connection conn = db.conectar();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, objPessoa.getCliente());
            ps.setString(2, objPessoa.getTelefone());
            ps.setString(3, objPessoa.getEmail());
            ps.setString(4, objPessoa.getCpf());

            ps.executeUpdate();
        }
    }
}
