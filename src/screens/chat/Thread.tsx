import { useEffect } from 'react'
import type { RefObject } from 'react'
import { Mascot } from '../../components/Mascot'
import { greet } from '../../data/copy'
import { useNm, useStore } from '../../store'
import type { ReplyKey, TopicId } from '../../types'
import { reduced } from '../../util'
import { GreetMessage } from './GreetMessage'
import { MayaMessage } from './MayaMessage'
import type { IntroRects } from './types'

interface ThreadProps {
  threadRef: RefObject<HTMLDivElement | null>
  heroRef: RefObject<HTMLDivElement | null>
  /** Show the big centred intro greeting. */
  showHero: boolean
  introFrom: IntroRects | null
  onStart: (k: TopicId) => void
  onReply: (text: string, key: ReplyKey) => void
  onToast: (text: string) => void
}

export function Thread({ threadRef, heroRef, showHero, introFrom, onStart, onReply, onToast }: ThreadProps) {
  const { state, actions } = useStore()
  const t = useNm()
  const { msgs, thinking, greeted } = state

  // Follow the conversation: to the bottom once there are messages, otherwise back to the top.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const th = threadRef.current
      th?.scrollTo({ top: msgs.length ? th.scrollHeight : 0, behavior: reduced ? 'auto' : 'smooth' })
    })
    return () => cancelAnimationFrame(id)
  }, [msgs, thinking, greeted, threadRef])

  const lastMaya = msgs.map((m) => m.from).lastIndexOf('maya')
  const update = (i: number, patch: (m: Extract<(typeof msgs)[number], { from: 'maya' }>) => Partial<{ open: boolean; fb: 'up' | 'down' | null }>) =>
    actions.setMsgs((prev) => prev.map((m, j) => (j === i && m.from === 'maya' ? { ...m, ...patch(m) } : m)))

  return (
    <div className="thread gutter" id="thread" ref={threadRef}>
      <div className="thread-inner" id="threadIn">
        {showHero && (
          <div className="welcome intro" ref={heroRef}>
            <Mascot state="wave" size="10rem" />
            <h1>
              {greet()}, {state.name}.<br />
              {t('What’s on your mind?')}
            </h1>
          </div>
        )}
        {greeted && <GreetMessage introFrom={introFrom} showSuggest={msgs.length === 0} onStart={onStart} />}
        {msgs.map((m, i) => {
          if (m.from === 'me') {
            return (
              <div className="msg me" key={i}>
                <div className="bubble">
                  {m.text}
                  <span className="t">{m.time}</span>
                </div>
              </div>
            )
          }
          return (
            <MayaMessage
              key={i}
              m={m}
              latest={i === lastMaya && !thinking}
              onToggleSources={() => update(i, (x) => ({ open: !x.open }))}
              onFeedback={(v) => {
                const next = m.fb === v ? null : v
                update(i, () => ({ fb: next }))
                if (next) {
                  onToast(v === 'up' ? t('Thanks! Maya will remember that helped.') : 'Thanks for telling me. I’ll try to do better.')
                }
              }}
              onReply={onReply}
            />
          )
        })}
        {thinking && (
          <div className="msg maya">
            <Mascot state="think" />
            <div className="msg-col">
              <div className="bubble">
                <div className="typing">
                  <i></i>
                  <i></i>
                  <i></i>
                  <span>{t('Maya is thinking')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="thread-note">{t('Maya shows its sources. Always check medical decisions with your care team.')}</p>
      </div>
    </div>
  )
}
