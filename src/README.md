# Requisições HTTP — Marketplace

Arquivos para usar com a extensão **REST Client** do Visual Studio Code.

## Arquivos
- `usuarios.http`: operações de Usuario.
- `colecoes.http`: operações de Colecao.
- `vendas.http`: criação, consulta e atualização de Venda.
- `avaliacoes.http`: criação e consulta de AvaliacaoComprador.

## Importante
As URLs `/usuarios`, `/colecoes`, `/vendas` e `/avaliacoes` representam as rotas REST esperadas para os modelos do schema. No ZIP de origem, os controllers encontrados ainda expõem rotas de `users` e `profiles`; portanto, estas novas requisições só funcionarão depois que os controllers/services correspondentes forem implementados ou ajustados para essas rotas.

O schema atualizado foi salvo em `prisma/schema.prisma`. Após confirmar a configuração do Prisma no projeto, execute:
- `npx prisma format`
- `npx prisma validate`
- `npx prisma generate`

Não envie `passwordHash` pelo cliente. O backend deve receber uma senha em um DTO e gerar o hash de forma segura.
