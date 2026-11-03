'use client'

import { useMarketplace } from '../../context/MarketplaceContext'

export default function SettingsPage() {
  const { notify } = useMarketplace()

  return (
    <section className="settings-page">
      <span className="eyebrow">PREFERÊNCIAS</span>
      <h1>Configurações</h1>
      <label className="settings-row"><span><strong>Notificações de novos anúncios</strong><span>Receba novidades da comunidade.</span></span><input type="checkbox" defaultChecked /></label>
      <label className="settings-row"><span><strong>Perfil público</strong><span>Permita que outros colecionadores vejam seu perfil.</span></span><input type="checkbox" defaultChecked /></label>
      <button className="button button--lime" type="button" onClick={() => notify('Preferências salvas nesta prévia.')}>Salvar preferências</button>
    </section>
  )
}