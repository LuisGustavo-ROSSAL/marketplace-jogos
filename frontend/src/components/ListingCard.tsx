import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import type { Listing } from '../types/listing'
import { money } from '../utils/format'

export function ListingCard({ listing }: { listing: Listing }) {
  const { favorites, toggleFavorite } = useMarketplace()
  const favorite = favorites.includes(listing.id)

  return (
    <article className="listing-card">
      <Link
        className="listing-card__image"
        style={{ '--item-color': listing.color } as CSSProperties}
        to={`/anuncios/${listing.id}`}
        aria-label={`Ver ${listing.name}`}
      >
        <span className="listing-card__edition">JOGADA / {String(listing.id).padStart(3, '0')}</span>
        <span className="listing-card__emoji">{listing.emoji}</span>
        <span className="listing-card__image-name">{listing.name}</span>
      </Link>
      <div className="listing-card__info">
        <span className={listing.status === 'Vendido' ? 'status status--sold' : 'status'}>{listing.status}</span>
        <Link className="listing-card__name" to={`/anuncios/${listing.id}`}>{listing.name}</Link>
        <div className="listing-card__bottom">
          <span>{money(listing.price)}</span>
          <button
            className={favorite ? 'favorite-button is-favorite' : 'favorite-button'}
            type="button"
            aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-pressed={favorite}
            onClick={() => toggleFavorite(listing.id)}
          >
            {favorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  )
}