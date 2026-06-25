const usuarioLogado = exigirLoginAdmin();

if (usuarioLogado) {
  document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
}

let produtos = [];
let usandoFallback = false;

const estoqueBombonierePadrao = [
  { id: 1, nome: "Combo Pipoca Media + Refri 500ml", estoque: 20, preco: 25.0, descricao: "Combo da bomboniere", estoqueMinimo: 5, tipoProduto: "BOMBONIERE" },
  { id: 2, nome: "Pipoca Pequena", estoque: 24, preco: 15.0, descricao: "Porcao individual", estoqueMinimo: 5, tipoProduto: "BOMBONIERE" },
  { id: 3, nome: "Pipoca Media", estoque: 18, preco: 20.0, descricao: "Classica para compartilhar", estoqueMinimo: 5, tipoProduto: "BOMBONIERE" },
  { id: 4, nome: "Pipoca Grande", estoque: 12, preco: 25.0, descricao: "Ideal para grupos", estoqueMinimo: 5, tipoProduto: "BOMBONIERE" },
  { id: 5, nome: "Refrigerante 300ml", estoque: 48, preco: 5.0, descricao: "Lata gelada", estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 6, nome: "Refrigerante 500ml", estoque: 36, preco: 10.0, descricao: "Padrao medio", estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 7, nome: "Refrigerante 700ml", estoque: 20, preco: 15.0, descricao: "Copo grande", estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 8, nome: "Barra de Chocolate 90g", estoque: 30, preco: 7.0, descricao: "Opcao doce", estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 9, nome: "M&M 80g", estoque: 28, preco: 4.5, descricao: "Snack rapido", estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 10, nome: "Fini 80g", estoque: 22, preco: 7.5, descricao: "Guloseima colorida", estoqueMinimo: 10, tipoProduto: "BOMBONIERE" }
];

const estoqueIngressosPadrao = [
  { id: 101, nome: "Inteira", estoque: 200, preco: 30.0, descricao: "Valor cheio", estoqueMinimo: 20, tipoProduto: "INGRESSO" },
  { id: 102, nome: "Meia", estoque: 200, preco: 15.0, descricao: "Estudante / elegiveis", estoqueMinimo: 20, tipoProduto: "INGRESSO" },
  { id: 103, nome: "Promocional", estoque: 100, preco: 20.0, descricao: "Campanhas", estoqueMinimo: 20, tipoProduto: "INGRESSO" },
  { id: 104, nome: "VIP", estoque: 80, preco: 40.0, descricao: "Salas especiais", estoqueMinimo: 10, tipoProduto: "INGRESSO" }
];

function ehIngresso(produto) {
  const tipo = (produto.tipoProduto || "").toLowerCase();
  const nome = (produto.nome || "").toLowerCase();
  return tipo.includes("ingresso") || ["inteira", "meia", "promocional", "vip"].includes(nome);
}

function criarCampoNumerico(valor) {
  return `<input type="number" min="0" step="1" class="editable estoque" value="${Number(valor || 0)}">`;
}

function criarCampoPreco(valor) {
  return `<input type="number" min="0" step="0.01" class="editable preco" value="${Number(valor || 0).toFixed(2)}">`;
}

function produtoParaPayload(produto, alteracao) {
  return {
    nome: produto.nome,
    descricao: produto.descricao || "",
    preco: Number(alteracao.preco),
    estoque: Number(alteracao.estoque),
    estoqueMinimo: Number(produto.estoqueMinimo || 0),
    tipoProduto: produto.tipoProduto || (ehIngresso(produto) ? "INGRESSO" : "BOMBONIERE")
  };
}

async function carregarProdutos() {
  try {
    produtos = await listarPagina("/produtos");
    usandoFallback = produtos.length === 0;

    if (usandoFallback) {
      produtos = [...estoqueBombonierePadrao, ...estoqueIngressosPadrao];
      mostrarStatus("statusSalvamento", "Nenhum produto encontrado no banco. Exibindo estoque padrao.");
    }
  } catch (erro) {
    console.error("Erro ao carregar estoque:", erro);
    usandoFallback = true;
    produtos = [...estoqueBombonierePadrao, ...estoqueIngressosPadrao];
    mostrarStatus("statusSalvamento", "Nao foi possivel carregar o estoque do banco.");
  }
}

function renderizarBomboniere() {
  const lista = produtos.filter(produto => !ehIngresso(produto));
  const tbody = document.getElementById("listaEstoqueBomboniere");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.nome}</strong></td>
      <td>${criarCampoNumerico(item.estoque)}</td>
      <td>${criarCampoPreco(item.preco)}</td>
    </tr>
  `).join("");
}

function renderizarIngressos() {
  const lista = produtos.filter(ehIngresso);
  const tbody = document.getElementById("listaEstoqueIngressos");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.nome}</strong></td>
      <td>${item.tipoProduto || "INGRESSO"}</td>
      <td>${criarCampoNumerico(item.estoque)}</td>
      <td>${criarCampoPreco(item.preco)}</td>
    </tr>
  `).join("");
}

function coletarDados(tbodySelector) {
  return [...document.querySelectorAll(`${tbodySelector} tr`)].map(linha => ({
    id: Number(linha.dataset.id),
    estoque: Number(linha.querySelector("input.estoque").value || 0),
    preco: Number(linha.querySelector("input.preco").value || 0)
  }));
}

async function salvarEstoque(tbodySelector) {
  const alteracoes = coletarDados(tbodySelector);

  if (usandoFallback) {
    produtos = produtos.map(produto => {
      const alteracao = alteracoes.find(item => item.id === Number(produto.id));
      return alteracao ? { ...produto, ...alteracao } : produto;
    });

    try {
      for (const produto of produtos) {
        await adminRequest("/produtos", {
          method: "POST",
          body: JSON.stringify(produtoParaPayload(produto, {
            preco: produto.preco,
            estoque: produto.estoque
          }))
        });
      }

      mostrarStatus("statusSalvamento", "Produtos e estoque padrao cadastrados no banco.");
      await inicializar();
    } catch (erro) {
      console.error("Erro ao cadastrar estoque padrao:", erro);
      mostrarStatus("statusSalvamento", "Nao foi possivel cadastrar o estoque padrao no banco.");
      renderizarBomboniere();
      renderizarIngressos();
    }
    return;
  }

  try {
    for (const alteracao of alteracoes) {
      const produto = produtos.find(item => Number(item.id) === alteracao.id);
      if (!produto) continue;

      await adminRequest(`/produtos/${produto.id}`, {
        method: "PUT",
        body: JSON.stringify(produtoParaPayload(produto, alteracao))
      });
    }

    mostrarStatus("statusSalvamento", "Estoque salvo no banco.");
    await inicializar();
  } catch (erro) {
    console.error("Erro ao salvar estoque:", erro);
    mostrarStatus("statusSalvamento", "Nao foi possivel salvar o estoque no banco.");
  }
}

async function inicializar() {
  await carregarProdutos();
  renderizarBomboniere();
  renderizarIngressos();
}

document.getElementById("salvarEstoqueBomboniere").addEventListener("click", () => salvarEstoque("#listaEstoqueBomboniere"));
document.getElementById("salvarEstoqueIngressos").addEventListener("click", () => salvarEstoque("#listaEstoqueIngressos"));
document.getElementById("restaurarPadrao").addEventListener("click", inicializar);

inicializar();
