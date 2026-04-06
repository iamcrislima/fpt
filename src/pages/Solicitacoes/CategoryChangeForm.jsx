import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faInfoCircle, faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { CATEGORIES, CATEGORY_REQUIREMENTS, MOCK_SPORT_PROFILE } from './data'
import { Button } from '../../components/ui/Button'

function getEligibility(pontos, toCategory) {
  const req = CATEGORY_REQUIREMENTS[toCategory]
  if (!req) return null
  if (pontos >= req.auto)   return 'auto'
  if (pontos >= req.review) return 'review'
  return 'blocked'
}

export default function CategoryChangeForm({ onSubmit, onCancel, submitting }) {
  const profile = MOCK_SPORT_PROFILE // TODO: replace with useAuth() extended profile
  const currentIndex = CATEGORIES.indexOf(profile.categoria)
  const eligibleCategories = CATEGORIES.slice(currentIndex + 1)

  const [toCategory, setToCategory] = useState('')
  const [justification, setJustification] = useState('')

  const eligibility = toCategory ? getEligibility(profile.pontos, toCategory) : null
  const needsJustification = eligibility === 'review'
  const canSubmit =
    toCategory &&
    eligibility !== 'blocked' &&
    (!needsJustification || justification.trim().length > 0)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    await onSubmit('category_change', {
      fromCategory: profile.categoria,
      toCategory,
      justification,
      autoApprove: eligibility === 'auto',
    })
  }

  return (
    <form className="req-form" onSubmit={handleSubmit} noValidate>
      <h2 className="req-form-title">Alteração de Categoria</h2>

      {/* User status */}
      <div className="req-info-card">
        <div className="req-info-row">
          <span className="req-info-label">Categoria atual</span>
          <span className="req-info-value req-info-value--highlight">{profile.categoria}</span>
        </div>
        <div className="req-info-row">
          <span className="req-info-label">Pontuação atual</span>
          <span className="req-info-value">{profile.pontos} pts</span>
        </div>

        {toCategory && CATEGORY_REQUIREMENTS[toCategory] && (
          <>
            <div className="req-info-divider" />
            <div className="req-info-row">
              <span className="req-info-label">Aprovação automática em {toCategory}</span>
              <span className="req-info-value">{CATEGORY_REQUIREMENTS[toCategory].auto} pts</span>
            </div>
            <div className="req-info-row">
              <span className="req-info-label">Pode solicitar a partir de</span>
              <span className="req-info-value">{CATEGORY_REQUIREMENTS[toCategory].review} pts</span>
            </div>
          </>
        )}
      </div>

      {/* Category selector */}
      <div className="req-field">
        <label className="req-label" htmlFor="cat-select">
          Categoria desejada
        </label>
        <select
          id="cat-select"
          className="req-select"
          value={toCategory}
          onChange={e => setToCategory(e.target.value)}
          required
        >
          <option value="">Selecione...</option>
          {eligibleCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Eligibility feedback */}
      {eligibility === 'auto' && (
        <div className="req-notice req-notice--success">
          <FontAwesomeIcon icon={faCircleCheck} />
          Você tem pontos suficientes para aprovação automática!
        </div>
      )}
      {eligibility === 'review' && (
        <div className="req-notice req-notice--info">
          <FontAwesomeIcon icon={faInfoCircle} />
          Sua solicitação passará por análise manual. Adicione uma justificativa.
        </div>
      )}
      {eligibility === 'blocked' && (
        <div className="req-notice req-notice--warning">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          Pontuação insuficiente. Necessário: {CATEGORY_REQUIREMENTS[toCategory]?.review} pts
          &nbsp;— Atual: {profile.pontos} pts.
        </div>
      )}

      {/* Justification (only when manual review) */}
      {needsJustification && (
        <div className="req-field">
          <label className="req-label" htmlFor="cat-justification">
            Justificativa <span className="req-label-required">*</span>
          </label>
          <textarea
            id="cat-justification"
            className="req-textarea"
            rows={4}
            placeholder="Explique o motivo da solicitação..."
            value={justification}
            onChange={e => setJustification(e.target.value)}
            required
          />
        </div>
      )}

      <div className="req-form-actions">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <button
          type="submit"
          className="req-btn-primary"
          disabled={!canSubmit || submitting}
        >
          {submitting ? 'Enviando...' : 'Enviar solicitação'}
        </button>
      </div>
    </form>
  )
}
