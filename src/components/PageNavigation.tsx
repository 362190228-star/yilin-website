import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'

interface Props {
  canNext: boolean; disabled: boolean
  onPrev: () => void; onNext: () => void
}

function PaperEdge({ side, onTurn, disabled, hint }: {
  side: 'left' | 'right'; onTurn: () => void; disabled: boolean; hint: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [position, setPosition] = useState({ y: 100, lift: 0 })
  const track = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' || disabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
    setPosition({ y: ratio * 100, lift: (ratio - 0.5) * 6 })
    setHovered(true)
  }
  const active = !disabled && (hovered || focused || hint)
  return <button type="button" className={`paper-edge paper-edge--${side}`}
    aria-label={side === 'right' ? '翻到下一页' : '返回上一页'}
    aria-keyshortcuts={side === 'right' ? 'ArrowRight' : 'ArrowLeft'}
    aria-controls="notebook-pages" disabled={disabled}
    data-lifted={active} onClick={onTurn}
    onPointerEnter={track} onPointerMove={track} onPointerLeave={() => setHovered(false)}
    onFocus={(event) => setFocused(event.currentTarget.matches(':focus-visible'))} onBlur={() => setFocused(false)}
    style={{ '--curl-y': `${hovered ? position.y : 100}%`, '--curl-shift': `${position.lift}px` } as CSSProperties}>
    <span className="paper-curl" aria-hidden="true"><span className="paper-curl-back" /></span>
  </button>
}

export function PageNavigation({ canNext, disabled, onPrev, onNext }: Props) {
  const [hint, setHint] = useState(false)
  const demonstrated = useRef(false)
  useEffect(() => {
    if (demonstrated.current || disabled || !canNext || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = window.setTimeout(() => { demonstrated.current = true; setHint(true) }, 650)
    const end = window.setTimeout(() => setHint(false), 1250)
    return () => { window.clearTimeout(start); window.clearTimeout(end); setHint(false) }
  }, [disabled, canNext])
  return <>
    <PaperEdge side="left" onTurn={onPrev} disabled={disabled} hint={false} />
    <PaperEdge side="right" onTurn={onNext} disabled={disabled} hint={hint} />
  </>
}
