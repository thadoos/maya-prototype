import { useLayoutEffect, useRef } from 'react'
import { Mascot, useMascotState } from '../../components/Mascot'
import { STARTERS } from '../../data/chat'
import { greet } from '../../data/copy'
import { Icon } from '../../icons'
import { useNm, useStore } from '../../store'
import type { TopicId } from '../../types'
import type { IntroRects } from './types'

const EASE = 'cubic-bezier(.2,.8,.2,1)'

/** Four starter ideas: the user's topics first, topped up from the rest. */
function starterKeys(topics: readonly TopicId[]): TopicId[] {
  const keys = topics.slice(0, 4)
  for (const k of Object.keys(STARTERS) as TopicId[]) {
    if (keys.length >= 4) break
    if (!keys.includes(k)) keys.push(k)
  }
  return keys
}

interface GreetMessageProps {
  /** Set only for the message that grows out of the intro; drives the FLIP. */
  introFrom: IntroRects | null
  showSuggest: boolean
  onStart: (k: TopicId) => void
}

export function GreetMessage({ introFrom, showSuggest, onStart }: GreetMessageProps) {
  const { state } = useStore()
  const t = useNm()
  const ref = useRef<HTMLDivElement>(null)
  const [mascotState, flash] = useMascotState(introFrom ? 'wave' : 'idle')

  // Intro: the big mascot shrinks into this message's mascot, the heading becomes the bubble,
  // and the suggestions rise in one after another.
  useLayoutEffect(() => {
    const g = ref.current
    if (!introFrom || !g) return
    const m = g.querySelector('.mascot')
    const b = g.querySelector('.bubble')
    if (!m || !b) return
    const { mascot: om, heading: oh } = introFrom
    const mr = m.getBoundingClientRect()
    const br = b.getBoundingClientRect()
    const anims: Animation[] = []
    if (mr.width) {
      flash('wave', 1600)
      anims.push(
        m.animate(
          [
            { transformOrigin: '0 0', transform: `translate(${om.left - mr.left}px,${om.top - mr.top}px) scale(${om.width / mr.width})` },
            { transformOrigin: '0 0', transform: 'none' },
          ],
          { duration: 800, easing: EASE },
        ),
      )
    }
    anims.push(
      b.animate(
        [
          { opacity: 0, transform: `translate(${oh.left - br.left}px,${oh.top - br.top}px) scale(1.15)`, transformOrigin: '0 0' },
          { opacity: 1, transform: 'none', transformOrigin: '0 0' },
        ],
        { duration: 700, delay: 120, easing: EASE, fill: 'backwards' },
      ),
    )
    g.querySelectorAll('.suggest .section-label, .suggest .choice').forEach((el, i) =>
      anims.push(
        el.animate(
          [
            { opacity: 0, transform: 'translateY(18px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 450, delay: 750 + i * 100, easing: EASE, fill: 'backwards' },
        ),
      ),
    )
    return () => anims.forEach((a) => a.cancel())
  }, [introFrom, flash])

  return (
    <div className="msg maya greet-msg" ref={ref}>
      <Mascot state={mascotState} />
      <div className="msg-col">
        <div className="bubble">
          <p>
            {greet()}, {state.name}. {t('What’s on your mind?')}
          </p>
          <span className="t">{t(`Maya · ${state.greetTime}`)}</span>
        </div>
        {showSuggest && (
          <div className="suggest">
            <p className="section-label">A few ideas to start with</p>
            <div className="starter-grid">
              {starterKeys(state.topics).map((k) => (
                <button key={k} className="choice" onClick={() => onStart(k)}>
                  <span className="ic">
                    <Icon name={STARTERS[k][1]} />
                  </span>
                  <span>
                    <b>{STARTERS[k][0]}</b>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
