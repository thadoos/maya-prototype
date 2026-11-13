import { useEffect, useRef } from 'react'
import { useStore } from '../store'

/** Overlay host (.scrim#ovl). Click on the backdrop or any [data-close] element closes; first button gets focus. */
export function Overlay() {
  const { overlay } = useStore().state
  const { closeOverlay } = useStore().actions
  const ref = useRef<HTMLDivElement>(null)
  const open = overlay !== null
  useEffect(() => {
    if (open) ref.current?.querySelector('button')?.focus()
  }, [open])
  if (!overlay) return null
  return (
    <div
      ref={ref}
      id="ovl"
      className={'scrim ' + (overlay.cls ?? '')}
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as Element).closest('[data-close]')) closeOverlay()
      }}
    >
      {overlay.node}
    </div>
  )
}
