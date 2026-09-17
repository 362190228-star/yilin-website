import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { hobbies } from '../../data/hobbies'

export function HobbyPage({ activeId, onSelect, compact = false }: { activeId: string; onSelect: (id: string) => void; compact?: boolean }) {
  const active = hobbies.find(item => item.id === activeId)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null || !active) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowLeft') setLightboxIndex(index => index === null ? null : (index - 1 + active.images.length) % active.images.length)
      if (event.key === 'ArrowRight') setLightboxIndex(index => index === null ? null : (index + 1) % active.images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active, lightboxIndex])

  const lightbox = active && lightboxIndex !== null ? createPortal(
    <AnimatePresence>
      <motion.div className="hobby-lightbox" role="dialog" aria-modal="true" aria-label={`${active.title}大图预览`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxIndex(null)}>
        <button type="button" className="hobby-lightbox__close" aria-label="关闭大图" onClick={() => setLightboxIndex(null)}>×</button>
        <button type="button" className="hobby-lightbox__nav hobby-lightbox__nav--prev" aria-label="上一张"
          onClick={event => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + active.images.length) % active.images.length) }}>‹</button>
        <motion.img key={`${active.id}-${lightboxIndex}`} src={active.images[lightboxIndex]} alt={`${active.title}照片 ${lightboxIndex + 1}`}
          initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .2 }} onClick={event => event.stopPropagation()} />
        <button type="button" className="hobby-lightbox__nav hobby-lightbox__nav--next" aria-label="下一张"
          onClick={event => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % active.images.length) }}>›</button>
        <span className="hobby-lightbox__count">{lightboxIndex + 1} / {active.images.length}</span>
      </motion.div>
    </AnimatePresence>, document.body) : null

  return (
    <div className="h-full flex flex-col min-h-0">
      {compact && <div className="flex gap-2 overflow-x-auto pb-3 mb-3 shrink-0">
        {hobbies.map(item => <button key={item.id} type="button" onClick={() => onSelect(item.id)} aria-pressed={activeId === item.id}
          className="px-3 py-2 bg-paper-soft text-xs whitespace-nowrap border border-ink/10 aria-pressed:bg-accent-sky">{item.title}</button>)}
      </div>}
      {active ? <div className="hobby-gallery diary-scroll overflow-y-auto" onWheel={event => event.stopPropagation()}>
        <div className="hobby-gallery__heading">
          <p className="font-hand text-3xl text-accent-clayDeep">{active.title}</p>
          <p className="text-sm leading-7 text-ink-soft mt-2">{active.note}</p>
        </div>
        <motion.div key={active.id} className={`hobby-gallery__grid${active.id === 'food' ? ' hobby-gallery__grid--food' : ''}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>
          {active.images.map((src, index) => (
            <button type="button" key={`${active.id}-${index}`} className="hobby-gallery__photo" onClick={() => setLightboxIndex(index)} aria-label={`查看${active.title}照片 ${index + 1} 大图`}>
              <img src={src} alt={`${active.title}照片 ${index + 1}`} loading="lazy" />
              {active.locations?.[index] && <span className="hobby-gallery__caption">{active.locations[index]}</span>}
            </button>
          ))}
        </motion.div>
      </div> : <div className="flex-1" aria-label="选择左侧贴纸后显示兴趣内容" />}
      {lightbox}
    </div>
  )
}
