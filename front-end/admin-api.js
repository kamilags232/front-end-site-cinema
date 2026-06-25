const ADMIN_API_URL = "http://localhost:8080";

function adminHeaders() {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function exigirLoginAdmin() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const token = localStorage.getItem("token");

  if (!usuarioLogado || !token) {
    window.location.href = "login.html";
    return null;
  }

  return usuarioLogado;
}

async function adminRequest(path, options = {}) {
  const response = await fetch(`${ADMIN_API_URL}${path}`, {
    ...options,
    headers: {
      ...adminHeaders(),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Erro HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function listarPagina(path, size = 1000) {
  const separador = path.includes("?") ? "&" : "?";
  const data = await adminRequest(`${path}${separador}size=${size}`);
  return Array.isArray(data.content) ? data.content : data;
}

function mostrarStatus(id, texto) {
  const status = document.getElementById(id);
  if (status) {
    status.textContent = texto;
  }
}
