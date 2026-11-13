import type { PointerEvent, MouseEvent } from 'react'
import { Icon } from '../../icons'
import { useNm } from '../../store'
import type { ComposerApi } from './useComposer'

interface ComposerProps {
  c: ComposerApi
  speech: boolean
  listening: boolean
  thinking: boolean
  onSend: (text: string) => void
  onMic: () => void
}

/** Mic + folded "Type to Maya" button + text box. Open/fold classes are driven by useComposer. */
export function Composer({ c, speech, listening, thinking, onSend, onMic }: ComposerProps) {
  const t = useNm()
  const { rowRef, micRef, openBtnRef, formRef, taRef } = c
  // Keep focus in the text box when pressing Send or the mic, so the box does not fold mid-click.
  const keepFocus = (e: PointerEvent | MouseEvent) => {
    if (rowRef.current?.classList.contains('open') && e.target instanceof Element && e.target.closest('button')) {
      e.preventDefault()
    }
  }
  return (
    <div className="composer-wrap gutter">
      <div className="composer-row" ref={rowRef} onPointerDown={keepFocus} onMouseDown={keepFocus}>
        <button
          type="button"
          className={`btn ${speech ? 'btn-sun' : 'btn-soft btn-icon'} mic${listening ? ' on' : ''}`}
          id="mic"
          ref={micRef}
          aria-label="Speak your message"
          aria-pressed={listening}
          onClick={onMic}
        >
          <Icon name="mic" />
          {speech && <span>Speak</span>}
        </button>
        <button
          type="button"
          className="btn btn-soft compose-open"
          id="openComposer"
          ref={openBtnRef}
          onClick={() => c.openComposer(true)}
        >
          <Icon name="keyboard" />
          <span>{c.continueLabel ? 'Continue your message' : t('Type to Maya')}</span>
        </button>
        <form
          className="composer"
          id="composer"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault()
            const ta = taRef.current
            if (!ta) return
            const text = ta.value.trim()
            if (!text || thinking) return
            ta.value = ''
            ta.style.height = ''
            onSend(text)
          }}
        >
          <label className="sr" htmlFor="msg">
            {t('Message Maya')}
          </label>
          <textarea
            id="msg"
            rows={1}
            ref={taRef}
            placeholder={t('Type to Maya, or use the microphone…')}
            onInput={c.resize}
            onBlur={c.onBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                formRef.current?.requestSubmit()
              }
            }}
          />
          <button type="submit" className="btn btn-primary btn-icon" aria-label="Send">
            <Icon name="send" />
          </button>
        </form>
      </div>
    </div>
  )
}
