import Link from 'next/link'

type EmptyStateProps = {
  title: string
  text: string
  action?: string
  href?: string
}

export function EmptyState({ title, text, action, href = '/' }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__symbol" aria-hidden="true">✳</span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action && <Link className="button button--outline" href={href}>{action}</Link>}
    </div>
  )
}