import type { ChatMsg, MayaMsg, PastChat, ReplyKey } from '../../types'

export const isMaya = (m: ChatMsg): m is MayaMsg => m.from === 'maya'

/** Key of the most recent Maya reply in a thread, if any. */
export function lastMayaKey(msgs: readonly ChatMsg[]): ReplyKey | undefined {
  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i]
    if (isMaya(m)) return m.key
  }
  return undefined
}

/** Key of the last Maya reply in a scripted past chat. */
export function pastLastKey(c: PastChat): ReplyKey | undefined {
  for (let i = c.msgs.length - 1; i >= 0; i--) {
    const m = c.msgs[i]
    if (m[0] === 'maya') return m[1]
  }
  return undefined
}
