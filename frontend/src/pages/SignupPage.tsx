import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountForm } from '../components/AccountForm'
import { useMarketplace } from '../context/MarketplaceContext'

export function SignupPage() {
  const { signIn, notify } = useMarketplace()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    signIn(String(form.get('name') || form.get('email')))
    notify('Cadastro demonstrativo concluído.')
    navigate('/')
  }

  return <AccountForm signingUp onSubmit={handleSubmit} />
}