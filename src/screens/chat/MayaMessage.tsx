import { Mascot } from '../../components/Mascot'
import { getR } from '../../data/chat'
import { Icon } from '../../icons'
import { useNm } from '../../store'
import type { MayaMsg, ReplyKey } from '../../types'

interface MayaMessageProps {
  m: MayaMsg
  /** Latest Maya reply and not thinking: shows tools and suggested replies. */
  latest: boolean
  onToggleSources: () => void
  onFeedback: (v: 'up' | 'down') => void
  onReply: (text: string, key: ReplyKey) => void
}

export function MayaMessage({ m, latest, onToggleSources, onFeedback, onReply }: MayaMessageProps) {
  const t = useNm()
  const r = getR(m.key)
  return (
    <div className="msg maya">
      <Mascot state={r.mood === 'celebrate' && latest ? 'happy' : 'idle'} />
      <div className="msg-col">
        <div className="bubble">
          {r.parts.map((p, i) => {
            if (p[0] === 'p') return <p key={i}>{t(p[1])}</p>
            if (p[0] === 'ul') {
              return (
                <ul key={i}>
                  {p[1].map((x, j) => (
                    <li key={j}>{t(x)}</li>
                  ))}
                </ul>
              )
            }
            return (
              <div className="breath-card" key={i}>
                <Mascot state="idle" cls="breathe" />
                <div className="breath-label" aria-hidden="true">
                  <span>Breathe in…</span>
                  <span>Breathe out…</span>
                </div>
              </div>
            )
          })}
          <span className="t">{t(`Maya · ${m.time}`)}</span>
        </div>
        {r.sources && m.open && (
          <div className="sources">
            <b>Where this came from</b>
            <ol>
              {r.sources.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        )}
        {latest && (
          <div className="tools">
            {r.sources && (
              <button className="btn btn-soft" aria-expanded={!!m.open} onClick={onToggleSources}>
                <Icon name="book" /> Sources ({r.sources.length})
              </button>
            )}
            <button className="btn btn-soft" aria-pressed={m.fb === 'up'} onClick={() => onFeedback('up')}>
              <Icon name="up" /> Helpful
            </button>
            <button className="btn btn-soft" aria-pressed={m.fb === 'down'} onClick={() => onFeedback('down')}>
              <Icon name="down" /> Not quite
            </button>
          </div>
        )}
        {latest && r.choices && (
          <div className="choices" role="group" aria-label="Suggested replies">
            {r.choices.map(([label, key], j) => (
              <button key={key} className="btn btn-soft" onClick={() => onReply(t(label), key)}>
                <span className="num">{j + 1}</span>
                {t(label)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
