# Cinemonroll — Sistema de Gestão Comercial de Cinema (Em Evolução)

Aplicação web desenvolvida para simular um sistema de cinema e evoluída para um Sistema de Gestão Comercial, com foco no controle de clientes, produtos, vendas, autenticação de usuários e integração com banco de dados.

Aplicação Publicada: https://web-cinemonroll.vercel.app

Observação: no momento, a aplicação publicada corresponde ao front-end da versão anterior do projeto.

## Descrição do Problema Real

A gestão de vendas, clientes e produtos é uma necessidade recorrente em estabelecimentos comerciais. Em ambientes como cinemas, além da venda de ingressos, também existe a necessidade de controlar produtos, estoque, clientes, formas de pagamento e registros de vendas.

Quando essas informações não são organizadas em um sistema centralizado, podem ocorrer problemas como perda de dados, dificuldade no acompanhamento das vendas, falhas no controle de estoque e pouca clareza sobre o histórico de atendimento ao cliente.

O projeto Cinemonroll parte desse contexto para representar, de forma acadêmica e prática, uma solução de gestão comercial aplicada ao domínio de cinema.

## Proposta da Solução

O Cinemonroll foi desenvolvido como uma aplicação web voltada inicialmente para a experiência de escolha de filmes e compra de ingressos. Com a evolução do projeto, a proposta passou a incluir uma estrutura mais completa de Sistema de Gestão Comercial.

A nova versão do sistema utiliza um back-end em Java com Spring Boot para disponibilizar uma API REST responsável por autenticação, cadastro de clientes, cadastro de produtos e registro de vendas.

Com isso, o projeto busca simular um ambiente real de gestão, permitindo organizar dados comerciais, validar regras de negócio e aplicar conceitos de arquitetura em camadas, segurança, persistência de dados e testes automatizados.

## Público-Alvo

- Estudantes de desenvolvimento de sistemas
- Pessoas interessadas em projetos acadêmicos com Java e Spring Boot
- Pequenos negócios que desejam compreender a estrutura básica de um sistema comercial
- Usuários que desejam simular um fluxo de cinema com escolha de filmes e compra de ingressos

## Funcionalidades Principais

- Seleção de filmes no front-end
- Fluxo visual de compra de ingressos
- Cadastro de usuários
- Login com autenticação JWT
- Controle de acesso com Spring Security
- Cadastro de clientes
- Listagem de clientes com paginação
- Edição e remoção de clientes
- Cadastro de produtos
- Listagem de produtos com paginação
- Edição e remoção de produtos
- Controle de estoque
- Registro de vendas
- Associação de vendas a clientes e usuários
- Cálculo de itens vendidos
- Validação de regras de negócio
- Tratamento global de exceções
- Documentação da API com Swagger/OpenAPI
- Testes automatizados de API, banco e domínio
- Integração com MySQL
- Integração contínua com GitHub Actions

## Tecnologias Utilizadas

- Java 21 - linguagem principal do back-end
- Spring Boot - criação da API REST
- Spring Security - autenticação e proteção de rotas
- JWT - autenticação baseada em token
- Spring Data JPA - persistência de dados
- MySQL - banco de dados principal
- H2 Database - banco utilizado em testes automatizados
- Maven - gerenciamento de dependências e build
- JUnit 5 - testes automatizados
- MockMvc - testes de endpoints da API
- Swagger/OpenAPI - documentação da API
- HTML5 - estrutura do front-end
- CSS3 - estilização da interface
- JavaScript - interatividade do front-end
- GitHub Actions - integração contínua
- Vercel - publicação do front-end

## Documentação do Tratamento de Exceções

O sistema possui validações para garantir a integridade das informações.

As principais exceções tratadas são:

- 400 — Bad Request

Quando os dados enviados são inválidos.

Exemplos:

- email inválido;
- campos obrigatórios vazios;
- CPF duplicado.
- 401 — Unauthorized

Quando o usuário não está autenticado ou o token JWT é inválido.

- 403 — Forbidden

Quando o usuário tenta acessar uma rota protegida sem autorização.

- 404 — Not Found

Quando o recurso solicitado não existe.

Exemplo:

- cliente inexistente;
- produto inexistente.
- 409 — Conflict

Quando ocorre conflito de regras de negócio.

Exemplo:

estoque insuficiente.
- 500 — Internal Server Error

Erro inesperado no servidor.

As exceções são tratadas pela camada de serviços e retornadas em formato JSON para facilitar o consumo pela interface.

## Documentação das Regras de Negócio
- Clientes
  
CPF não pode ser duplicado.

Email deve possuir formato válido.

Campos obrigatórios devem ser preenchidos.

- Produtos
  
Quantidade em estoque não pode ser negativa.

Preço deve ser maior que zero.

Nome do produto é obrigatório.

- Vendas
  
Toda venda deve possuir cliente.

Toda venda deve possuir pelo menos um produto.

Não é permitido vender quantidade superior ao estoque.

O valor total é calculado automaticamente.

Após confirmação da venda, o estoque é atualizado automaticamente.

- Usuários
  
Apenas usuários autenticados podem acessar a API.

Todas as rotas protegidas exigem JWT válido.

## Arquitetura do Projeto

O back-end segue uma organização em camadas, separando responsabilidades e facilitando manutenção, testes e evolução do sistema.

Estrutura principal:

- Controller - recebe as requisições HTTP e expõe os endpoints da API
- DTO - transporta dados entre a API e as camadas internas
- Service - concentra regras de negócio
- Domain Model - representa as entidades principais do sistema
- Repository - realiza a comunicação com o banco de dados
- Config - configura autenticação JWT e proteção de rotas
- Exception - centraliza o tratamento de erros

Estrutura de pastas:

