import { Link } from 'react-router-dom'

const NAME = import.meta.env.VITE_STUDENT_NAME ?? 'Nombre del Estudiante'
const CARNET = import.meta.env.VITE_STUDENT_ID ?? '0000-00-00000'

const stack = [
  {
    name: 'React + Vite',
    desc: 'UI moderna con desarrollo rápido.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="2.5"/><path d="M12 3.5c-2.9 0-5.5.8-7.1 2.1C3.2 6.2 3 7.3 3 8.5s.2 2.3 1.9 3.4C6.5 13.3 9.1 14 12 14s5.5-.7 7.1-2.1c1.7-1.1 1.9-2.2 1.9-3.4s-.2-2.3-1.9-3.4C17.5 4.3 14.9 3.5 12 3.5Z"/></svg>
    )
  },
  {
    name: 'TypeScript',
    desc: 'Mayor robustez y mantenibilidad.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z"/><path d="M9 9h6M12 9v6"/></svg>
    )
  },
  {
    name: 'Tailwind CSS',
    desc: 'Utilidades para diseño responsive.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12c2-4 5-6 9-6s7 2 9 6-5 6-9 6-7-2-9-6Z"/></svg>
    )
  },
  {
    name: 'React Router',
    desc: 'Navegación SPA declarativa.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 6h8M4 12h16M6 18h12"/></svg>
    )
  },
  {
    name: 'Fetch API',
    desc: 'Consumo de endpoints REST/JSON.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M7 12h10M9 17h6"/></svg>
    )
  }
]

const features = [
  'Catálogo con paginación y estados de carga/errores',
  'Detalle en modal accesible',
  'Diseño responsive con dark mode',
  'Componentes con foco visible y atajos ARIA',
]

export default function About() {
  return (
    <main className="relative">
      {/* Animaciones suaves locales */}
      <style>{`
        @keyframes soft-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim { animation: none !important; }
        }
      `}</style>

      {/* Fondo sutil para mantener legibilidad */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/3 size-[26rem] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-blue-500/30 to-indigo-500/25 dark:opacity-10" />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
        {/* Encabezado */}
        <div className="mb-8 anim animate-[soft-fade-up_520ms_ease-out_both] [animation-delay:60ms]">
          <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/70 backdrop-blur p-6 md:p-8 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Acerca del proyecto</h1>
            <p className="mt-3 max-w-3xl text-gray-800/90 dark:text-gray-200/90">
              Aplicación académica para el <strong className="font-semibold">consumo de APIs</strong> y presentación de datos. Integra navegación SPA, vistas de catálogo con paginación y un cuadro de detalle, priorizando accesibilidad y rendimiento.
            </p>
          </div>
        </div>

        {/* Grid: Tecnologías + Características */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tecnologías */}
          <section className="lg:col-span-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 backdrop-blur p-6 shadow-sm anim animate-[soft-fade-up_540ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:120ms]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tecnologías</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {stack.map((s, i) => (
                <article
                  key={s.name}
                  className="group rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 p-4 hover:shadow-md transition anim animate-[soft-fade-up_460ms_ease-out_both]"
                  style={{ animationDelay: `${160 + i * 40}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg ring-1 ring-black/10 dark:ring-white/10 bg-white/80 dark:bg-neutral-900/60 size-9 text-gray-700 dark:text-gray-200">
                      {s.icon}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{s.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Características */}
          <aside className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 backdrop-blur p-6 shadow-sm anim animate-[soft-fade-up_560ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:160ms]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Características</h2>
            <ul className="mt-4 space-y-3">
              {features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300 anim animate-[soft-fade-up_440ms_ease-out_both]"
                  style={{ animationDelay: `${220 + i * 35}ms` }}
                >
                  <span className="mt-0.5 inline-flex items-center justify-center rounded-full size-5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-400/30">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/consumo" className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow ring-1 ring-black/10 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
                Ir al catálogo
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M13.5 4.5h6v6M20.25 3.75h-6a.75.75 0 0 0 0 1.5h3.69L11.47 11.72a.75.75 0 1 0 1.06 1.06l6.47-6.47v3.69a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-.75-.75Z"/></svg>
              </Link>
            </div>
          </aside>
        </div>

        {/* Identificación */}
        <section className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 backdrop-blur p-6 shadow-sm anim animate-[soft-fade-up_580ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:200ms]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Identificación</h2>
          <dl className="mt-3 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Universidad', value: 'Universidad Mariano Gálvez de Guatemala' },
              { label: 'Estudiante', value: NAME },
              { label: 'Carnet', value: CARNET },
            ].map((it, i) => (
              <div
                key={it.label}
                className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 p-4 anim animate-[soft-fade-up_440ms_ease-out_both]"
                style={{ animationDelay: `${240 + i * 40}ms` }}
              >
                <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{it.label}</dt>
                <dd className="mt-1 font-medium text-gray-900 dark:text-gray-100">{it.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </section>
    </main>
  )
}
