package br.com.sgc.integration;

import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("mysql-test")
@EnabledIfEnvironmentVariable(named = "RUN_MYSQL_TESTS", matches = "true")
class VendaDomainIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void limparBancoDeTeste() {
        jdbcTemplate.execute("set foreign_key_checks = 0");
        jdbcTemplate.execute("truncate table rl_venda_produto");
        jdbcTemplate.execute("truncate table tb_venda");
        jdbcTemplate.execute("truncate table tb_cliente");
        jdbcTemplate.execute("truncate table tb_produto");
        jdbcTemplate.execute("truncate table tb_usuario");
        jdbcTemplate.execute("set foreign_key_checks = 1");
    }

    @Test
    void deveCriarVendaComTotalCalculadoEItensPersistidosNoMysql() throws Exception {
        String sufixo = gerarSufixoNumerico();
        String email = "venda.mysql." + sufixo + "@teste.com";
        String token = gerarToken(email);
        long usuarioId = buscarUsuarioIdPorEmail(email);
        String cpf = gerarCpfValido();
        long clienteId = criarCliente(token, "Cliente Venda " + sufixo, "cliente.venda." + sufixo + "@teste.com", cpf);
        long produtoId = criarProduto(token, "Combo Cinema " + sufixo, "Combo com pipoca e refrigerante", "25.50", 10);

        String vendaJson = """
        {
          "clienteId": %d,
          "usuarioId": %d,
          "tipoPagamento": "CARTAO",
          "itens": [
            {
              "produtoId": %d,
              "quantidade": 2
            }
          ]
        }
        """.formatted(clienteId, usuarioId, produtoId);

        MvcResult criacao = mockMvc.perform(post("/vendas")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(vendaJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.valorTotal").value(51.00))
                .andExpect(jsonPath("$.tipoPagamento").value("CARTAO"))
                .andExpect(jsonPath("$.itens[0].quantidade").value(2))
                .andExpect(jsonPath("$.itens[0].valorParcial").value(51.00))
                .andReturn();

        long vendaId = lerCampoLong(criacao, "id");

        mockMvc.perform(get("/vendas/" + vendaId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(vendaId))
                .andExpect(jsonPath("$.valorTotal").value(51.00))
                .andExpect(jsonPath("$.itens[0].produto.id").value(produtoId));
    }

    @Test
    void naoDeveCriarVendaQuandoEstoqueForInsuficienteNoMysql() throws Exception {
        String sufixo = gerarSufixoNumerico();
        String email = "estoque.mysql." + sufixo + "@teste.com";
        String token = gerarToken(email);
        long usuarioId = buscarUsuarioIdPorEmail(email);
        String cpf = gerarCpfValido();
        long clienteId = criarCliente(token, "Cliente Estoque " + sufixo, "cliente.estoque." + sufixo + "@teste.com", cpf);
        long produtoId = criarProduto(token, "Chocolate " + sufixo, "Chocolate pequeno", "8.00", 1);

        String vendaJson = """
        {
          "clienteId": %d,
          "usuarioId": %d,
          "tipoPagamento": "PIX",
          "itens": [
            {
              "produtoId": %d,
              "quantidade": 2
            }
          ]
        }
        """.formatted(clienteId, usuarioId, produtoId);

        mockMvc.perform(post("/vendas")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(vendaJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Estoque insuficiente")));
    }

    private String gerarToken(String email) throws Exception {
        String registro = """
        {
          "nome": "Usuario Venda",
          "email": "%s",
          "senha": "123456"
        }
        """.formatted(email);

        mockMvc.perform(post("/auth/register")
                        .contentType("application/json")
                        .content(registro))
                .andExpect(status().isOk());

        String login = """
        {
          "email": "%s",
          "senha": "123456"
        }
        """.formatted(email);

        MvcResult resposta = mockMvc.perform(post("/auth/login")
                        .contentType("application/json")
                        .content(login))
                .andExpect(status().isOk())
                .andReturn();

        return lerCampoTexto(resposta, "token");
    }

    private long buscarUsuarioIdPorEmail(String email) {
        return jdbcTemplate.queryForObject(
                "select cd_usuario from tb_usuario where email = ?",
                Long.class,
                email
        );
    }

    private long criarCliente(String token, String nome, String email, String cpf) throws Exception {
        String clienteJson = """
        {
          "nome": "%s",
          "email": "%s",
          "cpf": "%s",
          "telefone": "11999999999",
          "endereco": "Rua de Teste"
        }
        """.formatted(nome, email, cpf);

        MvcResult resposta = mockMvc.perform(post("/clientes")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(clienteJson))
                .andExpect(status().isOk())
                .andReturn();

        return lerCampoLong(resposta, "id");
    }

    private long criarProduto(String token, String nome, String descricao, String preco, int estoque) throws Exception {
        String produtoJson = """
        {
          "nome": "%s",
          "descricao": "%s",
          "preco": %s,
          "estoque": %d,
          "estoqueMinimo": 1,
          "tipoProduto": "EXTRA"
        }
        """.formatted(nome, descricao, preco, estoque);

        MvcResult resposta = mockMvc.perform(post("/produtos")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(produtoJson))
                .andExpect(status().isOk())
                .andReturn();

        return lerCampoLong(resposta, "id");
    }

    private String gerarSufixoNumerico() {
        long numeroBase = Math.abs(UUID.randomUUID().getMostSignificantBits()) % 100000000L;
        return String.format("%08d", numeroBase);
    }

    private String gerarCpfValido() {
        long numeroBase = Math.abs(UUID.randomUUID().getLeastSignificantBits()) % 100000000000L;
        return String.format("%011d", numeroBase);
    }

    private String lerCampoTexto(MvcResult resposta, String campo) throws Exception {
        JsonNode json = objectMapper.readTree(resposta.getResponse().getContentAsString());
        return json.get(campo).asText();
    }

    private long lerCampoLong(MvcResult resposta, String campo) throws Exception {
        JsonNode json = objectMapper.readTree(resposta.getResponse().getContentAsString());
        return json.get(campo).asLong();
    }
}