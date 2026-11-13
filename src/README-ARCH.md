# Architecture (phase 1 foundation)

- `styles.css` is verbatim from the prototype. Reuse class names; never restyle.
- `types.ts` shared types (Screen, ChatMsg, ReplyKey, TopicId...). `util.ts`: `reduced` (prefers-reduced-motion).
- `data/onboarding.ts` STEPS, TOPICS, FEATURES, HELP_SAY, SPEEDS, TEXT_SIZES. `data/chat.ts` STARTERS, STARTER_KEY,
  R, PAST, `getR`, `preview`, `keyFor`. `data/copy.ts` `nm(text,{style,name})`, `greet()`, `now()`, `companionName`.
- `icons.tsx` `<Icon name="chat" className? />`, `<GoogleLogo/>`, `<MsLogo/>`.
- `components/Mascot.tsx` `<Mascot state kind cls size look />` and `useMascotState(initial)` -> `[state, flash]`.
  `flash(s)` sets; `flash(s, ms, after='idle')` reverts after ms (cancelling any pending revert; cleaned on unmount).
  kind defaults to store style. `cls="doc"` shows the costume (m-doc), `cls="breathe"` for the breathing card.
- `components/Words.tsx` `<Words text />` staggered words; use `key={text}` to replay.
- `components/SpeedButtons.tsx` the 3 speed buttons (wrap in `<div className="seg">`).
- `components/SettingsPanel.tsx` + `openSettings(actions)`. `components/Overlay|Toast|Confetti` are hosted by App.
- `hooks/useDwell.ts` dwell loop, mounted in App; driven by `state.dwellOn/dwellMs`.

## Store (`store.tsx`)
`const { state, actions } = useStore()`; `const t = useNm()` applies Maya->Rowan / Sam->name rewriting.
Actions are stable. `go(screen)` closes the overlay, remounts the screen (App keys by `screen:nav`) and resets
step/featureShown/practiced when entering onboarding. Proto-bar buttons call `setOnboarded(true)` for home/chat.

## Contracts for phases
- Screens are default exports in `screens/*.tsx` rendering `<div className="screen">` (the scroll container).
- Do NOT apply `nm` to strings that must keep "Maya" (companion picker card, Settings companion buttons).
- Overlays: write a component and `actions.openOverlay(<MyPanel/>, cls?)`; the host adds `.scrim`, focuses the
  first button, closes on backdrop click or any `[data-close]`, and on Escape. Render only the inner panel/sheet.
- Replace imperative DOM bits (setMascot, innerHTML, dataset) with state + `useMascotState`; per-screen
  timers go in effects with cleanup. Chat logic (userSays, intro animation, composer morph) lives in phase 3.
