'use client'

import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AccountForm } from '../../components/AccountForm'
import { useMarketplace } from '../../context/MarketplaceContext'

export default function LoginPage() {
  const { signIn, notify } = useMarketplace()
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email'))
    signIn(email)
    notify('Entrada demonstrativa concluída.')
    router.push('/')
  }

  return <AccountForm signingUp={false} onSubmit={handleSubmit} />
}