const API_URL = "http://localhost:8080";

async function login(event) {
    event.preventDefault();

    const emailDigitado = document.getElementById("usuario").value.trim();
    const senhaDigitada = document.getElementById("senha").value;

    try {
        const resposta = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailDigitado,
                senha: senhaDigitada
            })
        });

        if (!resposta.ok) {
            alert("Email ou senha incorretos.");
            return;
        }

        const dados = await resposta.json();

        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuarioLogado", JSON.stringify({
            nome: dados.nome,
            email: dados.email,
            usuario: dados.email === "Anna.ns@cinemonroll.com" ? "Anna.ns" : dados.email,
            papel: dados.tipo || (dados.email === "Anna.ns@cinemonroll.com" ? "admin" : "funcionario")
        }));

        alert("Login bem-sucedido!");
        window.location.href = "index.html";
    } catch (erro) {
        console.error("Erro ao conectar com o servidor:", erro);
        alert("Nao foi possivel conectar ao servidor. Verifique se o back-end esta rodando.");
    }
}
