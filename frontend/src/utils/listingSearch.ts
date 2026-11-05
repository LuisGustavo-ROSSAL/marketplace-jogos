import type { Listing } from '../types/listing'

export function listingMatchesSearch(listing: Listing, query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
  if (!normalizedQuery) return true

  return [
    listing.name,
    listing.description,
    listing.condition,
    listing.year,
    listing.status,
    String(listing.price),
  ].some((value) => value.toLocaleLowerCase('pt-BR').includes(normalizedQuery))
}
