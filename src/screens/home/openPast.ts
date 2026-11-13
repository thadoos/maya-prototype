import { PAST } from '../../data/chat'
import type { Actions } from '../../store'
import type { ChatMsg } from '../../types'

/** Loads a scripted past chat into the live thread and opens the chat screen. */
export function openPast(actions: Actions, id: string): void {
  const c = PAST[Number(id)]
  if (!c) return
  const msgs: ChatMsg[] = c.msgs.map(([from, v]) =>
    from === 'me' ? { from: 'me', text: v, time: c.when } : { from: 'maya', key: v, time: c.when },
  )
  actions.setMsgs(msgs)
  actions.setGreeted(false)
  actions.setThinking(false)
  actions.setCurrentChat(id)
  actions.go('chat')
}
