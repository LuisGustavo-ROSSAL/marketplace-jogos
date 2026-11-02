'use client'

import { useMarketplace } from '../../context/MarketplaceContext'

const demoProfiles = [
  ['CM', 'Camila Martins', 'camila@email.com'],
  ['RL', 'Rafael Lima', 'rafael@email.com'],
  ['AS', 'Ana Souza', 'ana@email.com'],
  ['JP', 'João Prado', 'joao@email.com'],
]

export default function ProfilesPage() {
  const { notify } = useMarketplace()

  return (
    <section className="profiles-panel">
      <div className="profiles-panel__heading"><span className="eyebrow">ADMINISTRAÇÃO</span><h1>Perfis cadastrados</h1><p>Contas da comunidade</p></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Usuário</th><th>Nome completo</th><th>Email</th><th>Ações</th></tr></thead>
          <tbody>{demoProfiles.map(([initials, name, email]) => (
            <tr key={email}>
              <td><span className="avatar avatar--table">{initials}</span></td>
              <td>{name}</td>
              <td>{email}</td>
              <td>
                <button className="table-action" type="button" onClick={() => notify('A edição de perfis será conectada ao backend.')}>Editar</button>
                <button className="table-action table-action--delete" type="button" onClick={() => notify('A exclusão de perfis será conectada ao backend.')}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  )
}