function login(event){
    event.preventDefault();

    const usuarioDigitado = document.getElementById("usuario").value;
    const senhaDigitada = document.getElementById("senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(u =>
        u.usuario === usuarioDigitado &&
        u.senha === senhaDigitada
    );

    if(encontrado){

        // salva usuário logado (COM OBJETO, igual seu index usa)
        localStorage.setItem("usuarioLogado", JSON.stringify({
            nome: encontrado.usuario
        }));

        alert("Login bem-sucedido!");

        window.location.href = "index.html";

    } else {
        alert("Usuário ou senha incorretos!");
    }
}