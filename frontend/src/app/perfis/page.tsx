'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMarketplace } from '../../context/MarketplaceContext'
import { API_URL } from '../../utils/api'

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

export default function ProfilesPage() {
  const { currentUser, accessToken, sessionReady } = useMarketplace()
  const router = useRouter()
  const [profiles, setProfiles] = useState<RegisteredProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!sessionReady) return
    if (!currentUser || currentUser.role !== 'ADMIN' || !accessToken) {
      router.replace(currentUser ? '/' : '/entrar')
      return
    }

    let cancelled = false
    const loadProfiles = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_URL}/usuarios`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (!response.ok) throw new Error(await getErrorMessage(response))
        const data: RegisteredProfile[] = await response.json()
        if (!cancelled) setProfiles(data)
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Não foi possível carregar os perfis.')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void loadProfiles()
    return () => { cancelled = true }
  }, [accessToken, currentUser, router, sessionReady])

  const handleDelete = async (profile: RegisteredProfile) => {
    if (!window.confirm(`Deseja excluir o perfil de ${profile.nome}?`)) return

    setDeletingId(profile.id)
    setError('')
    try {
      const response = await fetch(`${API_URL}/usuarios/${profile.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!response.ok) throw new Error(await getErrorMessage(response))
      setProfiles((current) => current.filter((item) => item.id !== profile.id))
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Não foi possível excluir o perfil.')
    } finally {
      setDeletingId(null)
    }
  }

  if (!sessionReady || !currentUser || currentUser.role !== 'ADMIN') {
    return <section className="empty-page" aria-live="polite"><p>Verificando permissão...</p></section>
  }

  return (
    <section className="profiles-panel">
      <div className="profiles-panel__heading">
        <span className="eyebrow">ADMINISTRAÇÃO</span>
        <h1>Perfis cadastrados</h1>
        <p>Contas da comunidade</p>
      </div>

      {error && <p role="alert">{error}</p>}
      {isLoading ? (
        <p role="status">Carregando perfis...</p>
      ) : profiles.length === 0 ? (
        <div className="empty-state"><h2>Nenhum perfil cadastrado</h2></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Usuário</th><th>Nome completo</th><th>Email</th><th>Perfil</th><th>Ações</th></tr></thead>
            <tbody>{profiles.map((profile) => {
              const initials = profile.nome.split(' ').slice(0, 2).map((part) => part[0] ?? '').join('').toUpperCase()
              return (
                <tr key={profile.id}>
                  <td><span className="avatar avatar--table">{initials}</span></td>
                  <td>{profile.nome}</td>
                  <td>{profile.email}</td>
                  <td>{profile.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</td>
                  <td>
                    <Link className="table-action" href={`/perfis/${profile.id}/editar`}>Editar</Link>
                    {profile.id !== currentUser.sub && (
                      <button
                        className="table-action table-action--delete"
                        type="button"
                        disabled={deletingId === profile.id}
                        onClick={() => { void handleDelete(profile) }}
                      >
                        {deletingId === profile.id ? 'Excluindo...' : 'Excluir'}
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}</tbody>
          </table>
        </div>
      )}
    </section>
  )
}
