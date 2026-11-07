'use client'

import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMarketplace } from '../../../../context/MarketplaceContext'
import { API_URL } from '../../../../utils/api'

type RegisteredProfile = {
  id: number
  nome: string
  email: string
  role: 'USER' | 'ADMIN'
}

async function getErrorMessage(response: Response) {
  try {
    const body: unknown = await response.json()
    if (typeof body === 'object' && body !== null && 'message' in body) {
      const message = body.message
      if (typeof message === 'string') return message
      if (Array.isArray(message)) return message.join(' ')
    }
  } catch {
    // Usa a mensagem padrão se a resposta não trouxer JSON.
  }
  return `A API respondeu com status ${response.status}.`
}

export default function EditRegisteredProfilePage() {
  const { id: rawId } = useParams<{ id: string }>()
  const id = Number(rawId)
  const { currentUser, accessToken, sessionReady, signIn, notify } = useMarketplace()
  const router = useRouter()
  const [profile, setProfile] = useState<RegisteredProfile | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!sessionReady) return
    if (!currentUser || currentUser.role !== 'ADMIN' || !accessToken) {
      router.replace(currentUser ? '/' : '/entrar')
      return
    }
    if (!Number.isSafeInteger(id) || id < 1) {
      setError('Identificador de perfil inválido.')
      setIsLoading(false)
      return
    }

    let cancelled = false
    const loadProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (!response.ok) throw new Error(await getErrorMessage(response))
        const data: RegisteredProfile = await response.json()
        if (!cancelled) {
          setProfile(data)
          setName(data.nome)
          setEmail(data.email)
        }
      } catch (loadError) {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : 'Não foi possível carregar o perfil.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void loadProfile()
    return () => { cancelled = true }
  }, [accessToken, currentUser, id, router, sessionReady])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ nome: name, email }),
      })
      if (!response.ok) throw new Error(await getErrorMessage(response))
      const updated: RegisteredProfile = await response.json()
      setProfile(updated)
      if (currentUser?.sub === updated.id) {
        signIn({ ...currentUser, name: updated.nome, email: updated.email }, accessToken)
      }
      notify('Perfil atualizado com sucesso.')
      router.push('/perfis')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o perfil.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!sessionReady || !currentUser || currentUser.role !== 'ADMIN') {
    return <section className="empty-page" aria-live="polite"><p>Verificando permissão...</p></section>
  }

  if (isLoading) return <section className="empty-page" aria-live="polite"><p>Carregando perfil...</p></section>

  if (!profile) {
    return (
      <section className="empty-page">
        <h1>Não foi possível abrir o perfil</h1>
        {error && <p role="alert">{error}</p>}
        <Link className="button button--lime" href="/perfis">Voltar aos perfis</Link>
      </section>
    )
  }

  const initials = name.split(' ').slice(0, 2).map((part) => part[0] ?? '').join('').toUpperCase()

  return (
    <section className="profile-page">
      <div className="section-heading">
        <div><span className="eyebrow">ADMINISTRAÇÃO</span><h1>Editar perfil cadastrado</h1></div>
      </div>
      <form className="profile-panel" onSubmit={(event) => { void handleSubmit(event) }}>
        <div className="profile-fields">
          <div className="profile-photo"><span className="avatar avatar--large">{initials || '?'}</span></div>
          <div className="profile-inputs">
            <label>Nome completo<input required minLength={2} maxLength={120} value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>Email<input required type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            <label>Perfil de acesso<input value={profile.role === 'ADMIN' ? 'Administrador' : 'Usuário'} readOnly /></label>
          </div>
        </div>
        <div className="profile-summary">
          <div><span className="eyebrow">CONTA</span><h2>{profile.nome}</h2><p>As alterações são salvas na API.</p></div>
          {error && <p role="alert">{error}</p>}
          <button className="button button--lime" type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          <Link className="text-button" href="/perfis">Cancelar e voltar</Link>
        </div>
      </form>
    </section>
  )
}
