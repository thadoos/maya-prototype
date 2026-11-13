import type { IconName } from '../icons'
import type { PastChat, Reply, ReplyKey, TopicId } from '../types'

export const STARTERS: Record<TopicId, readonly [text: string, icon: IconName]> = {
  fatigue: ['I get tired and need a daily pacing plan', 'bolt'],
  falls: ['What home changes reduce fall risk?', 'home'],
  isolated: ['How can I feel less isolated?', 'people'],
  independent: ['I want to stay independent as mobility changes', 'hand'],
  hobbies: ['What hobbies can I adapt as things change?', 'palette'],
  care: ['Explain my care options in simple steps', 'steps'],
  calm: ['Help me feel calmer on a difficult day', 'leaf'],
  others: ['How can I support other people with ALS?', 'heart'],
}

/** Which scripted reply a starter card triggers. */
export const STARTER_KEY: Record<TopicId, ReplyKey> = {
  fatigue: 'pacing',
  falls: 'falls',
  isolated: 'isolated',
  calm: 'calm',
  care: 'care',
  independent: 'generic',
  hobbies: 'generic',
  others: 'generic',
}

const SRC_MND = 'MND Association: Fatigue and MND (information sheet)'
const SRC_NICE = 'NICE guideline NG42: Motor neurone disease, assessment and management'

export const R: Record<ReplyKey, Reply> = {
  tired: {
    parts: [
      ['p', 'Thank you for telling me. Tiredness with MND is real, and it isn’t something you have to push through.'],
      ['p', 'Would a gentle pacing plan help, or would you rather just talk for a bit?'],
    ],
    choices: [['Make a pacing plan', 'pacing'], ['Just talk for a bit', 'chat'], ['Something calming', 'calm']],
  },
  pacing: {
    parts: [
      ['p', 'Here’s a gentle plan to try. Change anything that doesn’t fit your day.'],
      ['ul', [
        'Morning: do the one task that matters most while your energy is highest.',
        'Late morning: rest for 20 minutes, even if you don’t sleep.',
        'Afternoon: keep to light activities, and sit for tasks you’d usually stand for.',
        'Evening: set things out for tomorrow so the morning starts easier.',
      ]],
      ['p', 'Many people find it helps to note their energy each day. I can add a quick check-in to your Journey.'],
    ],
    sources: [SRC_MND, SRC_NICE],
    choices: [['Add a daily check-in', 'checkin'], ['Tips to save energy', 'energy'], ['That helps, thank you', 'thanks']],
  },
  energy: {
    parts: [
      ['p', 'A few small changes can save a lot of energy:'],
      ['ul', [
        'Keep things you use every day between waist and shoulder height.',
        'Use a perching stool in the kitchen or bathroom.',
        'Spread heavier jobs across the week rather than one day.',
        'Ask an occupational therapist about equipment that could help.',
      ]],
    ],
    sources: [SRC_MND],
    choices: [['Add a daily check-in', 'checkin'], ['That helps, thank you', 'thanks']],
  },
  falls: {
    parts: [
      ['p', 'Small changes at home can make a real difference to safety:'],
      ['ul', [
        'Clear walkways and remove loose rugs and trailing cables.',
        'Add grab rails by the toilet, bath and stairs.',
        'Use night lights between the bedroom and bathroom.',
        'Ask your care team for a home assessment by an occupational therapist.',
      ]],
    ],
    sources: [SRC_NICE, 'MND Association: Equipment and home adaptations'],
    choices: [['How do I get a home assessment?', 'care'], ['That helps, thank you', 'thanks']],
  },
  isolated: {
    parts: [
      ['p', 'Feeling isolated is really common, and you deserve connection.'],
      ['p', 'Some people find it helps to join a local MND group, try online communities, or set up one regular call each week with someone they trust.'],
      ['p', 'Would you like help with one of these?'],
    ],
    sources: ['MND Association: Local groups and support'],
    choices: [['Find a support group', 'care'], ['Plan a weekly call', 'week'], ['Just talk for a bit', 'chat']],
  },
  calm: {
    parts: [
      ['p', 'Let’s breathe together. Watch me: breathe in as I grow, and out as I get smaller.'],
      ['breathe'],
      ['p', 'Do this for as long as feels good.'],
    ],
    choices: [['That helped', 'thanks'], ['Something else', 'chat']],
  },
  help: {
    parts: [
      ['p', 'If you feel unsafe or in crisis, please reach out to someone right now.'],
      ['ul', [
        'In an emergency in the UK, call 999.',
        'Samaritans are there day and night on 116 123.',
        'Your MND care team can help with anything that’s worrying you.',
      ]],
      ['p', 'I’ll stay right here with you.'],
    ],
    choices: [['Try something calming', 'calm'], ['Tell Maya about it', 'chat']],
  },
  chat: {
    parts: [['p', 'I’m listening. Tell me whatever’s on your mind, in your own words. You can type below or use the microphone.']],
  },
  checkin: {
    parts: [['p', 'Done! I’ve added a gentle energy check-in to your Journey. I’ll ask you once each morning.']],
    mood: 'celebrate',
    choices: [['Tips to save energy', 'energy'], ['Thank you, Maya', 'thanks']],
  },
  thanks: {
    parts: [['p', 'Anytime, Sam. I’ll be right here whenever you need me.']],
    mood: 'celebrate',
  },
  week: {
    parts: [
      ['p', 'Let’s keep the week balanced. Pick one thing you’re looking forward to, one thing that needs doing, and one rest day.'],
      ['p', 'Tell me those three and I’ll set them out for you.'],
    ],
  },
  care: {
    parts: [
      ['p', 'Here’s how care usually works, step by step:'],
      ['ul', [
        'Your specialist MND team coordinates your care, often through a care coordinator.',
        'Your GP can refer you to therapists such as an occupational therapist or speech and language therapist.',
        'Social care can help with support at home. Your local council can assess what you need.',
      ]],
      ['p', 'Would you like me to help you write questions for your next appointment?'],
    ],
    sources: [SRC_NICE],
    choices: [['Help with my questions', 'chat'], ['That helps, thank you', 'thanks']],
  },
  generic: {
    parts: [
      ['p', 'Thank you for sharing that with me. Let me find information that fits, from sources I trust.'],
      ['p', 'In the full app I’d answer this from verified ALS/MND research. In this prototype, try one of the suggestions below.'],
    ],
    choices: [['Make a pacing plan', 'pacing'], ['Something calming', 'calm'], ['Safety at home', 'falls']],
  },
}

