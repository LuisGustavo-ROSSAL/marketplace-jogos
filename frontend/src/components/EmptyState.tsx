import { Link } from 'react-router-dom'

type EmptyStateProps = {
  title: string
  text: string
  action?: string
  to?: string
}

export function EmptyState({ title, text, action, to = '/' }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__symbol" aria-hidden="true">✳</span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action && <Link className="button button--outline" to={to}>{action}</Link>}
    </div>
  )
}