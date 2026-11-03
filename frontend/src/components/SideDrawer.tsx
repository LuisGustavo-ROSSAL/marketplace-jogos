'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  if (!open) return null

  return (
    <>
      <button className="scrim" aria-label="Fechar menu" onClick={onClose} />
      <aside className="drawer" aria-label="Navegação">
        <div className="drawer__top">
          <span>JOGADA<span className="brand__dot">.</span></span>
          <button className="icon-button" type="button" aria-label="Fechar menu" onClick={onClose}>×</button>
        </div>
        <Link className="drawer__profile" href="/perfil" onClick={onClose}>
          <span className="avatar">{userName.slice(0, 1).toUpperCase()}</span>
          <span><strong>Olá, {userName}</strong><small>Ver meu perfil</small></span>
          <span className="drawer__chevron">›</span>
        </Link>
        <nav className="drawer__nav">
          {menuItems.map((item) => {
            const isActive = item.to === '/' ? pathname === '/' : pathname === item.to || pathname.startsWith(`${item.to}/`)
            return (
              <Link key={item.to} href={item.to} className={isActive ? 'drawer__link is-active' : 'drawer__link'} onClick={onClose}>
                <span className="drawer__icon">{item.icon}</span>{item.label}<span className="drawer__arrow">›</span>
              </Link>
            )
          })}
        </nav>
        <button className="drawer__logout" type="button" onClick={() => { logout(); onClose(); notify('Sessão encerrada.') }}>
          ↪ <span>Sair</span>
        </button>
      </aside>
    </>
  )
}