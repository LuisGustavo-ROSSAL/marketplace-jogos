import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'

export function CreateListingPage() {
  const { addListing, notify } = useMarketplace()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const listing = addListing({
      name: String(form.get('name')),
      price: Number(form.get('price')),
      condition: String(form.get('condition')),
      year: String(form.get('year')),
      description: String(form.get('description')) || 'Anúncio publicado pela comunidade.',
    })
    notify('Anúncio criado na prévia do frontend.')
    navigate(`/anuncios/${listing.id}`)
  }

  return (
    <section className="form-page">
      <div className="section-heading">
        <div><span className="eyebrow">VENDA PARA QUEM ENTENDE</span><h1>Criar anúncio</h1><p>Conte a história da peça e deixe o próximo colecionador encontrar você.</p></div>
      </div>
      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>Nome do console ou jogo<input name="name" placeholder="Ex.: Atari 2600 com joystick" required /></label>
          <div className="form-row">
            <label>Preço (R$)<input name="price" type="number" min="1" placeholder="800" required /></label>
            <label>Condição<select name="condition" defaultValue="Muito bom"><option>Muito bom</option><option>Bom</option><option>Para peças</option></select></label>
          </div>
          <label>Ano de lançamento<input name="year" inputMode="numeric" placeholder="1980" /></label>
          <label>Descrição<textarea name="description" rows={4} placeholder="Estado, funcionamento e detalhes que fazem diferença..." /></label>
          <label className="upload-field">
            <input type="file" accept="image/*" />
            <span className="upload-field__icon">＋</span>
            <span><strong>Adicionar fotos</strong><small>O armazenamento de fotos será conectado ao backend.</small></span>
          </label>
          <button className="button button--lime form-submit" type="submit">Publicar anúncio <span>→</span></button>
        </div>
        <aside className="form-preview"><span className="eyebrow">PRÉVIA DO ANÚNCIO</span><div className="preview-art">🎮</div><p>Sua peça vai aparecer assim no catálogo.</p></aside>
      </form>
    </section>
  )
}