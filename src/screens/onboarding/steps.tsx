import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../icons'
import type { IconName } from '../../icons'
import { Mascot } from '../../components/Mascot'
import { SpeedButtons } from '../../components/SpeedButtons'
import { TOPICS } from '../../data/onboarding'
import { useNm, useStore } from '../../store'
import type { Control, Role, Style } from '../../types'
import type { StepProps } from './types'
import { useFaded } from './useFaded'

type NextProps = Pick<StepProps, 'next'>

const STYLES: readonly (readonly [Style, string, string, string])[] = [
  ['cute', 'Maya', 'A cheerful little sprout', 'Bright, warm colours with playful motion'],
  ['formal', 'Rowan', 'A wise old owl in spectacles', 'Calm navy and brass with gentle motion'],
]

/** Companion picker. Names are deliberately not run through nm(): the card must keep "Maya". */
export function StyleActions({ next, rerender }: NextProps & Pick<StepProps, 'rerender'>) {
  const { state, actions } = useStore()
  return (
    <>
      <div className="choice-grid">
        {STYLES.map(([k, name, d, tag]) => (
          <button
            key={k}
            className="choice style-card"
            data-style-pick={k}
            aria-pressed={state.style === k}
            onClick={() => {
              actions.setStyle(k)
              rerender()
            }}
          >
            <Mascot state={k === 'cute' ? 'happy' : 'idle'} kind={k} />
            <span><b>{name}</b><span className="d">{d}</span><span className="tag">{tag}</span></span>
          </button>
        ))}
      </div>
      <button className="btn btn-primary btn-wide" data-act="next" onClick={next}>
        Continue with {state.style === 'formal' ? 'Rowan' : 'Maya'}
      </button>
    </>
  )
}

export function NameActions({ next }: NextProps) {
  const { state, actions } = useStore()
  const t = useNm()
  const inputRef = useRef<HTMLInputElement>(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const save = () => {
    const v = inputRef.current?.value.trim() ?? ''
    if (!v) {
      setErr('Type your name, then select Continue.')
      inputRef.current?.focus()
      return
    }
    actions.setName(v)
    next()
  }

  return (
    <>
      <div className="field">
        <label htmlFor="obName">Your name</label>
        <input
          className="input"
          id="obName"
          ref={inputRef}
          autoComplete="given-name"
          maxLength={30}
          defaultValue={state.nameSet ? state.name : ''}
          placeholder={t('For example, Sam')}
          onInput={() => setErr('')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              save()
            }
          }}
        />
      </div>
      <p className="err" aria-live="polite">{err}</p>
      <button className="btn btn-primary btn-wide" data-act="saveName" onClick={save}>
        Continue
      </button>
    </>
  )
}

export function HelloActions({ next }: NextProps) {
  const t = useNm()
  return (
    <button className="btn btn-primary btn-wide" data-act="next" onClick={next}>
      {t('Nice to meet you, Maya')}
    </button>
  )
}

const ROLES: readonly (readonly [Role, IconName, string, string])[] = [
  ['self', 'me', 'For myself', 'I’m living with ALS/MND'],
  ['carer', 'people', 'For someone I support', 'I’m a carer, partner or family'],
]

export function WhoActions({ next, flash, setSay }: NextProps & Pick<StepProps, 'flash' | 'setSay'>) {
  const { state, actions } = useStore()
  const t = useNm()
  const [picked, setPicked] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const pick = (role: Role) => {
    actions.setRole(role)
    setPicked(true)
    flash('happy')
    setSay(t(role === 'self' ? 'Then we’re a team, you and me.' : 'They’re lucky to have you. Let’s look after you both.'))
    timer.current = window.setTimeout(next, 1500)
  }

  return (
    <div className={picked ? 'choice-grid picked' : 'choice-grid'}>
      {ROLES.map(([role, icon, title, d]) => (
        <button
          key={role}
          className="choice"
          data-role={role}
          aria-pressed={state.role === role}
          disabled={picked}
          onClick={() => pick(role)}
        >
          <span className="ic"><Icon name={picked && state.role === role ? 'check' : icon} /></span>
          <span><b>{title}</b><span className="d">{d}</span></span>
        </button>
      ))}
    </div>
  )
}

