import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { hobbies } from '../../data/hobbies'
import { PageNumber } from '../PageNumber'

const hobbyCovers: Record<string, string> = {
  photography: '/assets/hobbies/covers/摄影.png',
  travel: '/assets/hobbies/covers/旅行.png',
  food: '/assets/hobbies/covers/美食.png',
}

export function HobbyIndexPage({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const slots = useRef<Record<string, HTMLDivElement | null>>({})
  const [placements, setPlacements] = useState<Record<string, { x: number; y: number; snapped: boolean }>>({})
  const rotations = [-5, 4, -3]

  const snapToSlot = (id: string, element: HTMLElement, dragOffset = { x: 0, y: 0 }) => {
    const slot = slots.current[id]
    if (!slot) return
    const from = element.getBoundingClientRect()
    const to = slot.getBoundingClientRect()
    const previous = placements[id] ?? { x: 0, y: 0, snapped: false }
    setPlacements(current => ({ ...current, [id]: {
      x: previous.x + dragOffset.x + (to.left + to.width / 2 - from.left - from.width / 2),
      y: previous.y + dragOffset.y + (to.top + to.height / 2 - from.top - from.height / 2),
      snapped: true,
    } }))
    onSelect(id)
  }

  const finishDrag = (id: string, element: HTMLElement, info: PanInfo) => {
    const slot = slots.current[id]
    if (!slot) return
    const bounds = slot.getBoundingClientRect()
    const isCorrect = info.point.x >= bounds.left && info.point.x <= bounds.right
      && info.point.y >= bounds.top && info.point.y <= bounds.bottom
    if (isCorrect) snapToSlot(id, element, info.offset)
    else setPlacements(current => ({ ...current, [id]: { x: 0, y: 0, snapped: false } }))
  }

  const selectOrSnap = (id: string, element: HTMLElement) => {
    if (placements[id]?.snapped) {
      onSelect(id)
      return
    }
    snapToSlot(id, element)
  }

  return (
    <div className="h-full flex flex-col">
      <PageNumber value="05" />
      <h1 className="bilingual-title font-serif text-2xl sm:text-3xl font-semibold text-ink">我的生活 <span>My Life</span></h1>
      <h2 className="font-serif text-xl sm:text-2xl font-medium text-ink mt-3 mb-8">我喜欢的三件事</h2>
      <div className="hobby-index">
        {hobbies.map((hobby, index) => (
          <motion.button key={hobby.id} type="button"
            drag dragMomentum={false} dragElastic={0.12}
            onPointerDown={event => event.stopPropagation()}
            onDragEnd={(event, info) => finishDrag(hobby.id, event.currentTarget as HTMLElement, info)}
            onClick={event => selectOrSnap(hobby.id, event.currentTarget)}
            aria-pressed={activeId === hobby.id}
            className={`hobby-chip hobby-chip--${index + 1}${placements[hobby.id]?.snapped ? ' is-snapped' : ''}`}
            animate={{ x: placements[hobby.id]?.x ?? 0, y: placements[hobby.id]?.y ?? 0, rotate: placements[hobby.id]?.snapped ? 0 : rotations[index], scale: placements[hobby.id]?.snapped ? .56 : 1 }}
            whileHover={{ scale: placements[hobby.id]?.snapped ? .6 : 1.07, rotate: 0, filter: 'drop-shadow(5px 9px 7px rgba(51,44,34,.2))' }}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 8 }}
            transition={{ duration: .26, ease: [0.22, 0.8, 0.3, 1] }}>
            <img src={hobbyCovers[hobby.id]} alt="" />
            <span className="font-hand text-xl">{hobby.title}</span>
          </motion.button>
        ))}
        <div className="hobby-drop-slots" aria-label="兴趣贴纸放置区">
          {hobbies.map(hobby => <div key={hobby.id} ref={node => { slots.current[hobby.id] = node }} className="hobby-drop-slot">
            <span>{hobby.title}</span>
          </div>)}
        </div>
      </div>
      <p className="mt-auto pt-6 text-xs leading-6 text-ink-faint">设计之外，也认真感受生活。</p>
    </div>
  )
}
