import { ListingCard } from '../components/ListingCard'
import { useMarketplace } from '../context/MarketplaceContext'

export function CollectionPage() {
  const { listings, searchQuery } = useMarketplace()
  const visibleListings = listings.filter((listing) => listing.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <section className="catalog-section page-section">
      <div className="section-heading">
        <div><span className="eyebrow">SUA GARIMPAGEM</span><h1>Minha coleção</h1></div>
        <div className="collection-stats">
          <div><strong>{listings.length}</strong><span>itens na coleção</span></div>
          <div><strong>{listings.filter((item) => item.status === 'Vendido').length}</strong><span>vendas concluídas</span></div>
        </div>
      </div>
      <div className="listing-grid">{visibleListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
    </section>
  )
}