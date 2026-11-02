'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useMarketplace } from '../context/MarketplaceContext'
import { AppHeader } from './AppHeader'
import { SideDrawer } from './SideDrawer'

export function AppLayout({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { toast } = useMarketplace()

  return (
    <div className="app-shell">
      <AppHeader onOpenMenu={() => setDrawerOpen(true)} />
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="page-content">{children}</main>
      <footer className="site-footer">
        <span>JOGADA<span className="brand__dot">.</span></span>
        <span>Feito para quem guarda boas histórias.</span>
        <Link href="/colecao">Minha coleção →</Link>
      </footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}