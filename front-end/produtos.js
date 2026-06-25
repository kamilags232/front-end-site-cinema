const usuarioLogado = exigirLoginAdmin();

if (usuarioLogado) {
  document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
}

const bombonierePadrao = [
  { id: 1, nome: "Pipoca Pequena", preco: 15.0, descricao: "Porcao individual", estoque: 24, estoqueMinimo: 5, tipoProduto: "BOMBONIERE" },
  { id: 2, nome: "Pipoca Media", preco: 20.0, descricao: "Classica para compartilhar", estoque: 18, estoqueMinimo: 5, tipoProduto: "BOMBONIERE" },
  { id: 3, nome: "Pipoca Grande", preco: 25.0, descricao: "Ideal para grupos", estoque: 12, estoqueMinimo: 5, tipoProduto: "BOMBONIERE" },
  { id: 4, nome: "Refrigerante 300ml", preco: 5.0, descricao: "Lata gelada", estoque: 48, estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 5, nome: "Refrigerante 500ml", preco: 10.0, descricao: "Padrao medio", estoque: 36, estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 6, nome: "Refrigerante 700ml", preco: 15.0, descricao: "Copo grande", estoque: 20, estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 7, nome: "Barra de Chocolate 90g", preco: 7.0, descricao: "Opcao doce", estoque: 30, estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 8, nome: "M&M 80g", preco: 4.5, descricao: "Snack rapido", estoque: 28, estoqueMinimo: 10, tipoProduto: "BOMBONIERE" },
  { id: 9, nome: "Fini 80g", preco: 7.5, descricao: "Guloseima colorida", estoque: 22, estoqueMinimo: 10, tipoProduto: "BOMBONIERE" }
];

const ingressosPadrao = [
  { id: 101, nome: "Inteira", preco: 30.0, descricao: "Valor cheio", estoque: 200, estoqueMinimo: 20, tipoProduto: "INGRESSO" },
  { id: 102, nome: "Meia", preco: 15.0, descricao: "Estudante / elegiveis", estoque: 200, estoqueMinimo: 20, tipoProduto: "INGRESSO" },
  { id: 103, nome: "Promocional", preco: 20.0, descricao: "Campanhas e datas especiais", estoque: 100, estoqueMinimo: 20, tipoProduto: "INGRESSO" },
  { id: 104, nome: "VIP", preco: 40.0, descricao: "Salas especiais", estoque: 80, estoqueMinimo: 10, tipoProduto: "INGRESSO" }
];

let produtos = [];
let usandoFallback = false;

function ehIngresso(produto) {
  const tipo = (produto.tipoProduto || "").toLowerCase();
  const nome = (produto.nome || "").toLowerCase();
  return tipo.includes("ingresso") || ["inteira", "meia", "promocional", "vip"].includes(nome);
}

function criarCampoPreco(valor) {
  return `<input type="number" step="0.01" min="0" class="editable" value="${Number(valor || 0).toFixed(2)}">`;
}

function produtoParaPayload(produto, preco) {
  return {
    nome: produto.nome,
    descricao: produto.descricao || "",
    preco: Number(preco),
    estoque: Number(produto.estoque || 0),
    estoqueMinimo: Number(produto.estoqueMinimo || 0),
    tipoProduto: produto.tipoProduto || (ehIngresso(produto) ? "INGRESSO" : "BOMBONIERE")
  };
}

async function carregarProdutos() {
  try {
    produtos = await listarPagina("/produtos");
    usandoFallback = produtos.length === 0;

    if (usandoFallback) {
      produtos = [...bombonierePadrao, ...ingressosPadrao];
      mostrarStatus("statusSalvamento", "Nenhum produto encontrado no banco. Exibindo lista padrao.");
    }
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    usandoFallback = true;
    produtos = [...bombonierePadrao, ...ingressosPadrao];
    mostrarStatus("statusSalvamento", "Nao foi possivel carregar do banco. Exibindo lista padrao.");
  }
}

function renderizarBomboniere() {
  const lista = produtos.filter(produto => !ehIngresso(produto));
  const tbody = document.getElementById("listaBomboniere");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.nome}</strong></td>
      <td>${criarCampoPreco(item.preco)}</td>
      <td class="description">${item.descricao || "-"}</td>
    </tr>
  `).join("");
}

function renderizarIngressos() {
  const lista = produtos.filter(ehIngresso);
  const tbody = document.getElementById("listaIngressos");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.nome}</strong></td>
      <td>${criarCampoPreco(item.preco)}</td>
      <td class="description">${item.descricao || "-"}</td>
    </tr>
  `).join("");
}

function coletarPrecos(tbodySelector) {
  return [...document.querySelectorAll(`${tbodySelector} tr`)].map(linha => ({
    id: Number(linha.dataset.id),
    preco: Number(linha.querySelector("input.editable").value || 0)
  }));
}

async function salvarPrecos(tbodySelector) {
  const alteracoes = coletarPrecos(tbodySelector);

  if (usandoFallback) {
    produtos = produtos.map(produto => {
      const alteracao = alteracoes.find(item => item.id === Number(produto.id));
      return alteracao ? { ...produto, preco: alteracao.preco } : produto;
    });

    try {
      for (const produto of produtos) {
        await adminRequest("/produtos", {
          method: "POST",
          body: JSON.stringify(produtoParaPayload(produto, produto.preco))
        });
      }

      mostrarStatus("statusSalvamento", "Produtos padrao cadastrados no banco.");
      await inicializar();
    } catch (erro) {
      console.error("Erro ao cadastrar produtos padrao:", erro);
      mostrarStatus("statusSalvamento", "Nao foi possivel cadastrar os produtos padrao no banco.");
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
        body: JSON.stringify(produtoParaPayload(produto, alteracao.preco))
      });
    }

    mostrarStatus("statusSalvamento", "Valores salvos no banco.");
    await inicializar();
  } catch (erro) {
    console.error("Erro ao salvar produtos:", erro);
    mostrarStatus("statusSalvamento", "Nao foi possivel salvar no banco.");
  }
}

async function inicializar() {
  await carregarProdutos();
  renderizarBomboniere();
  renderizarIngressos();
}

document.getElementById("salvarBomboniere").addEventListener("click", () => salvarPrecos("#listaBomboniere"));
document.getElementById("salvarIngressos").addEventListener("click", () => salvarPrecos("#listaIngressos"));
document.getElementById("restaurarPadrao").addEventListener("click", inicializar);

inicializar();
