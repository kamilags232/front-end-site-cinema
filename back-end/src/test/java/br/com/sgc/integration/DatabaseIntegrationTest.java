package br.com.sgc.integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("mysql-test")
@EnabledIfEnvironmentVariable(named = "RUN_MYSQL_TESTS", matches = "true")
class DatabaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void devePersistirProdutoNoMysqlPorMeioDaApi() throws Exception {
        String token = gerarToken("produto.mysql@teste.com");

        String produtoJson = """
        {
          "nome": "Pipoca Grande",
          "descricao": "Pipoca salgada",
          "preco": 18.50,
          "estoque": 30,
          "estoqueMinimo": 5,
          "tipoProduto": "LANCHE"
        }
        """;

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
        String token = gerarToken("cliente.mysql@teste.com");

        String clienteJson = """
        {
          "nome": "Cliente Teste",
          "email": "cliente.mysql@teste.com",
          "cpf": "12345678901",
          "telefone": "11999999999",
          "endereco": "Rua de Teste"
        }
        """;

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
