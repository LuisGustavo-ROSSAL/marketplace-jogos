'use client'

import type { FormEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMarketplace } from '../context/MarketplaceContext'

type AppHeaderProps = {
  onOpenMenu: () => void
}

export function AppHeader({ onOpenMenu }: AppHeaderProps) {
  const { isLoggedIn, userName, searchQuery, setSearchQuery } = useMarketplace()
  const pathname = usePathname()
  const router = useRouter()
  const showSearch = pathname !== '/entrar' && pathname !== '/cadastro'

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pathname !== '/' && pathname !== '/colecao') router.push('/#catalogo')
  }

  return (
    <header className="topbar">
      <button className="icon-button menu-trigger" type="button" aria-label="Abrir menu" onClick={onOpenMenu}>
        <span className="hamburger">☰</span>
      </button>
      <Link className="brand" href="/" aria-label="Voltar ao início">
        <span className="brand__mark">J</span><span>JOGADA<span className="brand__dot">.</span></span>
      </Link>
      {showSearch && (
        <form className="search-box" role="search" onSubmit={handleSearchSubmit}>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            aria-label="Buscar anúncios"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar consoles, jogos e acessórios"
          />
          {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Limpar busca">×</button>}
        </form>
      )}
      <div className="topbar__actions">
        <Link className="icon-button add-button" href="/anuncios/novo" aria-label="Criar anúncio">+</Link>
        <Link className="account-button" href={isLoggedIn ? '/perfil' : '/entrar'}>
          <span className="avatar avatar--small">{userName.slice(0, 1).toUpperCase()}</span>
          <span className="account-button__label">{isLoggedIn ? userName : 'Entrar'}</span>
        </Link>
      </div>
    </header>
  )
}