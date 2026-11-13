import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { STARTERS, STARTER_KEY, keyFor } from '../data/chat'
import { now } from '../data/copy'
import { Icon } from '../icons'
import { useStore } from '../store'
import type { ReplyKey, TopicId } from '../types'
import { reduced } from '../util'
import { Composer } from './chat/Composer'
import { Thread } from './chat/Thread'
import type { IntroRects } from './chat/types'
import { useChatFlow } from './chat/useChatFlow'
import { useComposer } from './chat/useComposer'

export default function Chat() {
  const { state, actions } = useStore()
  const composer = useComposer(state.listening)
  const { userSays, toggleMic, cancelPending } = useChatFlow(composer)
  const heroRef = useRef<HTMLDivElement>(null)
  const [introFrom, setIntroFrom] = useState<IntroRects | null>(null)
  const { openComposer, mainRef, threadRef } = composer

  const { setGreeted, setGreetTime } = actions
  const fresh = state.msgs.length === 0 && !state.greeted

  // Reduced motion: no intro, straight to the greeting message.
  useLayoutEffect(() => {
    if (!reduced || !fresh) return
    setGreeted(true)
    setGreetTime(now())
  }, [fresh, setGreeted, setGreetTime])

  // New-chat intro: Maya greets you big and centred, then shrinks into her first chat message.
  useEffect(() => {
    if (reduced || !fresh) return
    const id = window.setTimeout(() => {
      const hero = heroRef.current
      const m = hero?.querySelector('.mascot')
      const h = hero?.querySelector('h1')
      if (!m || !h) return
      setIntroFrom({ mascot: m.getBoundingClientRect(), heading: h.getBoundingClientRect() })
      setGreeted(true)
      setGreetTime(now())
    }, 1900)
    return () => window.clearTimeout(id)
  }, [fresh, setGreeted, setGreetTime])

  // ...then the text box opens.
  useEffect(() => {
    if (!introFrom) return
    const id = window.setTimeout(() => openComposer(true), 1200)
    return () => window.clearTimeout(id)
  }, [introFrom, openComposer])

  const newChat = () => {
    cancelPending()
    setIntroFrom(null)
    actions.setMsgs([])
    actions.setGreeted(false)
    actions.setThinking(false)
    actions.setCurrentChat(null)
  }

  const reply = (text: string, key: ReplyKey) => {
    if (state.thinking) return
    userSays(text, key)
  }
  const start = (k: TopicId) => userSays(STARTERS[k][0], STARTER_KEY[k])

  return (
    <div className="screen" style={{ overflow: 'hidden' }}>
      <div className="chat">
        <div className="main" ref={mainRef}>
          <header className="chat-head gutter">
            <button className="btn btn-soft back" aria-label="Back to home" onClick={() => actions.go('home')}>
              <Icon name="back" />
              <span className="lbl">Home</span>
            </button>
            <button className="btn btn-soft" aria-label="New chat" onClick={newChat}>
              <Icon name="plus" />
              <span className="lbl">New chat</span>
            </button>
          </header>
          <Thread
            threadRef={threadRef}
            heroRef={heroRef}
            showHero={fresh && !reduced}
            introFrom={introFrom}
            onStart={start}
            onReply={reply}
            onToast={actions.toast}
          />
          <Composer
            c={composer}
            speech={state.control === 'speech'}
            listening={state.listening}
            thinking={state.thinking}
            onSend={(text) => userSays(text, keyFor(text))}
            onMic={toggleMic}
          />
        </div>
      </div>
    </div>
  )
}
