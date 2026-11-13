import { HELP_SAY } from '../../data/onboarding'
import type { MascotState } from '../../components/Mascot'
import type { AppState } from '../../store'
import type { StepId } from '../../types'
import { reduced } from '../../util'

export interface StepCopy {
  say: string
  small: string
  mascot: MascotState
}

type CopyState = Pick<AppState, 'name' | 'control' | 'practiced' | 'featureShown'>

/** Bubble text and initial mascot state per step (before the nm() rewrite). */
export function stepCopy(id: StepId, s: CopyState): StepCopy {
  switch (id) {
    case 'style':
      return { say: 'Who would you like by your side?', small: 'Pick a companion. You can change this any time in Settings.', mascot: 'idle' }
    case 'name':
      return { say: 'Hi! I’m Maya. What should I call you?', small: 'Your first name or a nickname is perfect.', mascot: 'wave' }
    case 'hello':
      return {
        say: `Lovely to meet you, ${s.name}!`,
        small: 'I’m a companion for life with ALS and MND. I’ll help you find good information and keep track of what matters to you.',
        mascot: 'wave',
      }
    case 'who':
      return { say: 'Who are we doing this for?', small: 'This helps me choose the right words and suggestions.', mascot: 'idle' }
    case 'control':
      if (!s.control) {
        return { say: 'How do you usually use your screen?', small: 'I’ll adjust myself so everything is comfortable to reach.', mascot: 'idle' }
      }
      if (s.control === 'eye') {
        return {
          say: s.practiced ? 'You did it! That was perfect.' : 'Let’s practise together.',
          small: s.practiced
            ? 'If it felt too quick or too slow, change the speed below. You can change this any time in Settings.'
            : 'Rest your eyes on the sun until it fills up. Little wobbles are fine, I’ll wait for you.',
          mascot: s.practiced ? 'celebrate' : 'idle',
        }
      }
      if (s.control === 'speech') {
        return {
          say: 'Lovely, I’ll keep the microphone close by.',
          small: 'In chat, the microphone sits right next to the message box. Select it and speak whenever you like.',
          mascot: 'listen',
        }
      }
      return {
        say: 'Great, I’ll keep everything big and easy to reach.',
        small: 'If you ever want to try eye tracking, you can turn on Look to select in Settings.',
        mascot: 'happy',
      }
    case 'help':
      return { say: HELP_SAY[s.featureShown] ?? '', small: '', mascot: s.featureShown === 3 ? 'happy' : 'idle' }
    case 'promise':
      return {
        say: 'One honest thing before we start.',
        small: 'I’m not a doctor. For medical decisions, your care team always comes first, and I’ll tell you when something needs them.',
        mascot: reduced ? 'concern' : 'idle',
      }
    case 'topics':
      return { say: 'What’s been on your mind lately?', small: 'Pick as many as you like. I’ll keep these ready for you.', mascot: 'think' }
    case 'ready':
      return { say: `I’m so glad you’re here, ${s.name}.`, small: 'Whenever you’re ready, I am too.', mascot: 'celebrate' }
  }
}
