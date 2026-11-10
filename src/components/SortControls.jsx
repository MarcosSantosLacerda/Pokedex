import { SORT_OPTIONS } from '../utils/pokemon'

export default function SortControls({ sortKey, sortDir, onKeyChange, onDirToggle }) {
  return (
    <div className="sort">
      <label htmlFor="sort">Ordenar por</label>
      <select id="sort" value={sortKey} onChange={(e) => onKeyChange(e.target.value)}>
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="icon-btn"
        onClick={onDirToggle}
        aria-label={sortDir === 'asc' ? 'Ordem crescente. Inverter' : 'Ordem decrescente. Inverter'}
        title={sortDir === 'asc' ? 'Crescente' : 'Decrescente'}
      >
        {sortDir === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  )
}
