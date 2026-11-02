import { NavLink, Link } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'

type SideDrawerProps = {
  open: boolean
  onClose: () => void
}

const menuItems = [
  { label: 'Início', to: '/', icon: '⌂' },
  { label: 'Criar anúncio', to: '/anuncios/novo', icon: '+' },
  { label: 'Meus anúncios', to: '/meus-anuncios', icon: '▤' },
  { label: 'Favoritos', to: '/favoritos', icon: '♡' },
  { label: 'Mensagens', to: '/mensagens', icon: '▱' },
  { label: 'Perfis cadastrados', to: '/perfis', icon: '♙' },
  { label: 'Configurações', to: '/configuracoes', icon: '⚙' },
]

export function SideDrawer({ open, onClose }: SideDrawerProps) {
  const { userName, logout, notify } = useMarketplace()
  if (!open) return null

  return (
    <>
      <button className="scrim" aria-label="Fechar menu" onClick={onClose} />
      <aside className="drawer" aria-label="Navegação">
        <div className="drawer__top">
          <span>JOGADA<span className="brand__dot">.</span></span>
          <button className="icon-button" type="button" aria-label="Fechar menu" onClick={onClose}>×</button>
        </div>
        <Link className="drawer__profile" to="/perfil" onClick={onClose}>
          <span className="avatar">{userName.slice(0, 1).toUpperCase()}</span>
          <span><strong>Olá, {userName}</strong><small>Ver meu perfil</small></span>
          <span className="drawer__chevron">›</span>
        </Link>
        <nav className="drawer__nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => isActive ? 'drawer__link is-active' : 'drawer__link'}
              onClick={onClose}
            >
              <span className="drawer__icon">{item.icon}</span>{item.label}<span className="drawer__arrow">›</span>
            </NavLink>
          ))}
        </nav>
        <button className="drawer__logout" type="button" onClick={() => { logout(); onClose(); notify('Sessão encerrada.') }}>
          ↪ <span>Sair</span>
        </button>
      </aside>
    </>
  )
}