import { formatId } from '../utils/pokemon'

export default function CompareTray({ pokemon, onRemove, onOpen, onClear }) {
  if (pokemon.length === 0) return null

  return (
    <aside className="tray" aria-label="Comparação de Pokémon">
      <div className="tray__slots">
        {[0, 1].map((i) => {
          const p = pokemon[i]
          return p ? (
            <button
              key={`slot-${i}`}
              type="button"
              className="tray__slot is-filled"
              onClick={() => onRemove(p.id)}
              title="Remover da comparação"
            >
              {formatId(p.id)} {p.name} <span aria-hidden="true">✕</span>
            </button>
          ) : (
            <span key={`slot-${i}`} className="tray__slot">
              Escolha mais um
            </span>
          )
        })}
      </div>
      <div className="tray__actions">
        <button type="button" className="btn" onClick={onClear}>
          Limpar
        </button>
        <button type="button" className="btn btn--primary" onClick={onOpen} disabled={pokemon.length < 2}>
          Comparar
        </button>
      </div>
    </aside>
  )
}
