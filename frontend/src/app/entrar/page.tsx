'use client'

import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AccountForm } from '../../components/AccountForm'
import { useMarketplace } from '../../context/MarketplaceContext'
import type { MarketplaceUser } from '../../context/MarketplaceContext'
import { API_URL } from '../../utils/api'

type AuthResponse = {
  access_token: string
  user: MarketplaceUser
}

export default function LoginPage() {
  const { signIn, notify } = useMarketplace()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(form.get('email')),
          password: String(form.get('password')),
        }),
      })
      if (!response.ok) throw new Error(await response.text())

      const result: AuthResponse = await response.json()
      signIn(result.user, result.access_token)
      notify('Entrada realizada com sucesso.')
      router.push('/')
    } catch (error) {
      console.error('Não foi possível entrar na conta.', error)
      notify('Não foi possível entrar. Verifique o email, a senha e a conexão com a API.')
    }
  }

  return <AccountForm signingUp={false} onSubmit={handleSubmit} />
}