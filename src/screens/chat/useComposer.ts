import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { flushSync } from 'react-dom'
import { reduced } from '../../util'

export interface ComposerApi {
  mainRef: RefObject<HTMLDivElement | null>
  threadRef: RefObject<HTMLDivElement | null>
  rowRef: RefObject<HTMLDivElement | null>
  openBtnRef: RefObject<HTMLButtonElement | null>
  formRef: RefObject<HTMLFormElement | null>
  micRef: RefObject<HTMLButtonElement | null>
  taRef: RefObject<HTMLTextAreaElement | null>
  /** The folded button says "Continue your message" when a draft is waiting. */
  continueLabel: boolean
  openComposer: (focus: boolean) => void
  /** Fold on blur (deferred a tick so a click on Send / mic does not fold it). */
  onBlur: () => void
  resize: () => void
}

const EASE = 'cubic-bezier(.2,.8,.2,1)'
const DUR = 380

const box = (r: DOMRect): Keyframe => ({
  left: r.left + 'px',
  top: r.top + 'px',
  width: r.width + 'px',
  height: r.height + 'px',
})

/**
 * Open/close morph of the composer: a plain ghost card glides from the "Type to Maya" button to the
 * text box (or back) while the real content cross-fades in, the mic slides between its corner and its
 * place beside the box, and the thread scroll is tweened so what sat above the box stays anchored.
 * `open` and `composing` are toggled on the DOM directly (the measurements need them synchronously);
 * React never re-sets those class names because the className props are constant.
 */
export function useComposer(listening: boolean): ComposerApi {
  const mainRef = useRef<HTMLDivElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const openBtnRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const micRef = useRef<HTMLButtonElement>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const [continueLabel, setContinueLabel] = useState(false)

  const listeningRef = useRef(listening)
  useLayoutEffect(() => {
    listeningRef.current = listening
  }, [listening])

  const anims = useRef(new Set<Animation>())
  const ghosts = useRef(new Set<HTMLElement>())
  const raf = useRef(0)
  const blurTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const a = anims.current
    const g = ghosts.current
    return () => {
      window.clearTimeout(blurTimer.current)
      cancelAnimationFrame(raf.current)
      a.forEach((x) => x.cancel())
      a.clear()
      g.forEach((x) => x.remove())
      g.clear()
    }
  }, [])

  const track = useCallback((a: Animation) => {
    anims.current.add(a)
    a.addEventListener('finish', () => anims.current.delete(a))
    a.addEventListener('cancel', () => anims.current.delete(a))
  }, [])

  const tweenScroll = useCallback((el: HTMLElement, dy: number, dur: number, done: () => void) => {
    cancelAnimationFrame(raf.current)
    const y0 = el.scrollTop
    const t0 = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    if (!dy || !dur) {
      el.scrollTop = y0 + dy
      done()
      return
    }
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur)
      el.scrollTop = y0 + dy * ease(t)
      if (t < 1) raf.current = requestAnimationFrame(step)
      else done()
    }
    raf.current = requestAnimationFrame(step)
  }, [])

  const morph = useCallback(
    (open: boolean) => {
      const row = rowRef.current
      const openBtn = openBtnRef.current
      const form = formRef.current
      const mic = micRef.current
      const main = mainRef.current
      const th = threadRef.current
      if (!row || !openBtn || !form || !mic || !main || !th) return
      const from = (open ? openBtn : form).getBoundingClientRect()
      const micA = mic.getBoundingClientRect()
      const pb = () => parseFloat(getComputedStyle(th).paddingBottom)
      // Keep the thread anchored to the box: whatever sat just above the bottom edge moves up (or down) with it.
      const p0 = pb()
      main.classList.toggle('composing', open)
      const dy = pb() - p0
      if (!open) main.classList.add('composing') // keep the room until the scroll has moved back down
      row.classList.toggle('open', open)
      tweenScroll(th, dy, reduced ? 0 : DUR, () => {
        if (!open && !row.classList.contains('open')) main.classList.remove('composing')
      })
      if (reduced || typeof Element.prototype.animate !== 'function') return
      const target = open ? form : openBtn
      const to = target.getBoundingClientRect()
      const micB = mic.getBoundingClientRect()
      const g = document.createElement('div')
      g.className = 'morph'
      document.body.appendChild(g)
      ghosts.current.add(g)
      const ghost = g.animate(
        [
          { ...box(from), opacity: 1 },
          { ...box(to), opacity: 1, offset: 0.75 },
          { ...box(to), opacity: 0 },
        ],
        { duration: DUR + 140, easing: EASE, fill: 'forwards' },
      )
      ghost.onfinish = () => {
        g.remove()
        ghosts.current.delete(g)
      }
      track(ghost)
      track(
        target.animate([{ opacity: 0 }, { opacity: 0, offset: 0.55 }, { opacity: 1 }], {
          duration: DUR + 140,
          easing: 'ease-out',
        }),
      )
      if (micB.width) {
        track(
          mic.animate(
            [
              {
                transformOrigin: '0 0',
                transform: `translate(${micA.left - micB.left}px,${micA.top - micB.top}px) scale(${micA.width / micB.width},${micA.height / micB.height})`,
              },
              { transformOrigin: '0 0', transform: 'none' },
            ],
            { duration: DUR, easing: EASE },
          ),
        )
      }
    },
    [track, tweenScroll],
  )

  const openComposer = useCallback(
    (focus: boolean) => {
      const row = rowRef.current
      if (!row) return
      if (!row.classList.contains('open')) morph(true)
      if (focus) taRef.current?.focus()
    },
    [morph],
  )

  // The text box only stays open while it has focus; otherwise it folds into a single "Type to Maya" button.
  const onBlur = useCallback(() => {
    window.clearTimeout(blurTimer.current)
    blurTimer.current = window.setTimeout(() => {
      const ta = taRef.current
      const row = rowRef.current
      if (!ta || !row) return
      if (document.activeElement !== ta && !listeningRef.current && row.isConnected && row.classList.contains('open')) {
        flushSync(() => setContinueLabel(ta.value.trim() !== ''))
        morph(false)
      }
    }, 0)
  }, [morph])

  const resize = useCallback(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px'
  }, [])

  return { mainRef, threadRef, rowRef, openBtnRef, formRef, micRef, taRef, continueLabel, openComposer, onBlur, resize }
}
