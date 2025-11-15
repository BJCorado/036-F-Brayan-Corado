export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
        <div className="h-10 flex items-center justify-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            © {year} — Todos los derechos reservados • <span className="font-medium text-gray-800 dark:text-gray-200">BJ CORADO</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
