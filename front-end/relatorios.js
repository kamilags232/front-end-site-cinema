const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;

const chaveVendas = "adminVendasOperacionais";

const vendasPadrao = [
  {
    id: "V-0001",
    cliente: "Mariana Costa",
    filme: "Vingadores: Ultimato",
    sessao: "Sala 1 - 14:00",
    data: "2026-06-24",
    itens: [
      { categoria: "Ingresso", nome: "Inteira", quantidade: 2, valor: 60 },
      { categoria: "Bomboniere", nome: "Pipoca Média + Refrigerante 500ml", quantidade: 1, valor: 30 }
    ]
  },
  {
    id: "V-0002",
    cliente: "Carlos Lima",
    filme: "The Batman",
    sessao: "Sala 2 - 16:30",
    data: "2026-06-24",
    itens: [
      { categoria: "Ingresso", nome: "Meia", quantidade: 3, valor: 45 },
      { categoria: "Bomboniere", nome: "Pipoca Pequena", quantidade: 2, valor: 30 }
    ]
  },
  {
    id: "V-0003",
    cliente: "Aline Souza",
    filme: "Barbie",
    sessao: "Sala 3 - 20:00",
    data: "2026-06-23",
    itens: [
      { categoria: "Ingresso", nome: "VIP", quantidade: 2, valor: 80 },
      { categoria: "Bomboniere", nome: "Barra de Chocolate 90g", quantidade: 2, valor: 14 }
    ]
  }
];

function carregarVendas() {
  const dadosSalvos = JSON.parse(localStorage.getItem(chaveVendas));
  if (Array.isArray(dadosSalvos) && dadosSalvos.length > 0) {
    return dadosSalvos;
  }
  return vendasPadrao;
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

function totalVenda(venda) {
  return venda.itens.reduce((total, item) => total + Number(item.valor || 0), 0);
}

function totalIngressos(venda) {
  return venda.itens.filter(item => item.categoria === "Ingresso").reduce((total, item) => total + Number(item.quantidade || 0), 0);
}

function totalBomboniere(venda) {
  return venda.itens.filter(item => item.categoria === "Bomboniere").reduce((total, item) => total + Number(item.valor || 0), 0);
}

function periodoAtual() {
  const hoje = new Date();
  const iso = hoje.toISOString().slice(0, 10);
  return { hoje: iso, semana: iso, mes: iso };
}

let vendas = carregarVendas();

function vendasFiltradas() {
  const filtro = document.getElementById("filtroPeriodo").value;
  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;

  if (filtro !== "intervalo") {
    return vendas;
  }

  return vendas.filter(venda => {
    const dentroInicio = !dataInicio || venda.data >= dataInicio;
    const dentroFim = !dataFim || venda.data <= dataFim;
    return dentroInicio && dentroFim;
  });
}

function renderizarCards(lista) {
  const faturamento = lista.reduce((total, venda) => total + totalVenda(venda), 0);
  const ingressos = lista.reduce((total, venda) => total + totalIngressos(venda), 0);
  const bomboniere = lista.reduce((total, venda) => total + totalBomboniere(venda), 0);
  const ticketMedio = lista.length ? faturamento / lista.length : 0;

  document.getElementById("cardFaturamento").textContent = formatarMoeda(faturamento);
  document.getElementById("cardIngressos").textContent = ingressos;
  document.getElementById("cardBomboniere").textContent = formatarMoeda(bomboniere);
  document.getElementById("cardTicketMedio").textContent = formatarMoeda(ticketMedio);
}

function renderizarListaAgrupada(containerId, dados, formatador) {
  const container = document.getElementById(containerId);
  const agrupado = dados.reduce((acc, venda) => {
    const chave = formatador(venda);
    acc[chave] = (acc[chave] || 0) + totalVenda(venda);
    return acc;
  }, {});

  const linhas = Object.entries(agrupado)
    .sort((a, b) => b[1] - a[1])
    .map(([label, valor]) => `
      <div class="list-item">
        <strong>${label}</strong>
        <span>${formatarMoeda(valor)}</span>
      </div>
    `)
    .join("");

  container.innerHTML = linhas || `<div class="list-item"><span>Sem dados para o período selecionado.</span></div>`;
}

function renderizarProdutosMaisVendidos(lista) {
  const acumulado = {};

  lista.forEach(venda => {
    venda.itens.forEach(item => {
      acumulado[item.nome] = (acumulado[item.nome] || 0) + Number(item.quantidade || 0);
    });
  });

  const container = document.getElementById("produtosMaisVendidos");
  container.innerHTML = Object.entries(acumulado)
    .sort((a, b) => b[1] - a[1])
    .map(([nome, quantidade]) => `
      <div class="list-item">
        <strong>${nome}</strong>
        <span>${quantidade} unidades</span>
      </div>
    `)
    .join("") || `<div class="list-item"><span>Sem vendas registradas.</span></div>`;
}

function renderizarComparativo(lista) {
  const totalIngressosValor = lista.reduce((total, venda) => total + venda.itens.filter(item => item.categoria === "Ingresso").reduce((acc, item) => acc + Number(item.valor || 0), 0), 0);
  const totalBomboniereValor = lista.reduce((total, venda) => total + venda.itens.filter(item => item.categoria === "Bomboniere").reduce((acc, item) => acc + Number(item.valor || 0), 0), 0);
  const maior = Math.max(totalIngressosValor, totalBomboniereValor, 1);

  document.getElementById("comparativoBarra").innerHTML = `
    <div class="bar-row">
      <div class="list-item"><strong>Ingressos</strong><span>${formatarMoeda(totalIngressosValor)}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(totalIngressosValor / maior) * 100}%"></div></div>
    </div>
    <div class="bar-row">
      <div class="list-item"><strong>Bomboniere</strong><span>${formatarMoeda(totalBomboniereValor)}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(totalBomboniereValor / maior) * 100}%"></div></div>
    </div>
  `;
}

function renderizarTimeline(lista) {
  const porDia = lista.reduce((acc, venda) => {
    acc[venda.data] = (acc[venda.data] || 0) + totalVenda(venda);
    return acc;
  }, {});

  document.getElementById("vendasPorDia").innerHTML = Object.entries(porDia)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([data, valor]) => `
      <div class="timeline-item">
        <strong>${data}</strong>
        <span>${formatarMoeda(valor)}</span>
      </div>
    `)
    .join("") || `<div class="timeline-item"><span>Sem dados no período.</span></div>`;
}

function aplicarRelatorio() {
  const lista = vendasFiltradas();

  renderizarCards(lista);
  renderizarListaAgrupada("vendasPorFilme", lista, venda => venda.filme);
  renderizarListaAgrupada("vendasPorSessao", lista, venda => venda.sessao);
  renderizarProdutosMaisVendidos(lista);
  renderizarComparativo(lista);
  renderizarTimeline(lista);
}

document.getElementById("aplicarFiltro").addEventListener("click", aplicarRelatorio);
document.getElementById("filtroPeriodo").addEventListener("change", aplicarRelatorio);

renderizarCards(vendas);
renderizarListaAgrupada("vendasPorFilme", vendas, venda => venda.filme);
renderizarListaAgrupada("vendasPorSessao", vendas, venda => venda.sessao);
renderizarProdutosMaisVendidos(vendas);
renderizarComparativo(vendas);
renderizarTimeline(vendas);
