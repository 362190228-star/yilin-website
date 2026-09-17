import { useLayoutEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { PageTurn } from '../hooks/usePageFlip'
import { Spine } from './decor/Spine'

const STRIPS = 12
interface Props {
  desktop: boolean
  turn: PageTurn | null
  onComplete: () => void
  renderLeft: (index: number) => ReactNode
  renderRight: (index: number, visual?: boolean) => ReactNode
  currentPage: number
  blocked: boolean
}

/** Twelve hinged paper strips share one 860ms clock. The clones are visual only:
 * no duplicate React effects, focus targets, or interactive project cards. */
function PaperStrip({ index = 0 }: { index?: number }) {
  return <div className="paper-strip" style={{ '--strip-index': index } as CSSProperties}>
    <div className="strip-face strip-front"><div className="strip-content" data-front={index} /></div>
    <div className="strip-face strip-back"><div className="strip-content" data-back={index} /></div>
    {index < STRIPS - 1 && <PaperStrip index={index + 1} />}
  </div>
}

export function NotebookLayout({ desktop, turn, onComplete, renderLeft, renderRight, currentPage, blocked }: Props) {
  const source = useRef<HTMLDivElement>(null)
  const destination = useRef<HTMLDivElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!turn || !source.current || !destination.current || !sheet.current) return
    const forward = turn.direction > 0
    const front = source.current.querySelector(desktop ? (forward ? '.spread-right' : '.spread-left') : '.spread-single')!
    const back = destination.current.querySelector(desktop ? (forward ? '.spread-left' : '.spread-right') : '.spread-single')!
    const copy = (original: Element, target: Element) => {
      const clone = original.firstElementChild!.cloneNode(true) as HTMLElement
      clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'))
      target.replaceChildren(clone)
      const scrolls = original.querySelectorAll('.diary-scroll')
      clone.querySelectorAll('.diary-scroll').forEach((node, i) => { node.scrollTop = scrolls[i]?.scrollTop ?? 0 })
    }
    sheet.current.querySelectorAll('[data-front]').forEach(node => copy(front, node))
    sheet.current.querySelectorAll('[data-back]').forEach(node => copy(back, node))
  }, [turn, desktop])
  const spread = (index: number, visual: boolean) => desktop ? <>
    <div className="spread-left">{renderLeft(index)}</div>
    <div className="spread-right">{renderRight(index, visual)}</div>
  </> : <div className="spread-single">{renderRight(index, visual)}</div>

  return <div id="notebook-pages" className={`book-scene ${desktop ? 'book-desktop' : 'book-mobile'} ${turn ? `is-turning turn-${turn.direction > 0 ? 'next' : 'prev'}` : ''}`}
    aria-busy={!!turn}>
    {turn && <div ref={destination} className="book-spread book-destination" aria-hidden="true" inert>
      {spread(turn.to, true)}
    </div>}
    <div ref={source} className="book-spread book-source" inert={!!turn || blocked}>
      {spread(currentPage, false)}
    </div>
    {desktop && <div className="book-spine" aria-hidden="true"><Spine /></div>}
    {turn && <div key={`${turn.from}-${turn.to}`} className="turn-visual" aria-hidden="true" inert>
      <div className="turn-cast-shadow" />
      <div ref={sheet} className="turn-sheet" onAnimationEnd={event => {
        if (event.target === event.currentTarget) onComplete()
      }}>
        <PaperStrip />
      </div>
    </div>}
  </div>
}
