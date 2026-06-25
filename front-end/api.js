/* ================================
   api.js - Comunicacao com o back-end Java
   ================================= */

const API_URL = "http://localhost:8080";

const API_Cliente = `${API_URL}/cliente`;
const API_Clientes = `${API_URL}/clientes`;
const API_Filme = `${API_URL}/filme`;
const API_Sala = `${API_URL}/sala`;
const API_Sessao = `${API_URL}/sessao`;
const API_Venda = `${API_URL}/venda`;
const API_Ingresso = `${API_URL}/ingresso`;
const API_VendaLanche = `${API_URL}/venda-lanche`;
const API_Assento = `${API_URL}/assento`;

function agoraLocalParaBackend() {
  const data = new Date();
  const offsetMs = data.getTimezoneOffset() * 60000;
  return new Date(data.getTime() - offsetMs).toISOString().slice(0, 19);
}

function getHeaders() {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function validarLoginObrigatorio() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Faca login para finalizar a compra.");
    window.location.href = "login.html";
    return false;
  }

  return true;
}

async function lerRespostaErro(response) {
  const texto = await response.text();

  try {
    return JSON.parse(texto);
  } catch {
    return texto || `Erro HTTP ${response.status}`;
  }
}

async function obterClienteExistente(cpf, email) {
  const response = await fetch(`${API_Clientes}?size=1000`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) {
    return null;
  }

  const pagina = await response.json();
  const clientes = Array.isArray(pagina.content) ? pagina.content : [];
  return clientes.find(cliente => cliente.cpf === cpf || cliente.email === email) || null;
}

async function criarOuObterCliente(dadosCompra) {
  const cpf = (dadosCompra.cpf || "").replace(/\D/g, "");

  if (cpf.length !== 11) {
    alert("Informe um CPF valido com 11 digitos.");
    return null;
  }

  const clientePayload = {
    nome: dadosCompra.nome,
    email: dadosCompra.email,
    cpf,
    telefone: "",
    endereco: ""
  };

  const resCliente = await fetch(API_Cliente, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(clientePayload)
  });

  if (resCliente.ok) {
    return resCliente.json();
  }

  const clienteExistente = await obterClienteExistente(cpf, dadosCompra.email);

  if (clienteExistente) {
    return clienteExistente;
  }

  const erro = await lerRespostaErro(resCliente);
  console.error("Erro ao criar cliente:", erro);
  alert("Erro ao criar cliente. Verifique nome, email e CPF.");
  return null;
}

