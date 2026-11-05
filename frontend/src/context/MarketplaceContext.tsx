'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { demoListings } from '../data/demoListings'
import type { Listing, ListingDraft } from '../types/listing'
import { API_URL } from '../utils/api'

export type MarketplaceUser = {
  sub: number
  email: string
  name: string
}

export type ChatMessage = {
  id: string
  sender: 'buyer' | 'seller' | 'system'
  text: string
  createdAt: string
}

export type PaymentMethod = 'PIX' | 'Cartão' | 'Retirada em mãos'

export type MarketplaceConversation = {
  listingId: number
  listingName: string
  listingPrice: number
  sellerId?: number
  sellerName: string
  status: 'open' | 'sold'
  paymentMethod?: PaymentMethod
  messages: ChatMessage[]
}

type ColecaoResponse = {
  id: number
  nomeConsole: string
  preco: number | null
  condicao: string | null
  ano: number | null
  descricao: string | null
  imagemUrl: string | null
  idVendedor?: number | null
  vendedor?: { nome: string } | null
  transacoes?: Array<{ idComprador: number | null }>
}

function mapColecaoToListing(colecao: ColecaoResponse): Listing {
  return {
    id: colecao.id,
    name: colecao.nomeConsole,
    price: colecao.preco ?? 0,
    status: colecao.transacoes?.some((transacao) => transacao.idComprador !== null) ? 'Vendido' : 'Disponível',
    emoji: '🎮',
    color: '#c9d9e8',
    condition: colecao.condicao ?? 'Bom',
    year: colecao.ano === null ? '' : String(colecao.ano),
    description: colecao.descricao ?? '',
    included: ['Console'],
    imageUrl: colecao.imagemUrl ?? undefined,
    sellerId: colecao.idVendedor ?? undefined,
    sellerName: colecao.vendedor?.nome,
  }
}

function isMarketplaceUser(value: unknown): value is MarketplaceUser {
  return typeof value === 'object' && value !== null &&
    'sub' in value && typeof value.sub === 'number' &&
    'email' in value && typeof value.email === 'string' &&
    'name' in value && typeof value.name === 'string'
}

function isConversationStore(value: unknown): value is {
  conversations: MarketplaceConversation[]
  activeConversationId: number | null
} {
  if (typeof value !== 'object' || value === null || !('conversations' in value) || !Array.isArray(value.conversations)) {
    return false
  }
  return value.conversations.every((conversation: unknown) =>
    typeof conversation === 'object' && conversation !== null &&
    'listingId' in conversation && typeof conversation.listingId === 'number' &&
    'listingName' in conversation && typeof conversation.listingName === 'string' &&
    'listingPrice' in conversation && typeof conversation.listingPrice === 'number' &&
    'sellerName' in conversation && typeof conversation.sellerName === 'string' &&
    'status' in conversation && (conversation.status === 'open' || conversation.status === 'sold') &&
    'messages' in conversation && Array.isArray(conversation.messages),
  ) && 'activeConversationId' in value &&
    (typeof value.activeConversationId === 'number' || value.activeConversationId === null)
}

