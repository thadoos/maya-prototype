import type { Style } from '../types'

export interface CopyCtx {
  style: Style
  name: string
}

/**
 * Copy rewriting: formal style renames Maya to Rowan; the standalone word "Sam" becomes the user's name.
 * Pure. Apply to any string that mentions the companion or the default user. Do NOT apply to strings
 * that must keep "Maya" (the companion picker card and the Settings companion buttons).
 */
export function nm(text: string, ctx: CopyCtx): string {
  return (ctx.style === 'formal' ? text.replace(/Maya/g, 'Rowan') : text).replace(/\bSam\b/g, ctx.name)
}

export const companionName = (style: Style): string => (style === 'formal' ? 'Rowan' : 'Maya')

export function greet(date: Date = new Date()): string {
  const h = date.getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

/** hh:mm in the user's locale, for message timestamps. */
export const now = (): string => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export const DEFAULT_NAME = 'Sam'
export const DEFAULT_EMAIL = 'sam.taylor@example.com'
