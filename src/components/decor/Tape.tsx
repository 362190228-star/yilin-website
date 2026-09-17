interface TapeProps {
  color?: 'cream' | 'sky' | 'clay'
  className?: string
  rotate?: number
}

const colorClass: Record<NonNullable<TapeProps['color']>, string> = {
  cream: 'tape-cream',
  sky: 'tape-sky',
  clay: 'tape-clay',
}

export function Tape({ color = 'cream', className = '', rotate = 0 }: TapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`tape ${colorClass[color]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  )
}