const CONTROLS: readonly (readonly [Control, IconName, string, string])[] = [
  ['touch', 'hand', 'Touch, mouse or keyboard', 'Tap, click or press to choose'],
  ['eye', 'eye', 'Eye tracking', 'Look at something to choose it'],
  ['speech', 'mic', 'Speech', 'Speak instead of typing'],
]

export function ControlActions({ next, rerender }: NextProps & Pick<StepProps, 'rerender'>) {
  const { state, actions } = useStore()
  const { control, practiced } = state

  if (!control) {
    return (
      <div className="choice-grid three">
        {CONTROLS.map(([c, icon, title, d]) => (
          <button
            key={c}
            className="choice"
            data-ctl={c}
            onClick={() => {
              actions.setControl(c)
              actions.setDwellOn(c === 'eye')
              rerender()
            }}
          >
            <span className="ic"><Icon name={icon} /></span>
            <span><b>{title}</b><span className="d">{d}</span></span>
          </button>
        ))}
      </div>
    )
  }

  const change = (label: string) => (
    <button
      className="btn btn-soft"
      data-act="rectl"
      onClick={() => {
        actions.setControl(null)
        actions.setPracticed(false)
        actions.setDwellOn(false)
        rerender()
      }}
    >
      {label}
    </button>
  )
  const cont = (
    <button className="btn btn-primary" data-act="next" onClick={next}>
      Continue
    </button>
  )

  if (control === 'eye') {
    return (
      <>
        <div className="practice">
          <button
            className={practiced ? 'sunbtn done' : 'sunbtn'}
            data-act="practice"
            onClick={() => {
              if (practiced) return
              actions.setPracticed(true)
              actions.confetti()
              rerender()
            }}
          >
            {practiced ? 'Done!' : 'Look here'}
          </button>
        </div>
        <div className="seg" role="group" aria-label="Selection speed">
          <SpeedButtons />
        </div>
        <div className="row">{change('Change how I use my screen')}{cont}</div>
      </>
    )
  }
  return <div className="row">{change('Go back a step')}{cont}</div>
}

export function PromiseActions({ next }: NextProps) {
  const t = useNm()
  return (
    <>
      <div className="feature" style={{ animationDelay: '.1s' }}>
        <span className="ic"><Icon name="shield" /></span>
        <span><b>Your chats stay private</b>{t('Only you can see them, unless you choose to share with someone you trust.')}</span>
      </div>
      <button className="btn btn-primary btn-wide" data-act="next" onClick={next}>
        I understand
      </button>
    </>
  )
}

export function TopicsActions({ next, flash }: NextProps & Pick<StepProps, 'flash'>) {
  const { state, actions } = useStore()
  const chipsRef = useRef<HTMLDivElement>(null)
  const faded = useFaded(chipsRef)
  return (
    <>
      <div className={faded ? 'chips faded' : 'chips'} ref={chipsRef}>
        {TOPICS.map(([id, label]) => (
          <button
            key={id}
            className="chip"
            data-topic={id}
            aria-pressed={state.topics.includes(id)}
            onClick={() => {
              actions.toggleTopic(id)
              flash('happy', 900, 'think')
            }}
          >
            <Icon name="plus" className="off" />
            <Icon name="check" className="on" />
            {label}
          </button>
        ))}
      </div>
      <button className="btn btn-primary btn-wide" data-act="next" onClick={next}>
        {state.topics.length ? 'Continue' : 'Not sure yet, continue'}
      </button>
    </>
  )
}

export function ReadyActions() {
  const { actions } = useStore()
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    actions.confetti()
  }, [actions])
  return (
    <button
      className="btn btn-sun btn-wide"
      data-act="finish"
      onClick={() => {
        actions.setOnboarded(true)
        actions.go('home')
      }}
    >
      <Icon name="heart" /> Let’s get started
    </button>
  )
}

