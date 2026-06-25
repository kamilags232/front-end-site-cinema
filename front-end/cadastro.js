const API_URL = "http://localhost:8080";

async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas nao conferem.");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        });

        if (!resposta.ok) {
            const mensagem = await resposta.text();
            alert(mensagem || "Nao foi possivel criar a conta.");
            return;
        }

        alert("Conta criada com sucesso. Faca login para continuar.");
        window.location.href = "login.html";
    } catch (erro) {
        console.error("Erro ao conectar com o servidor:", erro);
        alert("Nao foi possivel conectar ao servidor. Verifique se o back-end esta rodando.");
    }
}
