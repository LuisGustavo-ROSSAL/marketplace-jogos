# Frontend

Aplicação React, TypeScript e Next.js usando o App Router. Cada tela corresponde a um `page.tsx` dentro de `src/app/`; o caminho da pasta define a URL. Os componentes compartilhados ficam em `src/components/`.

## Estrutura

```text
src/
  app/                        Rotas e layout do Next.js
  components/                 Cabeçalho, menu, cartões e estados vazios
  context/                    Estado compartilhado entre páginas
  data/                       Dados de demonstração
  types/                      Tipos usados entre módulos
  utils/                      Funções auxiliares
  styles.css                  Estilos globais e responsivos
```

## Páginas

| Arquivo | Rota | Tela |
|---|---|---|
| `app/page.tsx` | `/` | Catálogo inicial |
| `app/colecao/page.tsx` | `/colecao` | Minha coleção |
| `app/anuncios/[id]/page.tsx` | `/anuncios/:id` | Detalhes do anúncio |
| `app/anuncios/novo/page.tsx` | `/anuncios/novo` | Criar anúncio |
| `app/meus-anuncios/page.tsx` | `/meus-anuncios` | Meus anúncios |
| `app/favoritos/page.tsx` | `/favoritos` | Favoritos |
| `app/mensagens/page.tsx` | `/mensagens` | Mensagens |
| `app/perfis/page.tsx` | `/perfis` | Perfis cadastrados |
| `app/perfil/page.tsx` | `/perfil` | Perfil do usuário |
| `app/entrar/page.tsx` | `/entrar` | Entrar |
| `app/cadastro/page.tsx` | `/cadastro` | Criar conta |
| `app/configuracoes/page.tsx` | `/configuracoes` | Configurações |

## Executar localmente

No terminal do VS Code, a partir da raiz do projeto:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

O Next.js informará o endereço local, normalmente `http://localhost:3000`.

## Dados e backend

Os anúncios são lidos e criados pelo endpoint `/api/colecoes` do backend, disponível por padrão em `http://localhost:3001/api`. O cadastro aceita nome, preço, condição, ano, descrição e uma imagem em Base64 (`imagemUrl`). O frontend também aceita `NEXT_PUBLIC_API_URL` para apontar para outra URL da API.

Se a API não estiver disponível, o frontend mantém os dados de demonstração em `src/data/demoListings.ts`. As imagens Base64 são enviadas no corpo JSON; o backend aceita requisições de até 10 MB.

As conversas e mensagens ficam no `localStorage` do navegador. O checkout rápido registra a venda pela API `/api/vendas`; anúncios novos ficam associados ao vendedor autenticado. Para ativar esse fluxo no banco, aplique as migrações do backend.