export function getR(key: ReplyKey): Reply {
  return R[key]
}

/** First paragraph of a reply, used as the history-row preview. */
export function preview(key: ReplyKey): string {
  const p = getR(key).parts.find((x) => x[0] === 'p')
  return p && p[0] === 'p' ? p[1] : ''
}

/** Maps free text to a scripted reply key (the prototype's fake NLU). */
export function keyFor(text: string): ReplyKey {
  const t = text.toLowerCase()
  if (/tired|fatigue|energy|exhaust/.test(t)) return 'tired'
  if (/lonely|alone|isolat/.test(t)) return 'isolated'
  if (/fall|trip|stairs|safe/.test(t)) return 'falls'
  if (/anxious|scared|stress|calm|panic|worried/.test(t)) return 'calm'
  if (/thank/.test(t)) return 'thanks'
  return 'generic'
}

/** Past chats are scripted replays built from the reply bank. */
export const PAST: readonly PastChat[] = [
  { title: 'Pacing plan for tired afternoons', when: 'Yesterday', icon: 'bolt', msgs: [['me', 'I’ve been feeling really tired in the afternoons'], ['maya', 'tired'], ['me', 'Make a pacing plan'], ['maya', 'pacing']] },
  { title: 'Feeling on my own', when: 'Monday', icon: 'people', msgs: [['me', 'How can I feel less isolated?'], ['maya', 'isolated']] },
  { title: 'Making home safer', when: '28 October', icon: 'home', msgs: [['me', 'What home changes reduce fall risk?'], ['maya', 'falls']] },
  { title: 'How my care works', when: '21 October', icon: 'steps', msgs: [['me', 'Explain my care options in simple steps'], ['maya', 'care']] },
  { title: 'Saving energy around the house', when: '14 October', icon: 'bolt', msgs: [['me', 'How can I save energy around the house?'], ['maya', 'energy']] },
  { title: 'Breathing on a hard evening', when: '9 October', icon: 'leaf', msgs: [['me', 'Help me feel calmer on a difficult day'], ['maya', 'calm']] },
]
