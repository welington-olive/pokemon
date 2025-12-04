# Pokemon API

API REST desenvolvida com NestJS para gerenciamento de autenticação e listagem de pokemons. Integração com a PokeAPI.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **PokeAPI** - API externa de pokemons

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- Yarn
- PostgreSQL (ou acesso ao banco de dados configurado)

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
yarn install
```

3. Configure as variáveis de ambiente (opcional, já configurado com valores padrão):

```bash
# As configurações já estão no código, mas você pode criar um arquivo .env
# Veja .env.example para referência
```

## 🗄️ Banco de Dados

O projeto está configurado para usar o banco de dados PostgreSQL fornecido. As configurações estão em `src/config/database.config.ts`.

### Migrations

Para executar as migrations:

```bash
# Executar migrations
yarn migration:run

# Reverter última migration
yarn migration:revert
```

**Nota:** O `synchronize` está habilitado em desenvolvimento, então as tabelas serão criadas automaticamente na primeira execução.

## 🏃 Executando a aplicação

```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn build
yarn start:prod
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Documentação Swagger

Após iniciar a aplicação, acesse:

```
http://localhost:3000/api
```

A documentação Swagger está completa com:
- Descrição de todos os endpoints
- Schemas de requisição e resposta
- Exemplos
- Autenticação JWT integrada

## 🔐 Endpoints

### Autenticação

#### POST `/auth/register`
Registra um novo usuário.

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com"
  }
}
```

#### POST `/auth/login`
Faz login e retorna o token JWT.

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com"
  }
}
```

### Pokemons (Requer Autenticação)

#### GET `/pokemons`
Lista pokemons com paginação e filtro opcional por nome.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `name` (opcional): Filtrar por nome do pokemon
- `page` (opcional, padrão: 1): Número da página
- `limit` (opcional, padrão: 20, máximo: 100): Itens por página

**Exemplo:**
```
GET /pokemons?name=pikachu&page=1&limit=20
```

**Resposta:**
```json
{
  "data": [
    {
      "id": 25,
      "name": "pikachu",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      "height": 4,
      "weight": 60,
      "abilities": [
        {
          "name": "lightning-rod",
          "url": "https://pokeapi.co/api/v2/ability/31/"
        },
        {
          "name": "static",
          "url": "https://pokeapi.co/api/v2/ability/9/"
        }
      ]
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 1302,
  "totalPages": 66
}
```

**Nota:** As habilidades são retornadas em ordem alfabética.

## 🔒 Segurança

- Senhas são hasheadas com bcrypt (10 salt rounds)
- JWT com expiração configurável (padrão: 7 dias)
- Validação de dados com class-validator
- Guards para proteção de rotas
- CORS habilitado

## 📝 Validações

Todos os endpoints possuem validação de dados:
- Email deve ser válido
- Senha deve ter no mínimo 6 caracteres
- Parâmetros de paginação validados
- Mensagens de erro descritivas

## 🏗️ Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
│   ├── dto/             # DTOs de autenticação
│   ├── guards/          # Guards JWT
│   ├── strategies/      # Estratégia JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── users.service.ts
├── pokemons/            # Módulo de pokemons
│   ├── dto/             # DTOs de pokemons
│   ├── pokemons.controller.ts
│   ├── pokemons.service.ts
│   └── pokemons.module.ts
├── entities/            # Entidades TypeORM
│   └── user.entity.ts
├── config/              # Configurações
│   ├── database.config.ts
│   └── jwt.config.ts
├── migrations/          # Migrations do banco
├── app.module.ts
└── main.ts
```

## 🧪 Testes

```bash
# Testes unitários
yarn test

# Testes com cobertura
yarn test:cov

# Testes E2E
yarn test:e2e
```

## 📦 Scripts Disponíveis

- `yarn start:dev` - Inicia em modo desenvolvimento
- `yarn build` - Compila o projeto
- `yarn start:prod` - Inicia em modo produção
- `yarn lint` - Executa o linter
- `yarn format` - Formata o código
- `yarn migration:run` - Executa migrations
- `yarn migration:revert` - Reverte última migration

## 🎯 Boas Práticas Implementadas

- ✅ Separação de responsabilidades (Controllers, Services, Repositories)
- ✅ DTOs com validação
- ✅ TypeScript com tipagem forte
- ✅ Documentação Swagger completa
- ✅ Tratamento de erros
- ✅ Segurança (JWT, bcrypt)
- ✅ Performance (cache, paginação)
- ✅ Código organizado e modular
- ✅ Migrations para versionamento do banco

## 📄 Licença

Este projeto é privado.
