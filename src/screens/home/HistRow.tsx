import { preview } from '../../data/chat'
import { Icon } from '../../icons'
import type { IconName } from '../../icons'
import { useNm } from '../../store'
import type { ReplyKey } from '../../types'

interface HistRowProps {
  title: string
  when: string
  icon: IconName
  lastKey: ReplyKey | undefined
  /** The live chat (highlighted). */
  now?: boolean
  onOpen: () => void
}

export function HistRow({ title, when, icon, lastKey, now = false, onOpen }: HistRowProps) {
  const t = useNm()
  return (
    <button className={'hist-row' + (now ? ' now' : '')} onClick={onOpen}>
      <span className="ic">
        <Icon name={icon} />
      </span>
      <span className="txt">
        <b>{t(title)}</b>
        <span className="d">{t('Maya: ' + (lastKey ? preview(lastKey) : ''))}</span>
      </span>
      <span className="when">{when}</span>
    </button>
  )
}
