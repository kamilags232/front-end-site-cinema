const usuarioLogado = exigirLoginAdmin();

if (usuarioLogado) {
  document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
}

const chaveCinema = "adminCinemaConfiguracao";

const cinemaPadrao = {
  salas: 0,
  taxaPadrao: 50,
  baseIngresso: 30,
  baseBomboniere: 10
};

function carregarCinemaLocal() {
  const dadosSalvos = JSON.parse(localStorage.getItem(chaveCinema));
  if (dadosSalvos && typeof dadosSalvos === "object") {
    return { ...cinemaPadrao, ...dadosSalvos };
  }
  return cinemaPadrao;
}

function salvarCinema(configuracao) {
  localStorage.setItem(chaveCinema, JSON.stringify(configuracao));
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor || 0));
}

let cinema = carregarCinemaLocal();

async function carregarResumoCinema() {
  try {
    const [salas, sessoes] = await Promise.all([
      adminRequest("/sala"),
      adminRequest("/sessao")
    ]);

    cinema = {
      ...cinema,
      salas: Array.isArray(salas) ? salas.length : cinema.salas,
      sessoes: Array.isArray(sessoes) ? sessoes.length : 0
    };
  } catch (erro) {
    console.error("Erro ao carregar dados de cinema:", erro);
  }
}

function preencherTela() {
  document.getElementById("cardSalas").textContent = cinema.salas;
  document.getElementById("cardTaxa").textContent = `${cinema.taxaPadrao}%`;
  document.getElementById("cardBaseIngresso").textContent = formatarMoeda(cinema.baseIngresso);
  document.getElementById("cardBaseBomboniere").textContent = formatarMoeda(cinema.baseBomboniere);

  document.getElementById("salas").value = cinema.salas;
  document.getElementById("taxa").value = cinema.taxaPadrao;
  document.getElementById("baseIngresso").value = cinema.baseIngresso;
  document.getElementById("baseBomboniere").value = cinema.baseBomboniere;
}

document.getElementById("formCinema").addEventListener("submit", event => {
  event.preventDefault();
  alert("A API de cinema ainda nao tem rota para salvar configuracoes.");
});

document.getElementById("restaurarCinema").addEventListener("click", async () => {
  localStorage.removeItem(chaveCinema);
  cinema = carregarCinemaLocal();
  await carregarResumoCinema();
  preencherTela();
});

async function inicializar() {
  await carregarResumoCinema();
  preencherTela();
}

inicializar();
