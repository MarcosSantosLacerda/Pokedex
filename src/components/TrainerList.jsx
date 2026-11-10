import TrainerCard from './TrainerCard'

export default function TrainerList({ trainers, pokemonById, onOpenPokemon }) {
  return (
    <ul className="trainer-grid">
      {trainers.map((t) => (
        <li key={t.id}>
          <TrainerCard
            trainer={t}
            team={t.pokemonIds.map((id) => pokemonById.get(id)).filter(Boolean)}
            onOpenPokemon={onOpenPokemon}
          />
        </li>
      ))}
    </ul>
  )
}
