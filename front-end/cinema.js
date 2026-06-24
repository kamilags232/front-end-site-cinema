const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;

const chaveCinema = "adminCinemaConfiguracao";

const cinemaPadrao = {
  salas: 6,
  taxaPadrao: 50,
  baseIngresso: 30,
  baseBomboniere: 10
};

function carregarCinema() {
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
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

let cinema = carregarCinema();

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

  cinema = {
    salas: Number(document.getElementById("salas").value || 0),
    taxaPadrao: Number(document.getElementById("taxa").value || 0),
    baseIngresso: Number(document.getElementById("baseIngresso").value || 0),
    baseBomboniere: Number(document.getElementById("baseBomboniere").value || 0)
  };

  salvarCinema(cinema);
  preencherTela();
});

document.getElementById("restaurarCinema").addEventListener("click", () => {
  localStorage.removeItem(chaveCinema);
  cinema = carregarCinema();
  preencherTela();
});

preencherTela();
