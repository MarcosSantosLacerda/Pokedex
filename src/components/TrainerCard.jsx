import { formatId } from '../utils/pokemon'

const MAX_BADGES = 9

export default function TrainerCard({ trainer, team, onOpenPokemon }) {
  // agrupa repetidos (ex.: Koga tem 3 Venonat) em um único chip com contagem
  const grouped = []
  team.forEach((p) => {
    const found = grouped.find((g) => g.pokemon.id === p.id)
    if (found) found.count += 1
    else grouped.push({ pokemon: p, count: 1 })
  })

  return (
    <article className="trainer">
      <header className="trainer__head">
        <h3>{trainer.name}</h3>
        <div
          className="trainer__badges"
          role="img"
          aria-label={`${trainer.badges} ${trainer.badges === 1 ? 'insígnia' : 'insígnias'}`}
        >
          {Array.from({ length: MAX_BADGES }, (_, i) => (
            <i key={i} className={i < trainer.badges ? 'is-earned' : ''} />
          ))}
        </div>
      </header>
      <p className="trainer__meta">
        {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}, {team.length} Pokémon
      </p>
      <ul className="trainer__team">
        {grouped.map(({ pokemon, count }) => (
          <li key={pokemon.id}>
            <button type="button" className="chip" onClick={() => onOpenPokemon(pokemon.id)}>
              <span className="chip__id">{formatId(pokemon.id)}</span>
              {pokemon.name}
              {count > 1 && <span className="chip__count">×{count}</span>}
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
