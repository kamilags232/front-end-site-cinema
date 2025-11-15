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
const API_Cliente = "http://localhost:3000/cliente";
const API_Filme = "http://localhost:3000/filme";
const API_Sala = "http://localhost:3000/sala";
const API_Sessao = "http://localhost:3000/sessao";
const API_Venda = "http://localhost:3000/venda";
const API_Ingresso = "http://localhost:3000/ingresso";
const API_Lanche = "http://localhost:3000/lanche";
const API_VendaLanche = "http://localhost:3000/venda-lanche";
const API_Assento = "http://localhost:3000/assento";

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
      return resultado;
    } else {
      console.error("⚠️ Erro na requisição:", resultado);
      alert(resultado?.mensagem || "Erro ao processar o pedido.");
      return null;
    }
  } catch (erro) {
    console.error("❌ Falha ao conectar com o servidor:", erro);
    alert("Erro de conexão com o servidor. Verifique se o back-end está rodando.");
    return null;
  }
}