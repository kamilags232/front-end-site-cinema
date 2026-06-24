const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;

const chaveUsuariosSistema = "adminUsuariosSistema";
const chaveUsuariosLogin = "usuarios";

const cargos = {
  admin: "Administrador",
  gestor: "Gestor",
  funcionario: "Funcionário"
};

const permissoesPadrao = {
  admin: "acesso total ao painel, usuários, cinema, produtos, estoque, vendas e relatórios",
  gestor: "gerenciar usuários, produtos, estoque, vendas, relatórios e dados do cinema",
  funcionario: "vender ingressos, consultar vendas e acompanhar estoque"
};

const usuariosPadrao = [
  {
    id: 1,
    nome: "Ana Rocha",
    usuario: "ana.admin",
    email: "ana.rocha@cinemonroll.com",
    senha: "admin123",
    papel: "admin",
    status: "ativo",
    permissoes: permissoesPadrao.admin
  },
  {
    id: 2,
    nome: "Bruno Lima",
    usuario: "bruno.gestor",
    email: "bruno.lima@cinemonroll.com",
    senha: "gestor123",
    papel: "gestor",
    status: "ativo",
    permissoes: permissoesPadrao.gestor
  },
  {
    id: 3,
    nome: "Carla Mendes",
    usuario: "carla.func",
    email: "carla.mendes@cinemonroll.com",
    senha: "func123",
    papel: "funcionario",
    status: "inativo",
    permissoes: "atendimento ao cliente"
  }
];

function carregarUsuarios() {
  const dadosSalvos = JSON.parse(localStorage.getItem(chaveUsuariosSistema));
  if (Array.isArray(dadosSalvos) && dadosSalvos.length > 0) {
    return dadosSalvos.map(normalizarUsuario);
  }

  const usuariosLogin = JSON.parse(localStorage.getItem(chaveUsuariosLogin)) || [];
  if (usuariosLogin.length > 0) {
    return usuariosLogin.map((usuario, index) => normalizarUsuario({
      id: index + 1,
      ...usuario,
      papel: usuario.papel || "funcionario",
      status: usuario.status || "ativo"
    }));
  }

  return usuariosPadrao;
}

function normalizarUsuario(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome || usuario.usuario || "",
    usuario: usuario.usuario || usuario.email || "",
    email: usuario.email || "",
    senha: usuario.senha || "",
    papel: usuario.papel || "funcionario",
    status: usuario.status || "ativo",
    permissoes: usuario.permissoes || permissoesPadrao[usuario.papel] || ""
  };
}

function salvarUsuarios(usuariosAtualizados) {
  localStorage.setItem(chaveUsuariosSistema, JSON.stringify(usuariosAtualizados));
  localStorage.setItem(chaveUsuariosLogin, JSON.stringify(usuariosAtualizados.map(usuario => ({
    nome: usuario.nome,
    usuario: usuario.usuario,
    email: usuario.email,
    senha: usuario.senha,
    papel: usuario.papel,
    status: usuario.status
  }))));
}

function proximoId(usuariosAtualizados) {
  return usuariosAtualizados.length ? Math.max(...usuariosAtualizados.map(usuario => Number(usuario.id) || 0)) + 1 : 1;
}

function statusClasse(status) {
  return status === "ativo" ? "success" : "danger";
}

function textoCargo(papel) {
  return cargos[papel] || papel;
}

function aplicarPermissaoPadrao() {
  const papel = document.getElementById("papel").value;
  const permissoes = document.getElementById("permissoes");

  if (!permissoes.value.trim()) {
    permissoes.value = permissoesPadrao[papel] || "";
  }
}

let usuarios = carregarUsuarios();
salvarUsuarios(usuarios);

function atualizarCards() {
  document.getElementById("cardTotal").textContent = usuarios.length;
  document.getElementById("cardAtivos").textContent = usuarios.filter(usuario => usuario.status === "ativo").length;
  document.getElementById("cardInativos").textContent = usuarios.filter(usuario => usuario.status === "inativo").length;
  document.getElementById("cardAdmins").textContent = usuarios.filter(usuario => usuario.papel === "admin" || usuario.papel === "gestor").length;
}

