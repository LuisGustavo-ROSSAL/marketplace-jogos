# Marketplace API — NestJS + Prisma

API REST organizada por módulos NestJS, usando o modelo de dados de `Usuario`, `Colecao`, `Venda` e `AvaliacaoComprador`.

## Requisitos

- Node.js 20.19+ (recomendado para Prisma 7)
- npm

## Configuração

```bash
npm install
```

Copie `.env.example` para `.env` e mantenha a configuração SQLite para iniciar localmente:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

Gere o Prisma Client, crie a migração inicial e aplique-a ao banco:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

A API fica em `http://localhost:3000/api`.

> Este projeto mantém SQLite por ser o banco usado no ZIP de referência. Para usar PostgreSQL ou MySQL, é necessário alterar o provider, a URL e o adaptador do Prisma.

## Rotas

Todas as rotas usam o prefixo `/api`.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuarios` | Criar usuário (`{ "nome": "Ana" }`) |
| GET | `/usuarios` | Listar usuários |
| GET | `/usuarios/:id` | Buscar usuário e relações |
| PATCH | `/usuarios/:id` | Alterar nome |
| DELETE | `/usuarios/:id` | Excluir usuário |
| POST | `/colecoes` | Criar coleção (`{ "nomeConsole": "PlayStation 5" }`) |
| GET | `/colecoes` | Listar coleções e transações |
| GET | `/colecoes/:id` | Buscar coleção e transações |
| PATCH | `/colecoes/:id` | Alterar nome do console |
| DELETE | `/colecoes/:id` | Excluir coleção |
| POST | `/vendas` | Criar venda (`{ "idColecao": 1, "idVendedor": 1, "idComprador": null }`) |
| GET | `/vendas` | Listar vendas com relações |
| GET | `/vendas/:id` | Buscar venda |
| PATCH | `/vendas/:id` | Atualizar coleção, vendedor ou comprador |
| DELETE | `/vendas/:id` | Excluir venda |
| POST | `/avaliacoes` | Criar avaliação (`{ "idVenda": 1, "idUsuario": 2, "idVendor": 1 }`) |
| GET | `/avaliacoes` | Listar avaliações |
| GET | `/avaliacoes/:id` | Buscar avaliação |
| DELETE | `/avaliacoes/:id` | Excluir avaliação |

## Exemplo de fluxo

1. Cadastre um usuário vendedor em `POST /api/usuarios`.
2. Cadastre um usuário comprador em `POST /api/usuarios`.
3. Cadastre uma coleção em `POST /api/colecoes`.
4. Crie uma venda em `POST /api/vendas`, passando os IDs existentes.
5. Registre uma avaliação em `POST /api/avaliacoes`.

O banco garante as referências pelas relações do Prisma. As rotas de criação retornam o registro criado e, quando aplicável, seus dados relacionados.
