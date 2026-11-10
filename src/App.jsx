import { useCallback, useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import useLocalStorage from './hooks/useLocalStorage'
import { normalize } from './utils/pokemon'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import SortControls from './components/SortControls'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import CompareTray from './components/CompareTray'
import CompareModal from './components/CompareModal'
import TrainerList from './components/TrainerList'
import EmptyState from './components/EmptyState'

const { trainers, types } = data

// No JSON, o Mew (#151) vem sem tipos. Usamos o tipo "Typeless" definido no próprio arquivo.
const typeless = types.find((t) => t.id === 0) ?? { id: 0, name: 'Typeless' }
const allPokemon = data.pokemon.map((p) => (p.types.length > 0 ? p : { ...p, types: [typeless] }))

const pokemonById = new Map(allPokemon.map((p) => [p.id, p]))

// só os tipos que realmente aparecem nos Pokémon
const usedTypes = types.filter((t) => allPokemon.some((p) => p.types.some((pt) => pt.id === t.id)))

const typeCounts = Object.fromEntries(
  usedTypes.map((t) => [t.name, allPokemon.filter((p) => p.types.some((pt) => pt.id === t.id)).length]),
)

export default function App() {
  const [view, setView] = useState('pokedex')
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [detailsId, setDetailsId] = useState(null)
  const [compareIds, setCompareIds] = useState([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [scanKey, setScanKey] = useState(0)

  const [favorites, setFavorites] = useLocalStorage('pokedex:favorites', [])
  const [theme, setTheme] = useLocalStorage(
    'pokedex:theme',
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  // estado derivado: lista filtrada e ordenada
  const visible = useMemo(() => {
    const q = normalize(query).replace(/^#/, '')
    const isNumeric = /^\d+$/.test(q)

    const filtered = allPokemon.filter((p) => {
      if (selectedType && !p.types.some((t) => t.name === selectedType)) return false
      if (onlyFavorites && !favorites.includes(p.id)) return false
      if (!q) return true
      return isNumeric ? String(p.id).includes(q) : normalize(p.name).includes(q)
    })

    const dir = sortDir === 'asc' ? 1 : -1
    return filtered.sort((a, b) => {
      let diff
      if (sortKey === 'id') diff = a.id - b.id
      else if (sortKey === 'name') diff = a.name.localeCompare(b.name, 'pt-BR')
      else diff = a.stats[sortKey] - b.stats[sortKey]
      return diff !== 0 ? diff * dir : a.id - b.id
    })
  }, [query, selectedType, onlyFavorites, favorites, sortKey, sortDir])

  const toggleFavorite = useCallback(
    (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
    [setFavorites],
  )

  const toggleCompare = useCallback((id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      return prev.length >= 2 ? prev : [...prev, id]
    })
  }, [])

  const closeDetails = useCallback(() => setDetailsId(null), [])
  const closeCompare = useCallback(() => setCompareOpen(false), [])

  const pickRandom = () => {
    const random = allPokemon[Math.floor(Math.random() * allPokemon.length)]
    setScanKey((k) => k + 1)
    setDetailsId(random.id)
  }

  const clearFilters = () => {
    setQuery('')
    setSelectedType('')
    setOnlyFavorites(false)
  }

  const details = detailsId ? pokemonById.get(detailsId) : null
  const detailsIndex = details ? visible.findIndex((p) => p.id === details.id) : -1

  const navigateDetails = (delta) => {
    const next = visible[detailsIndex + delta]
    if (next) setDetailsId(next.id)
  }

  const comparing = compareIds.map((id) => pokemonById.get(id))
  const hasFilters = query !== '' || selectedType !== '' || onlyFavorites

  return (
    <div className="app" data-theme={theme}>
      <Header
        view={view}
        onViewChange={setView}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        scanKey={scanKey}
        total={allPokemon.length}
      />

      <main className="main">
        {view === 'pokedex' ? (
          <>
            <section className="toolbar" aria-label="Pesquisa e filtros">
              <div className="toolbar__row">
                <SearchBar value={query} onChange={setQuery} />
                <SortControls
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onKeyChange={setSortKey}
                  onDirToggle={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
                />
                <button
                  type="button"
                  className={`btn ${onlyFavorites ? 'btn--primary' : ''}`}
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  aria-pressed={onlyFavorites}
                >
                  {onlyFavorites ? '★' : '☆'} Favoritos ({favorites.length})
                </button>
                <button type="button" className="btn" onClick={pickRandom}>
                  🎲 Aleatório
                </button>
              </div>
              <TypeFilter types={usedTypes} selected={selectedType} counts={typeCounts} onSelect={setSelectedType} />
            </section>

            <p className="result-count" aria-live="polite">
              {visible.length} {visible.length === 1 ? 'Pokémon encontrado' : 'Pokémon encontrados'}
            </p>

            {visible.length > 0 ? (
              <PokemonList
                pokemon={visible}
                favorites={favorites}
                compareIds={compareIds}
                onOpen={setDetailsId}
                onToggleFavorite={toggleFavorite}
                onToggleCompare={toggleCompare}
              />
            ) : (
              <EmptyState
                title="Nenhum Pokémon encontrado"
                message={
                  onlyFavorites && favorites.length === 0 && !query && !selectedType
                    ? 'Você ainda não favoritou ninguém. Toque na estrela de um card para guardar o Pokémon aqui.'
                    : 'Confira a grafia do nome ou o número, ou troque o tipo selecionado.'
                }
                actionLabel="Limpar filtros"
                onAction={hasFilters ? clearFilters : undefined}
              />
            )}
          </>
        ) : (
          <>
            <h2 className="section-title">Treinadores</h2>
            <TrainerList trainers={trainers} pokemonById={pokemonById} onOpenPokemon={setDetailsId} />
          </>
        )}
      </main>

      {view === 'pokedex' && (
        <CompareTray
          pokemon={comparing}
          onRemove={toggleCompare}
          onOpen={() => setCompareOpen(true)}
          onClear={() => setCompareIds([])}
        />
      )}

      {details && (
        <PokemonDetails
          pokemon={details}
          trainers={trainers.filter((t) => t.pokemonIds.includes(details.id))}
          isFavorite={favorites.includes(details.id)}
          isComparing={compareIds.includes(details.id)}
          compareFull={compareIds.length >= 2}
          hasPrev={detailsIndex > 0}
          hasNext={detailsIndex !== -1 && detailsIndex < visible.length - 1}
          onClose={closeDetails}
          onNavigate={navigateDetails}
          onToggleFavorite={toggleFavorite}
          onToggleCompare={toggleCompare}
        />
      )}

      {compareOpen && comparing.length === 2 && <CompareModal pokemon={comparing} onClose={closeCompare} />}
    </div>
  )
}
