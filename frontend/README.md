# Frontend

Aplicação React, TypeScript e Vite para o marketplace de jogos. Cada tela fica em um arquivo próprio dentro de `src/pages/`; o `App.tsx` declara as rotas, e os componentes compartilhados ficam em `src/components/`.

## Estrutura

```text
src/
	App.tsx                     Rotas da aplicação
	components/                 Cabeçalho, menu, cartões e estados vazios
	context/                    Estado compartilhado entre páginas
	data/                       Dados de demonstração
	pages/                      Uma página por arquivo
	types/                      Tipos usados entre módulos
	utils/                      Funções auxiliares
	main.tsx                    Inicialização do React
	styles.css                  Estilos globais e responsivos
```

## Páginas

| Arquivo | Rota | Tela |
|---|---|---|
| `HomePage.tsx` | `/` | Catálogo inicial |
| `CollectionPage.tsx` | `/colecao` | Minha coleção |
| `ListingDetailsPage.tsx` | `/anuncios/:id` | Detalhes do anúncio |
| `CreateListingPage.tsx` | `/anuncios/novo` | Criar anúncio |
| `MyListingsPage.tsx` | `/meus-anuncios` | Meus anúncios |
| `FavoritesPage.tsx` | `/favoritos` | Favoritos |
| `MessagesPage.tsx` | `/mensagens` | Mensagens |
| `ProfilesPage.tsx` | `/perfis` | Perfis cadastrados |
| `ProfilePage.tsx` | `/perfil` | Perfil do usuário |
| `LoginPage.tsx` | `/entrar` | Entrar |
| `SignupPage.tsx` | `/cadastro` | Criar conta |
| `SettingsPage.tsx` | `/configuracoes` | Configurações |

## Executar localmente

No terminal do VS Code, a partir da raiz do projeto:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

O Vite informará o endereço local, normalmente `http://localhost:5173`.

## Dados e backend

As telas e rotas podem ser construídas antes de seus endpoints existirem. No momento, o catálogo usa dados de demonstração em `src/data/demoListings.ts`, mantidos na memória do navegador. A API ainda não armazena preço, condição, descrição, telefone ou fotos, nem oferece autenticação, mensagens ou checkout. Esses recursos serão integrados quando forem adicionados ao backend.

As ilustrações de consoles também são temporárias. As imagens finais podem ser adicionadas como arquivos de assets e exibidas nos cartões e na página de detalhes.