export type Product = {
  id: number | string
  title: string
  description?: string         // ← aquí pondremos strInstructions
  price?: number
  image?: string
  category?: string            // ← strCategory
  rating?: number
  glass?: string               // ← NUEVO: strGlass
  alcoholic?: string           // ← NUEVO: strAlcoholic (por si luego lo quieres mostrar)
}
