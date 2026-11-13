import { reduced } from '../util'

/** Staggered word-in text (the prototype's words()). Plain text when reduced motion is on. Remount (key) to replay. */
export function Words({ text }: { text: string }) {
  if (reduced) return <>{text}</>
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          {i > 0 && ' '}
          <span className="word" style={{ animationDelay: `${i * 45}ms` }}>
            {w}
          </span>
        </span>
      ))}
    </>
  )
}
