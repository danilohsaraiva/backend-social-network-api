# API Node.js Template

Este é um template para criar APIs RESTful em Node.js utilizando Express, TypeScript, Prisma ORM e PostgreSQL. O projeto está configurado para rodar em containers Docker com autoreload para desenvolvimento.

## Descrição

O template inclui uma estrutura básica para uma API Node.js com:
- **Express**: Framework web para Node.js.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Prisma**: ORM para interação com o banco de dados PostgreSQL.
- **Docker**: Containerização para facilitar o desenvolvimento e deploy.
- **Autoload**: Recarregamento automático do servidor durante o desenvolvimento.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Como Usar Este Template

Este repositório é um template no GitHub. Para usá-lo:

1. Clique no botão **"Use this template"** no topo da página do repositório no GitHub.
2. Escolha um nome para o seu novo repositório e clique em **"Create repository from template"**.
3. Clone o repositório criado para sua máquina local:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   cd SEU_REPOSITORIO
   ```

4. Configure as variáveis de ambiente (veja a seção de configuração abaixo).

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env-example`:
   ```env
   PORT=3001

   DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco?schema=public"

   POSTGRES_USER=seu_usuario
   POSTGRES_PASSWORD=sua_senha
   POSTGRES_DB=seu_banco

   NODE_ENV=production

   JWT_SECRET=ABC-S3CR3T
   JWT_EXPIRES_IN=1h
   
   REDIS_URL"sua_url_redis"
   ```

2. Ajuste as configurações no `prisma/schema.prisma` conforme necessário para o seu banco de dados.

## Instalação e Execução

### Com Docker (Recomendado)

1. Certifique-se de que o Docker e Docker Compose estão instalados e rodando.

2. Execute o comando para construir e iniciar os containers:
   ```bash
   docker compose up --build
   ```

3. A API estará disponível em `http://localhost:3030`.

4. O Prisma Studio (interface gráfica para o banco) estará disponível em `http://localhost:5555`.

5. Para parar os containers:
   ```bash
   docker compose down
   ```

**Nota**: Com Docker, o autoreload está ativado. Qualquer mudança nos arquivos será automaticamente refletida no container.

### Sem Docker (Desenvolvimento Local)

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o banco de dados PostgreSQL localmente ou use um serviço como ElephantSQL.

3. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

4. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```

5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

6. A API estará disponível em `http://localhost:3030`.

## Estrutura do Projeto

