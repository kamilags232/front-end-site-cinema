const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;

const chaveEstoqueBomboniere = "adminEstoqueBomboniere";
const chaveEstoqueIngressos = "adminEstoqueIngressos";

const estoqueBombonierePadrao = [
  { id: 1, nome: "Pipoca Pequena", estoque: 24, preco: 15.0 },
  { id: 2, nome: "Pipoca Média", estoque: 18, preco: 20.0 },
  { id: 3, nome: "Pipoca Grande", estoque: 12, preco: 25.0 },
  { id: 4, nome: "Refrigerante 300ml", estoque: 48, preco: 5.0 },
  { id: 5, nome: "Refrigerante 500ml", estoque: 36, preco: 10.0 },
  { id: 6, nome: "Refrigerante 700ml", estoque: 20, preco: 15.0 },
  { id: 7, nome: "Barra de Chocolate 90g", estoque: 30, preco: 7.0 },
  { id: 8, nome: "M&M 80g", estoque: 28, preco: 4.5 },
  { id: 9, nome: "Fini 80g", estoque: 22, preco: 7.5 }
];

const estoqueIngressosPadrao = [
  { id: 1, sessao: "Sala 1 - 14:00", tipo: "Inteira", estoque: 40, preco: 30.0 },
  { id: 2, sessao: "Sala 1 - 14:00", tipo: "Meia", estoque: 15, preco: 15.0 },
  { id: 3, sessao: "Sala 2 - 16:30", tipo: "Inteira", estoque: 34, preco: 30.0 },
  { id: 4, sessao: "Sala 2 - 16:30", tipo: "Meia", estoque: 12, preco: 15.0 },
  { id: 5, sessao: "Sala 3 - 20:00", tipo: "VIP", estoque: 18, preco: 40.0 }
];

function carregarLista(chave, padrao) {
  const dadosSalvos = JSON.parse(localStorage.getItem(chave));
  if (Array.isArray(dadosSalvos) && dadosSalvos.length > 0) {
    return dadosSalvos;
  }
  return padrao;
}

function salvarLista(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function criarCampoNumerico(valor, tipo) {
  return `<input type="number" min="0" step="1" class="editable" data-tipo="${tipo}" value="${valor}">`;
}

function criarCampoPreco(valor) {
  return `<input type="number" min="0" step="0.01" class="editable" data-campo="preco" value="${valor.toFixed(2)}">`;
}

function renderizarBomboniere() {
  const lista = carregarLista(chaveEstoqueBomboniere, estoqueBombonierePadrao);
  const tbody = document.getElementById("listaEstoqueBomboniere");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.nome}</strong></td>
      <td>${criarCampoNumerico(item.estoque, "estoque")}</td>
      <td>${criarCampoPreco(Number(item.preco))}</td>
    </tr>
  `).join("");
}

function renderizarIngressos() {
  const lista = carregarLista(chaveEstoqueIngressos, estoqueIngressosPadrao);
  const tbody = document.getElementById("listaEstoqueIngressos");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.sessao}</strong></td>
      <td>${item.tipo}</td>
      <td>${criarCampoNumerico(item.estoque, "estoque")}</td>
      <td>${criarCampoPreco(Number(item.preco))}</td>
    </tr>
  `).join("");
}

function coletarDados(tbodySelector) {
  return [...document.querySelectorAll(`${tbodySelector} tr`)].map(linha => {
    const id = Number(linha.dataset.id);
    const campos = linha.querySelectorAll("input.editable");
    const estoque = Number(campos[0]?.value || 0);
    const preco = Number(campos[1]?.value || 0);

    return { id, estoque, preco };
  });
}

function mesclarBaseComAlteracoes(base, alteracoes, camposExtras = {}) {
  return base.map(item => {
    const alterado = alteracoes.find(valor => valor.id === item.id);
    if (!alterado) {
      return item;
    }

    return { ...item, ...camposExtras(item), estoque: alterado.estoque, preco: alterado.preco };
  });
}

function atualizarStatus(texto) {
  document.getElementById("statusSalvamento").textContent = texto;
}

renderizarBomboniere();
renderizarIngressos();

document.getElementById("salvarEstoqueBomboniere").addEventListener("click", () => {
  const base = carregarLista(chaveEstoqueBomboniere, estoqueBombonierePadrao);
  const alteracoes = coletarDados("#listaEstoqueBomboniere");
  const atualizados = mesclarBaseComAlteracoes(base, alteracoes);
  salvarLista(chaveEstoqueBomboniere, atualizados);
  atualizarStatus("Estoque da bomboniere salvo no navegador. Depois isso pode vir do banco.");
});

document.getElementById("salvarEstoqueIngressos").addEventListener("click", () => {
  const base = carregarLista(chaveEstoqueIngressos, estoqueIngressosPadrao);
  const alteracoes = coletarDados("#listaEstoqueIngressos");
  const atualizados = mesclarBaseComAlteracoes(base, alteracoes);
  salvarLista(chaveEstoqueIngressos, atualizados);
  atualizarStatus("Estoque de ingressos salvo no navegador. Depois isso pode vir do banco.");
});

document.getElementById("restaurarPadrao").addEventListener("click", () => {
  localStorage.removeItem(chaveEstoqueBomboniere);
  localStorage.removeItem(chaveEstoqueIngressos);
  renderizarBomboniere();
  renderizarIngressos();
  atualizarStatus("Estoques restaurados para os valores padrão.");
});
