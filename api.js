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
const API_URL = "http://localhost:3000/usuarios";

/*  Função para enviar os dados da compra ao back-end */
async function enviarPedido(dadosCompra) {
  try {
    // Envia o pedido como JSON
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosCompra),
    });

    // Tenta interpretar a resposta como JSON
    const resultado = await resposta.json().catch(() => null);

    if (resposta.ok) {
      console.log("✅ Pedido enviado com sucesso!", resultado);
      alert(resultado?.mensagem || "Compra confirmada com sucesso!");
      return resultado;
    } else {
      console.error("⚠️ Erro na requisição:", resultado);
      alert(resultado?.mensagem || "Erro ao processar o pedido.");
    }
  } catch (erro) {
    console.error("❌ Falha ao conectar com o servidor:", erro);
    alert("Erro de conexão com o servidor. Verifique se o back-end está rodando.");
  }
}