import type { AccentColor } from '../../types'

interface TagProps {
  label: string
  accent?: AccentColor
  className?: string
}

const accentClass: Record<AccentColor, string> = {
  sky: 'bg-accent-sky/30 text-accent-skyDeep border-accent-sky/60',
  clay: 'bg-accent-clay/20 text-accent-clayDeep border-accent-clay/50',
  moss: 'bg-accent-moss/30 text-accent-mossDeep border-accent-moss/60',
  brass: 'bg-accent-brass/20 text-ink-soft border-accent-brass/50',
}

export function Tag({ label, accent = 'sky', className = '' }: TagProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm rounded-sm border ${accentClass[accent]} ${className}`}
    >
      {label}
    </span>
  )
}
