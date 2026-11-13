import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'chat'
  | 'journey'
  | 'results'
  | 'info'
  | 'settings'
  | 'keyboard'
  | 'history'
  | 'plus'
  | 'mic'
  | 'send'
  | 'back'
  | 'check'
  | 'eye'
  | 'hand'
  | 'switcher'
  | 'up'
  | 'down'
  | 'book'
  | 'x'
  | 'out'
  | 'me'
  | 'heart'
  | 'shield'
  | 'moon'
  | 'home'
  | 'bolt'
  | 'people'
  | 'palette'
  | 'leaf'
  | 'steps'

const PATHS: Record<IconName, ReactNode> = {
  chat: (
    <><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></>
  ),
  journey: (
    <><path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3z"/><path d="M9 4v13M15 7v13"/></>
  ),
  results: (
    <><path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/></>
  ),
  info: (
    <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></>
  ),
  settings: (
    <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></>
  ),
  keyboard: (
    <><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M10 13h4M7 16h10"/></>
  ),
  history: (
    <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>
  ),
  plus: (
    <><path d="M12 5v14M5 12h14"/></>
  ),
  mic: (
    <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></>
  ),
  send: (
    <><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></>
  ),
  back: (
    <><path d="M19 12H5M12 19l-7-7 7-7"/></>
  ),
  check: (
    <><path d="M20 6 9 17l-5-5"/></>
  ),
  eye: (
    <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>
  ),
  hand: (
    <><path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></>
  ),
  switcher: (
    <><rect x="3" y="7" width="18" height="10" rx="5"/><circle cx="16" cy="12" r="2.5"/></>
  ),
  up: (
    <><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></>
  ),
  down: (
    <><g transform="rotate(180 12 12)"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></g></>
  ),
  book: (
    <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>
  ),
  x: (
    <><path d="M18 6 6 18M6 6l12 12"/></>
  ),
  out: (
    <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>
  ),
  me: (
    <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>
  ),
  heart: (
    <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></>
  ),
  shield: (
    <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>
  ),
  moon: (
    <><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></>
  ),
  home: (
    <><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></>
  ),
  bolt: (
    <><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></>
  ),
  people: (
    <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/></>
  ),
  palette: (
    <><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1.5"/><circle cx="12" cy="7" r="1.5"/><circle cx="16" cy="10" r="1.5"/></>
  ),
  leaf: (
    <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></>
  ),
  steps: (
    <><path d="M4 6h16M4 12h10M4 18h6"/></>
  ),
}

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
}

/** Stroke icon, 24x24, inherits currentColor. Pass className (e.g. "on" / "off") for chip toggles. */
export function Icon({ name, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}

export function GoogleLogo() {
  return (
    <svg className="logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.8 6C12.3 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.4 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.8-6C1 16.5 0 20.1 0 24s1 7.5 2.6 10.7l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6C6.6 42.6 14.6 48 24 48z"/></svg>
  )
}

export function MsLogo() {
  return (
    <svg className="logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#FFB900" d="M13 13h10v10H13z"/></svg>
  )
}
