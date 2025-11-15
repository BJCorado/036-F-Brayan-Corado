import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import Pagination from '../components/Pagination'
import type { Product } from '../types/product'
import { fetchProducts, fetchProductById } from '../services/api'
import { searchProductsByName, fetchCocktailCategories, fetchProductsByCategory } from '../services/api'

export default function Catalog() {
  const [page, setPage] = useState(1)
  const [perPage] = useState(8)

  const [items, setItems] = useState<Product[]>([])
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selected, setSelected] = useState<Product | null>(null)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | string>('all')

  // NOTA: en TheCocktailDB no hay precio; dejamos solo orden por nombre
  const [sort, setSort] = useState<'relevance' | 'title-asc' | 'title-desc'>('relevance')

  // Categorías desde la API (en vez de derivarlas de items)
  const [categories, setCategories] = useState<string[]>([])

  // Cargar categorías al montar
  useEffect(() => {
    fetchCocktailCategories().then(setCategories).catch(() => {})
  }, [])

  // Carga principal (usa API según query/categoría)
  const load = async () => {
    setLoading(true)
    setError(null)

    try {
      const q = query.trim()
      if (q) {
        // BUSCAR por nombre (search.php?s=...)
        const all = await searchProductsByName(q)
        setTotal(all.length)
        const start = (page - 1) * perPage
        setItems(all.slice(start, start + perPage))
        return
      }

      if (category !== 'all') {
        // FILTRAR por categoría (filter.php?c=...)
        const all = await fetchProductsByCategory(category)
        setTotal(all.length)
        const start = (page - 1) * perPage
        setItems(all.slice(start, start + perPage))
        return
      }

      // DEFAULT: lo que ya tenías (tu fetchProducts sobre /filter.php?c=Cocktail)
      const { items, total } = await fetchProducts(page, perPage)
      setItems(items)
      setTotal(total)
    } catch {
      setError('No se pudo cargar el catálogo.')
    } finally {
      setLoading(false)
    }
  }

  // Re-cargar al cambiar página, query o categoría
  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, query, category])

  // Si cambias query/categoría, vuelve a la página 1
  useEffect(() => { setPage(1) }, [query, category])

  // Orden local (solo por título porque no hay precio en esta API)
  const visible = useMemo(() => {
    const arr = [...items]
    switch (sort) {
      case 'title-asc':  return arr.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
      case 'title-desc': return arr.sort((a, b) => (b.title ?? '').localeCompare(a.title ?? ''))
      default:           return arr
    }
  }, [items, sort])

  const clearFilters = () => {
    setQuery('')
    setCategory('all')
    setSort('relevance')
    setPage(1)
  }

  return (
    <main className="relative">
      {/* Encabezado y barra de herramientas */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/70 backdrop-blur p-4 md:p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Catálogo</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Página {page} • {visible.length} elementos (Total: {total})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {/* Buscar (usa search.php?s=...) */}
              <label className="relative">
                <span className="sr-only">Buscar</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar cocteles…"
                  className="w-56 md:w-64 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 pl-9 pr-8 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <svg aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                )}
              </label>

              {/* Categoría (usa list.php?c=list y filter.php?c=...) */}
              <label className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <span>Categoria</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 px-2.5 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  <option value="all">Todas</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              {/* Ordenar (solo por nombre) */}
              <label className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <span>Ordenar</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 px-2.5 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="title-asc">Nombre A→Z</option>
                  <option value="title-desc">Nombre Z→A</option>
                </select>
              </label>

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 border border-black/10 dark:border-white/10"
              >
                Limpiar
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M20 4L4 20"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Contenido */}
        {loading && (
          <section className="mt-2">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: perPage }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 p-3 animate-pulse">
                  <div className="aspect-[4/3] rounded-xl bg-gray-200/80 dark:bg-white/10" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-gray-200/80 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-gray-200/80 dark:bg-white/10" />
                  <div className="mt-4 h-9 w-full rounded-xl bg-gray-200/80 dark:bg-white/10" />
                </div>
              ))}
            </div>
          </section>
        )}

        {!loading && error && (
          <section className="mt-2">
            <div className="rounded-2xl border border-red-200 dark:border-red-400/30 bg-red-50 dark:bg-red-500/10 p-5 text-red-800 dark:text-red-200">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></svg>
                <div>
                  <p className="font-medium">{error}</p>
                  <button onClick={load} className="mt-2 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow ring-1 ring-black/10">
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {!loading && !error && (
          <>
            {visible.length === 0 ? (
              <section className="mt-2">
                <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 p-8 text-center">
                  <p className="text-gray-700 dark:text-gray-300">No hay resultados que coincidan.</p>
                  <div className="mt-4 flex justify-center">
                    <button onClick={clearFilters} className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow ring-1 ring-black/10">
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <section className="mt-2">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {visible.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onClick={async (base) => {
                        setSelected(base)
                        try {
                          const det = await fetchProductById(base.id)
                          if (det) setSelected(det)
                        } catch {}
                      }}
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <Pagination page={page} perPage={perPage} total={total} onPageChange={setPage} />
                </div>
              </section>
            )}
          </>
        )}

        <ProductModal product={selected} onClose={() => setSelected(null)} />
      </section>
    </main>
  )
}
