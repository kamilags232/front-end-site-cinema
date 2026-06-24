// =============================
// USUÁRIO LOGADO
// =============================

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
    window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuario.nome;

const abrirProdutos = document.getElementById("abrirProdutos");
const menuProdutos = document.getElementById("menuProdutos");

function irParaProdutos() {
    window.location.href = "produtos.html";
}

if (abrirProdutos) {
    abrirProdutos.addEventListener("click", irParaProdutos);
}

if (menuProdutos) {
    menuProdutos.addEventListener("click", irParaProdutos);
}

const abrirUsuarios = document.getElementById("abrirUsuarios");
const menuUsuarios = document.getElementById("menuUsuarios");

function irParaUsuarios() {
    window.location.href = "usuarios.html";
}

if (abrirUsuarios) {
    abrirUsuarios.addEventListener("click", irParaUsuarios);
}

if (menuUsuarios) {
    menuUsuarios.addEventListener("click", irParaUsuarios);
}

const abrirEstoque = document.getElementById("abrirEstoque");
const menuEstoque = document.getElementById("menuEstoque");

function irParaEstoque() {
    window.location.href = "estoque.html";
}

if (abrirEstoque) {
    abrirEstoque.addEventListener("click", irParaEstoque);
}

if (menuEstoque) {
    menuEstoque.addEventListener("click", irParaEstoque);
}

const abrirVendas = document.getElementById("abrirVendas");
const menuVendas = document.getElementById("menuVendas");

function irParaVendas() {
    window.location.href = "vendas.html";
}

if (abrirVendas) {
    abrirVendas.addEventListener("click", irParaVendas);
}

if (menuVendas) {
    menuVendas.addEventListener("click", irParaVendas);
}

const abrirRelatorios = document.getElementById("abrirRelatorios");
const menuRelatorios = document.getElementById("menuRelatorios");

function irParaRelatorios() {
    window.location.href = "relatorios.html";
}

if (abrirRelatorios) {
    abrirRelatorios.addEventListener("click", irParaRelatorios);
}

if (menuRelatorios) {
    menuRelatorios.addEventListener("click", irParaRelatorios);
}

const abrirCinema = document.getElementById("abrirCinema");
const menuCinema = document.getElementById("menuCinema");

function irParaCinema() {
    window.location.href = "cinema.html";
}

if (abrirCinema) {
    abrirCinema.addEventListener("click", irParaCinema);
}

if (menuCinema) {
    menuCinema.addEventListener("click", irParaCinema);
}


// =============================
// DADOS TEMPORÁRIOS
// (Depois virão do banco)
// =============================

const funcionariosSalvos = JSON.parse(localStorage.getItem("adminUsuariosSistema"));

const funcionarios = Array.isArray(funcionariosSalvos) && funcionariosSalvos.length > 0 ? funcionariosSalvos : [

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

            <td>${funcionario.cargo || funcionario.papel || "Funcionário"}</td>

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

    window.location.href = "usuarios.html";

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
