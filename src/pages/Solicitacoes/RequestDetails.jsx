import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faCircleCheck, faClock,
} from '@fortawesome/free-solid-svg-icons'
import { REQUEST_TYPE_LABELS } from './data'
import RequestStatusBadge from './RequestStatusBadge'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDateTime(iso) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso))
}

// ── Timeline ──────────────────────────────────────────────────────────────────

const STEP_ICONS = {
  done:     faCircleCheck,
  current:  faClock,
  rejected: faXmark,
  pending:  null,
}

function TimelineStep({ label, date, state }) {
  const icon = STEP_ICONS[state]
  return (
    <div className={`req-tl-step req-tl-step--${state}`}>
      <div className="req-tl-dot">
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
      <div className="req-tl-content">
        <span className="req-tl-label">{label}</span>
        {date && <span className="req-tl-date">{formatDateTime(date)}</span>}
      </div>
    </div>
  )
}

function buildTimelineSteps(request) {
  const { status, createdAt, updatedAt } = request
  const created = { label: 'Solicitação criada', date: createdAt, state: 'done' }

  if (status === 'approved_auto') {
    return [
      created,
      { label: 'Aprovado automaticamente', date: updatedAt, state: 'done' },
    ]
  }

  const reviewState = status === 'pending_review' ? 'current' : 'done'
  const inReview = {
    label: 'Em análise',
    date: status !== 'pending_review' ? updatedAt : null,
    state: reviewState,
  }

  if (status === 'pending_review') {
    return [created, inReview, { label: 'Aguardando decisão', date: null, state: 'pending' }]
  }

  const finalStep = {
    label: status === 'rejected' ? 'Recusada' : 'Aprovada',
    date: updatedAt,
    state: status === 'rejected' ? 'rejected' : 'done',
  }

  return [created, inReview, finalStep]
}

// ── Payload detail grid ───────────────────────────────────────────────────────

function DetailRow({ label, value, full }) {
  return (
    <div className={`req-detail-row${full ? ' req-detail-row--full' : ''}`}>
      <span className="req-detail-label">{label}</span>
      <span className="req-detail-value">{value}</span>
    </div>
  )
}

function PayloadDetails({ request }) {
  const { type, payload } = request

  if (type === 'category_change') {
    return (
      <div className="req-detail-info">
        <DetailRow label="Categoria atual"     value={payload.fromCategory} />
        <DetailRow label="Categoria solicitada" value={payload.toCategory} />
        {payload.justification && (
          <DetailRow label="Justificativa" value={payload.justification} full />
        )}
      </div>
    )
  }

  if (type === 'club_transfer') {
    return (
      <div className="req-detail-info">
        <DetailRow label="Clube atual"  value={payload.fromClub} />
        <DetailRow label="Clube destino" value={payload.toClub} />
        {payload.reason && (
          <DetailRow label="Motivo" value={payload.reason} full />
        )}
      </div>
    )
  }

  if (type === 'family_registration') {
    return (
      <div className="req-detail-info">
        <DetailRow label="Nome do grupo" value={payload.familyName} full />
        {payload.members?.length > 0 && (
          <DetailRow
            label="Membros"
            value={payload.members.map(m => m.name).join(', ')}
            full
          />
        )}
      </div>
    )
  }

  return null
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RequestDetails({ request, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const steps = buildTimelineSteps(request)

  return (
    <div
      className="req-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes: ${REQUEST_TYPE_LABELS[request.type]}`}
    >
      <div className="req-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="req-modal-header">
          <div>
            <h2 className="req-modal-title">
              {REQUEST_TYPE_LABELS[request.type]}
            </h2>
            <RequestStatusBadge status={request.status} />
          </div>
          <button
            className="req-modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="req-modal-body">
          <h3 className="req-section-label">Detalhes</h3>
          <PayloadDetails request={request} />

          <h3 className="req-section-label">Histórico</h3>
          <div className="req-timeline">
            {steps.map((step, i) => (
              <TimelineStep key={i} {...step} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
