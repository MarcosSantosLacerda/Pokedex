import { STATS, formatId, totalStats, typeColor } from '../utils/pokemon'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'

export default function CompareModal({ pokemon, onClose }) {
  const [a, b] = pokemon

  const rows = [
    ...STATS.map(({ key, label }) => ({ label, va: a.stats[key], vb: b.stats[key] })),
    { label: 'Total', va: totalStats(a), vb: totalStats(b), total: true },
  ]

  const renderHead = (p) => (
    <div className="compare__head" style={{ '--type': typeColor(p.types[0].name) }}>
      <PokemonImage id={p.id} name={p.name} className="compare__img" />
      <h3>
        <span>{formatId(p.id)}</span> {p.name}
      </h3>
      <div className="compare__types">
        {p.types.map((t) => (
          <TypeBadge key={t.id} name={t.name} />
        ))}
      </div>
    </div>
  )

  return (
    <Modal title={`Comparação entre ${a.name} e ${b.name}`} onClose={onClose} wide>
      <div className="compare">
        <div className="compare__heads">
          {renderHead(a)}
          <span className="compare__vs" aria-hidden="true">
            VS
          </span>
          {renderHead(b)}
        </div>

        <div className="compare__rows">
          {rows.map((row) => (
            <div className="compare__row" key={row.label}>
              <div className="compare__cell" style={{ '--type': typeColor(a.types[0].name) }}>
                {row.total ? (
                  <span className={`compare__total ${row.va > row.vb ? 'is-best' : ''}`}>{row.va}</span>
                ) : (
                  <StatBar label={row.label} value={row.va} highlight={row.va > row.vb} />
                )}
              </div>
              <span className="compare__label">{row.label}</span>
              <div className="compare__cell" style={{ '--type': typeColor(b.types[0].name) }}>
                {row.total ? (
                  <span className={`compare__total ${row.vb > row.va ? 'is-best' : ''}`}>{row.vb}</span>
                ) : (
                  <StatBar label={row.label} value={row.vb} highlight={row.vb > row.va} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
