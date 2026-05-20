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
class DatabaseIntegrationTest {

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
    void devePersistirProdutoNoMysqlPorMeioDaApi() throws Exception {
        String sufixo = UUID.randomUUID().toString().substring(0, 8);
        String token = gerarToken("produto.mysql." + sufixo + "@teste.com");

        String produtoJson = """
        {
          "nome": "Pipoca Grande %s",
          "descricao": "Pipoca salgada",
          "preco": 18.50,
          "estoque": 30,
          "estoqueMinimo": 5,
          "tipoProduto": "EXTRA"
        }
        """.formatted(sufixo);

        MvcResult criacao = mockMvc.perform(post("/produtos")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(produtoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.nome").value("Pipoca Grande"))
                .andReturn();

        long produtoId = lerCampoLong(criacao, "id");

        mockMvc.perform(get("/produtos/" + produtoId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Pipoca Grande"))
                .andExpect(jsonPath("$.preco").value(18.50))
                .andExpect(jsonPath("$.estoque").value(30));
    }

    @Test
    void devePersistirClienteERejeitarCpfDuplicadoNoMysqlPorMeioDaApi() throws Exception {
        String sufixo = UUID.randomUUID().toString().substring(0, 8);
        String token = gerarToken("cliente.mysql." + sufixo + "@teste.com");

        String clienteJson = """
        {
          "nome": "Cliente Teste %s",
          "email": "cliente.mysql.%s@teste.com",
          "cpf": "1234567%s",
          "telefone": "11999999999",
          "endereco": "Rua de Teste"
        }
        """.formatted(sufixo, sufixo, sufixo.substring(0, 4));

        mockMvc.perform(post("/clientes")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(clienteJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.cpf").value("12345678901"));

        mockMvc.perform(post("/clientes")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(clienteJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("CPF")));
    }

    private String gerarToken(String email) throws Exception {
        String registro = """
        {
          "nome": "Usuario MySQL",
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

    private String lerCampoTexto(MvcResult resposta, String campo) throws Exception {
        JsonNode json = objectMapper.readTree(resposta.getResponse().getContentAsString());
        return json.get(campo).asText();
    }

    private long lerCampoLong(MvcResult resposta, String campo) throws Exception {
        JsonNode json = objectMapper.readTree(resposta.getResponse().getContentAsString());
        return json.get(campo).asLong();
    }
}
