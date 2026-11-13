import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { useStore } from '../store'

const COLS = ['var(--sun)', 'var(--teal)', 'var(--m-cheek)', 'var(--m-leaf)', 'var(--m-body)']

function makePieces(): CSSProperties[] {
  return Array.from({ length: 46 }, (_, i) => ({
    left: Math.random() * 100 + '%',
    background: COLS[i % COLS.length],
    animationDelay: Math.random() * 0.6 + 's',
    animationDuration: 2 + Math.random() * 1.4 + 's',
    borderRadius: i % 3 ? '4px' : '50%',
  }))
}

function Burst({ id }: { id: number }) {
  const { endConfetti } = useStore().actions
  const [pieces] = useState(makePieces)
  useEffect(() => {
    const t = window.setTimeout(() => endConfetti(id), 4200)
    return () => window.clearTimeout(t)
  }, [id, endConfetti])
  return (
    <div className="confetti">
      {pieces.map((style, i) => (
        <i key={i} style={style} />
      ))}
    </div>
  )
}

export function Confetti() {
  const { confetti } = useStore().state
  return (
    <>
      {confetti.map((id) => (
        <Burst key={id} id={id} />
      ))}
    </>
  )
}
