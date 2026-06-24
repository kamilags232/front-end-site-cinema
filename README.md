# **🎬 Cinemonroll — Sistema de Gestão Comercial de Cinema (Em Evolução)**

## 📌 Sobre o projeto

O Cinemonroll iniciou como um sistema de venda de ingressos de cinema, desenvolvido em arquitetura web com Node.js. Atualmente, o projeto está em processo de evolução para um Sistema de Gestão Comercial (SGC), atendendo aos requisitos da disciplina de Desenvolvimento de Sistemas.

A nova versão do sistema tem como objetivo simular um ambiente real de comércio, com foco em controle de clientes, produtos, vendas e autenticação de usuários, utilizando uma arquitetura robusta baseada em Java e boas práticas de Engenharia de Software.

### 🚧 Status do Projeto

⚠️ O sistema está em evolução arquitetural.

* Front-end disponível na Vercel
* Back-end REST desenvolvido com Java + Spring Boot
* Integração com banco MySQL via Spring Data JPA
* Autenticação JWT implementada
* Testes automatizados de API, banco e domínio em desenvolvimento

---

## ✨ Nova Proposta do Sistema

O sistema passará a oferecer:

### 👤 Gestão de Clientes

* Cadastro, edição e consulta de clientes
* Validação de CPF e email
* Controle de clientes com histórico de compras

### 🛒 Gestão de Produtos

* Cadastro de produtos
* Controle de estoque
* Validação de disponibilidade para venda

### 💰 Registro de Vendas

* Venda associada aos dados do cliente
* Lista de itens vendidos
* Cálculo automático do valor total
* Validação de disponibilidade em estoque para venda

### 🔐 Autenticação e Segurança

* Login com autenticação via token (JWT)
* Controle de acesso por perfil (ADMIN, FUNCIONARIO)
* Proteção de rotas

### 📊 Relatórios

* Vendas por período
* Vendas por cliente
* Visualização de dados para análise

---

## 🧱 Arquitetura

O back-end segue uma arquitetura em camadas, promovendo separação de responsabilidades e organização da aplicação.

Estrutura principal:

- Presentation Layer (Controllers)
- DTO Layer
- Service Layer
- Domain Layer
- Persistence Layer (Repositories/JPA)
- Security Layer (JWT + Spring Security)
- Global Exception Handler
- Banco de Dados MySQL

---

## 🔌 Integração Back-end + Banco de Dados

O back-end do sistema foi desenvolvido em Java com Spring Boot e integrado ao MySQL utilizando Spring Data JPA.

A API REST realiza operações de:

* autenticação de usuários;
* gerenciamento de clientes;
* gerenciamento de produtos;
* registro de vendas;
* validação de regras de negócio.

A autenticação é feita via JWT, protegendo os endpoints da aplicação.

---
## 🛠️ Tecnologias

### Back-end
- Java 21+
- Spring Boot 3+
- Spring Security
- Spring Data JPA
- JWT (JSON Web Token)

### Banco de Dados
- MySQL
- H2 Database (testes automatizados)

### Front-end
- HTML5
- CSS3

### DevOps e Ferramentas
- Maven
- GitHub
- GitHub Actions (CI/CD)

---

## 🧪 Testes Automatizados

O projeto possui testes automatizados para:

- autenticação da API;
- rotas protegidas com JWT;
- integração entre back-end e banco MySQL;
- validação de regras de negócio;
- fluxo de vendas e controle de estoque.

Tecnologias utilizadas nos testes:

- JUnit 5
- Spring Boot Test
- MockMvc
- H2 Database
- GitHub Actions

---

## 📊 Modelagem do Sistema

O sistema foi modelado utilizando:

- Diagrama de Domínio
- Diagrama de Classes
- Diagrama Lógico do Banco de Dados

A modelagem garante coerência entre regras de negócio, estrutura de dados e implementação.

### 🎟️ Modelagem de Ingressos e Produtos

No sistema, o ingresso é tratado como uma entidade própria devido à sua associação obrigatória com sessão e assento. Já a entidade produto representa itens genéricos comercializados, como produtos da bomboniere.

Essa abordagem permite atender aos requisitos de um sistema de gestão comercial sem perder a coerência do domínio de cinema.

---

## 🎯 Objetivo

O objetivo do projeto é aplicar, na prática, conceitos de:

* Arquitetura em Camadas
* Programação Orientada a Objetos
* Desenvolvimento de APIs REST
* Integração com Banco de Dados
* Segurança com autenticação baseada em token
* Modelagem de sistemas

---

## 📁 Estrutura do Projeto

```text
/frontend   → Interface do usuário
/backend    → API REST em Spring Boot
/database   → Scripts e modelagem do banco de dados
```
---

## 🌐 Acesso ao sistema

👉 https://web-cinemonroll.vercel.app

⚠️ Observação: Apenas o front-end da versão anterior está disponível no momento.

---

## 📚 Aprendizados

Durante o desenvolvimento e evolução do projeto, estão sendo trabalhados:

* Migração de tecnologias (Node.js → Java)
* Aplicação de arquitetura em camadas
* Implementação de autenticação com JWT
* Modelagem de sistemas com UML
* Boas práticas de organização e versionamento

---

## 📌 Status

🚧 Em desenvolvimento (nova versão em Java)

✔ Modelagem concluída (domínio, classes e banco)

🔄 Migração de arquitetura em andamento

---

## 📄 Licença

Projeto acadêmico — sem fins comerciais.
