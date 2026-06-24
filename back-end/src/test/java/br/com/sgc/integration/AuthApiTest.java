package br.com.sgc.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void deveRegistrarUsuario() throws Exception {
        String json = """
                {
                "nome": "Usuario Teste",
                "email": "teste@teste.com",
                "senha": "123456"
                }
                """;
        mockMvc.perform(post("/auth/register")
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk());
    }
    @Test
    void deveFazerLoginComUsuarioRegistrado() throws Exception {
        String registro = """
        {
          "nome": "Usuario Login",
          "email": "login@teste.com",
          "senha": "123456"
        }
        """;

        mockMvc.perform(post("/auth/register")
                        .contentType("application/json")
                        .content(registro))
                .andExpect(status().isOk());

        String login = """
        {
          "email": "login@teste.com",
          "senha": "123456"
        }
        """;

        mockMvc.perform(post("/auth/login")
                        .contentType("application/json")
                        .content(login))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.email").value("login@teste.com"));
    }
    @Test
    void deveBloquearProdutosSemToken() throws Exception {
        mockMvc.perform(get("/produtos"))
                .andExpect(status().isForbidden());
    }

    @Test
    void naoDeveFazerLoginComSenhaErrada() throws Exception {
        String registro = """
        {
          "nome": "Usuario Senha Errada",
          "email": "senha-errada@teste.com",
          "senha": "123456"
        }
        """;

        mockMvc.perform(post("/auth/register")
                        .contentType("application/json")
                        .content(registro))
                .andExpect(status().isOk());

        String login = """
        {
          "email": "senha-errada@teste.com",
          "senha": "senha-incorreta"
        }
        """;

        mockMvc.perform(post("/auth/login")
                        .contentType("application/json")
                        .content(login))
                .andExpect(status().isBadRequest());
    }
}
