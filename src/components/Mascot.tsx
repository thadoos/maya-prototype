import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useStore } from '../store'

export type MascotState =
  | 'idle'
  | 'wave'
  | 'happy'
  | 'shy'
  | 'celebrate'
  | 'think'
  | 'listen'
  | 'concern'
  | 'sleep'
export type MascotKind = 'cute' | 'formal'

const CuteArt = memo(function CuteArt() {
  return (
    <svg viewBox="0 0 200 210">
      <ellipse className="msh" cx="100" cy="198" rx="54" ry="8"/>
      <g className="m-jump"><g className="m-bob">
        <g className="m-sprout"><path d="M100 54 C100 42 102 33 106 25" fill="none" stroke="var(--m-leaf)" strokeWidth="5" strokeLinecap="round"/>
          <path className="ml" d="M105 27 C112 12 128 10 135 14 C131 27 117 33 105 27Z"/><path className="ml" d="M103 33 C94 22 80 22 75 26 C81 37 96 39 103 33Z" opacity=".8"/></g>
        <g className="m-arm m-arm-l"><ellipse className="mb" cx="37" cy="134" rx="12" ry="20" transform="rotate(20 37 134)"/></g>
        <g className="m-arm m-arm-r"><ellipse className="mb" cx="163" cy="134" rx="12" ry="20" transform="rotate(-20 163 134)"/></g>
        <path className="mb" d="M100 50 C150 50 170 88 170 128 C170 168 140 190 100 190 C60 190 30 168 30 128 C30 88 50 50 100 50Z"/>
        <ellipse className="mbl" cx="100" cy="154" rx="44" ry="29"/>
        <g className="m-brows"><path className="mstroke" d="M64 88 L86 95"/><path className="mstroke" d="M136 88 L114 95"/></g>
        <g className="m-eyes">
          <g className="eye-open"><ellipse className="mi" cx="77" cy="112" rx="11" ry="14"/><circle className="mh" cx="81" cy="106" r="4.3"/><ellipse className="mi" cx="123" cy="112" rx="11" ry="14"/><circle className="mh" cx="127" cy="106" r="4.3"/></g>
          <g className="eye-happy"><path className="mstroke" d="M65 115 Q77 100 89 115"/><path className="mstroke" d="M111 115 Q123 100 135 115"/></g>
          <g className="eye-closed"><path className="mstroke" d="M65 110 Q77 120 89 110"/><path className="mstroke" d="M111 110 Q123 120 135 110"/></g>
        </g>
        <ellipse className="mc" cx="59" cy="132" rx="11" ry="7"/><ellipse className="mc" cx="141" cy="132" rx="11" ry="7"/>
        <path className="mouth-smile mstroke" d="M90 132 Q100 142 110 132"/>
        <path className="mouth-open mi" d="M87 130 L113 130 Q112 149 100 149 Q88 149 87 130Z"/>
        <ellipse className="mouth-o mi" cx="100" cy="137" rx="6" ry="7"/>
        <path className="mouth-flat mstroke" d="M91 138 Q100 133 109 138"/>
        <g className="m-hands"><ellipse className="mhand" cx="75" cy="113" rx="19" ry="17"/><ellipse className="mhand" cx="125" cy="113" rx="19" ry="17"/></g>
        <g className="m-doc">
          <g className="m-steth"><path className="m-tube" d="M46 116 Q52 164 100 164 Q148 164 154 116"/><path className="m-tube" d="M100 164 Q100 182 114 182"/><circle className="m-mir" cx="120" cy="182" r="9"/><circle className="m-mir-in" cx="120" cy="182" r="3.5"/></g>
          <g className="m-mirror"><path className="m-band" d="M46 86 Q100 58 154 86"/><circle className="m-mir" cx="122" cy="70" r="23"/><circle className="m-mir-in" cx="122" cy="70" r="8.3"/><path className="m-mir-hi" d="M109.3 65.4 a13.8 13.8 0 0 1 10.3 -9.2"/></g></g>
      </g></g>
      <g className="m-dots"><circle className="mdot" cx="152" cy="50" r="5"/><circle className="mdot" cx="167" cy="35" r="7"/><circle className="mdot" cx="185" cy="17" r="9"/></g>
      <g className="m-zzz"><text className="mz" x="142" y="52" fontSize="22">z</text><text className="mz" x="160" y="30" fontSize="30">z</text></g>
      <g className="m-spark"><path className="mspark" d="M30 40 l5 11 11 5 -11 5 -5 11 -5 -11 -11 -5 11 -5z"/><path className="mheart" d="M165 40c4-8 16-6 14 3-1 6-14 13-14 13s-13-7-14-13c-2-9 10-11 14-3z"/><path className="mspark" d="M172 100 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4z"/></g>
      <g className="m-cross"><path className="xbg" d="M28 34 L172 186"/><path className="xbg" d="M172 34 L28 186"/><path className="xfg" d="M28 34 L172 186"/><path className="xfg" d="M172 34 L28 186"/></g>
    </svg>
  )
})

