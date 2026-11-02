'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { demoListings } from '../data/demoListings'
import type { Listing, ListingDraft } from '../types/listing'

type MarketplaceContextValue = {
  listings: Listing[]
  myListingIds: number[]
  favorites: number[]
  userName: string
  isLoggedIn: boolean
  toast: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  addListing: (draft: ListingDraft) => Listing
  toggleFavorite: (id: number) => void
  signIn: (name: string) => void
  updateUserName: (name: string) => void
  logout: () => void
  notify: (message: string) => void
}

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null)

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState(demoListings)
  const [myListingIds, setMyListingIds] = useState<number[]>([3, 5])
  const [favorites, setFavorites] = useState<number[]>([])
  const [userName, setUserName] = useState('Usuário')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [toast, setToast] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const addListing = (draft: ListingDraft) => {
    const listing: Listing = {
      ...draft,
      id: Date.now(),
      status: 'Disponível',
      emoji: '🎮',
      color: '#c9d9e8',
      included: ['Console'],
    }
    setListings((current) => [listing, ...current])
    setMyListingIds((current) => [listing.id, ...current])
    return listing
  }

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((favorite) => favorite !== id)
      : [...current, id])
  }

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }

  const signIn = (name: string) => {
    setUserName(name.split('@')[0] || 'Usuário')
    setIsLoggedIn(true)
  }

  const updateUserName = (name: string) => setUserName(name)

  const logout = () => {
    setUserName('Usuário')
    setIsLoggedIn(false)
  }

  return (
    <MarketplaceContext.Provider value={{
      listings,
      myListingIds,
      favorites,
      userName,
      isLoggedIn,
      toast,
      searchQuery,
      setSearchQuery,
      addListing,
      toggleFavorite,
      signIn,
      updateUserName,
      logout,
      notify,
    }}>
      {children}
    </MarketplaceContext.Provider>
  )
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext)
  if (!context) throw new Error('useMarketplace precisa estar dentro de MarketplaceProvider.')
  return context
}