type Props = {
  page: number
  perPage: number
  total: number
  onPageChange: (p: number) => void
}

export default function Pagination({ page, perPage, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  const start = total === 0 ? 0 : (page - 1) * perPage + 1
  const end = Math.min(total, page * perPage)

  const canPrev = page > 1
  const canNext = page < totalPages

  const go = (p: number) => {
    if (p >= 1 && p <= totalPages && p !== page) onPageChange(p)
  }

  // Crea una lista de páginas con puntos suspensivos
  const getPages = (): (number | 'dots')[] => {
    const delta = 1 // cantidad de páginas a cada lado
    const pages: (number | 'dots')[] = []

    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    pages.push(1)
    if (left > 2) pages.push('dots')

    for (let p = left; p <= right; p++) pages.push(p)

    if (right < totalPages - 1) pages.push('dots')
    if (totalPages > 1) pages.push(totalPages)
    return pages
  }

  const btnBase =
    'inline-flex items-center justify-center min-w-9 h-9 rounded-xl text-sm font-medium transition outline-none border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:opacity-50 disabled:pointer-events-none'

  const iconBtn = `${btnBase} px-2`

  return (
    <nav className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Paginación">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Mostrando <span className="font-semibold text-gray-900 dark:text-gray-100">{start}</span>
        {' '}-{' '}
        <span className="font-semibold text-gray-900 dark:text-gray-100">{end}</span>
        {' '}de{' '}
        <span className="font-semibold text-gray-900 dark:text-gray-100">{total}</span>
      </div>

      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            className={iconBtn}
            onClick={() => go(1)}
            disabled={!canPrev}
            aria-label="Primera página"
            title="Primera página"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 6L5 12l6 6"/><path d="M19 6l-6 6 6 6"/>
            </svg>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={iconBtn}
            onClick={() => go(page - 1)}
            disabled={!canPrev}
            aria-label="Página anterior"
            title="Anterior"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6"/>
            </svg>
          </button>
        </li>

        {getPages().map((p, i) => (
          <li key={`${p}-${i}`}>
            {p === 'dots' ? (
              <span className="px-2 text-gray-500 dark:text-gray-400 select-none">…</span>
            ) : (
              <button
                type="button"
                onClick={() => go(p)}
                aria-current={p === page ? 'page' : undefined}
                className={
                  p === page
                    ? `${btnBase} bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow`
                    : btnBase
                }
                title={`Página ${p}`}
              >
                {p}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            type="button"
            className={iconBtn}
            onClick={() => go(page + 1)}
            disabled={!canNext}
            aria-label="Página siguiente"
            title="Siguiente"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={iconBtn}
            onClick={() => go(totalPages)}
            disabled={!canNext}
            aria-label="Última página"
            title="Última página"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 6l6 6-6 6"/><path d="M5 6l6 6-6 6"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}
