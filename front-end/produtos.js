const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;

const chaveBomboniere = "adminBombonierePrecos";
const chaveIngressos = "adminIngressosPrecos";

const bombonierePadrao = [
  { id: 1, nome: "Pipoca Pequena", preco: 15.0, descricao: "Porção individual" },
  { id: 2, nome: "Pipoca Média", preco: 20.0, descricao: "Clássica para compartilhar" },
  { id: 3, nome: "Pipoca Grande", preco: 25.0, descricao: "Ideal para grupos" },
  { id: 4, nome: "Refrigerante 300ml", preco: 5.0, descricao: "Lata gelada" },
  { id: 5, nome: "Refrigerante 500ml", preco: 10.0, descricao: "Padrão médio" },
  { id: 6, nome: "Refrigerante 700ml", preco: 15.0, descricao: "Copão para o filme inteiro" },
  { id: 7, nome: "Barra de Chocolate 90g", preco: 7.0, descricao: "Opção doce" },
  { id: 8, nome: "M&M 80g", preco: 4.5, descricao: "Snack rápido" },
  { id: 9, nome: "Fini 80g", preco: 7.5, descricao: "Guloseima colorida" }
];

const ingressosPadrao = [
  { id: 1, nome: "Inteira", preco: 30.0, observacao: "Valor cheio" },
  { id: 2, nome: "Meia", preco: 15.0, observacao: "Estudante / elegíveis" },
  { id: 3, nome: "Promocional", preco: 20.0, observacao: "Campanhas e datas especiais" },
  { id: 4, nome: "VIP", preco: 40.0, observacao: "Salas especiais" }
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

function criarCampoPreco(valor, tipo) {
  return `<input type="number" step="0.01" min="0" class="editable" data-tipo="${tipo}" value="${valor.toFixed(2)}">`;
}

function renderizarBomboniere() {
  const lista = carregarLista(chaveBomboniere, bombonierePadrao);
  const tbody = document.getElementById("listaBomboniere");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.nome}</strong></td>
      <td>${criarCampoPreco(Number(item.preco), "bomboniere")}</td>
      <td class="description">${item.descricao}</td>
    </tr>
  `).join("");
}

function renderizarIngressos() {
  const lista = carregarLista(chaveIngressos, ingressosPadrao);
  const tbody = document.getElementById("listaIngressos");

  tbody.innerHTML = lista.map(item => `
    <tr data-id="${item.id}">
      <td><strong>${item.nome}</strong></td>
      <td>${criarCampoPreco(Number(item.preco), "ingresso")}</td>
      <td class="description">${item.observacao}</td>
    </tr>
  `).join("");
}

function coletarDadosTabela(tbodySelector) {
  return [...document.querySelectorAll(`${tbodySelector} tr`)].map(linha => {
    const id = Number(linha.dataset.id);
    const input = linha.querySelector("input.editable");
    const valor = Number(input.value || 0);

    return { id, valor };
  });
}

function mesclarValores(base, novosValores) {
  return base.map(item => {
    const atualizado = novosValores.find(valor => valor.id === item.id);
    return atualizado ? { ...item, preco: atualizado.valor } : item;
  });
}

function atualizarStatus(texto) {
  const status = document.getElementById("statusSalvamento");
  status.textContent = texto;
}

renderizarBomboniere();
renderizarIngressos();

document.getElementById("salvarBomboniere").addEventListener("click", () => {
  const atuais = carregarLista(chaveBomboniere, bombonierePadrao);
  const novosValores = coletarDadosTabela("#listaBomboniere");
  const atualizados = mesclarValores(atuais, novosValores);
  salvarLista(chaveBomboniere, atualizados);
  atualizarStatus("Bomboniere salva no navegador. Depois isso pode ir para o banco.");
});

document.getElementById("salvarIngressos").addEventListener("click", () => {
  const atuais = carregarLista(chaveIngressos, ingressosPadrao);
  const novosValores = coletarDadosTabela("#listaIngressos");
  const atualizados = mesclarValores(atuais, novosValores);
  salvarLista(chaveIngressos, atualizados);
  atualizarStatus("Ingressos salvos no navegador. Depois isso pode ir para o banco.");
});

document.getElementById("restaurarPadrao").addEventListener("click", () => {
  localStorage.removeItem(chaveBomboniere);
  localStorage.removeItem(chaveIngressos);
  renderizarBomboniere();
  renderizarIngressos();
  atualizarStatus("Valores padrão restaurados.");
});
