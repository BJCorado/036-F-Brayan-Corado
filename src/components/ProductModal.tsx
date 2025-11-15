import { useEffect, useMemo, useRef, useId, useState } from 'react'
import type { Product } from '../types/product'

type Props = { product: Product | null; onClose: () => void }

const gtq = new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' })

export default function ProductModal({ product, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const descId = useId()

  // Estado para salida suave
  const [exiting, setExiting] = useState(false)
  const [renderProduct, setRenderProduct] = useState<Product | null>(product)
  const ACTIVE = product ?? renderProduct
  const EXIT_MS = 220

  // Maneja apertura/cierre (focus trap + scroll lock)
  useEffect(() => {
    if (!product) return
    setRenderProduct(product)
    setExiting(false)

    previouslyFocused.current = document.activeElement as HTMLElement

    const el = dialogRef.current
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const focusables = () =>
      Array.from(
        el?.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter(n => !n.hasAttribute('disabled'))

    const focusFirst = () => focusables()[0]?.focus()
    const raf = requestAnimationFrame(focusFirst)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        requestClose()
      } else if (e.key === 'Tab') {
        const nodes = focusables()
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      previouslyFocused.current?.focus()
    }
  }, [product])

  // Cierre con animación
  const requestClose = () => {
    if (exiting) return
    setExiting(true)
    setRenderProduct(product ?? renderProduct) // asegura que tengamos algo para animar
    window.setTimeout(() => {
      onClose()               // limpia en el padre
      setRenderProduct(null)  // y ya podemos desmontar localmente
    }, EXIT_MS)
  }

  const stars = useMemo(() => {
    const rating = Math.max(0, Math.min(5, Math.round((ACTIVE?.rating ?? 0) * 2) / 2))
    return Array.from({ length: 5 }, (_, i) =>
      i + 1 <= rating ? 'full' : i + 0.5 === rating ? 'half' : 'empty'
    )
  }, [ACTIVE])

  // NUEVO: separar "Categoría" y deducir "Cristal" si viene embebido en category ("• ... glass")
  const { categoryOnly, glassFromCategory } = useMemo(() => {
    const raw = (ACTIVE?.category ?? '').trim()
    const parts = raw.split('•').map(p => p.trim()).filter(Boolean)
    let categoryOnly = raw
    let glassFromCategory = ''
    if (parts.length >= 2) {
      categoryOnly = parts[0]
      const maybeGlass = parts.find(p => /glass/i.test(p))
      glassFromCategory = maybeGlass ?? (parts[2] ?? '')
    }
    return { categoryOnly, glassFromCategory }
  }, [ACTIVE])

  // NUEVO: preferir product.glass si existe (puede venir del lookup), si no usar lo deducido
  const glass: string | undefined = (ACTIVE as any)?.glass ?? (glassFromCategory || undefined)

  if (!ACTIVE) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId}>
      {/* Animaciones locales */}
      <style>{`
        @keyframes modal-soft-in {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modal-soft-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(8px) scale(0.98); }
        }
        @keyframes backdrop-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes backdrop-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim { animation: none !important; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm anim ${
          exiting
            ? 'animate-[backdrop-fade-out_180ms_ease-out_both]'
            : 'animate-[backdrop-fade_200ms_ease-out_both]'
        }`}
        onClick={requestClose}
        aria-hidden="true"
      />

      {/* Contenedor */}
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          ref={dialogRef}
          className={`anim w-full max-w-3xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 shadow-2xl backdrop-blur-xl overflow-hidden outline-none ${
            exiting
              ? 'animate-[modal-soft-out_220ms_cubic-bezier(0.22,1,0.36,1)_both]'
              : 'animate-[modal-soft-in_300ms_cubic-bezier(0.22,1,0.36,1)_both]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-black/10 dark:border-white/10">
            <h2 id={titleId} className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-2 pr-2">
              {ACTIVE.title}
            </h2>
            <div className="flex items-center gap-2">
              {ACTIVE.category && (
                <span className="hidden sm:inline rounded-full px-2.5 py-1 text-xs font-medium bg-white/80 dark:bg-neutral-900/70 text-gray-700 dark:text-gray-200 ring-1 ring-black/10 dark:ring-white/10">
                  {ACTIVE.category}
                </span>
              )}
              <button
                type="button"
                onClick={requestClose}
                className="inline-flex items-center justify-center rounded-xl size-9 text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                aria-label="Cerrar"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 grid md:grid-cols-2 gap-5 max-h-[75vh] overflow-y-auto">
            {/* Imagen */}
            <div className="relative rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-gray-100 dark:bg-white/5 aspect-square">
              {ACTIVE.image ? (
                <img src={ACTIVE.image} alt={ACTIVE.title} className="h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">Sin imagen</div>
              )}
            </div>

            {/* Detalles */}
            <div className="space-y-3">
              {ACTIVE.price != null && (
                <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">{gtq.format(ACTIVE.price)}</p>
              )}

              {/* Rating */}
              {ACTIVE.rating != null && (
                <div className="flex items-center gap-2" aria-label={`Calificación ${ACTIVE.rating} de 5`}>
                  <div className="flex items-center">
                    {stars.map((t, i) => (
                      <svg key={i} viewBox="0 0 24 24" className="size-4" aria-hidden>
                        <defs>
                          <linearGradient id={`half-${i}`} x1="0%" x2="100%">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill={t === 'full' ? 'currentColor' : t === 'half' ? 'url(#half-' + i + ')' : 'none'}
                          stroke="currentColor"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{ACTIVE.rating} / 5</span>
                </div>
              )}

              {/* NUEVO: Categoría en una línea clara */}
              {ACTIVE.category && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Categoría:</span> {categoryOnly}
                </p>
              )}

              {/* NUEVO: Cristal si existe o se pudo deducir */}
              {glass && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Cristal:</span> {glass}
                </p>
              )}

              <div id={descId}>
                {/* NUEVO: Etiqueta pedida en el examen */}
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Instrucciones:</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{ACTIVE.description ?? '—'}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={requestClose}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow ring-1 ring-black/10 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
