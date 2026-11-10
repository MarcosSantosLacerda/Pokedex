import { useEffect, useRef } from 'react'

// Modal acessível: fecha com Esc ou clique fora, trava o scroll e devolve o foco.
export default function Modal({ title, onClose, onKey, children, wide = false }) {
  const dialogRef = useRef(null)
  // guarda os handlers em refs para o efeito rodar só uma vez por abertura
  const closeRef = useRef(onClose)
  const keyRef = useRef(onKey)
  closeRef.current = onClose
  keyRef.current = onKey

  useEffect(() => {
    const previous = document.activeElement
    const handleKey = (e) => {
      if (e.key === 'Escape') closeRef.current()
      else keyRef.current?.(e)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [])

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={`modal ${wide ? 'modal--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <button type="button" className="modal__close icon-btn" onClick={onClose} aria-label="Fechar">
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
