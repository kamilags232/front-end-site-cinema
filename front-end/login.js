function login(event) {
    event.preventDefault();

    const usuarioDigitado = document.getElementById("usuario").value.trim();
    const senhaDigitada = document.getElementById("senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(u => {
        const loginUsuario = u.usuario === usuarioDigitado;
        const loginEmail = u.email === usuarioDigitado;
        return (loginUsuario || loginEmail) && u.senha === senhaDigitada;
    });

    if (!encontrado) {
        alert("Usuário ou senha incorretos!");
        return;
    }

    if (encontrado.status === "inativo") {
        alert("Esta conta está inativa. Fale com um gestor ou administrador.");
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify({
        nome: encontrado.nome || encontrado.usuario,
        usuario: encontrado.usuario,
        email: encontrado.email,
        papel: encontrado.papel || "funcionario"
    }));

    alert("Login bem-sucedido!");
    window.location.href = "index.html";
}
