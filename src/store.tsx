import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_EMAIL, DEFAULT_NAME, nm } from './data/copy'
import { INITIAL_TOPICS } from './data/onboarding'
import { reduced } from './util'
import { SCREENS } from './types'
import type {
  ChatMsg,
  Control,
  OverlayState,
  Role,
  Screen,
  Style,
  TextSize,
  Theme,
  TopicId,
} from './types'

export interface AppState {
  screen: Screen
  /** Bumped on every go(); App keys the screen by it so go() to the same screen remounts it. */
  nav: number
  style: Style
  theme: Theme
  textSize: TextSize
  onboarded: boolean
  name: string
  nameSet: boolean
  email: string
  role: Role | null
  control: Control | null
  topics: TopicId[]
  step: number
  featureShown: number
  practiced: boolean
  dwellOn: boolean
  dwellMs: number
  msgs: ChatMsg[]
  thinking: boolean
  listening: boolean
  greeted: boolean
  greetTime: string
  /** Index into PAST as string, 'cur' for the live chat, or null for a fresh chat. */
  currentChat: string | null
  overlay: OverlayState | null
  toastText: string
  toastVisible: boolean
  /** ids of running confetti bursts (rendered by <Confetti/>). */
  confetti: number[]
}

function initialScreen(): Screen {
  const h = location.hash.slice(1)
  return (SCREENS as readonly string[]).includes(h) ? (h as Screen) : 'login'
}

const initialState = (): AppState => ({
  screen: initialScreen(),
  nav: 0,
  style: 'cute',
  theme: 'auto',
  textSize: 'm',
  onboarded: false,
  name: DEFAULT_NAME,
  nameSet: false,
  email: DEFAULT_EMAIL,
  role: null,
  control: null,
  topics: [...INITIAL_TOPICS],
  step: 0,
  featureShown: 0,
  practiced: false,
  dwellOn: false,
  dwellMs: 1100,
  msgs: [],
  thinking: false,
  listening: false,
  greeted: false,
  greetTime: '',
  currentChat: null,
  overlay: null,
  toastText: '',
  toastVisible: false,
  confetti: [],
})

type Updater<T> = T | ((prev: T) => T)

type Action =
  | { type: 'patch'; patch: Partial<AppState> }
  | { type: 'msgs'; value: Updater<ChatMsg[]> }
  | { type: 'go'; screen: Screen }
  | { type: 'toggleTopic'; id: TopicId }
  | { type: 'addConfetti'; id: number }
  | { type: 'endConfetti'; id: number }

function reducer(s: AppState, a: Action): AppState {
  switch (a.type) {
    case 'patch':
      return { ...s, ...a.patch }
    case 'msgs':
      return { ...s, msgs: typeof a.value === 'function' ? a.value(s.msgs) : a.value }
    case 'go': {
      const reset = a.screen === 'onboarding' ? { step: 0, featureShown: 0, practiced: false } : {}
      return { ...s, ...reset, screen: a.screen, nav: s.nav + 1, overlay: null }
    }
    case 'toggleTopic':
      return {
        ...s,
        topics: s.topics.includes(a.id) ? s.topics.filter((t) => t !== a.id) : [...s.topics, a.id],
      }
    case 'addConfetti':
      return { ...s, confetti: [...s.confetti, a.id] }
    case 'endConfetti':
      return { ...s, confetti: s.confetti.filter((i) => i !== a.id) }
  }
}

export interface Actions {
  /** Navigate. Closes overlay; entering 'onboarding' resets step/featureShown/practiced. Remounts the screen. */
  go: (screen: Screen) => void
  /** Sets state.style and document.documentElement.dataset.style. */
  setStyle: (style: Style) => void
  /** 'auto' removes dataset.theme (OS preference); 'light'/'dark' force it. */
  setTheme: (theme: Theme) => void
  /** Toggles html.ts-l / html.ts-xl. */
  setTextSize: (size: TextSize) => void
  setOnboarded: (v: boolean) => void
  /** Sets name and nameSet=true. */
  setName: (name: string) => void
  setRole: (role: Role | null) => void
  setControl: (control: Control | null) => void
  setStep: (step: number | ((prev: number) => number)) => void
  setFeatureShown: (n: number | ((prev: number) => number)) => void
  setPracticed: (v: boolean) => void
  toggleTopic: (id: TopicId) => void
  setDwellOn: (on: boolean) => void
  setDwellMs: (ms: number) => void
  setMsgs: (msgs: Updater<ChatMsg[]>) => void
  setThinking: (v: boolean) => void
  setListening: (v: boolean) => void
  setGreeted: (v: boolean) => void
  setGreetTime: (t: string) => void
  setCurrentChat: (id: string | null) => void
  /** Show a toast for 2.6s (replaces the previous one). */
  toast: (text: string) => void
  /** Confetti burst. No-op for reduced motion or the formal style. */
  confetti: () => void
  /** Show a node in the overlay host (.scrim). cls e.g. 'center'. Remembers focus for restore. */
  openOverlay: (node: ReactNode, cls?: string) => void
  /** Close the overlay and restore focus to the opener. Also bound to Escape. */
  closeOverlay: () => void
  /** Internal: used by <Confetti/>. */
  endConfetti: (id: number) => void
}

