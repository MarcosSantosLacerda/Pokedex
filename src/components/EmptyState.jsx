export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty" role="status">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="empty__ball">
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M6 50h30M64 50h30" stroke="currentColor" strokeWidth="5" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M44 44l12 12M56 44L44 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <h2>{title}</h2>
      <p>{message}</p>
      {onAction && (
        <button type="button" className="btn btn--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
