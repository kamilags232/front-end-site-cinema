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
  if (movieName) movieTitleEl.textContent = movieName;

  const seatsContainer = document.getElementById("seats");
  if (seatsContainer) {
    const rows = 5;
    const cols = 8;
    const rowLetters = ["A", "B", "C", "D", "E"];

    // criar assentos por fileira (A1..A8, B1..B8, ...)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        const label = `${rowLetters[r]}${c + 1}`;
        seat.dataset.id = label; // identifica o assento pelo rótulo
        seat.textContent = label;
        seat.title = `Assento ${label}`;
        if (Math.random() < 0.1) seat.classList.add("occupied");
        seatsContainer.appendChild(seat);
      }
    }

    seatsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateTicketSelection();
        updateSummary();
      }
    });
  }

  const cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      e.target.value = value;
    });
  }
  document.getElementById("showtime").addEventListener("change", updateSummary);
  document.getElementById("session-type").addEventListener("change", updateSummary);
  document.querySelectorAll("input[name='payment']").forEach(r => r.addEventListener("change", updateSummary));

  // === NOVO SISTEMA DE LANCHES COM SUPORTE A MÚLTIPLAS OPÇÕES ===
  const snackItems = document.querySelectorAll(".item");

  snackItems.forEach(item => {
    const minusBtn = item.querySelector(".minus");
    const plusBtn = item.querySelector(".plus");
    const quantityEl = item.querySelector(".quantity");
    const extraBox = item.querySelector(".extra");

    minusBtn.addEventListener("click", () => {
      let qty = parseInt(quantityEl.textContent);
      if (qty > 0) {
        quantityEl.textContent = qty - 1;
        if (extraBox) updateExtraVisibility();
        updateSummary();
      }
    });

    plusBtn.addEventListener("click", () => {
      let qty = parseInt(quantityEl.textContent);
      quantityEl.textContent = qty + 1;
      if (extraBox) updateExtraVisibility();
      updateSummary();
    });

    // Função para atualizar a visibilidade e campos de extras
    const updateExtraVisibility = () => {
      const quantity = parseInt(quantityEl.textContent);
      if (quantity > 0) {
        extraBox.classList.remove('hidden');
        // Se tem atributo data-extra, mostrar campos individuais
        if (item.dataset.extra) {
          renderExtraFields(item, quantity);
        }
      } else {
        extraBox.classList.add('hidden');
      }
    };
  });

  // Função para renderizar campos individuais para cada item
  function renderExtraFields(item, quantity) {
    const extraBox = item.querySelector('.extra');
    const extraType = item.dataset.extra;
    // Captura opções do select original (cacheia para chamadas subsequentes)
    let options = [];
    const originalSelect = extraBox.querySelector('select');
    if (originalSelect) {
      options = Array.from(originalSelect.options).map(o => ({ value: o.value, text: o.textContent }));
      // cachear no item para evitar perder as opções ao limpar o DOM
      item._cachedExtraOptions = options;
    } else if (item._cachedExtraOptions) {
      options = item._cachedExtraOptions;
    } else {
      // nada a renderizar
      return;
    }

    // Limpar conteúdo anterior e criar container
    let extraFieldsContainer = extraBox.querySelector('.extra-fields');
    if (!extraFieldsContainer) {
      extraFieldsContainer = document.createElement('div');
      extraFieldsContainer.className = 'extra-fields';
      extraBox.innerHTML = '';
      extraBox.appendChild(extraFieldsContainer);
    } else {
      extraFieldsContainer.innerHTML = '';
    }

    // Criar campo para cada unidade
    for (let i = 1; i <= quantity; i++) {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = 'extra-field-wrapper';
      fieldWrapper.style.marginBottom = '10px';

      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.marginBottom = '5px';
      label.style.fontWeight = '600';
      
      if (extraType === 'pipoca') {
        label.textContent = `${i}️⃣ Sabor:`;
      } else if (extraType === 'fini') {
        label.textContent = `${i}️⃣ Tipo:`;
      }

      const select = document.createElement('select');
      select.className = 'extra-select';
      select.setAttribute('data-item-index', i);
      select.style.width = '100%';
      select.style.padding = '8px';
      select.style.borderRadius = '6px';
      select.style.border = '1px solid #444';
      select.style.backgroundColor = '#333';
      select.style.color = '#fff';
      select.style.cursor = 'pointer';

      // Copiar opções previamente capturadas
      options.forEach(opt => {
        const newOption = document.createElement('option');
        newOption.value = opt.value;
        newOption.textContent = opt.text;
        select.appendChild(newOption);
      });

      select.addEventListener('change', updateSummary);

      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(select);
      extraFieldsContainer.appendChild(fieldWrapper);
    }
  }

  const finalizarBtn = document.getElementById("finalizar-btn");
  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", () => {
      const selectedSeats = document.querySelectorAll(".seat.selected");
  const showtime = document.getElementById("showtime").value;
  const sessionSelect = document.getElementById("session-type");
  const sessionValue = sessionSelect ? sessionSelect.value : "";
  const sessionTypeLabel = sessionSelect ? sessionSelect.options[sessionSelect.selectedIndex]?.text : "";
      const email = document.getElementById("email").value;
      const name = document.getElementById("nome").value;
      const cpf = document.getElementById("cpf").value;
      const payment = document.querySelector('input[name="payment"]:checked')?.value;

      // Verificar se um filme foi selecionado
      if (!movieName) {
        alert("⚠️ Por favor, selecione um filme antes de finalizar a compra.");
        window.location.href = "index.html";
        return;
      }

      // CPF não é mais obrigatório — removido da validação
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);

  if (!name || !showtime || !sessionValue || !email || !isValidEmail || !payment || selectedSeats.length === 0) {
        if (!isValidEmail && email) {
          alert("⚠️ Por favor, insira um e-mail válido (exemplo: exemplo@email.com).");
        } else {
          alert("⚠️ Por favor, preencha todos os campos e selecione um método de pagamento.");
        }
        return;
      }

      // preço base: 20 reais por assento
      let basePrice = 20;

  // aplica acréscimos por tipo de sessão — sessionValue é algo como '3D-dub' ou 'IMAX-leg'
  const baseSession = sessionValue.split('-')[0];
  if (baseSession === "3D") basePrice *= 1.12;
  else if (baseSession === "IMAX") basePrice *= 1.25;

      basePrice = Math.round(basePrice);

      const seatTotal = selectedSeats.length * basePrice;
      
      // Cálculo dos snacks
      const snackItemsAll = document.querySelectorAll(".item");
      let snackTotal = 0;
      let snackNames = [];

      snackItemsAll.forEach(item => {
        const qty = parseInt(item.querySelector(".quantity").textContent);
        const price = parseFloat(item.dataset.price);
        const name = item.dataset.name;

        if (qty > 0) {
          snackTotal += qty * price;
          snackNames.push(`${name} (x${qty})`);
        }
      });

      snackNames = snackNames.length ? snackNames.join(", ") : "Nenhum";
      const total = seatTotal + snackTotal;

      const modal = document.createElement("div");
      modal.innerHTML = `
        <div id="confirm-modal" style="
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        ">
          <div style="
            background: #fff;
            color: #333;
            padding: 25px;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: fadeIn 0.3s ease;
          ">
            <h2 style="margin-bottom: 15px;">Confirme sua compra</h2>
            <p><b>Filme:</b> ${movieName}</p>
            <p><b>Sessão:</b> ${sessionTypeLabel}</p>
            <p><b>Horário:</b> ${showtime}</p>
            <p><b>Assentos:</b> ${selectedSeats.length}</p>
            <p><b>Lanches:</b> ${snackNames}</p>
            <p><b>Forma de Pagamento:</b> ${payment}</p>
            <p style="margin-top:10px; font-weight:bold; font-size:1.2em;">
              Total: R$ ${total.toFixed(2).replace('.', ',')}
            </p>

            <div style="margin-top:20px; display:flex; justify-content:space-around;">
              <button id="cancelar" style="
                background:#ccc; border:none; padding:10px 20px;
                border-radius:8px; cursor:pointer;">Cancelar</button>
              <button id="confirmar" style="
                background:#28a745; border:none; color:white;
                padding:10px 20px; border-radius:8px; cursor:pointer;">Confirmar</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById("cancelar").addEventListener("click", () => {
        modal.remove();
      });

      document.getElementById("confirmar").addEventListener("click", () => {
            // fecha modal de confirmação
            modal.remove();

            // cria modal estilizado de sucesso
            const successModal = document.createElement("div");
            successModal.id = "success-modal-overlay";
            successModal.innerHTML = `
              <div id="success-modal" style="
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                z-index: 1100;
              ">
                <div style="
                  background: #111;
                  color: #fff;
                  padding: 25px;
                  border-radius: 12px;
                  width: 90%;
                  max-width: 420px;
                  text-align: center;
                  box-shadow: 0 8px 30px rgba(0,0,0,0.6);
                ">
                  <h2 style="margin-bottom:10px;color:#ffb800;font-family:'Poppins', sans-serif;">✅ Compra confirmada</h2>
                  <p style="margin-bottom:8px;">O ingresso foi enviado para o seu email:</p>
                  <p style="font-weight:700;margin-bottom:12px;">${email}</p>
                  <p style="color:#ddd;margin-bottom:16px;font-size:0.95rem;">Enviamos o(s) ingresso(s) e as instruções para retirada por e-mail. Obrigado pela sua compra!</p>
                  <div style="display:flex;justify-content:center;gap:12px;">
                    <button id="success-ok" style="background:#28a745;border:none;color:#fff;padding:10px 18px;border-radius:8px;cursor:pointer;">OK</button>
                  </div>
                  <p style="font-size:0.85rem;color:#999;margin-top:12px;">Você será redirecionado para a página inicial em 20 segundos ou clique OK para voltar agora.</p>
                </div>
              </div>
            `;

            document.body.appendChild(successModal);

            const finish = () => {
              localStorage.clear();
              window.location.href = "index.html";
            };

            document.getElementById("success-ok").addEventListener("click", finish);

            // redireciona automaticamente após 20s
            setTimeout(finish, 20000);
      });
    });
  }

  function updateSummary() {
    const selectedSeats = document.querySelectorAll(".seat.selected");
  const showtime = document.getElementById("showtime").value || "—";
  const sessionSelect = document.getElementById("session-type");
  const sessionValue = sessionSelect ? sessionSelect.value : "";
  const sessionType = sessionSelect ? sessionSelect.options[sessionSelect.selectedIndex]?.text || "—" : "—";
    const payment = document.querySelector('input[name="payment"]:checked')?.value || "—";

    // Preços base por tipo de ingresso
    const ticketPrices = {
      inteira: 20,
      "meia-estudante": 10,
      "meia-senior": 10,
      "meia-pcd": 10,
      "meia-acomp-pcd": 10,
      "meia-prof": 10,
      "meia-outras": 10
    };

    // Aplicar acréscimos por tipo de sessão
    const applySessionMultiplier = (basePrice) => {
      // sessionValue contém valor como '3D-dub' ou 'IMAX-leg'
      const baseSession = sessionSelect ? (sessionSelect.value.split('-')[0]) : "";
      if (baseSession === "3D") return Math.round(basePrice * 1.12);
      else if (baseSession === "IMAX") return Math.round(basePrice * 1.25);
      return basePrice;
    };

    // Calcular total de assentos com base nos tipos selecionados
    let seatTotal = 0;
    selectedSeats.forEach(seat => {
      const seatNumber = Array.from(document.querySelectorAll(".seat")).indexOf(seat) + 1;
      const ticketSelect = document.querySelector(`.ticket-type-select[data-seat="${seatNumber}"]`);
      const ticketType = ticketSelect ? ticketSelect.value : "";
      
      if (ticketType && ticketPrices[ticketType]) {
        const basePrice = ticketPrices[ticketType];
        const finalPrice = applySessionMultiplier(basePrice);
        seatTotal += finalPrice;
      }
    });

    // Novo cálculo dos snacks com detalhes de extras
    const snackItemsAll = document.querySelectorAll(".item");
    let snackTotal = 0;
    let snackNames = [];

    snackItemsAll.forEach(item => {
      const qty = parseInt(item.querySelector(".quantity").textContent);
      const price = parseFloat(item.dataset.price);
      const name = item.dataset.name;
      const extraBox = item.querySelector(".extra");
      const extraType = item.dataset.extra;

      if (qty > 0) {
        snackTotal += qty * price;
        
        // Se tem extras com campos individuais
        if (extraBox && extraType && !extraBox.classList.contains('hidden')) {
          const selects = extraBox.querySelectorAll('.extra-select');
          if (selects.length > 0) {
            // Tem campos individuais
            const details = [];
            selects.forEach(select => {
              const value = select.value;
              details.push(value);
            });
            snackNames.push(`${name} (x${qty}): ${details.join(', ')}`);
          } else {
            snackNames.push(`${name} (x${qty})`);
          }
        } else {
          snackNames.push(`${name} (x${qty})`);
        }
      }
    });

    snackNames = snackNames.length ? snackNames.join(", ") : "Nenhum";

    const total = seatTotal + snackTotal;

    const summary = document.getElementById("summary-content");
    if (summary) {
      summary.innerHTML = `
        <b>Filme:</b> ${movieName}<br>
        <b>Tipo de Sessão:</b> ${sessionType}<br>
        <b>Horário:</b> ${showtime}<br>
        <b>Assentos:</b> ${selectedSeats.length || "Nenhum"}<br>
        <b>Lanches:</b> ${snackNames}<br>
        <b>Forma de Pagamento:</b> ${payment}<br>
        <hr style="border:none;border-top:1px solid #444;margin:10px 0;">
        <b>Total Assentos:</b> R$ ${seatTotal.toFixed(2).replace('.', ',')}<br>
        <b>Total Lanches:</b> R$ ${snackTotal.toFixed(2).replace('.', ',')}<br>
        <div style="margin-top:10px;font-size:1.2rem;color:#ff4b2b;font-weight:bold;">
          Total Geral: R$ ${total.toFixed(2).replace('.', ',')}
        </div>
      `;
    }
  }

  function updateTicketSelection() {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    const ticketContainer = document.getElementById("ticket-selection-container");
    const ticketList = document.getElementById("ticket-selection-list");

    if (selectedSeats.length === 0) {
      ticketContainer.classList.add("hidden");
      ticketList.innerHTML = "";
      return;
    }

    ticketContainer.classList.remove("hidden");
    ticketList.innerHTML = "";

    selectedSeats.forEach((seat, index) => {
      // Adicionar um atributo data-id ao assento se não tiver
      if (!seat.dataset.id) {
        const allSeats = document.querySelectorAll(".seat");
        const seatIndex = Array.from(allSeats).indexOf(seat);
        seat.dataset.id = seatIndex + 1;
      }
      const seatNumber = seat.dataset.id;
      
      const seatDiv = document.createElement("div");
      
      seatDiv.innerHTML = `
        <label>Assento ${seatNumber}:</label>
        <select class="ticket-type-select" data-seat="${seatNumber}">
          <option value="">Selecione o tipo</option>
          <option value="inteira">Inteira — R$ 20,00</option>
          <option value="meia-estudante">Meia Estudante — R$ 10,00</option>
          <option value="meia-senior">Meia Sênior (60+) — R$ 10,00</option>
          <option value="meia-pcd">Meia PCD / Autistas — R$ 10,00</option>
          <option value="meia-acomp-pcd">Meia Acomp. PCD — R$ 10,00</option>
          <option value="meia-prof">Meia Prof. Ensino — R$ 10,00</option>
          <option value="meia-outras">Outras Meias (por lei) — R$ 10,00</option>
        </select>
      `;
      
      ticketList.appendChild(seatDiv);
    });

    // Adicionar event listeners aos selects
    document.querySelectorAll(".ticket-type-select").forEach(select => {
      select.addEventListener("change", updateSummary);
    });
  }
}