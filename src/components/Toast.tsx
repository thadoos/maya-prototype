import { useStore } from '../store'

export function Toast() {
  const { toastText, toastVisible } = useStore().state
  return (
    <div id="toast" role="status" aria-live="polite" className={toastVisible ? 'show' : ''}>
      {toastText}
    </div>
  )
}
