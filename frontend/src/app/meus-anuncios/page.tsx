'use client'

import Link from 'next/link'
import { EmptyState } from '../../components/EmptyState'
import { ListingCard } from '../../components/ListingCard'
import { useMarketplace } from '../../context/MarketplaceContext'

export default function MyListingsPage() {
  const { listings, myListingIds } = useMarketplace()
  const myListings = listings.filter((listing) => myListingIds.includes(listing.id))

  return (
    <section className="catalog-section page-section">
      <div className="section-heading">
        <div><span className="eyebrow">PAINEL DO VENDEDOR</span><h1>Meus anúncios</h1></div>
        <Link className="button button--lime" href="/anuncios/novo">＋ Novo anúncio</Link>
      </div>
      {myListings.length
        ? <div className="listing-grid">{myListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
        : <EmptyState title="Você ainda não anunciou" text="Publique seu primeiro item para encontrar outro colecionador." action="Criar anúncio" href="/anuncios/novo" />}
    </section>
  )
}