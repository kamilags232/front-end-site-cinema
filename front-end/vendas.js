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
    dataHora: "2026-06-24 14:10",
    formaPagamento: "Cartão",
    status: "Finalizada",
    itens: [
      { tipo: "Ingresso Inteira", descricao: "Sala 1 - 14:00", quantidade: 2, valor: 60 },
      { tipo: "Bomboniere", descricao: "Pipoca Média + Refrigerante 500ml", quantidade: 1, valor: 30 }
    ]
  },
  {
    id: "V-0002",
    cliente: "Carlos Lima",
    dataHora: "2026-06-24 15:05",
    formaPagamento: "Pix",
    status: "Em andamento",
    itens: [
      { tipo: "Ingresso Meia", descricao: "Sala 2 - 16:30", quantidade: 3, valor: 45 },
      { tipo: "Bomboniere", descricao: "Pipoca Pequena", quantidade: 2, valor: 30 }
    ]
  },
  {
    id: "V-0003",
    cliente: "Aline Souza",
    dataHora: "2026-06-24 16:40",
    formaPagamento: "Dinheiro",
    status: "Finalizada",
    itens: [
      { tipo: "Ingresso VIP", descricao: "Sala 3 - 20:00", quantidade: 2, valor: 80 },
      { tipo: "Bomboniere", descricao: "Barra de Chocolate 90g", quantidade: 2, valor: 14 }
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

function salvarVendas(vendas) {
  localStorage.setItem(chaveVendas, JSON.stringify(vendas));
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

function calcularTotal(venda) {
  return venda.itens.reduce((total, item) => total + Number(item.valor || 0), 0);
}

function atualizarCards(vendas) {
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

let vendas = carregarVendas();
let vendaSelecionadaId = vendas[0]?.id || null;

function renderizarLista() {
  const tbody = document.getElementById("listaVendas");

  tbody.innerHTML = vendas.map(venda => `
    <tr class="sale-row ${venda.id === vendaSelecionadaId ? 'active' : ''}" data-id="${venda.id}">
      <td><strong>${venda.id}</strong></td>
      <td>${venda.cliente}</td>
      <td>${venda.dataHora}</td>
      <td>${formatarMoeda(calcularTotal(venda))}</td>
      <td><span class="pill ${statusClass(venda.status)}">${venda.status}</span></td>
    </tr>
  `).join("");

  tbody.querySelectorAll(".sale-row").forEach(row => {
    row.addEventListener("click", () => {
      vendaSelecionadaId = row.dataset.id;
      renderizarLista();
      renderizarDetalhe();
    });
  });

  atualizarCards(vendas);
}

function renderizarDetalhe() {
  const venda = vendas.find(item => item.id === vendaSelecionadaId);
  const container = document.getElementById("detalheVenda");
  const titulo = document.getElementById("tituloDetalhe");

  if (!venda) {
    titulo.textContent = "Selecione uma venda";
    container.className = "detail-empty";
    container.textContent = "Clique em uma venda para ver itens, forma de pagamento e ações.";
    return;
  }

  titulo.textContent = `Venda ${venda.id}`;
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
          ${venda.itens.map(item => `<div>${item.quantidade}x ${item.tipo} - ${item.descricao} (${formatarMoeda(item.valor)})</div>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function marcarComoFinalizada() {
  const index = vendas.findIndex(venda => venda.id === vendaSelecionadaId);
  if (index === -1) return;

  vendas[index] = { ...vendas[index], status: "Finalizada" };
  salvarVendas(vendas);
  renderizarLista();
  renderizarDetalhe();
}

function cancelarVenda() {
  const index = vendas.findIndex(venda => venda.id === vendaSelecionadaId);
  if (index === -1) return;

  const vendaAtual = vendas[index];
  const novoStatus = vendaAtual.status === "Cancelada" ? "Em andamento" : "Cancelada";
  vendas[index] = { ...vendaAtual, status: novoStatus };
  salvarVendas(vendas);
  renderizarLista();
  renderizarDetalhe();
}

document.getElementById("finalizarVenda").addEventListener("click", marcarComoFinalizada);
document.getElementById("cancelarVenda").addEventListener("click", cancelarVenda);

renderizarLista();
renderizarDetalhe();
