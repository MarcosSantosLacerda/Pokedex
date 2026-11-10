import { useEffect, useState } from 'react'
import { artworkUrl, spriteUrl } from '../utils/pokemon'

function Pokeball() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="pokemon-img__ball">
      <circle cx="50" cy="50" r="44" fill="currentColor" opacity="0.18" />
      <path d="M6 50a44 44 0 0 1 88 0z" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="50" r="12" fill="var(--surface)" />
    </svg>
  )
}

// Tenta o artwork oficial, depois o sprite pequeno e, por fim, uma Pokébola.
// Sem internet, a Pokédex continua funcionando só com os dados do JSON.
export default function PokemonImage({ id, name, className = '' }) {
  const sources = [artworkUrl(id), spriteUrl(id)]
  const [attempt, setAttempt] = useState(0)

  useEffect(() => setAttempt(0), [id])

  if (attempt >= sources.length) {
    return (
      <div className={`pokemon-img ${className}`} role="img" aria-label={name}>
        <Pokeball />
      </div>
    )
  }

  return (
    <div className={`pokemon-img ${className}`}>
      <img
        src={sources[attempt]}
        alt={name}
        loading="lazy"
        draggable="false"
        onError={() => setAttempt((a) => a + 1)}
      />
    </div>
  )
}