interface Store {
  state: AppState
  actions: Actions
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)
  const ref = useRef(state)
  const lastFocus = useRef<Element | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const confettiId = useRef(0)

  useLayoutEffect(() => {
    ref.current = state
  }, [state])

  // Reflect style / text size / theme onto <html>.
  useLayoutEffect(() => {
    document.documentElement.dataset.style = state.style
  }, [state.style])
  useLayoutEffect(() => {
    const c = document.documentElement.classList
    c.remove('ts-l', 'ts-xl')
    if (state.textSize !== 'm') c.add('ts-' + state.textSize)
  }, [state.textSize])
  useLayoutEffect(() => {
    const d = document.documentElement.dataset
    if (state.theme === 'auto') delete d.theme
    else d.theme = state.theme
  }, [state.theme])

  // Keep the hash in sync with the screen.
  useEffect(() => {
    try {
      if (location.hash.slice(1) !== state.screen) history.replaceState(null, '', '#' + state.screen)
    } catch {
      /* history may be unavailable (sandboxed frames) */
    }
  }, [state.screen, state.nav])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const closeOverlay = useCallback(() => {
    if (!ref.current.overlay) return
    dispatch({ type: 'patch', patch: { overlay: null } })
    const f = lastFocus.current
    if (f instanceof HTMLElement && f.isConnected) f.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeOverlay])

  const actions = useMemo<Actions>(() => {
    const patch = (p: Partial<AppState>) => dispatch({ type: 'patch', patch: p })
    return {
      go: (screen) => {
        const f = lastFocus.current
        const had = ref.current.overlay
        dispatch({ type: 'go', screen })
        if (had && f instanceof HTMLElement && f.isConnected) f.focus()
      },
      setStyle: (style) => patch({ style }),
      setTheme: (theme) => patch({ theme }),
      setTextSize: (textSize) => patch({ textSize }),
      setOnboarded: (onboarded) => patch({ onboarded }),
      setName: (name) => patch({ name, nameSet: true }),
      setRole: (role) => patch({ role }),
      setControl: (control) => patch({ control }),
      setStep: (v) => patch({ step: typeof v === 'function' ? v(ref.current.step) : v }),
      setFeatureShown: (v) =>
        patch({ featureShown: typeof v === 'function' ? v(ref.current.featureShown) : v }),
      setPracticed: (practiced) => patch({ practiced }),
      toggleTopic: (id) => dispatch({ type: 'toggleTopic', id }),
      setDwellOn: (dwellOn) => patch({ dwellOn }),
      setDwellMs: (dwellMs) => patch({ dwellMs }),
      setMsgs: (value) => dispatch({ type: 'msgs', value }),
      setThinking: (thinking) => patch({ thinking }),
      setListening: (listening) => patch({ listening }),
      setGreeted: (greeted) => patch({ greeted }),
      setGreetTime: (greetTime) => patch({ greetTime }),
      setCurrentChat: (currentChat) => patch({ currentChat }),
      toast: (text) => {
        window.clearTimeout(toastTimer.current)
        patch({ toastText: text, toastVisible: true })
        toastTimer.current = window.setTimeout(() => patch({ toastVisible: false }), 2600)
      },
      confetti: () => {
        if (reduced || ref.current.style === 'formal') return
        const id = ++confettiId.current
        dispatch({ type: 'addConfetti', id })
      },
      openOverlay: (node, cls) => {
        lastFocus.current = document.activeElement
        patch({ overlay: { node, cls } })
      },
      closeOverlay,
      endConfetti: (id) => dispatch({ type: 'endConfetti', id }),
    }
  }, [closeOverlay])

  const value = useMemo<Store>(() => ({ state, actions }), [state, actions])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore must be used inside <StoreProvider>')
  return v
}

/** Copy rewriting bound to the current style and name: const t = useNm(); t('Hi Maya'). */
export function useNm(): (text: string) => string {
  const { style, name } = useStore().state
  return useCallback((text: string) => nm(text, { style, name }), [style, name])
}
