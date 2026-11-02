'use client'

import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AccountForm } from '../../components/AccountForm'
import { useMarketplace } from '../../context/MarketplaceContext'

export default function SignupPage() {
  const { signIn, notify } = useMarketplace()
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    signIn(String(form.get('name') || form.get('email')))
    notify('Cadastro demonstrativo concluído.')
    router.push('/')
  }

  return <AccountForm signingUp onSubmit={handleSubmit} />
}