async function enviarPedido(dadosCompra) {
  try {
    if (!validarLoginObrigatorio()) {
      return null;
    }

    console.log("Dados recebidos:", dadosCompra);

    if (!dadosCompra.nome || !dadosCompra.email) {
      alert("Nome e email sao obrigatorios.");
      return null;
    }

    if (!dadosCompra.sessaoId) {
      alert("Selecione uma sessao valida.");
      return null;
    }

    if (!dadosCompra.assentos || dadosCompra.assentos.length === 0) {
      alert("Selecione pelo menos um assento.");
      return null;
    }

    const clienteCriado = await criarOuObterCliente(dadosCompra);

    if (!clienteCriado) {
      return null;
    }

    const cd_cliente = clienteCriado.id;
    console.log("Cliente selecionado:", cd_cliente);

    const vendaPayload = {
      clienteId: cd_cliente,
      usuarioId: JSON.parse(localStorage.getItem("usuarioLogado") || "{}").id,
      dt_hr_venda: agoraLocalParaBackend(),
      valor_total: dadosCompra.total || 0,
      tipoPagamento: dadosCompra.pagamento || "dinheiro"
    };

    const resVenda = await fetch(API_Venda, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(vendaPayload)
    });

    if (!resVenda.ok) {
      const erro = await lerRespostaErro(resVenda);
      console.error("Erro ao criar venda:", erro);
      alert("Erro ao criar venda.");
      return null;
    }

    const vendaCriada = await resVenda.json();
    const nr_recibo = vendaCriada.nr_recibo || vendaCriada.nrRecibo || vendaCriada.id;
    const sessoesDoFilme = dadosCompra.sessoesDoFilme || [];
    const sessaoSelecionada = sessoesDoFilme.find(s => Number(s.cd_sessao ?? s.cdSessao) === Number(dadosCompra.sessaoId));
    const cdSessao = sessaoSelecionada?.cd_sessao ?? sessaoSelecionada?.cdSessao;

    if (!sessaoSelecionada) {
      alert("Sessao selecionada nao encontrada.");
      return null;
    }

    const valorPorAssento = dadosCompra.totalIngressos / dadosCompra.quantidadeAssentos;

    for (let i = 0; i < dadosCompra.assentos.length; i++) {
      const assentoNumero = dadosCompra.assentos[i];
      const tipoIngresso = dadosCompra.tiposIngresso?.[i] || "inteira";

      const resAssentos = await fetch(`${API_Assento}/sessao/${cdSessao}`, {
        method: "GET",
        headers: getHeaders()
      });

      const assentosSessao = resAssentos.ok ? await resAssentos.json() : [];
      const assentoExistente = assentosSessao.find(a => (a.numero_assento ?? a.numeroAssento) === assentoNumero);
      let cd_assento = assentoExistente?.cd_assento ?? assentoExistente?.cdAssento;

      if (!cd_assento) {
        const novoAssentoPayload = {
          numero_assento: assentoNumero,
          cd_sessao: cdSessao,
          ocupado: false
        };

        const resNovoAssento = await fetch(API_Assento, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(novoAssentoPayload)
        });

        if (!resNovoAssento.ok) {
          console.error(`Erro ao criar assento ${assentoNumero}:`, await lerRespostaErro(resNovoAssento));
          return null;
        }

        const novoAssentoCriado = await resNovoAssento.json();
        cd_assento = novoAssentoCriado.cd_assento ?? novoAssentoCriado.cdAssento;
      }

      const ingressoPayload = {
        nr_recibo,
        cd_sessao: cdSessao,
        cd_assento,
        tp_ingresso: tipoIngresso,
        valor_ingresso: Number(valorPorAssento.toFixed(2))
      };

      const resIngresso = await fetch(API_Ingresso, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(ingressoPayload)
      });

      if (!resIngresso.ok) {
        console.error("Erro ao criar ingresso:", await lerRespostaErro(resIngresso));
        return null;
      }

      await fetch(`${API_Assento}/${cd_assento}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          numero_assento: assentoNumero,
          cd_sessao: cdSessao,
          ocupado: true
        })
      });
    }

    await criarVendasDeLanche(dadosCompra, nr_recibo);

    await fetch(`${API_Venda}/recalcular/${nr_recibo}`, {
      method: "PUT",
      headers: getHeaders()
    });

    console.log("Pedido finalizado com sucesso:", { nr_recibo });
    return { venda: vendaCriada, nr_recibo };
  } catch (erro) {
    console.error("Falha ao conectar com o servidor:", erro);
    alert("Erro de conexao com o servidor. Verifique se o back-end esta rodando.");
    return null;
  }
}

async function criarVendasDeLanche(dadosCompra, nr_recibo) {
  if (!dadosCompra.lanches || dadosCompra.lanches === "Nenhum") {
    return;
  }

  const lancheMap = {
    "Combo Pipoca Media + Refri 500ml": { cd_lanche: 1, valor: 25, nome_produto: "Combo Pipoca Media + Refri 500ml" },
    "Combo Pipoca Média + Refri 500ml": { cd_lanche: 1, valor: 25, nome_produto: "Combo Pipoca Media + Refri 500ml" },
    "Pipoca Pequena": { cd_lanche: 2, valor: 15, nome_produto: "Pipoca Pequena" },
    "Pipoca Media": { cd_lanche: 3, valor: 20, nome_produto: "Pipoca Media" },
    "Pipoca Média": { cd_lanche: 3, valor: 20, nome_produto: "Pipoca Media" },
    "Pipoca Grande": { cd_lanche: 4, valor: 25, nome_produto: "Pipoca Grande" },
    "Refrigerante 300ml": { cd_lanche: 5, valor: 5, nome_produto: "Refrigerante 300ml" },
    "Refrigerante 500ml": { cd_lanche: 6, valor: 10, nome_produto: "Refrigerante 500ml" },
    "Refrigerante 700ml": { cd_lanche: 7, valor: 15, nome_produto: "Refrigerante 700ml" },
    "Barra de Chocolate 90g": { cd_lanche: 8, valor: 7, nome_produto: "Barra de Chocolate 90g" },
    "M&M 80g": { cd_lanche: 9, valor: 4.5, nome_produto: "M&M 80g" },
    "Fini 80g": { cd_lanche: 10, valor: 7.5, nome_produto: "Fini 80g" },
    "Fini 80g (Tubes, Beijo, Dentadura)": { cd_lanche: 10, valor: 7.5, nome_produto: "Fini 80g" }
  };

  const lanchesArray = dadosCompra.lanches.split(",").map(lanche => lanche.trim());

  for (const lancheStr of lanchesArray) {
    if (!lancheStr) {
      continue;
    }

    const qtdMatch = lancheStr.match(/\(x(\d+)\)/);
    const quantidade = qtdMatch ? parseInt(qtdMatch[1], 10) : 1;
    const nomeLanche = lancheStr
      .replace(/\(x\d+\).*/, "")
      .replace(/:.*/, "")
      .trim();

    const lancheInfo = lancheMap[nomeLanche];

    if (!lancheInfo) {
      console.warn(`Lanche nao encontrado no mapa: ${nomeLanche}`);
      continue;
    }

    const vendaLanchePayload = {
      nr_recibo,
      cd_lanche: lancheInfo.cd_lanche,
      nome_lanche: lancheInfo.nome_produto,
      quantidade,
      valor_parcial: quantidade * lancheInfo.valor
    };

    const response = await fetch(API_VendaLanche, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(vendaLanchePayload)
    });

    if (!response.ok) {
      console.error("Erro ao criar venda-lanche:", await lerRespostaErro(response));
      return;
    }
  }
}
