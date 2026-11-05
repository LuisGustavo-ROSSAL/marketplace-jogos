'use client'

import type { FormEvent } from 'react'
import { useMarketplace } from '../../context/MarketplaceContext'

export default function ProfilePage() {
  const { userName, updateUserName, myListingIds, notify } = useMarketplace()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    notify('Perfil atualizado nesta prévia.')
  }

  return (
    <section className="profile-page">
      <div className="section-heading"><div><span className="eyebrow">SUA CONTA NA COMUNIDADE</span><h1>Perfil do usuário</h1></div></div>
      <form className="profile-panel" onSubmit={handleSubmit}>
        <div className="profile-fields">
          <div className="profile-photo"><span className="avatar avatar--large">{userName.slice(0, 1).toUpperCase()}</span><button className="text-button" type="button" onClick={() => notify('O envio da foto será conectado ao backend.')}>Alterar foto</button></div>
          <div className="profile-inputs">
            <label>Nome completo<input value={userName} onChange={(event) => updateUserName(event.target.value)} /></label>
            <label>Email<input type="email" defaultValue="usuario@email.com" /></label>
            <label>Telefone<input type="tel" placeholder="(00) 00000-0000" /></label>
            <label>Membro desde<input value="Hoje" readOnly /></label>
          </div>
        </div>
        <div className="profile-summary">
          <div><span className="eyebrow">ATIVIDADE</span><h2>Meus anúncios</h2><p>{myListingIds.length} itens publicados</p></div>
          <div><h2>Estrelas / avaliações</h2><p className="stars">★★★★★ <span>4,8 como vendedor</span></p></div>
          <div><h2>Segurança</h2><button className="text-button" type="button" onClick={() => notify('A troca de senha será conectada à autenticação.')}>Alterar senha →</button></div>
          <button className="button button--lime" type="submit">Salvar alterações</button>
        </div>
      </form>
    </section>
  )
}