import { SPEEDS } from '../data/onboarding'
import { useStore } from '../store'

/** The three selection-speed buttons. Wrap in <div className="seg" ...> yourself (onboarding and Settings differ). */
export function SpeedButtons() {
  const { dwellMs } = useStore().state
  const { setDwellMs } = useStore().actions
  return (
    <>
      {SPEEDS.map(([label, ms]) => (
        <button
          key={ms}
          className="btn btn-soft"
          data-speed={ms}
          aria-pressed={dwellMs === ms}
          onClick={() => setDwellMs(ms)}
        >
          {label}
        </button>
      ))}
    </>
  )
}
