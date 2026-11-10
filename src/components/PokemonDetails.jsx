import { STATS, formatId, totalStats, typeColor } from '../utils/pokemon'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'

export default function PokemonDetails({
  pokemon,
  trainers,
  isFavorite,
  isComparing,
  compareFull,
  hasPrev,
  hasNext,
  onClose,
  onNavigate,
  onToggleFavorite,
  onToggleCompare,
}) {
  const color = typeColor(pokemon.types[0].name)

  const handleKey = (e) => {
    if (e.key === 'ArrowLeft' && hasPrev) onNavigate(-1)
    if (e.key === 'ArrowRight' && hasNext) onNavigate(1)
  }

  return (
    <Modal title={`Detalhes de ${pokemon.name}`} onClose={onClose} onKey={handleKey}>
      <div className="details" style={{ '--type': color }}>
        <div className="details__hero">
          <span className="details__id">{formatId(pokemon.id)}</span>
          <PokemonImage id={pokemon.id} name={pokemon.name} className="details__img" />
          <button
            type="button"
            className="details__nav details__nav--prev icon-btn"
            onClick={() => onNavigate(-1)}
            disabled={!hasPrev}
            aria-label="Pokémon anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="details__nav details__nav--next icon-btn"
            onClick={() => onNavigate(1)}
            disabled={!hasNext}
            aria-label="Próximo Pokémon"
          >
            ›
          </button>
        </div>

        <div className="details__body">
          <h2>{pokemon.name}</h2>
          <div className="details__types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>

          <div className="details__stats">
            {STATS.map(({ key, label }) => (
              <StatBar key={key} label={label} value={pokemon.stats[key]} />
            ))}
            <p className="details__total">
              Total <strong>{totalStats(pokemon)}</strong>
            </p>
          </div>

          <p className="details__trainers">
            {trainers.length > 0 ? (
              <>
                Treinado por <strong>{trainers.map((t) => t.name).join(', ')}</strong>
              </>
            ) : (
              'Nenhum treinador da lista tem este Pokémon.'
            )}
          </p>

          <div className="details__actions">
            <button
              type="button"
              className={`btn ${isFavorite ? 'btn--primary' : ''}`}
              onClick={() => onToggleFavorite(pokemon.id)}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '★ Favorito' : '☆ Favoritar'}
            </button>
            <button
              type="button"
              className={`btn ${isComparing ? 'btn--primary' : ''}`}
              onClick={() => onToggleCompare(pokemon.id)}
              disabled={!isComparing && compareFull}
              aria-pressed={isComparing}
            >
              {isComparing ? '⚔ Na comparação' : '⚔ Comparar'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
