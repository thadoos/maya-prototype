import { useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { FEATURES } from '../../data/onboarding'
import { useStore } from '../../store'
import { reduced } from '../../util'
import { FeatureCard } from './FeatureCard'
import type { StepProps } from './types'
import { useFaded } from './useFaded'

interface HelpStepProps extends Pick<StepProps, 'next' | 'flash'> {
  /** The `.ob-right` column; its bubble, cards and button glide up when a card is revealed. */
  rightRef: RefObject<HTMLElement | null>
}

/* Reveal the next feature in place: the current card dims, everything glides up (FLIP), the new card grows in. */
export function HelpStep({ rightRef, next, flash }: HelpStepProps) {
  const { state, actions } = useStore()
  const { featureShown } = state
  const listRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const before = useRef<Map<Element, number> | null>(null)
  const [revealed, setRevealed] = useState(false)
  const faded = useFaded(listRef)

  const more = () => {
    const right = rightRef.current
    if (!right || featureShown >= FEATURES.length) return
    const els = Array.from(right.querySelectorAll('.bubble-say, .feature, [data-act="more"]'))
    before.current = new Map(els.map((e) => [e, e.getBoundingClientRect().top]))
    setRevealed(true)
    actions.setFeatureShown(featureShown + 1)
    if (featureShown + 1 === FEATURES.length) flash('happy')
  }

  useLayoutEffect(() => {
    const prev = before.current
    const list = listRef.current
    const btn = btnRef.current
    if (!prev || !list || !btn) return
    before.current = null
    const timers: number[] = []
    // If the new card pushed the button below the fold, bring it back into view once the card has settled.
    const delay = reduced ? 0 : 380
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'
    timers.push(window.setTimeout(() => list.scrollTo({ top: list.scrollHeight, behavior }), delay))
    const scroller = btn.closest<HTMLElement>('.screen')
    if (scroller) {
      timers.push(
        window.setTimeout(() => {
          const r = btn.getBoundingClientRect()
          const sr = scroller.getBoundingClientRect()
          if (r.bottom > sr.bottom - 16) scroller.scrollBy({ top: r.bottom - sr.bottom + 32, behavior })
        }, delay),
      )
    }
    if (!reduced && typeof Element.prototype.animate === 'function') {
      prev.forEach((top, e) => {
        const dy = top - e.getBoundingClientRect().top
        if (Math.abs(dy) > 0.5) {
          e.animate([{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }], {
            duration: 520,
            easing: 'cubic-bezier(.2,.8,.2,1)',
            composite: 'add',
          })
        }
      })
    }
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [featureShown])

  const done = featureShown >= FEATURES.length
  return (
    <>
      <div className={faded ? 'feat-list faded' : 'feat-list'} ref={listRef}>
        {FEATURES.slice(0, featureShown).map((f, i) => (
          <FeatureCard
            key={i}
            feature={f}
            cls={i < featureShown - 1 ? 'seen' : revealed ? 'new' : ''}
          />
        ))}
      </div>
      <button
        ref={btnRef}
        className={done ? 'btn btn-primary btn-wide' : 'btn btn-sun btn-wide'}
        data-act={done ? 'next' : 'more'}
        onClick={done ? next : more}
      >
        {done ? 'Sounds good' : featureShown === 0 ? 'Show me' : 'Show me more'}
      </button>
    </>
  )
}
