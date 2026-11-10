import PokemonCard from './PokemonCard'

export default function PokemonList({
  pokemon,
  favorites,
  compareIds,
  onOpen,
  onToggleFavorite,
  onToggleCompare,
}) {
  return (
    <ul className="grid">
      {pokemon.map((p) => (
        <li key={p.id}>
          <PokemonCard
            pokemon={p}
            isFavorite={favorites.includes(p.id)}
            isComparing={compareIds.includes(p.id)}
            compareFull={compareIds.length >= 2}
            onOpen={onOpen}
            onToggleFavorite={onToggleFavorite}
            onToggleCompare={onToggleCompare}
          />
        </li>
      ))}
    </ul>
  )
}
