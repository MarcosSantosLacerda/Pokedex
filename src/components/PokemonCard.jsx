import { STATS, formatId, typeColor } from '../utils/pokemon'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'

export default function PokemonCard({
  pokemon,
  isFavorite,
  isComparing,
  compareFull,
  onOpen,
  onToggleFavorite,
  onToggleCompare,
}) {
  const color = typeColor(pokemon.types[0].name)

  return (
    <article className="card" style={{ '--type': color }}>
      <button
        type="button"
        className="card__open"
        onClick={() => onOpen(pokemon.id)}
        aria-label={`Ver detalhes de ${pokemon.name}`}
      >
        <span className="card__id">{formatId(pokemon.id)}</span>
        <PokemonImage id={pokemon.id} name={pokemon.name} className="card__img" />
        <h3 className="card__name">{pokemon.name}</h3>
        <span className="card__types">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.id} name={t.name} />
          ))}
        </span>
        <dl className="card__stats">
          {STATS.map(({ key, short }) => (
            <div key={key}>
              <dt>{short}</dt>
              <dd>{pokemon.stats[key]}</dd>
            </div>
          ))}
        </dl>
      </button>

      <div className="card__actions">
        <button
          type="button"
          className={`icon-btn ${isFavorite ? 'is-on' : ''}`}
          onClick={() => onToggleFavorite(pokemon.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remover ${pokemon.name} dos favoritos` : `Favoritar ${pokemon.name}`}
          title={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
        <button
          type="button"
          className={`icon-btn ${isComparing ? 'is-on' : ''}`}
          onClick={() => onToggleCompare(pokemon.id)}
          disabled={!isComparing && compareFull}
          aria-pressed={isComparing}
          aria-label={isComparing ? `Tirar ${pokemon.name} da comparação` : `Comparar ${pokemon.name}`}
          title={
            isComparing
              ? 'Tirar da comparação'
              : compareFull
                ? 'Já há 2 Pokémon na comparação'
                : 'Adicionar à comparação'
          }
        >
          ⚔
        </button>
      </div>
    </article>
  )
}
