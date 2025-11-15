import { Link } from 'react-router-dom'

const NAME = import.meta.env.VITE_STUDENT_NAME ?? 'Nombre del Estudiante'
const CARNET = import.meta.env.VITE_STUDENT_ID ?? '0000-00-00000'

export default function Home() {
  const isDefaultName = !import.meta.env.VITE_STUDENT_NAME
  const isDefaultCarnet = !import.meta.env.VITE_STUDENT_ID

  return (
    <main className="relative">
      {/* Animaciones suaves */}
      <style>{`
        @keyframes soft-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes soft-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim { animation: none !important; }
        }
      `}</style>

      {/* Fondo decorativo suavizado para mejor contraste */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-1/2 size-[30rem] -translate-x-1/2 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-blue-500/30 via-indigo-500/25 to-cyan-400/25 dark:opacity-15" />
        <div className="absolute -bottom-28 right-0 size-[24rem] translate-x-12 rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-fuchsia-400/25 to-sky-400/25 dark:opacity-10" />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-[1.05fr,1.45fr] gap-10 items-center">
          {/* Logo sin marco (entrada muy suave) */}
          <div className="relative mx-auto w-full max-w-sm grid place-items-center anim animate-[soft-fade-in_520ms_ease-out_both] [animation-delay:60ms]">
            <img src="/umg-logo.svg" alt="Escudo UMG" className="h-44 w-44 md:h-56 md:w-56 drop-shadow-md" />
            <div className="absolute bottom-0 translate-y-1/2 select-none">
              <span className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-sm">
                UMG • Ingeniería en Sistemas
              </span>
            </div>
          </div>

          {/* Encabezado con panel para legibilidad (fade-up suave) */}
          <div className="space-y-6">
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/70 backdrop-blur p-6 shadow-sm anim animate-[soft-fade-up_560ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:120ms]">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Universidad Mariano Gálvez de Guatemala • Desarrollo Web
              </p>
              <h1 className="mt-1 text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Consumo de APIs
              </h1>
              <p className="mt-3 text-base md:text-lg text-gray-800/90 dark:text-gray-200/90 max-w-prose">
                Esta aplicación forma parte de la <span className="font-semibold">serie del Examen Final</span> del curso de <span className="font-semibold">Desarrollo Web</span>.
                Presenta el consumo de endpoints REST/JSON con una interfaz evaluable: navegación, catálogo con tarjetas y modal de detalle, paginación y soporte para modo oscuro.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/consumo"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow ring-1 ring-black/10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                  aria-label="Ir al catálogo"
                >
                  Ir al catálogo
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M13.5 4.5h6v6M20.25 3.75h-6a.75.75 0 0 0 0 1.5h3.69L11.47 11.72a.75.75 0 1 0 1.06 1.06l6.47-6.47v3.69a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-.75-.75Z" />
                  </svg>
                </Link>
                <Link
                  to="/acerca"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white/70 dark:bg-neutral-900/60 border border-black/10 dark:border-white/10 shadow  hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                  aria-label="Ver información del proyecto"
                >
                  Acerca del proyecto
                </Link>
              </div>
            </div>

            {/* Identificación (fade-up aún más suave con otro delay) */}
            <div className="mt-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 backdrop-blur shadow-sm anim animate-[soft-fade-up_600ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:200ms]">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-black/5 dark:border-white/10">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Identificación del estudiante</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Serie del Examen Final — Desarrollo Web</span>
              </div>

              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 p-4">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Nombre</dt>
                  <dd className="mt-1 flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 px-3 py-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100 truncate">{NAME}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Carnet</dt>
                  <dd className="mt-1 flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 px-3 py-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100 truncate">{CARNET}</span>
                  </dd>
                </div>
              </dl>

              {/* Estado de datos */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-black/5 dark:border-white/10">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                    isDefaultName || isDefaultCarnet
                      ? 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30'
                      : 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30'
                  }`}
                >
                  <span className="inline-block size-1.5 rounded-full bg-current"></span>
                  {isDefaultName || isDefaultCarnet ? 'Datos pendientes de completar' : 'Datos verificados'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Centro Chiquimulilla</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
