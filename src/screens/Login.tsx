import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Mascot, useMascotState } from '../components/Mascot'
import { Words } from '../components/Words'
import { GoogleLogo, Icon, MsLogo } from '../icons'
import { useStore } from '../store'

export default function Login() {
  const { state, actions } = useStore()
  const [mState, flash] = useMascotState('wave')
  const [look, setLook] = useState<'down' | undefined>(undefined)
  const [say, setSay] = useState('Hello again! It’s good to see you.')
  const [showPw, setShowPw] = useState(false)
  const [pwErr, setPwErr] = useState('')
  const navTimer = useRef<number | undefined>(undefined)

  // Wave hello, then settle (a later mood change cancels this).
  useEffect(() => {
    flash('wave', 3200, 'idle')
  }, [flash])
  useEffect(() => () => window.clearTimeout(navTimer.current), [])

  const success = () => {
    flash('celebrate')
    setSay('Yay, you’re in!')
    window.clearTimeout(navTimer.current)
    navTimer.current = window.setTimeout(() => actions.go(state.onboarded ? 'home' : 'onboarding'), 1100)
  }

  const toggleShow = () => {
    if (!showPw) {
      flash('idle')
      setLook('down')
      setSay('Okay, I’ll help you check it.')
    } else {
      setLook(undefined)
      flash('shy')
      setSay('Eyes closed again.')
    }
    setShowPw(!showPw)
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    success()
  }

  return (
    <div className="screen">
      <div className="login gutter">
        <div className="login-peek">
          <Mascot state={mState} size="130px" look={look} />
          <div className="bubble-say peek-say" id="lsay" aria-live="polite">
            <Words key={say} text={say} />
          </div>
        </div>
        <form className="card" id="loginForm" noValidate onSubmit={submit}>
          <div>
            <h1>Welcome back</h1>
            <p className="muted">Sign in to talk with Maya.</p>
          </div>
          <button type="button" className="btn btn-soft btn-wide" data-act="sso" onClick={success}>
            <GoogleLogo /> Continue with Google
          </button>
          <button type="button" className="btn btn-soft btn-wide" data-act="sso" onClick={success}>
            <MsLogo /> Continue with Microsoft
          </button>
          <div className="divider">or use your email</div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              type="email"
              autoComplete="email"
              defaultValue={state.email}
              onFocus={() => {
                flash('idle')
                setLook('down')
                setSay('That’s the email you joined with.')
              }}
              onBlur={() => setLook(undefined)}
            />
          </div>
          <div className="field">
            <label htmlFor="pw">Password</label>
            <div className="input-row">
              <input
                className="input"
                id="pw"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Your password"
                onFocus={() => {
                  if (!showPw) {
                    flash('shy')
                    setSay('Don’t worry, I won’t peek!')
                  }
                }}
                onBlur={() => flash('idle')}
                onInput={() => setPwErr('')}
              />
              <button type="button" className="btn btn-soft" id="showPw" aria-pressed={showPw} onClick={toggleShow}>
                <Icon name="eye" />
                <span>{showPw ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <p className="err" id="pwErr" aria-live="polite">{pwErr}</p>
          </div>
          <button type="submit" className="btn btn-primary btn-wide">Sign in</button>
          <button
            type="button"
            className="btn btn-ghost btn-wide"
            data-act="new"
            onClick={() => {
              actions.setOnboarded(false)
              actions.go('onboarding')
            }}
          >
            New to Maya? Create an account
          </button>
        </form>
      </div>
    </div>
  )
}
