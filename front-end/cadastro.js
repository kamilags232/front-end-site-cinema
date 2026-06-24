function cadastrar(event){
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if(senha !== confirmarSenha){
        alert("As senhas não conferem!");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.usuario === usuario);

    if(existe){
        alert("Usuário já existe!");
        return;
    }

    usuarios.push({
        nome,
        usuario,
        email,
        senha
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro bem-sucedido!");

    window.location.href = "login.html";
}