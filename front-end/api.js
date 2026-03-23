/* ================================
   api.js — Comunicação com o Back-end Node.js
   ================================= */

/*
   O que esse arquivo faz:
  - Envia os dados do pedido (ingresso + lanches + pagamento) do front pro back-end Node.js.
  - Recebe a resposta (ex: "Compra confirmada!" ou erro).
  - Carrega a lista de assentos ocupados do banco de dados.
*/

/*  URL BASE DA API
   Substitua "http://localhost:3000/..."
   pela URL real do seu endpoint Node.js quando souber.
*/
// Endpoint correto para enviar um pedido/venda ao back-end
const API_URL = "https://apisistemaingresso-production.up.railway.app"
const API_Cliente = `${API_URL}/cliente`;
const API_Filme = `${API_URL}/filme`;
const API_Sala = `${API_URL}/sala`;
const API_Sessao = `${API_URL}/sessao`;
const API_Venda = `${API_URL}/venda`;
const API_Ingresso = `${API_URL}/ingresso`;
const API_Lanche = `${API_URL}/lanche`;
const API_VendaLanche = `${API_URL}/venda-lanche`;
const API_Assento = `${API_URL}/assento`;

/*  Função para enviar os dados da compra ao back-end */
async function enviarPedido(dadosCompra) {
  try {
    console.log("📦 Dados recebidos:", dadosCompra);

    // 1️⃣ Validações iniciais
    if (!dadosCompra.nome || !dadosCompra.email) {
      alert("❌ Nome e email são obrigatórios.");
      return null;
    }

    if (!dadosCompra.sessaoId) {
      alert("❌ Selecione uma sessão válida.");
      return null;
    }

    if (!dadosCompra.assentos || dadosCompra.assentos.length === 0) {
      alert("❌ Selecione pelo menos um assento.");
      return null;
    }

    // 2️⃣ Criar cliente
    const clientePayload = {
      cliente: dadosCompra.nome,
      email: dadosCompra.email,
      cpf: dadosCompra.cpf || null
    };

    console.log("👤 Criando cliente:", clientePayload);

    const resCliente = await fetch(API_Cliente, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientePayload)
    });

    if (!resCliente.ok) {
      const erro = await resCliente.json();
      console.error("⚠️ Erro ao criar cliente:", erro);
      alert("Erro ao criar cliente. Verifique os dados.");
      return null;
    }

    const clienteCriado = await resCliente.json();
    const cd_cliente = clienteCriado.cd_cliente;
    console.log("✅ Cliente criado:", cd_cliente);

    // 3️⃣ Criar venda
    const vendaPayload = {
      cd_cliente,
      dt_hr_venda: new Date().toISOString(),
      valor_total: dadosCompra.total || 0,
      tp_pagamento: dadosCompra.pagamento || "dinheiro"
    };

    console.log("💳 Criando venda:", vendaPayload);

    const resVenda = await fetch(API_Venda, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendaPayload)
    });

    if (!resVenda.ok) {
      const erro = await resVenda.json();
      console.error("⚠️ Erro ao criar venda:", erro);
      alert("Erro ao criar venda.");
      return null;
    }

    const vendaCriada = await resVenda.json();
    const nr_recibo = vendaCriada.nr_recibo;
    console.log("✅ Venda criada:", nr_recibo);

    // 4️⃣ Validar sessão
    const sessoesDoFilme = dadosCompra.sessoesDoFilme || [];
    
    if (sessoesDoFilme.length === 0) {
      alert("❌ Nenhuma sessão disponível para este filme e tipo de sessão.");
      return null;
    }

    const sessaoSelecionada = sessoesDoFilme.find(s => s.cd_sessao === dadosCompra.sessaoId);
    
    if (!sessaoSelecionada) {
      alert("❌ Sessão selecionada não encontrada!");
      return null;
    }

    console.log("✅ Sessão validada:", sessaoSelecionada);

    // 5️⃣ Criar ingressos (um para cada assento)
const valorPorAssento = dadosCompra.totalIngressos / dadosCompra.quantidadeAssentos;

