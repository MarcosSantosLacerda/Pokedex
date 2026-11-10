export default function Header({ view, onViewChange, theme, onToggleTheme, scanKey, total }) {
  const tabs = [
    { id: 'pokedex', label: 'Pokédex' },
    { id: 'trainers', label: 'Treinadores' },
  ]

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <span key={scanKey} className={`lens ${scanKey > 0 ? 'lens--flash' : ''}`} aria-hidden="true" />
          <span className="leds" aria-hidden="true">
            <i style={{ background: '#ff5b4d' }} />
            <i style={{ background: '#ffd84d' }} />
            <i style={{ background: '#4dd67a' }} />
          </span>
          <div>
            <h1>Pokédex</h1>
            <p>{total} Pokémon da região de Kanto</p>
          </div>
        </div>

        <nav className="header__nav" aria-label="Seções">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`tab ${view === t.id ? 'is-active' : ''}`}
              onClick={() => onViewChange(t.id)}
              aria-current={view === t.id ? 'page' : undefined}
            >
              {t.label}
            </button>
          ))}
          <button
            type="button"
            className="tab tab--icon"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </nav>
      </div>
    </header>
  )
}
