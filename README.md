# Maya Companion Prototype

A redesigned, front-end-only prototype of **Maya**, a web-based AI support companion for people living with ALS/MND and their carers.

This is part of a project with the **International Alliance of ALS/MND Associations**. It is a revamp of the original Maya UI, built to be **more accessible** and **easy to use with eye gaze technology**.

> This is a design prototype, not a diagnostic tool and not a replacement for healthcare professionals or emergency services. All content is scripted.

## Goals

- **Accessible by default**: large targets, adjustable text size, light/dark theme, reduced-motion support, focus management in dialogs.
- **Eye gaze friendly**: "Look to select" dwell interaction with forgiving, adjustable timing.
- **Calm and simple**: one clear action per screen, gentle onboarding, a companion character instead of dense UI.
- **Whole-person support**: onboarding lets users pick topics such as energy, safety at home, staying independent, hobbies and care options.

## What's in the prototype

| Screen | What it shows |
| --- | --- |
| Login | Mock "Continue with Google / Microsoft" (no real auth) |
| Onboarding | 9 steps: companion style, name, role (self or carer), control method (touch, eye, speech), eye practice, topics |
| Home | Greeting, start a chat, recent chats and history |
| Chat | Scripted replies with sources, feedback buttons, and a breathing exercise |

Journey, Results and "How Maya works" are shown on Home but are not part of this prototype (they show a toast).

### Accessibility features

- **Look to select (dwell)**: rest the pointer on a button and it fills, then selects. Works with any eye tracker that emulates a mouse. Off by default, toggle in Settings.
- **Selection speed**: Relaxed (1.6s), Steady (1.1s) or Quick (0.7s).
- **Jitter tolerance**: small wobbles pause progress rather than cancelling it, and a target must be left before it can fire again.
- **Text size**: Standard, Large, Extra large.
- **Theme**: follows the system light/dark setting.
- **Reduced motion**: respects `prefers-reduced-motion`.
- **Companion**: choose Maya (sprout, friendly) or Rowan (owl, more formal).
- **Dialogs**: focus moves into the dialog, returns on close, and Escape closes.

## Run it locally

Requirements: Node.js 24 or newer (the project uses `@types/node` 24) and npm.

```bash
git clone https://github.com/thadoos/maya-prototype.git
cd maya-prototype
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

No environment variables, backend or API keys are needed.

## Try it

1. Use the **Prototype** bar at the top to jump between Login, Onboarding, Home and Chat. The screen is also kept in the URL hash (for example `#chat`).
2. Open **Settings** to turn on **Look to select**, choose a speed, change text size or switch companion.
3. In Chat, try phrases like "I'm tired", "I feel alone", "I'm worried about falls" or "I need to calm down" to see scripted replies with sources.

## Limitations

- Front-end only: no backend, no real AI, no persistence (state resets on reload).
- Sign-in is fake and the microphone is simulated.
- No text-to-speech or speech recognition yet.
- "Gaze" is the pointer. There is no direct eye tracker SDK integration, so test with an eye tracker in mouse-emulation mode.
- Replies are matched by simple keyword rules over a small canned set. Crisis information is UK-based.

## Tech stack

React 19, TypeScript, Vite, Oxlint. State is a React context with a reducer, with no router and no external UI libraries.

## Project structure

```
src/
  screens/      Login, Onboarding, Home, Chat
  components/   Mascot, SettingsPanel, Overlay, Toast, SpeedButtons, ...
  hooks/        useDwell (eye gaze dwell interaction)
  data/         Scripted chat replies and onboarding content
  store.tsx     App state
  README-ARCH.md  Architecture notes
reference/      Original single-file HTML prototype that src/ was ported from
```
