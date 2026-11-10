import TypeBadge from './TypeBadge'

export default function TypeFilter({ types, selected, counts, onSelect }) {
  return (
    <div className="type-filter" role="group" aria-label="Filtrar por tipo">
      <button
        type="button"
        className={`type-badge type-badge--button type-badge--all ${selected === '' ? 'is-active' : ''}`}
        onClick={() => onSelect('')}
        aria-pressed={selected === ''}
      >
        Todos
      </button>
      {types.map((t) => (
        <TypeBadge
          key={t.id}
          name={t.name}
          count={counts[t.name]}
          active={selected === t.name}
          onClick={() => onSelect(selected === t.name ? '' : t.name)}
        />
      ))}
    </div>
  )
}
