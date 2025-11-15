import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const linkCls = ({ isActive }: { isActive: boolean }) => [
    'px-3 py-2 rounded-xl text-sm font-medium leading-none',
    'transition-all duration-200 outline-none',
    'text-gray-700 hover:text-gray-900 hover:bg-gray-100/70',
    'focus-visible:ring-2 focus-visible:ring-blue-500/40',
    'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10',
    isActive && 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow'
  ].filter(Boolean).join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/umg-logo.svg"
              alt="UMG"
              className="h-9 w-9 rounded-xl ring-1 ring-black/10 dark:ring-white/10 shadow-sm"
            />
            <span className="font-semibold tracking-tight select-none">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Consumo</span>{' '}
              <span className="text-gray-900 dark:text-gray-100">API</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-gray-50/70 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm">
            <NavLink to="/" className={linkCls} end>
              Inicio
            </NavLink>
            <NavLink to="/acerca" className={linkCls}>
              Acerca de
            </NavLink>
            <NavLink to="/consumo" className={linkCls}>
              Catálogo
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 outline-none transition hover:bg-gray-100/70 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500/40"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(v => !v)}
          >
            <span className="sr-only">Alternar menú</span>
            {/* Icono hamburguesa / close */}
            <svg
              className="h-6 w-6 text-gray-700 dark:text-gray-200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[grid-template-rows,opacity] duration-200 ${open ? 'opacity-100' : 'opacity-0'} grid ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0">
          <nav className="mx-4 mb-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-900/95 shadow-lg">
            <div className="p-2 grid gap-1">
              <NavLink to="/" className={linkCls} end>
                Inicio
              </NavLink>
              <NavLink to="/acerca" className={linkCls}>
                Acerca de
              </NavLink>
              <NavLink to="/consumo" className={linkCls}>
                Catálogo
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
