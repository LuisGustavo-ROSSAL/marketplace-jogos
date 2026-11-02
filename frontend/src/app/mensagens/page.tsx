import { EmptyState } from '../../components/EmptyState'

export default function MessagesPage() {
  return (
    <section className="messages-page">
      <div className="section-heading"><div><span className="eyebrow">CONVERSAS</span><h1>Mensagens</h1></div></div>
      <EmptyState title="Nenhuma conversa ainda" text="Suas conversas com vendedores e colecionadores vão aparecer aqui." action="Voltar ao catálogo" />
    </section>
  )
}