```
├── src/
│   ├── config/          # Arquivos de configuração
│   ├── containers/      # Padrão para abstrair inicializações
│   ├── controllers/     # Camada que gere recursos HTTP
│   ├── docs/            # Documentação e recursos auxiliares
│   ├── dtos/            # Data Transfer Objects
│   ├── infra/           # Integrações externas do sistema
|   │   ├── cache/       # Implementação de cache com Redis
│   ├── interfaces/      # Contratos de implementação
│   ├── middlewares/     # Middlewares personalizados
│   ├── interfaces/      # Interfaces personalizados
│   ├── models/          # Modelos de dados
│   ├── providers/       # Serviços utilitários e integrações (ex: hash, crypto)
│   ├── repositories/    # Acopla a manilações do DB
│   ├── routes/          # Definições de rotas
│   ├── services/        # Lógica de negócio
│   ├── utils/           # Utilitários
|   │   ├── types/       # Types
│   ├── app.ts           # Configuração do Express
│   └── server.ts        # Ponto de entrada da aplicação
├── prisma/
│   ├── schema.prisma    # Esquema do banco de dados
│   └── migrations/      # Migrações do Prisma
├── Dockerfile           # Configuração do container da aplicação
├── docker-compose.yml   # Configuração dos serviços Docker
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
└── readme.md            # Este arquivo
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com autoreload.
- `npm run build`: Compila o TypeScript para JavaScript.
- `npm run start`: Inicia o servidor em produção (após build).

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript para execução do backend.
- **Express**: Framework web utilizado para construção da API.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma**: ORM utilizado para manipulação do banco de dados.
- **PostgreSQL**: Banco de dados relacional utilizado na aplicação.
- **Docker**: Ferramenta de containerização para padronização do ambiente.
- **ts-node-dev**: Utilizado no desenvolvimento para execução com TypeScript e hot reload.
- **Redis**: Banco de dados em memória utilizado para cache, melhorando performance da API (RESTful).
- **Swagger**: Ferramenta para documentação e testes da API.
- **Render**: Plataforma utilizada para deploy da aplicação em nuvem.
- **jsonwebtoken (JWT)**: Utilizado para autenticação e troca segura de informações entre cliente e servidor.

## 📊 Documentação do Sistema

## Requisitos

<div>

<div>

### 📌 Requisitos Funcionais

| ID   | Descrição | Status |
|------|-----------|--------|
| RF01 | Cadastro de usuários | ✅ |
| RF02 | Login de usuários autenticado JWT | ✅ |
| RF03 | Usuário pode Tweetar | ✅ |
| RF04 | Usuário pode curtir tweets (seus e de outros usuários) | ✅ |
| RF05 | Usuário pode tweetar como resposta a tweets quaisquer | ✅ |
| RF06 | Tweet pode conter de 0 a N replies | ✅ |
| RF07 | Usuário pode seguir outros usuários | ✅ |
| RF08 | Usuário não pode seguir a si mesmo | ✅ |
| RF09 | Usuário deve ter (id, nome, username, senha e imagem URL) | ✅ |
| RF10 | Tweet deve ter (id, conteúdo) e pertencer a um usuário | ✅ |
| RF11 | Deploy da aplicação (Render ou Vercel) | ✅ |

</div>

---

<div>

### ⚙️ Requisitos Não Funcionais

| ID    | Descrição | Status |
|-------|-----------|--------|
| RNF01 | Documentação com Swagger | ✅ |
| RNF02 | Segurança com autenticação JWT | ✅ |
| RNF03 | Escalabilidade | ✅|
| RNF04 | Código de fácil manutenção | ✅ |
| RNF05 | Portabilidade entre ambientes (Docker) | ✅ |


</div>

</div>

## Diagramas

### 🔄 Fluxograma
<p align="center">
  <img src="./src/docs/images/mental-model.png" alt="Fluxograma" width="800"/>
</p>

---

### 🧩 UML de Classes
<p align="center">
  <img src="./src/docs/images/uml-user-tweet-relationship.png" alt="UML de Classes" width="800"/>

  #### &
<p align="center">
  <img src="./src/docs/images/uml-user-follow-relationship.png" alt="UML de Classes" width="800"/>
</p>

  #### &
<p align="center">
  <img src="./src/docs/images/uml-user-like-relationship.png" alt="UML de Classes" width="800"/>
</p>

---

### 👤 Caso de Uso
<p align="center">
  <img src="./src/docs/images/user-case.png" alt="Caso de Uso" width="800"/>
</p>

## Swagger 

Acompanhamento dos endpoints da aplicação

# 📌 Progresso dos Endpoints da API

| #  | Descrição do Endpoint                        | Método | Status        | Observações                                                                 |
|----|----------------------------------------------|--------|---------------|-----------------------------------------------------------------------------|
| 1  | Criar novo usuário                           | POST   | ✅ Concluído   |                                                                             |
| 2  | Obter dados do usuário (tweets e seguidores) | GET    | ✅ Concluído   |                                                                             |
| 3  | Login de usuário                             | POST   | ✅ Concluído   | 🔐 JWT                                                                      |
| 4  | Criar tweet                                  | POST   | ✅ Concluído   | 🔐 JWT                                                                      |
| 5  | Criar resposta (reply) de tweet              | POST   | Pendente ❓   | 🔐 JWT <br> Rota abstraída para o endpoint `POST /tweets`                    |
| 6  | Obter feed do usuário (tweets + tweets seguidores)    | GET    | ✅ Concluído   | 🔐 JWT, Obs: (Aplicar Paginação)                                                                      |
| 7  | Curtir tweet                                 | POST   | ✅ Concluído   | 🔐 JWT                                                                      |
| 8  | Remover curtida de tweet                     | DELETE | ✅ Concluído   | 🔐 JWT                                                                      |
| 9  | Seguir usuário                               | POST   | ✅ Concluído   | 🔐 JWT                                                                      |
| 10 | Deixar de seguir usuário                     | DELETE | ✅ Concluído   | 🔐 JWT                                                                      |
| 11 | EXTRA - Buscar replies de um tweet específico| GET | ✅ Concluído   | 🔐 JWT                                                                      |

Legenda: 
⏳ Pendente 
🚧 Em andamento
✅ Concluído
❌ Bloqueado
🔐 Middleware de autenticação JWT

## 👁‍🗨 Aplicando Princípios RESTFul

| Princípio RESTful            | Descrição                                                                        | Status |
| ---------------------------- | -------------------------------------------------------------------------------- | ------ |
| 🔗 Client-Server             | Separação clara entre frontend (client) e backend (server)                       | ✅      |
| 🧱 Stateless                 | Cada requisição contém todas as informações necessárias (sem estado no servidor) | ✅      |
| 📦 Cacheable                 | Respostas podem ser cacheadas para melhorar performance                          | ✅      |
| 🎯 Uniform Interface         | API segue padrões consistentes (rotas, métodos HTTP, responses)                  | ✅      |
| 🧩 Layered System            | Sistema organizado em camadas (controller, service, repository)                  | ✅      |
| ⚙️ Code on Demand (opcional) | Servidor pode enviar código executável (raramente usado em APIs modernas)        | ⬜      |


## 🚀 Deploy da Aplicação

A aplicação já está disponível online e pode ser acessada através do link abaixo:

🔗 **Acesso à API:**  
https://backend-social-network-api.onrender.com/

O deploy foi realizado utilizando a plataforma **Render**, garantindo disponibilidade contínua e acesso público à API.

---

## 📄 Documentação da API

A documentação completa da API está disponível via **Swagger**, permitindo testar todos os endpoints diretamente pelo navegador:

🔗 **Swagger UI:**  
https://backend-social-network-api.onrender.com/docs/
#### Overview Swagger Docs:
<p align="center">
  <img src="./src/docs/images/swagger-docs.png" alt="Dashboard Swagger" width="800"/>

💡 Observações


A aplicação pode apresentar um pequeno tempo de resposta inicial devido ao cold start do ambiente gratuito do Render.


Recomenda-se utilizar a documentação Swagger para explorar e validar os endpoints disponíveis.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
## Licença

Este projeto está sob a licença ISC.