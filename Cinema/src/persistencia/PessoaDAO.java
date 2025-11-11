package persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import negocio.Pessoa;

public class PessoaDAO {
	public int persistir(Pessoa objPessoa) throws Exception {
	    String sql = "INSERT INTO tb_cliente (cliente, email, cpf) VALUES (?, ?, ?)";
	    BancoDeDados db = new BancoDeDados();
	    int cdGerado = 0;

	    try (Connection conn = db.conectar();
	         PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

	        ps.setString(1, objPessoa.getCliente());
	        ps.setString(2, objPessoa.getEmail());
	        ps.setString(3, objPessoa.getCpf());
	        ps.executeUpdate();

	        ResultSet rs = ps.getGeneratedKeys();
	        if (rs.next()) {
	            cdGerado = rs.getInt(1);
	        }
	    }

	    objPessoa.setCdCliente(cdGerado);
	    return cdGerado;
	}

}
