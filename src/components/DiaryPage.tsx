import type { ReactNode } from 'react'

interface DiaryPageProps {
  children: ReactNode
  side: 'left' | 'right' | 'single'
}

export function DiaryPage({ children, side }: DiaryPageProps) {
  const roundedClass =
    side === 'left' ? 'rounded-l-sm' : side === 'right' ? 'rounded-r-sm' : 'rounded-sm'

  return (
    <div
      className={`texture-paper relative h-full w-full ${roundedClass} shadow-paper border border-ink/5 diary-page-padding overflow-hidden`}
    >
      {children}
    </div>
  )
}
