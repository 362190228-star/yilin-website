import { useRef } from 'react'
import type { PointerEvent, MouseEvent } from 'react'

export function useBookSwipe({ enabled, next, prev }: { enabled: boolean; next: () => void; prev: () => void }) {
  const start = useRef<{ id: number; x: number; y: number; time: number; vertical: boolean } | null>(null)
  const suppressClick = useRef(0)
  return {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      if (!enabled || event.pointerType === 'mouse' || !event.isPrimary || (event.target as HTMLElement).closest('[role="dialog"], input, textarea, select')) {
        start.current = null
        return
      }
      start.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), vertical: false }
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const point = start.current
      if (!point || point.id !== event.pointerId) return
      const dx = Math.abs(event.clientX - point.x), dy = Math.abs(event.clientY - point.y)
      if (dy > 12 && dy > dx) point.vertical = true // a reading scroll cannot turn into a swipe later
      if (dx > 12 || dy > 12) suppressClick.current = performance.now() + 500
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      const point = start.current
      start.current = null
      if (!enabled || !point || point.id !== event.pointerId || point.vertical) return
      const dx = event.clientX - point.x, dy = event.clientY - point.y
      const distance = Math.abs(dx), time = Math.max(1, performance.now() - point.time)
      if (distance < 56 || distance < Math.abs(dy) * 1.8 || !(distance >= 96 || distance / time >= 0.45)) return
      suppressClick.current = performance.now() + 500
      if (dx < 0) next()
      else prev()
    },
    onPointerCancel() { start.current = null },
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      if (performance.now() < suppressClick.current) { event.preventDefault(); event.stopPropagation() }
    },
  }
}
