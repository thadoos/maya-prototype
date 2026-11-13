import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '../icons'
import { Mascot, useMascotState } from '../components/Mascot'
import { Words } from '../components/Words'
import { STEPS } from '../data/onboarding'
import { useNm, useStore } from '../store'
import { reduced } from '../util'
import { stepCopy } from './onboarding/copy'
import { HelpStep } from './onboarding/HelpStep'
import {
  ControlActions,
  HelloActions,
  NameActions,
  PromiseActions,
  ReadyActions,
  StyleActions,
  TopicsActions,
  WhoActions,
} from './onboarding/steps'
import type { StepProps } from './onboarding/types'
import { useFitOb } from './onboarding/useFitOb'

interface ObViewProps {
  rerender: () => void
}

function ObView({ rerender }: ObViewProps) {
  const { state, actions } = useStore()
  const t = useNm()
  const id = STEPS[state.step]
  const n = STEPS.length - 1
  const copy = stepCopy(id, state)
  const [mState, flash] = useMascotState(copy.mascot)
  const [sayOverride, setSay] = useState<string | null>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  useFitOb(screenRef)

  // Timed mascot moods: wave settles into happy; the promise step is proud in the costume, then sheepish.
  useEffect(() => {
    let timer = 0
    if (id === 'hello') timer = window.setTimeout(() => flash('happy'), 3000)
    else if (id === 'promise' && !reduced) timer = window.setTimeout(() => flash('happy', 1500, 'concern'), 700)
    return () => window.clearTimeout(timer)
  }, [id, flash])

  const next = useCallback(() => actions.setStep((s) => Math.min(s + 1, STEPS.length - 1)), [actions])
  const back = () => {
    if (id === 'control' && state.control) {
      actions.setControl(null)
      actions.setPracticed(false)
    } else if (id === 'help' && state.featureShown > 0) {
      actions.setFeatureShown(0)
    } else {
      actions.setStep((s) => Math.max(0, s - 1))
    }
    rerender()
  }

  const props: StepProps = { next, rerender, flash, setSay }
  const say = sayOverride ?? copy.say
  const small = sayOverride === null ? copy.small : ''

  let actionsNode
  switch (id) {
    case 'style': actionsNode = <StyleActions next={next} rerender={rerender} />; break
    case 'name': actionsNode = <NameActions next={next} />; break
    case 'hello': actionsNode = <HelloActions next={next} />; break
    case 'who': actionsNode = <WhoActions {...props} />; break
    case 'control': actionsNode = <ControlActions next={next} rerender={rerender} />; break
    case 'help': actionsNode = <HelpStep rightRef={rightRef} next={next} flash={flash} />; break
    case 'promise': actionsNode = <PromiseActions next={next} />; break
    case 'topics': actionsNode = <TopicsActions next={next} flash={flash} />; break
    case 'ready': actionsNode = <ReadyActions />; break
  }

  const first = state.step === 0
  return (
    <div className="screen" ref={screenRef}>
      <div className={`ob gutter${id === 'help' || id === 'topics' ? ' help-step' : ''}`}>
        <div className={first ? 'ob-top first' : 'ob-top'}>
          <button
            className="btn btn-soft"
            data-act="back"
            aria-label="Back"
            style={first ? { visibility: 'hidden' } : undefined}
            onClick={back}
          >
            <Icon name="back" />
            <span className="lbl">Back</span>
          </button>
          <div
            className="dots"
            role="progressbar"
            aria-label="Getting started"
            aria-valuemin={0}
            aria-valuemax={n}
            aria-valuenow={state.step}
          >
            {state.step > 0 &&
              Array.from({ length: n }, (_, i) => (
                <i key={i} className={i + 1 < state.step ? 'done' : i + 1 === state.step ? 'now' : ''} />
              ))}
          </div>
        </div>
        <div className={id === 'style' ? 'ob-body single' : 'ob-body'}>
          {id !== 'style' && (
            <div className="ob-mascot">
              <Mascot state={mState} cls={id === 'promise' ? 'doc' : ''} />
            </div>
          )}
          <div className="ob-right" ref={rightRef}>
            <div className="bubble-say" aria-live="polite">
              <Words key={say} text={t(say)} />
              {small && <small>{t(small)}</small>}
            </div>
            <div className="ob-actions">{actionsNode}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Onboarding() {
  const { state } = useStore()
  const [rev, setRev] = useState(0)
  const rerender = useCallback(() => setRev((r) => r + 1), [])
  // Like the prototype's renderOb(): every step change or explicit re-render rebuilds the step (replaying its animations).
  return <ObView key={`${state.step}:${rev}`} rerender={rerender} />
}
