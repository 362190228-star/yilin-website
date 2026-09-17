import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import type { Work } from '../types'
import { Tag } from './decor/Tag'

interface WorkModalProps {
  work: Work | null
  onClose: () => void
  onExitComplete?: () => void
}

function WorkModalContent({ work, onClose }: { work: Work; onClose: () => void }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="work-modal relative texture-paper w-full h-full overflow-y-auto diary-scroll shadow-notebook border border-ink/10"
      onWheel={event => event.stopPropagation()}
      onTouchMove={event => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="关闭"
        className="work-modal__close sticky top-4 float-right mr-4 z-20 h-10 w-10 rounded-full bg-paper shadow-paper text-ink-soft hover:text-ink flex items-center justify-center"
      >
        <span aria-hidden="true" className="text-lg leading-none">
          &#10005;
        </span>
      </button>

      <div className="work-modal__content p-6 sm:p-10 pt-4">
        <p className="font-hand text-xl text-accent-clayDeep mb-1">作品档案</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mb-2">
          {work.title}
        </h2>
        <div className="mb-4">
          <Tag label={work.tag} accent={work.accent} />
        </div>

        <p className="text-sm sm:text-[15px] leading-8 text-ink-soft mb-8">{work.detail}</p>
        <div className="work-modal__images">
          {work.images.map((img, index) => (
            <figure key={`${img.src}-${index}`} className="work-modal__figure">
              <img
                src={img.src}
                alt={img.alt}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function WorkModal({ work, onClose, onExitComplete }: WorkModalProps) {
  useEffect(() => {
    if (!work) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [work, onClose])

  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {work && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="关闭弹窗"
            onClick={onClose}
            className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] cursor-default"
          />

          <WorkModalContent key={work.id} work={work} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>, document.body
  )
}
