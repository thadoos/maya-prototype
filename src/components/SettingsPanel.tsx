import type { ReactNode } from 'react'
import { Icon } from '../icons'
import { TEXT_SIZES } from '../data/onboarding'
import { useNm, useStore } from '../store'
import type { Style } from '../types'
import { SpeedButtons } from './SpeedButtons'

const COMPANIONS: readonly (readonly [Style, string])[] = [
  ['cute', 'Maya the sprout'],
  ['formal', 'Rowan the owl'],
]

/** Open with: openOverlay(<SettingsPanel />, 'center'). Use openSettings(actions) helper below. */
export function SettingsPanel() {
  const { state, actions } = useStore()
  const t = useNm()
  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label="Settings">
      <div className="panel-head">
        <h2>{t('Make Maya comfy')}</h2>
        <button className="btn btn-soft btn-icon" data-close aria-label="Close">
          <Icon name="x" />
        </button>
      </div>
      <div className="setting">
        <button
          className="btn btn-soft btn-wide switch"
          id="tglDwell"
          aria-pressed={state.dwellOn}
          onClick={() => {
            const on = !state.dwellOn
            actions.setDwellOn(on)
            actions.toast(on ? 'Look to select is on' : 'Look to select is off')
          }}
        >
          <span style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
            <Icon name="eye" /> Look to select
          </span>
          <span className="knob"></span>
        </button>
        <p className="muted">
          Rest your eyes on a button and it fills up, then selects. Small wobbles won’t cancel it.
        </p>
        <h3>Selection speed</h3>
        <div className="seg" id="segSpeed">
          <SpeedButtons />
        </div>
      </div>
      <div className="setting">
        <h3>Companion</h3>
        <div className="seg" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }}>
          {COMPANIONS.map(([k, l]) => (
            <button
              key={k}
              className="btn btn-soft"
              data-cstyle={k}
              aria-pressed={state.style === k}
              onClick={() => actions.setStyle(k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="setting">
        <h3>Text size</h3>
        <div className="seg" id="segText">
          {TEXT_SIZES.map(([k, l]) => (
            <button
              key={k}
              className="btn btn-soft"
              data-ts={k}
              aria-pressed={state.textSize === k}
              onClick={() => actions.setTextSize(k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        <button
          className="btn btn-soft"
          data-replay
          onClick={() => {
            actions.setOnboarded(false)
            actions.go('onboarding')
          }}
        >
          <Icon name="heart" /> Replay the intro
        </button>
        <button
          className="btn btn-soft"
          data-signout
          onClick={() => {
            actions.setMsgs([])
            actions.setGreeted(false)
            actions.go('login')
          }}
        >
          <Icon name="out" /> Sign out
        </button>
      </div>
    </div>
  )
}

/** Convenience: openSettings(actions) from a Settings button. */
export function openSettings(actions: { openOverlay: (n: ReactNode, cls?: string) => void }) {
  actions.openOverlay(<SettingsPanel />, 'center')
}
