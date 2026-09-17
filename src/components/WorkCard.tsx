import { motion } from 'framer-motion'
import type { Work } from '../types'
import { Tape } from './decor/Tape'

const annotations: Partial<Record<Work['id'], string>> = {
  'autoglm-mobile': '第一次和 Agent 打交道',
  'aigc-platform': '在无限画布里折腾了很久',
  'jd-ai-kit': '设计 × Codex 的一次实验',
}

interface WorkCardProps {
  work: Work
  rotate: number
  showTape?: boolean
  onOpen: () => void
}

export function WorkCard({ work, rotate, showTape = false, onOpen }: WorkCardProps) {
  const annotation = annotations[work.id]
  const arrowFirst = work.id === 'autoglm-mobile' || work.id === 'jd-ai-kit'

  const annotationArrow = <svg viewBox="0 0 54 24">
    <path d={arrowFirst
      ? 'M52 5C38 2 24 6 10 15M17 9l-8 6 9 3'
      : 'M2 5c14-3 28 1 42 10M37 9l8 6-9 3'} />
  </svg>

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`polaroid work-card work-card--${work.id} group relative block text-left cursor-pointer`}
      style={{ transform: `rotate(${rotate}deg)` }}
      whileHover={{ y: -5, rotate: rotate > 0 ? -0.7 : 0.7, boxShadow: '8px 12px 24px rgba(51,44,34,.20)', transition: { duration: 0.24 } }}
      whileTap={{ scale: 0.98 }}
    >
      {showTape && <Tape color={work.accent === 'clay' ? 'clay' : 'sky'} rotate={rotate > 0 ? -8 : 8} className="-top-3 left-1/2 -translate-x-1/2" />}
      {annotation && <span className="work-card__annotation" aria-hidden="true">
        {arrowFirst && annotationArrow}
        <span>{annotation}</span>
        {!arrowFirst && annotationArrow}
      </span>}
      <div className="work-card__image w-full overflow-hidden bg-paper-line">
        <img
          src={work.cover}
          alt={work.title}
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>
      <div className="work-card__copy pt-3 px-1">
        <p className="text-xs text-ink-faint font-mono mb-1">{work.tag}</p>
        <h3 className="font-serif text-sm sm:text-base font-medium text-ink leading-snug">
          {work.title}
        </h3>
      </div>
    </motion.button>
  )
}
