import { useEffect, useState } from 'react'
import { MAX_STAT } from '../utils/pokemon'

export default function StatBar({ label, value, max = MAX_STAT, highlight = false }) {
  const [width, setWidth] = useState(0)

  // anima a barra de 0 até o valor final quando o componente aparece
  useEffect(() => {
    const frame = requestAnimationFrame(() => setWidth((value / max) * 100))
    return () => cancelAnimationFrame(frame)
  }, [value, max])

  return (
    <div className={`stat-bar ${highlight ? 'is-best' : ''}`}>
      <span className="stat-bar__label">{label}</span>
      <span className="stat-bar__value">{value}</span>
      <div
        className="stat-bar__track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="stat-bar__fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}
