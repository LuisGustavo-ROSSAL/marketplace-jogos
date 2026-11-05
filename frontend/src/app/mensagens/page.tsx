'use client'

import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { EmptyState } from '../../components/EmptyState'
import { useMarketplace } from '../../context/MarketplaceContext'
import type { PaymentMethod } from '../../context/MarketplaceContext'
import { money } from '../../utils/format'

export default function MessagesPage() {
  const {
    conversations,
    activeConversationId,
    selectConversation,
    sendMessage,
    confirmPurchase,
    currentUser,
    listings,
    notify,
  } = useMarketplace()
  const [message, setMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX')
  const [isConfirmingPurchase, setIsConfirmingPurchase] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const activeConversation = conversations.find((item) => item.listingId === activeConversationId)
  const activeListing = activeConversation
    ? listings.find((item) => item.id === activeConversation.listingId)
    : undefined

  useEffect(() => {
    if (!activeConversation && conversations.length) {
      selectConversation(conversations[0].listingId)
    }
  }, [activeConversation, conversations, selectConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation?.messages.length, activeConversationId])

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!activeConversation || !message.trim()) return
    sendMessage(activeConversation.listingId, message)
    setMessage('')
  }

  const handleConfirmPurchase = async () => {
    if (!activeConversation) return
    setIsConfirmingPurchase(true)
    try {
      await confirmPurchase(activeConversation.listingId, paymentMethod)
      notify('Compra confirmada! O anúncio foi marcado como vendido.')
    } catch (error) {
      console.error('Não foi possível confirmar a compra.', error)
      notify(error instanceof Error ? error.message : 'Não foi possível confirmar a compra.')
    } finally {
      setIsConfirmingPurchase(false)
    }
  }

  if (!conversations.length) {
    return (
      <section className="messages-page">
        <div className="section-heading"><div><span className="eyebrow">CONVERSAS</span><h1>Mensagens</h1></div></div>
        <EmptyState title="Nenhuma conversa ainda" text="Abra um anúncio e toque em “Tenho interesse” para começar." action="Voltar ao catálogo" />
      </section>
    )
  }

  return (
    <section className="messages-page">
      <div className="section-heading"><div><span className="eyebrow">CONVERSAS</span><h1>Mensagens</h1></div></div>
      <div className="chat-layout">
        <aside className="conversation-list" aria-label="Conversas abertas">
          <h2>Suas conversas</h2>
          {conversations.map((conversation) => {
            const lastMessage = conversation.messages.at(-1)
            return (
              <button
                key={conversation.listingId}
                className={conversation.listingId === activeConversationId ? 'conversation-item is-active' : 'conversation-item'}
                type="button"
                onClick={() => selectConversation(conversation.listingId)}
              >
                <span className="conversation-item__avatar">🎮</span>
                <span className="conversation-item__copy">
                  <strong>{conversation.listingName}</strong>
                  <small>{lastMessage?.text ?? `Conversa com ${conversation.sellerName}`}</small>
                </span>
                {conversation.status === 'sold' && <span className="status status--sold">Vendido</span>}
              </button>
            )
          })}
        </aside>

        {activeConversation && (
          <div className="chat-panel">
            <header className="chat-panel__header">
              <div><span className="eyebrow">ANÚNCIO</span><h2>{activeConversation.listingName}</h2></div>
              <strong>{money(activeConversation.listingPrice)}</strong>
            </header>

            <div className="chat-messages" aria-live="polite">
              {activeConversation.messages.map((item) => (
                <div key={item.id} className={`chat-message chat-message--${item.sender}`}>
                  <p>{item.text}</p>
                  <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</time>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {activeConversation.status === 'open' && (
              <form className="chat-compose" onSubmit={handleSendMessage}>
                <label className="sr-only" htmlFor="chat-message">Escreva sua mensagem</label>
                <input
                  id="chat-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Escreva uma mensagem..."
                  autoComplete="off"
                />
                <button className="button button--lime" type="submit" disabled={!message.trim()}>Enviar</button>
              </form>
            )}

            <section className="checkout-panel">
              <span className="eyebrow">FECHAR NEGÓCIO</span>
              <h3>Checkout Rápido</h3>
              {activeConversation.status === 'sold' ? (
                <p className="checkout-note">Compra confirmada via {activeConversation.paymentMethod}.</p>
              ) : (
                <>
                  <label htmlFor="payment-method">Forma de pagamento</label>
                  <select id="payment-method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
                    <option value="PIX">PIX</option>
                    <option value="Cartão">Cartão</option>
                    <option value="Retirada em mãos">Retirada em mãos</option>
                  </select>
                  {!currentUser && <p className="checkout-note">Entre na sua conta para confirmar a compra. <Link href="/entrar">Entrar</Link></p>}
                  {currentUser && !activeConversation.sellerId && <p className="checkout-note">Este anúncio antigo não tem um vendedor vinculado para registrar a venda.</p>}
                  {currentUser && activeConversation.sellerId === currentUser.sub && <p className="checkout-note">Este é um anúncio seu; não é possível comprá-lo pela sua conta.</p>}
                  {activeListing?.status === 'Vendido' && <p className="checkout-note">Este anúncio já foi vendido.</p>}
                  <button
                    className="button button--lime checkout-confirm"
                    type="button"
                    disabled={isConfirmingPurchase || !currentUser || !activeConversation.sellerId || activeConversation.sellerId === currentUser?.sub || activeListing?.status === 'Vendido'}
                    onClick={() => void handleConfirmPurchase()}
                  >
                    {isConfirmingPurchase ? 'Confirmando...' : 'Confirmar Compra'}
                  </button>
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </section>
  )
}
