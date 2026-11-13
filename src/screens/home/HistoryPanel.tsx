import { PAST } from '../../data/chat'
import { Icon } from '../../icons'
import { useStore } from '../../store'
import { HistRow } from './HistRow'
import { pastLastKey } from './lastMaya'
import { openPast } from './openPast'

/** Overlay body for "View full history": every past chat, opens one on click. */
export function HistoryPanel() {
  const { actions } = useStore()
  return (
    <aside className="panel" role="dialog" aria-modal="true" aria-label="All chats">
      <div className="panel-head">
        <h2>All your chats</h2>
        <button className="btn btn-soft btn-icon" data-close aria-label="Close">
          <Icon name="x" />
        </button>
      </div>
      <div className="hist-list">
        {PAST.map((c, i) => (
          <HistRow
            key={i}
            title={c.title}
            when={c.when}
            icon={c.icon}
            lastKey={pastLastKey(c)}
            onOpen={() => {
              actions.closeOverlay()
              openPast(actions, String(i))
            }}
          />
        ))}
      </div>
    </aside>
  )
}
