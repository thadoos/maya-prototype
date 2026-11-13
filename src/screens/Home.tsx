import { useEffect, useState } from 'react'
import { Mascot, useMascotState } from '../components/Mascot'
import { openSettings } from '../components/SettingsPanel'
import { PAST } from '../data/chat'
import { greet } from '../data/copy'
import { Icon } from '../icons'
import { useNm, useStore } from '../store'
import type { UserMsg } from '../types'
import { HistRow } from './home/HistRow'
import { HistoryPanel } from './home/HistoryPanel'
import { isMaya, lastMayaKey, pastLastKey } from './home/lastMaya'
import { openPast } from './home/openPast'

export default function Home() {
  const { state, actions } = useStore()
  const t = useNm()
  const [mascotState, flash] = useMascotState('wave')

  useEffect(() => {
    flash('wave', 1800, 'idle')
  }, [flash])

  const [date] = useState(() => new Date().toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' }))
  const first = state.msgs.find((m): m is UserMsg => m.from === 'me')
  const soon = (what: string) => actions.toast(`${what} isn’t part of this prototype`)
  const newChat = () => {
    actions.setMsgs([])
    actions.setGreeted(false)
    actions.setThinking(false)
    actions.setCurrentChat(null)
    actions.go('chat')
  }
  // Rows of the live chat plus the first PAST chats, three in total.
  const recent = PAST.slice(0, first ? 2 : 3)

  return (
    <div className="screen">
      <div className="home">
        <header className="home-top">
          <span className="home-brand">{t('Maya')}</span>
        </header>
        <div className="home-body">
          <div className="home-hero">
            <div className="halo">
              <Mascot state={mascotState} />
            </div>
            <p className="eyebrow">{date}</p>
            <h1>
              {greet()}, {state.name}.
            </h1>
            <p className="muted">{t('I’m here whenever you want to talk.')}</p>
            <div className="home-actions">
              <button className="btn btn-primary" onClick={newChat}>
                <Icon name="chat" /> Start a chat
              </button>
              <button className="btn btn-soft" onClick={() => soon('Journey')}>
                <Icon name="journey" /> Journey
              </button>
            </div>
          </div>
          <section className="home-side" aria-label="Explore and recent chats">
            <h2 className="section-label">Explore</h2>
            <div className="space-grid">
              <button className="choice" onClick={() => soon('Results')}>
                <span className="ic">
                  <Icon name="results" />
                </span>
                <span>
                  <b>Results</b>
                </span>
              </button>
              <button className="choice" onClick={() => soon(t('How Maya works'))}>
                <span className="ic">
                  <Icon name="info" />
                </span>
                <span>
                  <b>How I work</b>
                </span>
              </button>
              <button className="choice" onClick={() => openSettings(actions)}>
                <span className="ic">
                  <Icon name="settings" />
                </span>
                <span>
                  <b>Settings</b>
                </span>
              </button>
            </div>
            <h2 className="section-label">Pick up where you left off</h2>
            <div className="hist-list">
              {first && (
                <HistRow
                  now
                  title={first.text}
                  when="Today"
                  icon="chat"
                  lastKey={lastMayaKey(state.msgs.filter(isMaya))}
                  onOpen={() => actions.go('chat')}
                />
              )}
              {recent.map((c, i) => (
                <HistRow
                  key={i}
                  title={c.title}
                  when={c.when}
                  icon={c.icon}
                  lastKey={pastLastKey(c)}
                  onOpen={() => openPast(actions, String(i))}
                />
              ))}
            </div>
            <button className="btn btn-soft btn-wide" onClick={() => actions.openOverlay(<HistoryPanel />)}>
              <Icon name="history" /> View full history
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
