const usuarioLogado = exigirLoginAdmin();

if (usuarioLogado) {
  document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
}

let vendas = [];
let vendaSelecionadaId = null;
let produtosPorId = {};

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor || 0));
}

function produtoNome(id) {
  return produtosPorId[id]?.nome || `Produto #${id}`;
}

function normalizarVenda(venda) {
  const itens = Array.isArray(venda.itens) ? venda.itens.map(item => ({
    tipo: produtoNome(item.produto?.id),
    descricao: produtoNome(item.produto?.id),
    quantidade: Number(item.quantidade || 0),
    valor: Number(item.valorParcial || 0)
  })) : [];

  return {
    id: venda.id,
    cliente: venda.cliente?.nome || venda.clienteNome || "Cliente nao informado",
    dataHora: venda.dataHora || venda.dt_hr_venda || "-",
    formaPagamento: venda.tipoPagamento || "-",
    status: "Finalizada",
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
    vendaSelecionadaId = vendas[0]?.id || null;
  } catch (erro) {
    console.error("Erro ao carregar vendas:", erro);
    vendas = [];
    vendaSelecionadaId = null;
  }
}

function calcularTotal(venda) {
  return venda.valorTotal || venda.itens.reduce((total, item) => total + Number(item.valor || 0), 0);
}

function atualizarCards() {
  const vendasHoje = vendas.length;
  const finalizadas = vendas.filter(venda => venda.status === "Finalizada").length;
  const emAndamento = vendas.filter(venda => venda.status !== "Finalizada").length;
  const total = vendas.reduce((acumulado, venda) => acumulado + calcularTotal(venda), 0);
  const ticketMedio = vendasHoje ? total / vendasHoje : 0;

  document.getElementById("cardVendasHoje").textContent = vendasHoje;
  document.getElementById("cardTicketMedio").textContent = formatarMoeda(ticketMedio);
  document.getElementById("cardFinalizadas").textContent = finalizadas;
  document.getElementById("cardEmAndamento").textContent = emAndamento;
}

function statusClass(status) {
  if (status === "Finalizada") return "success";
  if (status === "Cancelada") return "danger";
  return "";
}

function renderizarLista() {
  const tbody = document.getElementById("listaVendas");

  tbody.innerHTML = vendas.map(venda => `
    <tr class="sale-row ${Number(venda.id) === Number(vendaSelecionadaId) ? 'active' : ''}" data-id="${venda.id}">
      <td><strong>V-${String(venda.id).padStart(4, "0")}</strong></td>
      <td>${venda.cliente}</td>
      <td>${venda.dataHora}</td>
      <td>${formatarMoeda(calcularTotal(venda))}</td>
      <td><span class="pill ${statusClass(venda.status)}">${venda.status}</span></td>
    </tr>
  `).join("") || `<tr><td colspan="5">Nenhuma venda encontrada no banco.</td></tr>`;

  tbody.querySelectorAll(".sale-row").forEach(row => {
    row.addEventListener("click", () => {
      vendaSelecionadaId = Number(row.dataset.id);
      renderizarLista();
      renderizarDetalhe();
    });
  });

  atualizarCards();
}

function renderizarDetalhe() {
  const venda = vendas.find(item => Number(item.id) === Number(vendaSelecionadaId));
  const container = document.getElementById("detalheVenda");
  const titulo = document.getElementById("tituloDetalhe");

  if (!venda) {
    titulo.textContent = "Selecione uma venda";
    container.className = "detail-empty";
    container.textContent = "Clique em uma venda para ver itens e forma de pagamento.";
    return;
  }

  titulo.textContent = `Venda V-${String(venda.id).padStart(4, "0")}`;
  container.className = "detail-box";

  container.innerHTML = `
    <h4>${venda.cliente}</h4>
    <div class="detail-grid">
      <div class="detail-item"><span class="detail-label">Data e hora</span><strong class="detail-value">${venda.dataHora}</strong></div>
      <div class="detail-item"><span class="detail-label">Forma de pagamento</span><strong class="detail-value">${venda.formaPagamento}</strong></div>
      <div class="detail-item"><span class="detail-label">Status</span><strong class="detail-value">${venda.status}</strong></div>
      <div class="detail-item"><span class="detail-label">Valor total</span><strong class="detail-value">${formatarMoeda(calcularTotal(venda))}</strong></div>
      <div class="detail-item">
        <span class="detail-label">Itens comprados</span>
        <div class="detail-value">
          ${venda.itens.map(item => `<div>${item.quantidade}x ${item.tipo} (${formatarMoeda(item.valor)})</div>`).join("") || "Sem itens detalhados"}
        </div>
      </div>
    </div>
  `;
}

function marcarComoFinalizada() {
  alert("A API atual ainda nao tem rota para alterar status da venda.");
}

function cancelarVenda() {
  alert("A API atual ainda nao tem rota para cancelar venda.");
}

async function inicializar() {
  await carregarVendas();
  renderizarLista();
  renderizarDetalhe();
}

document.getElementById("finalizarVenda").addEventListener("click", marcarComoFinalizada);
document.getElementById("cancelarVenda").addEventListener("click", cancelarVenda);

inicializar();
