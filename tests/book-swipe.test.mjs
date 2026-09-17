import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { useBookSwipe } from '../src/hooks/useBookSwipe.ts'

function setup(enabled = true) {
  let handlers
  const turns = []
  function Probe() {
    handlers = useBookSwipe({ enabled, next: () => turns.push('next'), prev: () => turns.push('prev') })
    return null
  }
  renderToString(createElement(Probe))
  const event = (x, y, extra = {}) => ({ pointerId: 1, clientX: x, clientY: y, pointerType: 'touch', isPrimary: true, target: { closest: () => null }, ...extra })
  return { handlers, turns, event }
}

test('deliberate horizontal swipes turn in both directions', () => {
  const { handlers: h, turns, event: e } = setup()
  h.onPointerDown(e(240, 200)); h.onPointerMove(e(100, 208)); h.onPointerUp(e(100, 208))
  h.onPointerDown(e(100, 200)); h.onPointerMove(e(240, 203)); h.onPointerUp(e(240, 203))
  assert.deepEqual(turns, ['next', 'prev'])
})
test('short touches and diagonal movement never turn pages', () => {
  const { handlers: h, turns, event: e } = setup()
  h.onPointerDown(e(200, 200)); h.onPointerUp(e(160, 200))
  h.onPointerDown(e(200, 200)); h.onPointerMove(e(100, 120)); h.onPointerUp(e(100, 120))
  assert.deepEqual(turns, [])
})
test('once vertical reading starts it cannot become a page turn', () => {
  const { handlers: h, turns, event: e } = setup()
  h.onPointerDown(e(200, 200)); h.onPointerMove(e(202, 160)); h.onPointerUp(e(20, 160))
  assert.deepEqual(turns, [])
})
test('modal/animation disabled state blocks gestures', () => {
  const { handlers: h, turns, event: e } = setup(false)
  h.onPointerDown(e(240, 200)); h.onPointerUp(e(80, 200))
  assert.deepEqual(turns, [])
})
test('dialog-origin gestures and pointer cancellations do not turn', () => {
  const { handlers: h, turns, event: e } = setup()
  h.onPointerDown(e(240, 200, { target: { closest: () => ({}) } })); h.onPointerUp(e(60, 200))
  h.onPointerDown(e(240, 200)); h.onPointerCancel(); h.onPointerUp(e(60, 200))
  assert.deepEqual(turns, [])
})
test('swiping suppresses the synthesized click, so cards/edges cannot also activate', () => {
  const { handlers: h, turns, event: e } = setup()
  h.onPointerDown(e(240, 200)); h.onPointerUp(e(80, 200))
  let prevented = false, stopped = false
  h.onClickCapture({ preventDefault: () => { prevented = true }, stopPropagation: () => { stopped = true } })
  assert.deepEqual(turns, ['next']); assert.ok(prevented && stopped)
})
test('a second touch cancels the pending gesture', () => {
  const { handlers: h, turns, event: e } = setup()
  h.onPointerDown(e(240, 200)); h.onPointerDown(e(250, 210, { pointerId: 2, isPrimary: false })); h.onPointerUp(e(60, 200))
  assert.deepEqual(turns, [])
})
test('a slow sub-96px movement is not a deliberate swipe', async () => {
  const { handlers: h, turns, event: e } = setup()
  h.onPointerDown(e(240, 200))
  await new Promise(resolve => setTimeout(resolve, 180))
  h.onPointerUp(e(170, 200))
  assert.deepEqual(turns, [])
})
