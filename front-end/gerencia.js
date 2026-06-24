// =============================
// USUÁRIO LOGADO
// =============================

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
    window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuario.nome;


// =============================
// DADOS TEMPORÁRIOS
// (Depois virão do banco)
// =============================

const funcionarios = [

    {
        id:1,
        nome:"João Silva",
        email:"joao@cinemonroll.com",
        cargo:"Administrador"
    },

    {
        id:2,
        nome:"Maria Oliveira",
        email:"maria@cinemonroll.com",
        cargo:"Funcionária"
    },

    {
        id:3,
        nome:"Carlos Souza",
        email:"carlos@cinemonroll.com",
        cargo:"Gerente"
    }

];


// =============================
// CARDS
// =============================

document.getElementById("funcionarios").textContent = funcionarios.length;

document.getElementById("produtos").textContent = 96;

document.getElementById("vendas").textContent = "R$ 3.250";

document.getElementById("estoque").textContent = 5;


// =============================
// TABELA
// =============================

const tabela = document.getElementById("listaUsuarios");

function carregarTabela(){

    tabela.innerHTML = "";

    funcionarios.forEach(funcionario=>{

        tabela.innerHTML += `

        <tr>

            <td>${funcionario.nome}</td>

            <td>${funcionario.email}</td>

            <td>${funcionario.cargo}</td>

            <td>

                <button
                class="editar"
                onclick="editarUsuario(${funcionario.id})">

                <i class="fa-solid fa-pen"></i>

                </button>

                <button
                class="excluir"
                onclick="excluirUsuario(${funcionario.id})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

carregarTabela();


// =============================
// EDITAR
// =============================

function editarUsuario(id){

    const usuario = funcionarios.find(u=>u.id===id);

    alert("Editar usuário:\n\n"+usuario.nome);

}


// =============================
// EXCLUIR
// =============================

function excluirUsuario(id){

    const indice = funcionarios.findIndex(u=>u.id===id);

    if(indice==-1)return;

    if(confirm("Deseja excluir este funcionário?")){

        funcionarios.splice(indice,1);

        carregarTabela();

        document.getElementById("funcionarios").textContent =
        funcionarios.length;

    }

}


// =============================
// NOVO USUÁRIO
// =============================

document
.getElementById("novoUsuario")
.addEventListener("click",()=>{

    alert("Aqui abrirá o cadastro de funcionários.");

});


// =============================
// PREPARADO PARA API
// =============================

// Futuramente basta trocar os dados
// por uma chamada ao backend.

// Exemplo:

/*

async function carregarUsuarios(){

    const resposta =
    await fetch("/api/usuarios");

    const funcionarios =
    await resposta.json();

}

*/