import { useCallback, useEffect, useState } from 'react'
import { works } from '../../data/works'
import { WorkCard } from '../WorkCard'
import { WorkModal } from '../WorkModal'
import { PageNumber } from '../PageNumber'

const rotations = [-2, 2, -1.5, 1.5, -2.5, 2.5]
const leftWorkIds = ['autoglm-mobile', 'aigc-platform']
const rightWorkIds = ['jd-ai-kit', 'ziru-home-search', 'yinlang', 'app-performance-monitoring']

interface WorksPageProps {
  onModalStateChange?: (isOpen: boolean) => void
  section?: 'left' | 'right' | 'all'
}

export function WorksPage({ onModalStateChange, section = 'all' }: WorksPageProps) {
  const [activeWork, setActiveWork] = useState<(typeof works)[number] | null>(null)

  useEffect(() => () => onModalStateChange?.(false), [onModalStateChange])
  const close = useCallback(() => setActiveWork(null), [])
  const closed = useCallback(() => onModalStateChange?.(false), [onModalStateChange])

  const byIds = (ids: string[]) => ids.map(id => works.find(work => work.id === id)).filter((work): work is (typeof works)[number] => Boolean(work))
  const visibleWorks = section === 'left' ? byIds(leftWorkIds) : section === 'right' ? byIds(rightWorkIds) : works
  return (
    <div className="h-full flex flex-col">
      {(section === 'left' || section === 'all') && <header className="works-heading">
        <PageNumber value="03" />
        <h1 className="bilingual-title font-serif text-2xl sm:text-3xl font-semibold text-ink">个人作品 <span>Personal Project</span></h1>
      </header>}
      <div className="works-canvas diary-scroll flex-1 min-h-0 overflow-auto">
        <div className={`works-collage works-collage--${section}`}>
          {visibleWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              rotate={rotations[(works.indexOf(work)) % rotations.length]}
              showTape={works.indexOf(work) === 0}
              onOpen={() => { onModalStateChange?.(true); setActiveWork(work) }}
            />
          ))}
        </div>
      </div>

      <WorkModal work={activeWork} onClose={close} onExitComplete={closed} />
    </div>
  )
}
