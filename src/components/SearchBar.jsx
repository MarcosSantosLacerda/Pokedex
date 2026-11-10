export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="search" className="sr-only">
        Pesquisar Pokémon por nome ou número
      </label>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="search__icon">
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <input
        id="search"
        type="search"
        placeholder="Pesquisar Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  )
}