- front-end - interface web da aplicação <br>
- back-end - API REST em Java com Spring Boot <br>
- database - scripts e arquivos relacionados ao banco de dados

## Endpoints Principais

Autenticação:

```text
POST /auth/login
POST /auth/register
```

Clientes:

```text
POST /clientes
GET /clientes
GET /clientes/{id}
PUT /clientes/{id}
DELETE /clientes/{id}
```

Produtos:

```text
POST /produtos
GET /produtos
GET /produtos/{id}
PUT /produtos/{id}
DELETE /produtos/{id}
```

Vendas:

```text
POST /vendas
GET /vendas
GET /vendas/{id}
```

Documentação da API:

```text
http://localhost:8080/swagger-ui.html
```

## Instruções de Instalação

### 1 - Instalar o Java 21

O back-end do projeto foi desenvolvido com Java 21, então essa versão é necessária.

Para verificar se você já tem Java instalado, abra o terminal e digite:

```bash
java -version
```

O resultado esperado deve mostrar a versão 21.

Caso não apareça, instale o Java 21 no seu sistema e abra o terminal novamente.

### 2 - Instalar o Git

O Git é necessário para baixar o projeto.

Para verificar se já tem Git instalado, digite:

```bash
git --version
```

Caso não tenha, instale o Git e mantenha as opções padrão do instalador.

### 3 - Instalar o MySQL

O projeto utiliza MySQL como banco de dados principal.

Crie um banco com o nome:

```sql
bd_cinema
```

Também é possível utilizar o script disponível na pasta:

```text
database/bd_cinema.sql
```

### 4 - Clonar o projeto

No terminal, entre na pasta onde deseja salvar o projeto e execute:

```bash
git clone https://github.com/kamilags232/web-cinemonroll.git
```

Depois, entre na pasta criada:

```bash
cd web-cinemonroll
```

### 5 - Configurar variáveis do back-end

O arquivo de configuração do projeto aceita variáveis de ambiente para conexão com o banco e autenticação JWT.

Valores utilizados pela aplicação:

```text
DB_URL=jdbc:mysql://localhost:3306/bd_cinema
DB_USERNAME=root
DB_PASSWORD=
JWT_SECRET=sua_secret_key_muito_segura_com_mais_de_32_caracteres_aqui
JWT_EXPIRATION=3600000
```

Caso você utilize outro usuário, senha ou porta do MySQL, ajuste esses valores antes de executar o sistema.

### 6 - Baixar dependências e compilar o back-end

Entre na pasta do back-end:

```bash
cd back-end
```

No Windows, execute:

```bash
mvnw.cmd clean install
```

No macOS/Linux, execute:

```bash
./mvnw clean install
```

Resultado esperado:

```text
BUILD SUCCESS
```

Possíveis problemas:

```text
"java não reconhecido" -> Java não instalado corretamente
"Access denied" ou erro de permissão no Linux/macOS -> execute chmod +x mvnw
erro de conexão com banco -> verifique se o MySQL está aberto e se o banco bd_cinema existe
```

## Instruções de Execução

### Executar o back-end

Dentro da pasta `back-end`, execute:

Windows:

```bash
mvnw.cmd spring-boot:run
```

macOS/Linux:

```bash
./mvnw spring-boot:run
```

O que vai acontecer?

- O Spring Boot será iniciado
- A API ficará disponível localmente
- O sistema tentará se conectar ao banco MySQL configurado
- A documentação Swagger poderá ser acessada no navegador

Endereço padrão:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/swagger-ui.html
```

### Executar o front-end

O front-end está na pasta:

```text
front-end
```

Para abrir a versão estática, abra o arquivo `index.html` no navegador.

Também é possível utilizar a versão publicada:

```text
https://web-cinemonroll.vercel.app
```

## Instruções para Rodar os Testes

Execute no terminal, dentro da pasta `back-end`:

Windows:

```bash
mvnw.cmd test
```

macOS/Linux:

```bash
./mvnw test
```

O que vai acontecer?

- O Maven vai compilar o projeto
- Os testes automatizados serão executados
- Serão verificados fluxos de autenticação, integração com banco e regras de vendas

Resultado esperado:

```text
BUILD SUCCESS
```

O que está sendo testado?

- Carregamento do contexto da aplicação
- Autenticação da API
- Rotas protegidas com JWT
- Integração com banco de dados
- Fluxo de vendas
- Regras de negócio do domínio
- Controle de estoque

## Integração Contínua

O projeto possui workflow no GitHub Actions para executar os testes do back-end automaticamente.

O workflow configura:

- Java 21
- MySQL 8.0
- Banco de teste
- Variáveis de ambiente para o back-end
- Execução dos testes Maven

Arquivo do workflow:

```text
.github/workflows/backend-tests.yml
```

## Modelagem do Sistema

O projeto possui arquivos relacionados à modelagem e ao banco de dados na pasta `database`.

A modelagem contempla entidades importantes para o funcionamento do sistema, como usuários, clientes, produtos, vendas e itens de venda.

## Versão Atual

0.0.1-SNAPSHOT - versão em evolução com back-end em Spring Boot, autenticação JWT, integração com MySQL, testes automatizados e front-end publicado.

## Status do Projeto

Em desenvolvimento.

- Modelagem concluída ou em evolução conforme requisitos acadêmicos
- Back-end REST implementado com Java e Spring Boot
- Autenticação JWT implementada
- Integração com MySQL configurada
- Testes automatizados em desenvolvimento
- Front-end publicado na Vercel

## Autores

Anne Caroline Gonçalves de Mesquita

Anna Nicolly da Silva

Kamila Gomes 

Sciel Buitrago

## Link do Repositório Público

https://github.com/kamilags232/web-cinemonroll

## Licença

Projeto acadêmico sem fins comerciais.
