import { useEffect, useRef } from 'react'
import type { ComponentType } from 'react'
import { Confetti } from './components/Confetti'
import { Overlay } from './components/Overlay'
import { Toast } from './components/Toast'
import { useDwell } from './hooks/useDwell'
import Chat from './screens/Chat'
import Home from './screens/Home'
import Login from './screens/Login'
import Onboarding from './screens/Onboarding'
import { StoreProvider, useStore } from './store'
import type { Screen } from './types'

const SCREEN_COMPONENTS: Record<Screen, ComponentType> = {
  login: Login,
  onboarding: Onboarding,
  home: Home,
  chat: Chat,
}

const PROTO_BUTTONS: readonly (readonly [Screen, string])[] = [
  ['login', 'Sign in'],
  ['onboarding', 'Onboarding'],
  ['home', 'Home'],
  ['chat', 'Chat'],
]

function Shell() {
  const { state, actions } = useStore()
  const appRef = useRef<HTMLElement>(null)
  const gazeRef = useRef<HTMLDivElement>(null)
  useDwell(gazeRef)

  // Every navigation starts at the top of the new screen.
  useEffect(() => {
    const first = appRef.current?.firstElementChild
    if (first) first.scrollTo(0, 0)
  }, [state.screen, state.nav])

  const Current = SCREEN_COMPONENTS[state.screen]
  return (
    <>
      <div className="proto" role="navigation" aria-label="Prototype screens">
        <b>Prototype</b>
        {PROTO_BUTTONS.map(([screen, label]) => (
          <button
            key={screen}
            type="button"
            data-go={screen}
            aria-current={state.screen === screen}
            onClick={() => {
              if (screen === 'chat' || screen === 'home') actions.setOnboarded(true)
              actions.go(screen)
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <main id="app" ref={appRef}>
        <Current key={`${state.screen}:${state.nav}`} />
      </main>
      <div id="gaze" ref={gazeRef} aria-hidden="true"></div>
      <Toast />
      <Overlay />
      <Confetti />
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
