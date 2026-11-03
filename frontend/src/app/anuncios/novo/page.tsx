'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMarketplace } from '../../../context/MarketplaceContext'

function readImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Não foi possível ler a imagem selecionada.'))
    }
    reader.onerror = () => reject(reader.error ?? new Error('Não foi possível ler a imagem selecionada.'))
    reader.readAsDataURL(file)
  })
}

export default function CreateListingPage() {
  const { addListing, notify } = useMarketplace()
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const form = new FormData(event.currentTarget)
      const selectedImage = form.get('image')
      const imageUrl = selectedImage instanceof File && selectedImage.size > 0
        ? await readImage(selectedImage)
        : undefined
      const listing = await addListing({
        name: String(form.get('name')),
        price: Number(form.get('price')),
        condition: String(form.get('condition')),
        year: String(form.get('year')),
        description: String(form.get('description')) || 'Anúncio publicado pela comunidade.',
        imageUrl,
      })
      notify('Anúncio publicado com sucesso.')
      router.push(`/anuncios/${listing.id}`)
    } catch (error) {
      console.error('Não foi possível publicar o anúncio.', error)
      notify('Não foi possível publicar o anúncio. Verifique a conexão com a API e tente novamente.')
      setIsSubmitting(false)
    }
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setPreviewImage('')
      return
    }

    try {
      setPreviewImage(await readImage(file))
    } catch (error) {
      console.error('Não foi possível gerar a prévia da imagem.', error)
      notify('Não foi possível exibir a prévia da imagem selecionada.')
    }
  }

  return (
    <section className="form-page">
      <div className="section-heading"><div><span className="eyebrow">VENDA PARA QUEM ENTENDE</span><h1>Criar anúncio</h1><p>Conte a história da peça e deixe o próximo colecionador encontrar você.</p></div></div>
      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>Nome do console ou jogo<input name="name" placeholder="Ex.: Atari 2600 com joystick" required /></label>
          <div className="form-row">
            <label>Preço (R$)<input name="price" type="number" min="1" placeholder="800" required /></label>
            <label>Condição<select name="condition" defaultValue="Muito bom"><option>Muito bom</option><option>Bom</option><option>Para peças</option></select></label>
          </div>
          <label>Ano de lançamento<input name="year" type="number" step="1" placeholder="1980" /></label>
          <label>Descrição<textarea name="description" rows={4} placeholder="Estado, funcionamento e detalhes que fazem diferença..." /></label>
          <label className="upload-field"><input name="image" type="file" accept="image/*" onChange={handleImageChange} /><span className="upload-field__icon">＋</span><span><strong>Adicionar foto</strong><small>{previewImage ? 'Foto selecionada.' : 'Escolha uma imagem para o anúncio.'}</small></span></label>
          <button className="button button--lime form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Publicando...' : 'Publicar anúncio'} <span>→</span></button>
        </div>
        <aside className="form-preview"><span className="eyebrow">PRÉVIA DO ANÚNCIO</span><div className="preview-art">{previewImage ? <Image src={previewImage} alt="Prévia da foto do anúncio" fill unoptimized /> : '🎮'}</div><p>Sua peça vai aparecer assim no catálogo.</p></aside>
      </form>
    </section>
  )
}