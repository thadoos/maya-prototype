import { useCallback, useEffect, useRef } from 'react'
import { getR } from '../../data/chat'
import { now } from '../../data/copy'
import { useStore } from '../../store'
import type { ReplyKey } from '../../types'
import { reduced } from '../../util'
import type { ComposerApi } from './useComposer'

const MIC_TEXT = 'I’ve been feeling really tired in the afternoons'

/** userSays (thinking delay, then scripted reply) and the simulated microphone. Timers die with the screen. */
export function useChatFlow(composer: ComposerApi) {
  const { state, actions } = useStore()
  const { openComposer, taRef, resize } = composer
  const replyTimer = useRef<number | undefined>(undefined)
  const pending = useRef<ReplyKey | null>(null)
  const micTimer = useRef<number | undefined>(undefined)

  const deliver = useCallback(
    (key: ReplyKey, celebrate: boolean) => {
      pending.current = null
      actions.setThinking(false)
      actions.setMsgs((prev) => [...prev, { from: 'maya', key, time: now() }])
      if (celebrate && getR(key).mood === 'celebrate') actions.confetti()
    },
    [actions],
  )

  const cancelPending = useCallback(() => {
    window.clearTimeout(replyTimer.current)
    pending.current = null
  }, [])

  const userSays = useCallback(
    (text: string, key: ReplyKey) => {
      actions.setMsgs((prev) => [...prev, { from: 'me', text, time: now() }])
      actions.setThinking(true)
      window.clearTimeout(replyTimer.current)
      pending.current = key
      replyTimer.current = window.setTimeout(() => deliver(key, true), reduced ? 400 : 1400)
    },
    [actions, deliver],
  )

  const listening = state.listening
  const toggleMic = useCallback(() => {
    if (listening) {
      actions.setListening(false)
      window.clearTimeout(micTimer.current)
      micTimer.current = undefined
      return
    }
    actions.setListening(true)
    micTimer.current = window.setTimeout(() => {
      micTimer.current = undefined
      const ta = taRef.current
      if (!ta) return
      ta.value = MIC_TEXT
      openComposer(true)
      resize()
      actions.setListening(false)
      actions.toast('Speech is simulated in this prototype')
    }, 2400)
  }, [listening, actions, taRef, openComposer, resize])

  useEffect(
    () => () => {
      // Leaving the screen: finish a reply that is still "thinking" and drop the simulated mic.
      window.clearTimeout(replyTimer.current)
      const key = pending.current
      if (key) deliver(key, false)
      if (micTimer.current !== undefined) {
        window.clearTimeout(micTimer.current)
        actions.setListening(false)
      }
    },
    [actions, deliver],
  )

  return { userSays, toggleMic, cancelPending }
}
