import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/** True once the scroller has been scrolled past its top (drives the `.faded` top mask). */
export function useFaded(ref: RefObject<HTMLElement | null>): boolean {
  const [faded, setFaded] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setFaded(el.scrollTop > 2)
    el.addEventListener('scroll', update, { passive: true })
    update()
    return () => el.removeEventListener('scroll', update)
  }, [ref])
  return faded
}
