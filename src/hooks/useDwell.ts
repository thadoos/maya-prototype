import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useStore } from '../store'

/* Look to select (dwell). Jitter-tolerant: leaving a target briefly pauses progress instead of resetting
   it, so a wobbling gaze point can drift off and back without losing the selection.
   Mount once in App. Toggle with actions.setDwellOn / setDwellMs. */

interface Dwell {
  el: Element | null
  vis: Element | null
  p: number
  away: number
  fired: Element | null
  x: number
  y: number
  gx: number
  gy: number
  last: number
  raf: number
}

const GRACE = 420

function candidate(D: Dwell): Element | null {
  if (D.x < 0) return null
  const t = document.elementFromPoint(D.x, D.y)
  const c = t && t.closest('button:not(:disabled), input, textarea')
  if (!c || c.closest('.proto')) return null
  return c
}

export function useDwell(gazeRef: RefObject<HTMLDivElement | null>) {
  const { dwellOn, dwellMs } = useStore().state
  const msRef = useRef(dwellMs)
  const onRef = useRef(dwellOn)
  const D = useRef<Dwell>({
    el: null, vis: null, p: 0, away: 0, fired: null,
    x: -999, y: -999, gx: -999, gy: -999, last: 0, raf: 0,
  })

  useEffect(() => {
    msRef.current = dwellMs
  }, [dwellMs])

  // Pointer tracking (always attached).
  useEffect(() => {
    const d = D.current
    const onMove = (e: PointerEvent) => {
      d.x = e.clientX
      d.y = e.clientY
      if (onRef.current) gazeRef.current?.classList.add('show')
    }
    const onLeave = () => {
      d.x = d.y = -999
      gazeRef.current?.classList.remove('show')
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [gazeRef])

  // Run / stop the loop.
  useEffect(() => {
    onRef.current = dwellOn
    if (!dwellOn) return
    const d = D.current
    const gaze = gazeRef.current
    document.body.classList.add('dwell')

    const reset = () => {
      if (d.vis) {
        ;(d.vis as HTMLElement).style.removeProperty('--dw')
        d.vis.classList.remove('dw-target')
      }
      d.el = d.vis = null
      d.p = 0
      d.away = 0
    }
    const arm = (c: Element) => {
      d.el = c
      d.vis = c.closest('.field') || c
      d.vis.classList.add('dw-target')
      d.p = 0
      d.away = 0
    }
    const tick = (t: number) => {
      const dt = Math.min(64, t - d.last)
      d.last = t
      // smoothed gaze bubble
      if (d.gx < 0) {
        d.gx = d.x
        d.gy = d.y
      }
      d.gx += (d.x - d.gx) * 0.22
      d.gy += (d.y - d.gy) * 0.22
      if (gaze) gaze.style.transform = `translate(${d.gx}px,${d.gy}px)`
      const c = candidate(d)
      if (d.fired && c !== d.fired) d.fired = null
      if (d.el && !d.el.isConnected) reset()
      if (c && c === d.fired) {
        /* wait for gaze to leave before re-arming */
      } else if (c && c === d.el) {
        d.away = 0
        d.p += dt / msRef.current
      } else if (d.el) {
        d.away += dt
        if (d.away > GRACE) {
          reset()
          if (c) arm(c)
        }
      } else if (c) arm(c)
      if (d.vis) (d.vis as HTMLElement).style.setProperty('--dw', Math.min(1, d.p).toFixed(3))
      if (d.el && d.p >= 1) {
        const el = d.el
        const vis = d.vis
        reset()
        d.fired = el
        if (vis) {
          vis.classList.add('dw-fired')
          window.setTimeout(() => vis.classList.remove('dw-fired'), 400)
        }
        if (el.matches('input, textarea')) (el as HTMLElement).focus()
        else (el as HTMLElement).click()
      }
      d.raf = requestAnimationFrame(tick)
    }
    d.last = performance.now()
    d.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(d.raf)
      d.raf = 0
      reset()
      document.body.classList.remove('dwell')
      gaze?.classList.remove('show')
    }
  }, [dwellOn, gazeRef])
}
