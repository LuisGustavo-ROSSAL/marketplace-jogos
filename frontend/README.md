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

As telas e rotas podem ser construídas antes de seus endpoints existirem. No momento, o catálogo usa dados de demonstração em `src/data/demoListings.ts`, mantidos na memória do navegador. A API ainda não armazena preço, condição, descrição, telefone ou fotos, nem oferece autenticação, mensagens ou checkout. Esses recursos serão integrados quando forem adicionados ao backend.

As ilustrações de consoles também são temporárias. As imagens finais podem ser adicionadas como arquivos de assets e exibidas nos cartões e na página de detalhes.