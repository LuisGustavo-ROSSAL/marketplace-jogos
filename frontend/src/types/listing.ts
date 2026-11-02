export type ListingStatus = 'Disponível' | 'Vendido'

export type Listing = {
  id: number
  name: string
  price: number
  status: ListingStatus
  emoji: string
  color: string
  condition: string
  year: string
  description: string
  included: string[]
}

export type ListingDraft = Omit<Listing, 'id' | 'status' | 'emoji' | 'color' | 'included'>