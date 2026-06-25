const usuario = exigirLoginAdmin();

if (usuario) {
    document.getElementById("nomeUsuario").textContent = usuario.nome;
}

function irParaProdutos() {
    window.location.href = "produtos.html";
}

function irParaUsuarios() {
    window.location.href = "usuarios.html";
}

function irParaEstoque() {
    window.location.href = "estoque.html";
}

function irParaVendas() {
    window.location.href = "vendas.html";
}

function irParaRelatorios() {
    window.location.href = "relatorios.html";
}

function irParaCinema() {
    window.location.href = "cinema.html";
}

[
    ["abrirProdutos", irParaProdutos],
    ["menuProdutos", irParaProdutos],
    ["abrirUsuarios", irParaUsuarios],
    ["menuUsuarios", irParaUsuarios],
    ["abrirEstoque", irParaEstoque],
    ["menuEstoque", irParaEstoque],
    ["abrirVendas", irParaVendas],
    ["menuVendas", irParaVendas],
    ["abrirRelatorios", irParaRelatorios],
    ["menuRelatorios", irParaRelatorios],
    ["abrirCinema", irParaCinema],
    ["menuCinema", irParaCinema]
].forEach(([id, acao]) => {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.addEventListener("click", acao);
    }
});

function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor || 0));
}

function preencherTabelaUsuarios(usuarios) {
    const tabela = document.getElementById("listaUsuarios");

    tabela.innerHTML = usuarios.slice(0, 5).map(usuario => `
        <tr>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.tipo || "funcionario"}</td>
            <td>
                <button class="editar" type="button" title="Usuario interno vindo do banco"><i class="fa-solid fa-eye"></i></button>
            </td>
        </tr>
    `).join("") || `
        <tr>
            <td colspan="4">Nenhum funcionario encontrado no banco.</td>
        </tr>
    `;
}

async function carregarDashboard() {
    try {
        const [usuarios, produtos, vendas] = await Promise.all([
            adminRequest("/usuarios"),
            listarPagina("/produtos"),
            listarPagina("/vendas")
        ]);

        const totalVendas = vendas.reduce((total, venda) => total + Number(venda.valorTotal || 0), 0);
        const estoqueBaixo = produtos.filter(produto => Number(produto.estoque || 0) <= Number(produto.estoqueMinimo || 0)).length;

        document.getElementById("funcionarios").textContent = usuarios.length;
        document.getElementById("produtos").textContent = produtos.length;
        document.getElementById("vendas").textContent = formatarMoeda(totalVendas);
        document.getElementById("estoque").textContent = estoqueBaixo;

        preencherTabelaUsuarios(usuarios);
    } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);
        document.getElementById("funcionarios").textContent = 0;
        document.getElementById("produtos").textContent = 0;
        document.getElementById("vendas").textContent = formatarMoeda(0);
        document.getElementById("estoque").textContent = 0;
        preencherTabelaUsuarios([]);
    }
}

document.getElementById("novoUsuario").addEventListener("click", () => {
    window.location.href = "usuarios.html";
});

carregarDashboard();
