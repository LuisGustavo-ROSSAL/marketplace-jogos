'use client'

import Link from 'next/link'
import { EmptyState } from '../components/EmptyState'
import { ListingCard } from '../components/ListingCard'
import { useMarketplace } from '../context/MarketplaceContext'
import { listingMatchesSearch } from '../utils/listingSearch'

export default function HomePage() {
  const { listings, searchQuery } = useMarketplace()
  const filteredListings = listings.filter((listing) => listingMatchesSearch(listing, searchQuery))

  return (
    <>
      <section className="feature-banner" aria-label="Destaques do marketplace">
        <div className="feature-banner__copy">
          <span className="eyebrow">PARA QUEM JOGA E COLECIONA</span>
          <h1>Clássicos que<br />merecem outra vida.</h1>
          <p>Encontre seu próximo pedaço da história dos games.</p>
          <a className="button button--lime" href="#catalogo">Explorar catálogo <span>↓</span></a>
        </div>
        <div className="feature-banner__art" aria-hidden="true">
          <div className="feature-banner__sun" />
          <div className="feature-banner__console">🎮</div>
          <span className="feature-banner__sticker">GARIMPO<br />DA SEMANA</span>
          <span className="feature-banner__orbit">✳</span>
        </div>
        <div className="feature-banner__count"><span>01</span><i /><span>03</span></div>
      </section>
      <section className="catalog-section" id="catalogo">
        <div className="section-heading">
          <div><span className="eyebrow">SELEÇÃO DA COMUNIDADE</span><h2>Achados para sua coleção</h2></div>
          <Link className="text-button" href="/colecao">Ver coleção completa <span>→</span></Link>
        </div>
        {filteredListings.length
          ? <div className="listing-grid">{filteredListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
          : <EmptyState title="Nada por aqui ainda" text="Tente buscar por outro console ou jogo." />}
      </section>
    </>
  )
}