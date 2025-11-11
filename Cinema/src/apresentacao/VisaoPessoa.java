package apresentacao;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.math.BigDecimal;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;
import javax.swing.text.MaskFormatter;

import negocio.Ingresso;
import negocio.Pessoa;
import negocio.Venda;
import persistencia.FilmeDAO;
import persistencia.PessoaDAO;

public class VisaoPessoa extends JFrame {

    private static final long serialVersionUID = 1L;

    // Cliente
    private JLabel lblNome = new JLabel("Nome");
    private JTextField txtNome = new JTextField();

    private JLabel lblEmail = new JLabel("Email");
    private JTextField txtEmail = new JTextField();

    private JLabel lblCpf = new JLabel("CPF");
    private JFormattedTextField txtCpf;

    // Filme / Assento
    private JLabel lblFilme = new JLabel("Filme");
    private JComboBox<String> cbFilme;

    private JLabel lblAssento = new JLabel("Assento");
    private JTextField txtAssento = new JTextField();

    private JButton btnConfirmar = new JButton("Confirmar");

    public static void main(String[] args) {
        new VisaoPessoa().setVisible(true);
    }

    public VisaoPessoa() {
        setTitle("Venda de Ingresso - Cinema");
        setSize(420, 340);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(null);

        try {
            MaskFormatter cpfMask = new MaskFormatter("###.###.###-##");
            cpfMask.setPlaceholderCharacter('_');
            txtCpf = new JFormattedTextField(cpfMask);
        } catch (Exception e) {
            e.printStackTrace();
            txtCpf = new JFormattedTextField(); // fallback
        }

        // criar/popular combo de filmes (no construtor)
        String[] filmes = {
            "Vingadores: A Última Batalha",
            "Interestelar",
            "Oppenheimer",
            "Duna 2"
        };
        cbFilme = new JComboBox<>(filmes);

        // layout componentes
        lblNome.setBounds(10, 10, 200, 20);
        add(lblNome);
        txtNome.setBounds(10, 30, 380, 20);
        add(txtNome);

        lblEmail.setBounds(10, 60, 200, 20);
        add(lblEmail);
        txtEmail.setBounds(10, 80, 380, 20);
        add(txtEmail);

        lblCpf.setBounds(10, 110, 200, 20);
        add(lblCpf);
        txtCpf.setBounds(10, 130, 160, 20);
        add(txtCpf);

        lblFilme.setBounds(10, 160, 200, 20);
        add(lblFilme);
        cbFilme.setBounds(10, 180, 380, 20);
        add(cbFilme);

        lblAssento.setBounds(10, 210, 200, 20);
        add(lblAssento);
        txtAssento.setBounds(10, 230, 160, 20);
        add(txtAssento);

        btnConfirmar.setBounds(140, 270, 120, 30);
        add(btnConfirmar);

        // ação do botão: 1) cliente 2) venda 3) ingresso
        btnConfirmar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    // validações simples
                    String nome = txtNome.getText().trim();
                    String email = txtEmail.getText().trim();
                    String cpf = txtCpf.getText().trim();
                    String assento = txtAssento.getText().trim();
                    String filmeEscolhido = (String) cbFilme.getSelectedItem();

                    if (nome.isEmpty()) {
                        JOptionPane.showMessageDialog(null, "Preencha o nome.");
                        return;
                    }
                    if (email.isEmpty()) {
                        JOptionPane.showMessageDialog(null, "Preencha o email.");
                        return;
                    }
                    if (cpf.isEmpty() || cpf.contains("_")) {
                        JOptionPane.showMessageDialog(null, "CPF incompleto.");
                        return;
                    }
                    if (assento.isEmpty()) {
                        JOptionPane.showMessageDialog(null, "Preencha o assento (ex: A5).");
                        return;
                    }

                    // 1) gravar cliente e obter cd_cliente
                    Pessoa p = new Pessoa();
                    p.setCliente(nome);
                    p.setEmail(email);
                    p.setCpf(cpf);
                    int cdCliente = new PessoaDAO().persistir(p);

                    // 2) descobrir cd_filme e cd_sessao automaticamente
                    int cdFilme = FilmeDAO.getCodigoDoFilme(filmeEscolhido);
                    int cdSessao = FilmeDAO.getSessaoPorFilme(cdFilme);

                    // 3) gravar venda e obter recibo
                    Venda v = new Venda(cdCliente, new BigDecimal("20.00"));
                    int recibo = v.persistir();

                    // 4) gravar ingresso associado à sessão e ao recibo
                    Ingresso i = new Ingresso(assento, cdSessao, recibo);
                    i.persistir();

                    JOptionPane.showMessageDialog(null, "Ingresso vendido com sucesso!\nRecibo: " + recibo);

                    // limpar campos
                    txtNome.setText("");
                    txtEmail.setText("");
                    txtCpf.setValue(null);
                    txtAssento.setText("");

                } catch (Exception ex) {
                    ex.printStackTrace();
                    JOptionPane.showMessageDialog(null, "Erro: " + ex.getMessage());
                }
            }
        });
    }
}
