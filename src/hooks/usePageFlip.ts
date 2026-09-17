import { useCallback, useEffect, useRef, useState } from 'react'

export interface PageTurn { from: number; to: number; direction: 1 | -1 }
export function usePageFlip({ pageCount, enabled = true, onBeforeFirst, onAfterLast }: {
  pageCount: number; enabled?: boolean; onBeforeFirst?: () => void; onAfterLast?: () => void
}) {
  const [currentPage, setCurrentPage] = useState(0)
  const [turn, setTurn] = useState<PageTurn | null>(null)
  const pending = useRef<PageTurn | null>(null)
  const goTo = useCallback((index: number) => {
    if (!enabled || pending.current || !Number.isInteger(index) || index < 0 || index >= pageCount || index === currentPage) return
    const nextTurn: PageTurn = { from: currentPage, to: index, direction: index > currentPage ? 1 : -1 }
    pending.current = nextTurn // synchronous guard, including clicks within the same frame
    setTurn(nextTurn)
  }, [currentPage, enabled, pageCount])
  const completeTurn = useCallback(() => {
    if (!pending.current) return
    setCurrentPage(pending.current.to)
    pending.current = null
    setTurn(null)
  }, [])
  const next = useCallback(() => {
    if (!enabled || pending.current) return
    if (currentPage === pageCount - 1) onAfterLast?.()
    else goTo(currentPage + 1)
  }, [currentPage, enabled, goTo, onAfterLast, pageCount])
  const prev = useCallback(() => {
    if (!enabled || pending.current) return
    if (currentPage === 0) onBeforeFirst?.()
    else goTo(currentPage - 1)
  }, [currentPage, enabled, goTo, onBeforeFirst])
  useEffect(() => {
    if (!enabled) return
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || target.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      if (event.repeat) return
      if (event.key === 'ArrowRight') next()
      else prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [enabled, next, prev])
  // Wheel events deliberately have no page-turn handler; they remain native scrolling.
  return { currentPage, turn, completeTurn, goTo, next, prev, isAnimating: turn !== null,
    canGoNext: currentPage < pageCount - 1, canGoPrev: currentPage > 0 }
}
