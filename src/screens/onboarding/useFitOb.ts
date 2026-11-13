import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'

/* Fit each onboarding step on one screen: shrink the mascot step by step, and on phones, if that is not
   enough, sit it beside its speech bubble instead of above it. Port of the prototype's fitOb(): it measures
   real overflow while stepping through the size lists, so it mutates --ms and the compact / tight /
   pick-compact classes directly on the DOM (those nodes never get a className re-render within a step). */
function fitOb(sc: HTMLElement): void {
  const body = sc.querySelector<HTMLElement>('.ob-body')
  if (!body) return
  const m = sc.querySelector<HTMLElement>('.ob-mascot .mascot')
  const mobile = matchMedia('(max-width:860px)').matches
  const over = () => sc.scrollHeight > sc.clientHeight + 1

  if (!m) {
    // companion picker: shrink the two mascots, then put the cards side by side with less text
    const grid = sc.querySelector<HTMLElement>('.ob-actions .choice-grid')
    const ms = Array.from(sc.querySelectorAll<HTMLElement>('.style-card .mascot'))
    if (!grid || !ms.length) return
    const setAll = (px: number) => ms.forEach((x) => x.style.setProperty('--ms', px + 'px'))
    grid.classList.remove('pick-compact')
    for (const px of [130, 105, 85]) {
      setAll(px)
      if (!over()) return
    }
    grid.classList.add('pick-compact')
    for (const px of [90, 72, 58]) {
      setAll(px)
      if (!over()) return
    }
    return
  }

  const set = (px: number) => m.style.setProperty('--ms', px + 'px')
  const ob = body.closest<HTMLElement>('.ob')
  body.classList.remove('compact')
  ob?.classList.remove('tight')
  if (mobile && body.closest('.help-step')) {
    // keep the mascot small and fixed; the list scrolls under it
    body.classList.add('compact')
    set(96)
    return
  }
  for (const px of mobile ? [170, 140, 115] : [300, 250, 210, 175, 150]) {
    set(px)
    if (!over()) return
  }
  if (!mobile) return
  body.classList.add('compact')
  for (const px of [110, 92, 76, 64, 52]) {
    set(px)
    if (!over()) return
  }
  ob?.classList.add('tight') // last resort: option cards drop their second line
}

/** Runs fitOb after the step mounts and again (debounced 150ms) whenever the screen is resized. */
export function useFitOb(screenRef: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const sc = screenRef.current
    if (!sc) return
    fitOb(sc)
    let timer = 0
    let first = true
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false
        return
      }
      window.clearTimeout(timer)
      timer = window.setTimeout(() => fitOb(sc), 150)
    })
    ro.observe(sc)
    return () => {
      window.clearTimeout(timer)
      ro.disconnect()
    }
  }, [screenRef])
}
