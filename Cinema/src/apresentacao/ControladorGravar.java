package apresentacao;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JOptionPane;
import javax.swing.JTextField;

import negocio.Pessoa;

public class ControladorGravar implements ActionListener {
	//Propriedades da classe
	private JTextField txtNome = null;
	private JTextField txtEmail = null;
	private JTextField txtTelefone = null;
	private JTextField txtCpf = null;	
	
	public ControladorGravar(JTextField txtNome, JTextField txtEmail, JTextField txtTelefone, JTextField txtCpf) {
		super();
		this.txtNome = txtNome;
		this.txtEmail = txtEmail;
		this.txtTelefone = txtTelefone;
		this.txtCpf = txtCpf;
	}

	// Método implementado da interface
	public void actionPerformed(ActionEvent e) {
		try {
			Pessoa objPessoa = new Pessoa();
			
			objPessoa.setCliente(txtNome.getText());
			objPessoa.setEmail(txtEmail.getText());
			objPessoa.setTelefone(txtTelefone.getText());
			objPessoa.setCpf(txtCpf.getText());

			
			objPessoa.persistir();
			JOptionPane.showMessageDialog(null, "Gravação com Sucesso !");
		} catch (Exception erro) {
			JOptionPane.showMessageDialog(null, erro);
		}
		
		if(txtCpf.getText().contains("_")) {
		    JOptionPane.showMessageDialog(null, "CPF incompleto!");
		    return;
		}

	}

}
