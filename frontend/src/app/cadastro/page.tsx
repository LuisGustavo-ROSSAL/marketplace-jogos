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

export default function SignupPage() {
  const { signIn, notify } = useMarketplace()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name')),
          email: String(form.get('email')),
          passwordHash: String(form.get('password')),
        }),
      })
      if (!response.ok) throw new Error(await response.text())

      const result: AuthResponse = await response.json()
      signIn(result.user, result.access_token)
      notify('Cadastro realizado com sucesso.')
      router.push('/')
    } catch (error) {
      console.error('Não foi possível criar a conta.', error)
      notify('Não foi possível criar a conta. Verifique os dados e tente novamente.')
    }
  }

  return <AccountForm signingUp onSubmit={handleSubmit} />
}