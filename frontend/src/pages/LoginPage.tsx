import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountForm } from '../components/AccountForm'
import { useMarketplace } from '../context/MarketplaceContext'

export function LoginPage() {
  const { signIn, notify } = useMarketplace()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email'))
    signIn(email)
    notify('Entrada demonstrativa concluída.')
    navigate('/')
  }

  return <AccountForm signingUp={false} onSubmit={handleSubmit} />
}