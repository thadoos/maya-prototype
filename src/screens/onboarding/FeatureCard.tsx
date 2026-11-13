import { Icon } from '../../icons'
import { useNm } from '../../store'
import type { Feature } from '../../types'

interface FeatureCardProps {
  feature: Feature
  /** '', 'seen' or 'new' */
  cls?: string
}

export function FeatureCard({ feature, cls = '' }: FeatureCardProps) {
  const t = useNm()
  const [icon, title, body] = feature
  return (
    <div className={cls ? `feature ${cls}` : 'feature'}>
      <span className="ic"><Icon name={icon} /></span>
      <span><b>{t(title)}</b>{t(body)}</span>
    </div>
  )
}