function limparFormulario() {
  document.getElementById("formUsuario").reset();
  document.getElementById("usuarioId").value = "";
  document.getElementById("tituloForm").textContent = "Criar conta interna";
  document.getElementById("senha").required = true;
  document.getElementById("confirmarSenha").required = true;
  aplicarPermissaoPadrao();
}

function preencherFormulario(usuario) {
  document.getElementById("usuarioId").value = usuario.id;
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("usuario").value = usuario.usuario;
  document.getElementById("email").value = usuario.email;
  document.getElementById("papel").value = usuario.papel;
  document.getElementById("status").value = usuario.status;
  document.getElementById("permissoes").value = usuario.permissoes || "";
  document.getElementById("senha").value = "";
  document.getElementById("confirmarSenha").value = "";
  document.getElementById("senha").required = false;
  document.getElementById("confirmarSenha").required = false;
  document.getElementById("tituloForm").textContent = "Editar conta interna";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderizarTabela() {
  const tbody = document.getElementById("listaUsuarios");

  tbody.innerHTML = usuarios.map(usuario => `
    <tr>
      <td><strong>${usuario.nome}</strong></td>
      <td>${usuario.usuario}</td>
      <td>${usuario.email}</td>
      <td><span class="pill neutral">${textoCargo(usuario.papel)}</span></td>
      <td><span class="pill ${statusClasse(usuario.status)}">${usuario.status}</span></td>
      <td class="perm-text">${usuario.permissoes || "Sem permissões extras"}</td>
      <td>
        <div class="table-actions">
          <button class="table-btn edit" type="button" title="Editar" data-edit="${usuario.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="table-btn remove" type="button" title="Remover" data-remove="${usuario.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll("[data-edit]").forEach(button => {
    button.addEventListener("click", () => {
      const usuarioSelecionado = usuarios.find(item => Number(item.id) === Number(button.dataset.edit));
      if (usuarioSelecionado) {
        preencherFormulario(usuarioSelecionado);
      }
    });
  });

  tbody.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.remove);
      if (!confirm("Deseja remover esta conta interna?")) return;
      usuarios = usuarios.filter(usuario => Number(usuario.id) !== id);
      salvarUsuarios(usuarios);
      renderizarTabela();
      atualizarCards();
      limparFormulario();
    });
  });
}

document.getElementById("formUsuario").addEventListener("submit", event => {
  event.preventDefault();

  const id = document.getElementById("usuarioId").value;
  const usuarioAcesso = document.getElementById("usuario").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const usuarioExistente = id ? usuarios.find(usuario => Number(usuario.id) === Number(id)) : null;

  const loginDuplicado = usuarios.some(usuario =>
    Number(usuario.id) !== Number(id) &&
    (usuario.usuario.toLowerCase() === usuarioAcesso.toLowerCase() || usuario.email.toLowerCase() === email.toLowerCase())
  );

  if (loginDuplicado) {
    alert("Já existe uma conta com este usuário ou e-mail.");
    return;
  }

  if (!id && !senha) {
    alert("Informe uma senha inicial para a nova conta.");
    return;
  }

  if (senha || confirmarSenha) {
    if (senha.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não conferem.");
      return;
    }
  }

  const papel = document.getElementById("papel").value;
  const dados = {
    nome: document.getElementById("nome").value.trim(),
    usuario: usuarioAcesso,
    email,
    senha: senha || usuarioExistente?.senha || "",
    papel,
    status: document.getElementById("status").value,
    permissoes: document.getElementById("permissoes").value.trim() || permissoesPadrao[papel] || ""
  };

  if (id) {
    usuarios = usuarios.map(usuario => Number(usuario.id) === Number(id) ? { ...usuario, ...dados } : usuario);
  } else {
    usuarios = [...usuarios, { id: proximoId(usuarios), ...dados }];
  }

  salvarUsuarios(usuarios);
  renderizarTabela();
  atualizarCards();
  limparFormulario();
});

document.getElementById("cancelarEdicao").addEventListener("click", limparFormulario);
document.getElementById("novoUsuarioBtn").addEventListener("click", limparFormulario);
document.getElementById("papel").addEventListener("change", aplicarPermissaoPadrao);

limparFormulario();
atualizarCards();
renderizarTabela();
