'use client'

import { EmptyState } from '../../components/EmptyState'
import { ListingCard } from '../../components/ListingCard'
import { useMarketplace } from '../../context/MarketplaceContext'

export default function FavoritesPage() {
  const { listings, favorites } = useMarketplace()
  const favoriteListings = listings.filter((listing) => favorites.includes(listing.id))

  return (
    <section className="catalog-section page-section">
      <div className="section-heading"><div><span className="eyebrow">GUARDADOS</span><h1>Favoritos</h1></div></div>
      {favoriteListings.length
        ? <div className="listing-grid">{favoriteListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
        : <EmptyState title="Sua lista está esperando" text="Toque no coração de um anúncio para guardá-lo aqui." action="Explorar anúncios" />}
    </section>
  )
}