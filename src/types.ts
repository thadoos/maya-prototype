import type { ReactNode } from 'react'
import type { IconName } from './icons'

export type Screen = 'login' | 'onboarding' | 'home' | 'chat'
export const SCREENS: readonly Screen[] = ['login', 'onboarding', 'home', 'chat']
export type Style = 'cute' | 'formal'
export type Theme = 'auto' | 'light' | 'dark'
export type TextSize = 'm' | 'l' | 'xl'
export type Role = 'self' | 'carer'
export type Control = 'touch' | 'eye' | 'speech'

export type TopicId =
  | 'fatigue'
  | 'falls'
  | 'isolated'
  | 'independent'
  | 'hobbies'
  | 'care'
  | 'calm'
  | 'others'

export type StepId =
  | 'style'
  | 'name'
  | 'hello'
  | 'who'
  | 'control'
  | 'help'
  | 'promise'
  | 'topics'
  | 'ready'

export type ReplyKey =
  | 'tired'
  | 'pacing'
  | 'energy'
  | 'falls'
  | 'isolated'
  | 'calm'
  | 'help'
  | 'chat'
  | 'checkin'
  | 'thanks'
  | 'week'
  | 'care'
  | 'generic'

export type ReplyPart =
  | readonly ['p', string]
  | readonly ['ul', readonly string[]]
  | readonly ['breathe']

export interface Reply {
  parts: readonly ReplyPart[]
  sources?: readonly string[]
  choices?: readonly (readonly [label: string, key: ReplyKey])[]
  mood?: 'celebrate'
}

export interface UserMsg {
  from: 'me'
  text: string
  time: string
}
export interface MayaMsg {
  from: 'maya'
  key: ReplyKey
  time: string
  /** sources panel open */
  open?: boolean
  fb?: 'up' | 'down' | null
}
export type ChatMsg = UserMsg | MayaMsg

export interface PastChat {
  title: string
  when: string
  icon: IconName
  msgs: readonly (readonly ['me', string] | readonly ['maya', ReplyKey])[]
}

export type Feature = readonly [icon: IconName, title: string, body: string]

export interface OverlayState {
  node: ReactNode
  /** extra class on .scrim, e.g. 'center' */
  cls?: string
}
