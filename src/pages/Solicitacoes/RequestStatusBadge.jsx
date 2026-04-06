import { STATUS_CONFIG } from './data'

export default function RequestStatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status]
  if (!cfg) return null
  return (
    <span className={`req-status req-status--${cfg.variant}`}>
      {cfg.label}
    </span>
  )
}
