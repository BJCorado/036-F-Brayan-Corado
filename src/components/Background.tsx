type Props = { className?: string }

/**
 * Fondo azul oscuro con degradé
 */
export default function Background({ className = '' }: Props) {
  return (
    <div
      aria-hidden
      className={[
        'pointer-events-none fixed inset-0 z-0',
        // Degradé radial (navy profundo)
        'bg-[radial-gradient(90rem_70rem_at_50%_-20%,#0b1220_0%,#0a1630_55%,#071022_100%)]',
        className,
      ].join(' ')}
    />
  )
}
