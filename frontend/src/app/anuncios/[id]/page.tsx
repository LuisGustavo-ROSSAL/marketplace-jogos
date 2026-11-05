'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { EmptyState } from '../../../components/EmptyState'
import { useMarketplace } from '../../../context/MarketplaceContext'
import { money } from '../../../utils/format'

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { listings, notify, openConversation } = useMarketplace()
  const router = useRouter()
  const listing = listings.find((item) => item.id === Number(id))

  if (!listing) return <EmptyState title="Anúncio não encontrado" text="Este anúncio pode ter sido removido." action="Voltar ao catálogo" />

  return (
    <section className="detail-layout">
      <div className="detail-gallery">
        <div className="detail-art" style={{ '--item-color': listing.color } as CSSProperties}>
          <span className="detail-art__year">{listing.year}</span>
          {listing.imageUrl
            ? <Image className="detail-art__photo" src={listing.imageUrl} alt={`Foto de ${listing.name}`} fill unoptimized />
            : <span className="detail-art__emoji">{listing.emoji}</span>}
          <span className="detail-art__caption">JOGADA / PEÇA Nº {String(listing.id).padStart(3, '0')}</span>
        </div>
        <div className="detail-thumbs">
          <button type="button" aria-label="Imagem anterior" onClick={() => notify(listing.imageUrl ? 'Este anúncio tem uma única foto.' : 'Este anúncio ainda não tem fotos.')}>←</button>
          {listing.imageUrl
            ? <span className="detail-thumb"><Image src={listing.imageUrl} alt={`Miniatura de ${listing.name}`} fill unoptimized /></span>
            : [0, 1, 2].map((image) => <span key={image} className={image ? 'detail-thumb detail-thumb--muted' : 'detail-thumb'} style={{ '--item-color': listing.color } as CSSProperties}>{listing.emoji}</span>)}
          <button type="button" aria-label="Próxima imagem" onClick={() => notify(listing.imageUrl ? 'Este anúncio tem uma única foto.' : 'Este anúncio ainda não tem fotos.')}>→</button>
        </div>
      </div>
      <article className="detail-panel">
        <span className="eyebrow">CONSOLE · {listing.year}</span>
        <h1>{listing.name}</h1>
        <p className="detail-condition"><span className="status-dot" /> {listing.condition} <span>·</span> {listing.status}</p>
        <p className="detail-description">{listing.description}</p>
        <div className="detail-specs">
          <div><span>Inclui</span><strong>{listing.included.join(' · ')}</strong></div>
          <div><span>Condição</span><strong>{listing.condition}</strong></div>
        </div>
        <div className="detail-buy">
          <button className="button button--lime" type="button" onClick={() => {
            openConversation(listing)
            router.push('/mensagens')
          }}>{listing.status === 'Vendido' ? 'Abrir conversa' : 'Tenho interesse'} <span>→</span></button>
          <strong>{money(listing.price)}</strong>
        </div>
        <div className="seller-block">
          <span className="avatar">C</span>
          <div><strong>Comunidade Jogada</strong><small>Vendedor · 4,9 <span>★</span> · 28 vendas</small></div>
          <Link className="text-button" href="/perfil">Perfil →</Link>
        </div>
        <div className="seller-rating"><strong>Avaliações da comunidade</strong><span>★★★★★ <small>5.0 / 5.0</small></span></div>
      </article>
    </section>
  )
}