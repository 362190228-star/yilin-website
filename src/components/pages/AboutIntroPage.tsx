import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { PageIntro } from './PageIntro'
import { Tape } from '../decor/Tape'
import { asset } from '../../utils/asset'

export function AboutIntroPage() {
  const photos = [
    { src: asset('assets/about/profile.jpg'), alt: '蔡艺琳的个人照片，餐桌前的半身照' },
    { src: asset('assets/about/profile-closeup.webp'), alt: '蔡艺琳的个人照片，近景肖像' },
  ]
  const photoRef = useRef<HTMLDivElement>(null)
  const [photoBounds, setPhotoBounds] = useState({ width: 0, height: 0 })
  const [photosSpread, setPhotosSpread] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowLeft') setLightboxIndex(index => index === null ? null : (index - 1 + photos.length) % photos.length)
      if (event.key === 'ArrowRight') setLightboxIndex(index => index === null ? null : (index + 1) % photos.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, photos.length])

  useLayoutEffect(() => {
    const photo = photoRef.current
    const page = photo?.closest<HTMLElement>('.diary-page-padding')
    const heading = photo?.parentElement?.querySelector<HTMLElement>('h1')
    if (!photo || !page || !heading) return

    const measure = () => {
      const pageRect = page.getBoundingClientRect()
      const headingRect = heading.getBoundingClientRect()
      const styles = getComputedStyle(page)
      const sideSpace = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
      const bottomSpace = parseFloat(styles.paddingBottom)
      // Allow for the photo frame, its small rotation, and a visible gap from the paper edge.
      setPhotoBounds({
        width: Math.max(0, pageRect.width - sideSpace - 28),
        height: Math.max(0, pageRect.bottom - headingRect.bottom - bottomSpace - 16 - 20 - 20),
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(page)
    observer.observe(heading)
    return () => observer.disconnect()
  }, [])

  const cardWidth = photoBounds.width && photoBounds.height
    ? Math.max(84, Math.min(photoBounds.width * 0.64, (photoBounds.height - 26) * (3 / 4) - 18))
    : undefined

  return (
    <PageIntro
      index="01"
      title="关于我"
      subtitle="About Me"
      className="about-intro"
    >
      <div
        ref={photoRef}
        className={`about-photo-stack${photosSpread ? ' is-spread' : ''}`}
        tabIndex={0}
        onMouseEnter={() => setPhotosSpread(true)}
        onFocus={() => setPhotosSpread(true)}
        style={{ width: photoBounds.width || undefined, height: photoBounds.height || undefined }}>
        <button type="button" className="about-photo-card about-photo-card--back" style={{ width: cardWidth }} onClick={() => setLightboxIndex(0)} aria-label="查看个人照片 1 大图">
          <div className="about-photo-card__frame">
            <img src={photos[0].src} alt={photos[0].alt} />
          </div>
        </button>
        <button type="button" className="about-photo-card about-photo-card--front" style={{ width: cardWidth }} onClick={() => setLightboxIndex(1)} aria-label="查看个人照片 2 大图">
          <Tape color="sky" rotate={-5} className="-top-3 left-1/2 -translate-x-1/2" />
          <div className="about-photo-card__frame">
            <img src={photos[1].src} alt={photos[1].alt} />
          </div>
        </button>
      </div>
      {lightboxIndex !== null && createPortal(<AnimatePresence>
        <motion.div className="hobby-lightbox" role="dialog" aria-modal="true" aria-label="个人照片大图预览"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxIndex(null)}>
          <button type="button" className="hobby-lightbox__close" aria-label="关闭大图" onClick={() => setLightboxIndex(null)}>×</button>
          <button type="button" className="hobby-lightbox__nav hobby-lightbox__nav--prev" aria-label="上一张"
            onClick={event => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length) }}>‹</button>
          <motion.img key={lightboxIndex} src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt}
            initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .2 }} onClick={event => event.stopPropagation()} />
          <button type="button" className="hobby-lightbox__nav hobby-lightbox__nav--next" aria-label="下一张"
            onClick={event => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % photos.length) }}>›</button>
          <span className="hobby-lightbox__count">{lightboxIndex + 1} / {photos.length}</span>
        </motion.div>
      </AnimatePresence>, document.body)}
    </PageIntro>
  )
}
