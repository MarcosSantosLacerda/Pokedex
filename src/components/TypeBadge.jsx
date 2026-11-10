import { readableOn, typeColor } from '../utils/pokemon'

export default function TypeBadge({ name, active = false, onClick, count }) {
  const color = typeColor(name)
  const style = { '--badge': color, '--badge-text': readableOn(color) }

  if (onClick) {
    return (
      <button
        type="button"
        className={`type-badge type-badge--button ${active ? 'is-active' : ''}`}
        style={style}
        onClick={onClick}
        aria-pressed={active}
      >
        {name}
        {count !== undefined && <span className="type-badge__count">{count}</span>}
      </button>
    )
  }

  return (
    <span className="type-badge" style={style}>
      {name}
    </span>
  )
}
