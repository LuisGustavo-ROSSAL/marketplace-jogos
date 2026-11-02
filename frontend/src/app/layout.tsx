import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AppLayout } from '../components/AppLayout'
import { MarketplaceProvider } from '../context/MarketplaceContext'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Jogada | Marketplace de Jogos',
  description: 'Um lugar para encontrar e compartilhar histórias dos games.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <MarketplaceProvider>
          <AppLayout>{children}</AppLayout>
        </MarketplaceProvider>
      </body>
    </html>
  )
}