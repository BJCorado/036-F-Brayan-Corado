import type { Product } from '../types/product'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const PRODUCTS_PATH = import.meta.env.VITE_PRODUCTS_PATH ?? '/api/json/v1/1/filter.php?c=Cocktail'

/** Lista: trae todos los cocteles del filtro y pagina en el cliente */
export async function fetchProducts(page: number, perPage: number): Promise<{
  items: Product[]
  total: number
  serverPaginated: boolean
}> {
  if (!BASE_URL) {
    // fallback a mocks si no hay BASE_URL
    const all: Product[] = await import('../mocks/mock-products.json').then(m => m.default)
    const total = all.length
    const start = (page - 1) * perPage
    return { items: all.slice(start, start + perPage), total, serverPaginated: false }
  }

  const url = new URL(PRODUCTS_PATH, BASE_URL) // e.g. /api/json/v1/1/filter.php?c=Cocktail
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) return { items: [], total: 0, serverPaginated: false }
  const data = await res.json()
  const drinks = Array.isArray(data?.drinks) ? data.drinks : []

  // Mapear al tipo Product de la app
  const all: Product[] = drinks.map((d: any) => ({
    id: d.idDrink,
    title: d.strDrink,
    image: d.strDrinkThumb,
    description: undefined,       // se llena al traer detalle
    category: undefined,          // se llena al traer detalle
    price: undefined,
    rating: undefined
  }))

  const total = all.length
  const start = (page - 1) * perPage
  return { items: all.slice(start, start + perPage), total, serverPaginated: false }
}

/** Detalle por ID: lookup.php?i=ID (para mostrar en el modal) */
export async function fetchProductById(id: number | string): Promise<Product | null> {
  if (!BASE_URL) return null
  const url = new URL('/api/json/v1/1/lookup.php', BASE_URL)
  url.searchParams.set('i', String(id))

  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) return null
  const data = await res.json()
  const d = data?.drinks?.[0]
  if (!d) return null

 return {
  id: d.idDrink,
  title: d.strDrink,
  image: d.strDrinkThumb,
  description: d.strInstructions ?? '',    // Instrucciones
  category: d.strCategory ?? '',           // Categoría
  glass: d.strGlass ?? '',                 // Cristal
  alcoholic: d.strAlcoholic ?? '',         // (opcional)
}

}

/** Buscar cocteles por nombre: /search.php?s=...  (devuelve toda la lista; pagina en cliente) */
export async function searchProductsByName(name: string): Promise<Product[]> {
  if (!BASE_URL || !name.trim()) return []
  const url = new URL('/api/json/v1/1/search.php', BASE_URL)
  url.searchParams.set('s', name.trim())
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) return []
  const data = await res.json()
  const drinks = Array.isArray(data?.drinks) ? data.drinks : []
  return drinks.map((d: any) => ({
    id: d.idDrink,
    title: d.strDrink,
    image: d.strDrinkThumb,
    // el detalle (category, glass, description) lo sigues trayendo con fetchProductById al abrir el modal
  }))
}

/** Listar categorías disponibles: /list.php?c=list  (para llenar el <select>) */
export async function fetchCocktailCategories(): Promise<string[]> {
  if (!BASE_URL) return []
  const url = new URL('/api/json/v1/1/list.php', BASE_URL)
  url.searchParams.set('c', 'list')
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) return []
  const data = await res.json()
  const rows = Array.isArray(data?.drinks) ? data.drinks : []
  return rows.map((r: any) => r.strCategory).filter(Boolean).sort((a: string, b: string) => a.localeCompare(b))
}

/** Traer cocteles por categoría: /filter.php?c=...  (devuelve toda la lista; pagina en cliente) */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  if (!BASE_URL || !category.trim()) return []
  const url = new URL('/api/json/v1/1/filter.php', BASE_URL)
  url.searchParams.set('c', category.trim())
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) return []
  const data = await res.json()
  const drinks = Array.isArray(data?.drinks) ? data.drinks : []
  return drinks.map((d: any) => ({
    id: d.idDrink,
    title: d.strDrink,
    image: d.strDrinkThumb,
  }))
}