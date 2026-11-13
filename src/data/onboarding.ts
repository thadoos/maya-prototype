import type { Feature, StepId, TopicId } from '../types'
import type { IconName } from '../icons'

export const STEPS: readonly StepId[] = [
  'style',
  'name',
  'hello',
  'who',
  'control',
  'help',
  'promise',
  'topics',
  'ready',
]

export const TOPICS: readonly (readonly [id: TopicId, label: string, icon: IconName])[] = [
  ['fatigue', 'Energy & tiredness', 'bolt'],
  ['falls', 'Safety at home', 'home'],
  ['isolated', 'Feeling connected', 'people'],
  ['independent', 'Staying independent', 'hand'],
  ['hobbies', 'Hobbies I love', 'palette'],
  ['care', 'Care options', 'steps'],
  ['calm', 'Calmer days', 'leaf'],
  ['others', 'Helping others', 'heart'],
]

export const FEATURES: readonly Feature[] = [
  ['shield', 'Answers you can trust', 'I use verified ALS/MND research, and I always show you where my information came from.'],
  ['journey', 'Your Journey, kept safe', 'What matters to you builds into a Journey you and your care team can look back on.'],
  ['heart', 'Someone to talk to', 'On hard days I’m here to listen, with no rush and no judgement.'],
]

export const HELP_SAY: readonly string[] = [
  'Can I show you how I can help?',
  'First, you can rely on what I tell you.',
  'I’ll also help you keep track of things.',
  'And I’m always here to talk.',
]

/** Selection speed options (label, dwell ms). Used by onboarding eye practice and Settings. */
export const SPEEDS: readonly (readonly [label: string, ms: number])[] = [
  ['Relaxed', 1600],
  ['Steady', 1100],
  ['Quick', 700],
]

export const TEXT_SIZES: readonly (readonly ['m' | 'l' | 'xl', string])[] = [
  ['m', 'Standard'],
  ['l', 'Large'],
  ['xl', 'Extra large'],
]

export const INITIAL_TOPICS: readonly TopicId[] = ['fatigue', 'isolated', 'calm']