const OwlArt = memo(function OwlArt() {
  return (
    <svg viewBox="0 0 200 210">
      <ellipse className="msh" cx="100" cy="201" rx="50" ry="7"/>
      <g className="m-jump"><g className="m-bob">
        <g className="m-sprout"><path className="ob" d="M52 76 L46 34 L86 56Z"/><path className="ob" d="M148 76 L154 34 L114 56Z"/></g>
        <g className="m-arm m-arm-l"><path className="ow" d="M44 104 C26 126 28 166 52 184 C54 152 56 128 62 108Z"/></g>
        <g className="m-arm m-arm-r"><path className="ow" d="M156 104 C174 126 172 166 148 184 C146 152 144 128 138 108Z"/></g>
        <path className="ob" d="M100 46 C142 46 160 68 160 102 L160 150 C160 178 134 194 100 194 C66 194 40 178 40 150 L40 102 C40 68 58 46 100 46Z"/>
        <ellipse className="obl" cx="100" cy="152" rx="40" ry="36"/>
        <path className="ofe" d="M80 142 q6 6 12 0 M96 142 q6 6 12 0 M112 142 q6 6 12 0 M88 158 q6 6 12 0 M104 158 q6 6 12 0 M96 174 q6 6 12 0"/>
        <circle className="of" cx="76" cy="100" r="25"/><circle className="of" cx="124" cy="100" r="25"/>
        <g className="m-brows"><path className="mstroke" d="M58 72 L90 80"/><path className="mstroke" d="M142 72 L110 80"/></g>
        <g className="m-eyes">
          <g className="eye-open"><circle className="mi" cx="76" cy="101" r="10"/><circle className="mh" cx="79.5" cy="97.5" r="3.4"/><circle className="mi" cx="124" cy="101" r="10"/><circle className="mh" cx="127.5" cy="97.5" r="3.4"/></g>
          <g className="eye-happy"><path className="mstroke" d="M65 104 Q76 95 87 104"/><path className="mstroke" d="M113 104 Q124 95 135 104"/></g>
          <g className="eye-closed"><path className="mstroke" d="M65 100 Q76 108 87 100"/><path className="mstroke" d="M113 100 Q124 108 135 100"/></g>
        </g>
        <circle className="ospec" cx="76" cy="100" r="21"/><circle className="ospec" cx="124" cy="100" r="21"/><path className="ospec" d="M97 97 Q100 92 103 97"/>
        <path className="mouth-smile obk" d="M92 120 L108 120 L100 134Z"/>
        <g className="mouth-open"><path className="obk" d="M92 119 L108 119 L100 127Z"/><path className="obk" d="M94 130 L106 130 L100 137Z"/></g>
        <g className="mouth-o"><path className="obk" d="M92 119 L108 119 L100 127Z"/><path className="obk" d="M94 130 L106 130 L100 137Z"/></g>
        <path className="mouth-flat obk" d="M92 121 L108 121 L100 132Z"/>
        <g className="m-hands"><ellipse className="ow" cx="76" cy="100" rx="27" ry="22"/><ellipse className="ow" cx="124" cy="100" rx="27" ry="22"/></g>
        <rect className="obk" x="80" y="189" width="14" height="8" rx="4"/><rect className="obk" x="106" y="189" width="14" height="8" rx="4"/>
        <g className="m-doc">
          <g className="m-steth"><path className="m-tube" d="M44 112 Q50 154 100 154 Q150 154 156 112"/><path className="m-tube" d="M100 154 Q100 174 110 174"/><circle className="m-mir" cx="116" cy="174" r="9"/><circle className="m-mir-in" cx="116" cy="174" r="3.5"/></g>
          <g className="m-mirror"><path className="m-band" d="M42 74 Q100 48 158 74"/><circle className="m-mir" cx="100" cy="52" r="20"/><circle className="m-mir-in" cx="100" cy="52" r="7.2"/><path className="m-mir-hi" d="M89.0 48.0 a12.0 12.0 0 0 1 9.0 -8.0"/></g></g>
      </g></g>
      <g className="m-dots"><circle className="mdot" cx="156" cy="50" r="5"/><circle className="mdot" cx="170" cy="35" r="7"/><circle className="mdot" cx="186" cy="17" r="9"/></g>
      <g className="m-zzz"><text className="mz" x="146" y="50" fontSize="22">z</text><text className="mz" x="164" y="28" fontSize="30">z</text></g>
      <g className="m-spark"><path className="mspark" d="M170 36 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z"/></g>
      <g className="m-cross"><path className="xbg" d="M28 34 L172 186"/><path className="xbg" d="M172 34 L28 186"/><path className="xfg" d="M28 34 L172 186"/><path className="xfg" d="M172 34 L28 186"/></g>
    </svg>
  )
})

interface MascotProps {
  state?: MascotState
  /** Defaults to the current companion style from the store. */
  kind?: MascotKind
  /** Extra classes, e.g. "doc" (costume), "breathe". */
  cls?: string
  /** CSS length for the --ms var, e.g. "300px" or "10rem". */
  size?: string
  /** Sets data-look (e.g. "down" while typing email). */
  look?: 'down'
}

/** Sprout (cute) or owl (formal) companion. Drive `state` from props / useMascotState. */
export function Mascot({ state = 'idle', kind, cls = '', size, look }: MascotProps) {
  const { state: app } = useStore()
  const k = kind ?? app.style
  const style = size ? ({ '--ms': size } as CSSProperties) : undefined
  return (
    <div
      className={`mascot ${cls}`}
      data-kind={k}
      data-state={state}
      data-look={look}
      style={style}
      aria-hidden="true"
    >
      {k === 'formal' ? <OwlArt /> : <CuteArt />}
    </div>
  )
}

/**
 * Replaces setMascot(el, state, ms, after). `flash(state)` sets it; `flash(state, ms, after)`
 * reverts to `after` (default 'idle') after ms. Previous pending revert is cancelled; cleared on unmount.
 */
export function useMascotState(initial: MascotState = 'idle') {
  const [state, setState] = useState<MascotState>(initial)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const flash = useCallback((next: MascotState, ms?: number, after: MascotState = 'idle') => {
    window.clearTimeout(timer.current)
    setState(next)
    if (ms) timer.current = window.setTimeout(() => setState(after), ms)
  }, [])
  return [state, flash] as const
}
