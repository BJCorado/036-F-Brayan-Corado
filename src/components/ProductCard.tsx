import { useState } from 'react'
import type { Product } from '../types/product'

type Props = { product: Product; onClick: (p: Product) => void }

const gtq = new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' })

export default function ProductCard({ product, onClick }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const titleId = `prod-title-${product.id ?? Math.random().toString(36).slice(2)}`

  return (
    <>
      {/* Animaciones suaves locales */}
      <style>{`
        @keyframes soft-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes soft-fade-in {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim { animation: none !important; }
        }
      `}</style>

      <button
        type="button"
        onClick={() => onClick(product)}
        className="anim animate-[soft-fade-up_460ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:100ms] group text-left rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 hover:shadow-md hover:-translate-y-0.5 transition transform-gpu p-3 flex flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        aria-label={`Ver detalles de ${product.title}`}
        aria-describedby={titleId}
        title={product.title}
      >
        {/* Imagen */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10">
          {!loaded && !failed && (
            <div className="absolute inset-0 animate-pulse bg-gray-200/80 dark:bg-white/10" aria-hidden />
          )}

          {product.image && !failed ? (
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-cover transition-transform duration-300 ${loaded ? 'group-hover:scale-[1.03]' : ''} ${loaded ? 'animate-[soft-fade-in_380ms_ease-out_both]' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">Sin imagen</div>
          )}

          {/* Categoría */}
          {product.category && (
            <span className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[11px] font-medium bg-white/85 dark:bg-neutral-900/70 text-gray-700 dark:text-gray-200 ring-1 ring-black/10 dark:ring-white/10">
              {product.category}
            </span>
          )}

          {/* Overlay Ver detalle */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition bg-black/10 dark:bg-black/20 text-white text-xs font-medium backdrop-blur-[2px]">
            Ver detalle
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1">
          <h3 id={titleId} className="font-semibold leading-tight line-clamp-2 text-gray-900 dark:text-gray-100">
            {product.title}
          </h3>

          {product.price != null && (
            <p className="mt-1 inline-flex items-center rounded-lg px-2 py-0.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-400/30 bg-emerald-500/10">
              {gtq.format(product.price)}
            </p>
          )}

          {product.category && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
          )}
        </div>
      </button>
    </>
  )
}