for (let i = 0; i < dadosCompra.assentos.length; i++) {
    const assentoNumero = dadosCompra.assentos[i]; // ex: "A1"
    const tipoIngresso = dadosCompra.tiposIngresso?.[i] || "inteira";

    // 🔹 Se o assento já existir no banco, pega o cd_assento, senão cria um novo assento
    let cd_assento;

    const assentosSessao = await fetch(`${API_Assento}/sessao/${sessaoSelecionada.cd_sessao}`)
        .then(res => res.json())
        .catch(() => []);

    const assentoExistente = assentosSessao.find(a => a.numero_assento === assentoNumero);

    if (assentoExistente) {
        cd_assento = assentoExistente.cd_assento;
    } else {
        // Criar novo assento no banco para esta sessão
        const novoAssentoPayload = {
            numero_assento: assentoNumero,
            cd_sessao: sessaoSelecionada.cd_sessao,
            ocupado: false
        };

        const resNovoAssento = await fetch(API_Assento, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAssentoPayload)
        });

        if (!resNovoAssento.ok) {
            console.error(`❌ Erro ao criar assento ${assentoNumero}`);
            continue; // pula para o próximo assento
        }

        const novoAssentoCriado = await resNovoAssento.json();
        cd_assento = novoAssentoCriado.cd_assento;
    }

    // 🔹 Criar ingresso
    const ingressoPayload = {
        nr_recibo,
        cd_sessao: sessaoSelecionada.cd_sessao,
        cd_assento,
        tp_ingresso: tipoIngresso.slice(0, 10), // garante CHAR(10)
        valor_ingresso: Number(valorPorAssento.toFixed(2))
    };

    console.log(`🎟️ Criando ingresso ${i + 1}:`, ingressoPayload);

    const resIngresso = await fetch(API_Ingresso, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingressoPayload)
    });

    if (!resIngresso.ok) {
        const erro = await resIngresso.json().catch(() => null);
        console.error("⚠️ Erro ao criar ingresso:", erro);
        continue;
    }
    //Marcar assento como ocupado
        await fetch(`${API_Assento}/${cd_assento}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            numero_assento: assentoNumero, 
            cd_sessao: sessaoSelecionada.cd_sessao,
            ocupado: true 
        })
    });
}

console.log("✅ Ingressos criados");

// 6️⃣ Criar lanches dinamicamente usando cd_lanche e mapa de valores
if (dadosCompra.lanches && dadosCompra.lanches !== "Nenhum") {
    console.log("🍿 Processando lanches...");

    // Mapa de lanches com cd_lanche e valor
    const lancheMap = {
        "Combo Pipoca Média + Refri 500ml": { cd_lanche: 1, valor: 25 },
        "Pipoca Pequena": { cd_lanche: 2, valor: 15 },
        "Pipoca Média": { cd_lanche: 3, valor: 20 },
        "Pipoca Grande": { cd_lanche: 4, valor: 25 },
        "Refrigerante 300ml": { cd_lanche: 5, valor: 5 },
        "Refrigerante 500ml": { cd_lanche: 6, valor: 10 },
        "Refrigerante 700ml": { cd_lanche: 7, valor: 15 },
        "Barra de Chocolate 90g": { cd_lanche: 8, valor: 7 },
        "M&M 80g": { cd_lanche: 9, valor: 4.5 },
        "Fini 80g": { cd_lanche: 10, valor: 7.5 }
    };

    const lanchesArray = dadosCompra.lanches.split(",").map(l => l.trim());

    for (const lancheStr of lanchesArray) {
        if (!lancheStr) continue; // pula strings vazias

        // Extrai quantidade do formato "Nome (x3)"
        const qtdMatch = lancheStr.match(/\(x(\d+)\)/);
        const quantidade = qtdMatch ? parseInt(qtdMatch[1]) : 1;

        // Remove a parte da quantidade do nome
        const nomeLanche = lancheStr.replace(/\(x\d+\).*/, "").trim();
        if (!nomeLanche) continue; // pula se o nome ficou vazio

        // Busca lanche no mapa
        const lancheInfo = lancheMap[nomeLanche];
        if (!lancheInfo) {
            console.warn(`⚠️ Lanche não encontrado no mapa: ${nomeLanche}`);
            continue;
        }

        const vendaLanchePayload = {
            nr_recibo,
            cd_lanche: lancheInfo.cd_lanche,
            quantidade,
            valor_parcial: quantidade * lancheInfo.valor
        };

        console.log("🍿 Criando venda-lanche:", vendaLanchePayload);

        await fetch(API_VendaLanche, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vendaLanchePayload)
        });
    }

    console.log("✅ Lanches criados com cd_lanche e valores corretos");
}

// 7️⃣ Recalcular total da venda (sempre recalcula, tenha ou não lanches)
console.log("🔄 Recalculando total...");
await fetch(`${API_Venda}/recalcular/${nr_recibo}`, { method: "PUT" });

console.log("✅ Pedido finalizado com sucesso!", { nr_recibo });
return { venda: vendaCriada, nr_recibo };

} catch (erro) {
    console.error("❌ Falha ao conectar com o servidor:", erro);
    alert("Erro de conexão com o servidor. Verifique se o back-end está rodando.");
    return null;
}
} 