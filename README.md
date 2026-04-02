# **🎬 Cinemonroll — Sistema de Gestão Comercial de Cinema (Em Evolução)**

## 📌 Sobre o projeto

O Cinemonroll iniciou como um sistema de venda de ingressos de cinema, desenvolvido em arquitetura web com Node.js. Atualmente, o projeto está em processo de evolução para um Sistema de Gestão Comercial (SGC), atendendo aos requisitos da disciplina de Desenvolvimento de Sistemas.

A nova versão do sistema tem como objetivo simular um ambiente real de comércio, com foco em controle de clientes, produtos, vendas e autenticação de usuários, utilizando uma arquitetura robusta baseada em Java e boas práticas de Engenharia de Software.

### 🚧 Status do Projeto

⚠️ O sistema está em processo de migração tecnológica e reestruturação arquitetural.

* Front-end atual disponível (Vercel)
* Back-end e banco de dados temporariamente desativados para atualização
* Nova versão sendo desenvolvida com Java + Spring Boot

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
* Atualização automática de estoque

### 🔐 Autenticação e Segurança

* Login com autenticação via token (JWT)
* Controle de acesso por perfil (ADMIN, FUNCIONARIO)
* Proteção de rotas

### 📊 Relatórios

* Vendas por período
* Vendas por cliente
* Visualização de dados para análise

---

## 🧱 Nova Arquitetura

O sistema está sendo reestruturado utilizando Arquitetura em Camadas:

* Camada de Apresentação (Web)
* Camada Controller
* Camada de Aplicação/Serviço
* Camada de Domínio (Entidades e regras de negócio)
* Camada de Persistência (Repository/DAO)
* Banco de Dados

---

## 🛠️ Tecnologias (Nova Versão)

* HTML5
* CSS3
* Java 21+
* Spring Boot 3+
* Spring Data JPA
* MySQL
* Maven
* JWT (JSON Web Token)
* GitHub

---

## 📊 Modelagem do Sistema

O sistema foi modelado utilizando:

* Diagrama de Domínio
* Diagrama de Classes
* Diagrama Lógico do Banco de Dados

A modelagem garante coerência entre regras de negócio, estrutura de dados e implementação.

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

## 📁 Estrutura do Projeto (Em atualização)

/frontend → Interface do usuário
/backend → API REST (em desenvolvimento com Spring Boot)
/docs → Documentação técnica e diagramas

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
