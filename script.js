const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedMovie = btn.dataset.movie;
    localStorage.setItem("selectedMovie", selectedMovie);
    window.location.href = "checkout.html";
  });
});

if (window.location.pathname.includes("checkout.html")) {
  const movieTitleEl = document.getElementById("movie-title");
  const movieName = localStorage.getItem("selectedMovie");
  if (movieName) movieTitleEl.textContent = `🎬 ${movieName}`;

  const seatsContainer = document.getElementById("seats");
  if (seatsContainer) {
    const rows = 5;
    const cols = 8;
    for (let i = 0; i < rows * cols; i++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      if (Math.random() < 0.1) seat.classList.add("occupied");
      seatsContainer.appendChild(seat);
    }

    seatsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSummary();
      }
    });
  }

  const finalizarBtn = document.getElementById("finalizar-btn");
  finalizarBtn.addEventListener("click", () => {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    const showtime = document.getElementById("showtime").value;
    const email = document.getElementById("email").value;

    if (selectedSeats.length === 0 || !showtime || !email) {
      alert("Por favor, selecione assentos, horário e insira seu e-mail.");
      return;
    }

    alert(`✅ Compra confirmada!\nFilme: ${movieName}\nAssentos: ${selectedSeats.length}\nHorário: ${showtime}\nConfirmação enviada para: ${email}`);
    localStorage.clear();
    window.location.href = "index.html";
  });

  function updateSummary() {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    const showtime = document.getElementById("showtime").value || "—";
    const total = selectedSeats.length * 25;
    const summary = document.getElementById("summary-content");
    summary.innerHTML = `
       <b>Filme:</b> ${movieName}<br>
       <b>Horário:</b> ${showtime}<br>
       <b>Assentos:</b> ${selectedSeats.length}<br>
       <b>Total:</b> R$ ${total},00
    `;
  }
}
