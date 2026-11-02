import { Link, useLocation } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'

type AppHeaderProps = {
  onOpenMenu: () => void
}

export function AppHeader({ onOpenMenu }: AppHeaderProps) {
  const { isLoggedIn, userName, searchQuery, setSearchQuery } = useMarketplace()
  const location = useLocation()
  const showSearch = location.pathname !== '/entrar' && location.pathname !== '/cadastro'

  return (
    <header className="topbar">
      <button className="icon-button menu-trigger" type="button" aria-label="Abrir menu" onClick={onOpenMenu}>
        <span className="hamburger">☰</span>
      </button>
      <Link className="brand" to="/" aria-label="Voltar ao início">
        <span className="brand__mark">J</span><span>JOGADA<span className="brand__dot">.</span></span>
      </Link>
      {showSearch && (
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Buscar consoles"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar consoles, jogos e acessórios"
          />
          {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Limpar busca">×</button>}
        </label>
      )}
      <div className="topbar__actions">
        <Link className="icon-button add-button" to="/anuncios/novo" aria-label="Criar anúncio">+</Link>
        <Link className="account-button" to={isLoggedIn ? '/perfil' : '/entrar'}>
          <span className="avatar avatar--small">{userName.slice(0, 1).toUpperCase()}</span>
          <span className="account-button__label">{isLoggedIn ? userName : 'Entrar'}</span>
        </Link>
      </div>
    </header>
  )
}