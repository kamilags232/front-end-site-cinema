const usuarioLogado = exigirLoginAdmin();

if (usuarioLogado) {
  document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
}

let vendas = [];
let produtosPorId = {};

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor || 0));
}

function produtoNome(id) {
  return produtosPorId[id]?.nome || `Produto #${id}`;
}

function produtoCategoria(id) {
  const produto = produtosPorId[id];
  const tipo = (produto?.tipoProduto || "").toLowerCase();
  const nome = (produto?.nome || "").toLowerCase();

  if (tipo.includes("ingresso") || ["inteira", "meia", "promocional", "vip"].includes(nome)) {
    return "Ingresso";
  }

  return "Bomboniere";
}

function normalizarVenda(venda) {
  const itens = Array.isArray(venda.itens) ? venda.itens.map(item => {
    const produtoId = item.produto?.id;
    return {
      categoria: produtoCategoria(produtoId),
      nome: produtoNome(produtoId),
      quantidade: Number(item.quantidade || 0),
      valor: Number(item.valorParcial || 0)
    };
  }) : [];

  return {
    id: venda.id,
    cliente: venda.cliente?.nome || venda.clienteNome || "Cliente nao informado",
    filme: venda.filme || "Filme nao informado",
    sessao: venda.sessao || "Sessao nao informada",
    data: (venda.dataHora || venda.dt_hr_venda || new Date().toISOString()).slice(0, 10),
    valorTotal: Number(venda.valorTotal || 0),
    itens
  };
}

async function carregarVendas() {
  try {
    const produtos = await listarPagina("/produtos");
    produtosPorId = Object.fromEntries(produtos.map(produto => [produto.id, produto]));

    const vendasApi = await listarPagina("/vendas");
    vendas = vendasApi.map(normalizarVenda);
  } catch (erro) {
    console.error("Erro ao carregar relatorios:", erro);
    vendas = [];
  }
}

function totalVenda(venda) {
  return venda.valorTotal || venda.itens.reduce((total, item) => total + Number(item.valor || 0), 0);
}

function totalIngressos(venda) {
  return venda.itens.filter(item => item.categoria === "Ingresso").reduce((total, item) => total + Number(item.quantidade || 0), 0);
}

function totalBomboniere(venda) {
  return venda.itens.filter(item => item.categoria === "Bomboniere").reduce((total, item) => total + Number(item.valor || 0), 0);
}

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

  container.innerHTML = Object.entries(agrupado)
    .sort((a, b) => b[1] - a[1])
    .map(([label, valor]) => `
      <div class="list-item">
        <strong>${label}</strong>
        <span>${formatarMoeda(valor)}</span>
      </div>
    `)
    .join("") || `<div class="list-item"><span>Sem dados para o periodo selecionado.</span></div>`;
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
    .join("") || `<div class="timeline-item"><span>Sem dados no periodo.</span></div>`;
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

async function inicializar() {
  await carregarVendas();
  aplicarRelatorio();
}

document.getElementById("aplicarFiltro").addEventListener("click", aplicarRelatorio);
document.getElementById("filtroPeriodo").addEventListener("change", aplicarRelatorio);

inicializar();
