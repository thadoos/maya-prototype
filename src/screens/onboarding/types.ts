import type { useMascotState } from '../../components/Mascot'

export type Flash = ReturnType<typeof useMascotState>[1]

/** Shared plumbing handed from the onboarding shell to each step's action area. */
export interface StepProps {
  /** Advance to the next step (clamped). */
  next: () => void
  /** Re-render the whole step from scratch, like the prototype's renderOb(). */
  rerender: () => void
  /** Drive the step mascot. */
  flash: Flash
  /** Replace the speech bubble text (null restores the step's own copy). */
  setSay: (text: string | null) => void
}
