'use client'

import type { FormEvent } from 'react'
import Link from 'next/link'

type AccountFormProps = {
  signingUp: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function AccountForm({ signingUp, onSubmit }: AccountFormProps) {
  return (
    <section className="account-page">
      <form className="account-panel" onSubmit={onSubmit}>
        <span className="avatar avatar--large">J</span>
        <span className="eyebrow">BEM-VINDO À JOGADA</span>
        <h1>{signingUp ? 'Crie sua conta' : 'Entre na sua conta'}</h1>
        {signingUp && <label>Nome completo<input name="name" placeholder="Como podemos te chamar?" required /></label>}
        <label>Email<input name="email" type="email" placeholder="voce@email.com" required /></label>
        <label>Senha<input name="password" type="password" placeholder="Mínimo de 6 caracteres" minLength={6} required /></label>
        <button className="button button--blue account-submit" type="submit">
          {signingUp ? 'Criar conta' : 'Entrar'} <span>→</span>
        </button>
        <Link className="account-switch" href={signingUp ? '/entrar' : '/cadastro'}>
          {signingUp ? 'Já tenho uma conta' : 'Ainda não tenho uma conta'}
        </Link>
      </form>
    </section>
  )
}