type MarketplaceContextValue = {
  listings: Listing[]
  myListingIds: number[]
  favorites: number[]
  userName: string
  currentUser: MarketplaceUser | null
  isLoggedIn: boolean
  toast: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  addListing: (draft: ListingDraft) => Promise<Listing>
  toggleFavorite: (id: number) => void
  conversations: MarketplaceConversation[]
  activeConversationId: number | null
  openConversation: (listing: Listing) => void
  selectConversation: (listingId: number) => void
  sendMessage: (listingId: number, text: string) => void
  confirmPurchase: (listingId: number, paymentMethod: PaymentMethod) => Promise<void>
  signIn: (user: MarketplaceUser, accessToken: string) => void
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
  const [currentUser, setCurrentUser] = useState<MarketplaceUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [toast, setToast] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [conversations, setConversations] = useState<MarketplaceConversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null)
  const [conversationsLoaded, setConversationsLoaded] = useState(false)

  const notify = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }, [])

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')
      if (!savedToken || !savedUser) return

      const user: unknown = JSON.parse(savedUser)
      if (!isMarketplaceUser(user)) {
        throw new Error('Os dados de usuário salvos no navegador são inválidos.')
      }

      setAccessToken(savedToken)
      setCurrentUser(user)
      setUserName(user.name)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Não foi possível restaurar a sessão salva.', error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      notify('Não foi possível restaurar sua sessão. Entre novamente.')
    }
  }, [notify])

  useEffect(() => {
    try {
      const savedConversations = localStorage.getItem('marketplaceConversations')
      if (!savedConversations) return

      const parsed: unknown = JSON.parse(savedConversations)
      if (!isConversationStore(parsed)) throw new Error('O histórico de conversas salvo é inválido.')
      setConversations(parsed.conversations)
      setActiveConversationId(parsed.activeConversationId)
    } catch (error) {
      console.error('Não foi possível restaurar as conversas salvas.', error)
      localStorage.removeItem('marketplaceConversations')
      notify('Não foi possível restaurar suas conversas salvas.')
    } finally {
      setConversationsLoaded(true)
    }
  }, [notify])

  useEffect(() => {
    if (!conversationsLoaded) return
    try {
      localStorage.setItem('marketplaceConversations', JSON.stringify({
        conversations,
        activeConversationId,
      }))
    } catch (error) {
      console.error('Não foi possível salvar as conversas no navegador.', error)
      notify('Não foi possível salvar o histórico de conversas neste navegador.')
    }
  }, [activeConversationId, conversations, conversationsLoaded, notify])

  useEffect(() => {
    const loadListings = async () => {
      try {
        const response = await fetch(`${API_URL}/colecoes`)
        if (!response.ok) throw new Error(`A API respondeu com status ${response.status}.`)
        const colecoes: ColecaoResponse[] = await response.json()
        const apiListings = colecoes.map(mapColecaoToListing)
        setListings(apiListings.length ? apiListings : demoListings)
      } catch (error) {
        console.error('Não foi possível carregar os anúncios da API.', error)
        notify('Não foi possível carregar os anúncios salvos. Verifique se a API está em execução.')
      }
    }

    void loadListings()
  }, [notify])

  const addListing = async (draft: ListingDraft) => {
    const response = await fetch(`${API_URL}/colecoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nomeConsole: draft.name,
        preco: draft.price,
        condicao: draft.condition,
        ano: draft.year ? Number(draft.year) : null,
        descricao: draft.description,
        imagemUrl: draft.imageUrl ?? null,
      }),
    })
    if (!response.ok) {
      const message = await response.text()
      throw new Error(`Não foi possível salvar o anúncio (${response.status}): ${message}`)
    }
    const listing = mapColecaoToListing(await response.json() as ColecaoResponse)
    setListings((current) => [listing, ...current.filter((item) => item.id !== listing.id)])
    setMyListingIds((current) => [listing.id, ...current])
    return listing
  }

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((favorite) => favorite !== id)
      : [...current, id])
  }

  const openConversation = (listing: Listing) => {
    setConversations((current) => current.some((conversation) => conversation.listingId === listing.id)
      ? current
      : [{
          listingId: listing.id,
          listingName: listing.name,
          listingPrice: listing.price,
          sellerId: listing.sellerId,
          sellerName: listing.sellerName ?? 'Vendedor',
          status: listing.status === 'Vendido' ? 'sold' : 'open',
          messages: [],
        }, ...current])
    setActiveConversationId(listing.id)
  }

  const selectConversation = (listingId: number) => setActiveConversationId(listingId)

  const sendMessage = (listingId: number, text: string) => {
    const message = text.trim()
    if (!message) return

    setConversations((current) => current.map((conversation) => {
      if (conversation.listingId !== listingId) return conversation
      const firstMessage = conversation.messages.length === 0
      const sentAt = new Date().toISOString()
      const messages: ChatMessage[] = [
        ...conversation.messages,
        { id: `${Date.now()}-buyer`, sender: 'buyer', text: message, createdAt: sentAt },
      ]

      if (firstMessage) {
        messages.push({
          id: `${Date.now()}-seller`,
          sender: 'seller',
          text: `Olá! Obrigado pelo interesse em ${conversation.listingName}. Podemos combinar os detalhes por aqui.`,
          createdAt: new Date().toISOString(),
        })
      }

      return { ...conversation, messages }
    }))
  }

  const confirmPurchase = async (listingId: number, paymentMethod: PaymentMethod) => {
    const conversation = conversations.find((item) => item.listingId === listingId)
    if (!conversation) throw new Error('Conversa não encontrada.')
    if (!currentUser || !accessToken) throw new Error('Entre na sua conta para confirmar a compra.')
    if (!conversation.sellerId) throw new Error('Este anúncio não tem um vendedor vinculado e não pode ser comprado.')
    if (conversation.sellerId === currentUser.sub) throw new Error('Você não pode confirmar a compra do próprio anúncio.')
    if (conversation.status === 'sold') throw new Error('Este anúncio já foi vendido.')

    const response = await fetch(`${API_URL}/vendas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        idColecao: listingId,
        idVendedor: conversation.sellerId,
        idComprador: currentUser.sub,
      }),
    })
    if (!response.ok) {
      const message = await response.text()
      throw new Error(`Não foi possível confirmar a compra (${response.status}): ${message}`)
    }

    const confirmation: ChatMessage = {
      id: `${Date.now()}-system`,
      sender: 'system',
      text: `Compra confirmada para ${conversation.listingName}. Forma de pagamento: ${paymentMethod}.`,
      createdAt: new Date().toISOString(),
    }
    setListings((current) => current.map((listing) =>
      listing.id === listingId ? { ...listing, status: 'Vendido' } : listing,
    ))
    setConversations((current) => current.map((item) =>
      item.listingId === listingId
        ? { ...item, status: 'sold', paymentMethod, messages: [...item.messages, confirmation] }
        : item,
    ))
  }

  const signIn = (user: MarketplaceUser, token: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUserName(user.name)
    setCurrentUser(user)
    setAccessToken(token)
    setIsLoggedIn(true)
  }

  const updateUserName = (name: string) => {
    setUserName(name)
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const parsed: unknown = JSON.parse(savedUser)
        if (isMarketplaceUser(parsed)) {
          const updatedUser = { ...parsed, name }
          localStorage.setItem('user', JSON.stringify(updatedUser))
          setCurrentUser(updatedUser)
        }
      } catch (error) {
        console.error('Não foi possível atualizar o usuário salvo.', error)
        notify('Não foi possível salvar as alterações do perfil.')
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUserName('Usuário')
    setCurrentUser(null)
    setAccessToken('')
    setIsLoggedIn(false)
  }

  return (
    <MarketplaceContext.Provider value={{
      listings,
      myListingIds,
      favorites,
      userName,
      currentUser,
      isLoggedIn,
      toast,
      searchQuery,
      setSearchQuery,
      addListing,
      toggleFavorite,
      conversations,
      activeConversationId,
      openConversation,
      selectConversation,
      sendMessage,
      confirmPurchase,
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