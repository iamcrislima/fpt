import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { CLUBS, MOCK_SPORT_PROFILE } from './data'

export default function ClubTransferForm({ onSubmit, onCancel, submitting }) {
  const profile = MOCK_SPORT_PROFILE // TODO: replace with useAuth() extended profile

  const [search,      setSearch]      = useState('')
  const [toClub,      setToClub]      = useState('')
  const [reason,      setReason]      = useState('')
  const [showResults, setShowResults] = useState(false)

  const results = search.length > 1
    ? CLUBS.filter(c =>
        c.toLowerCase().includes(search.toLowerCase()) &&
        c !== profile.clube
      )
    : []

  function selectClub(club) {
    setToClub(club)
    setSearch(club)
    setShowResults(false)
  }

  function handleSearchChange(e) {
    setSearch(e.target.value)
    setToClub('')
    setShowResults(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!toClub) return
    await onSubmit('club_transfer', {
      fromClub: profile.clube,
      toClub,
      reason,
    })
  }

  return (
    <form className="req-form" onSubmit={handleSubmit} noValidate>
      <h2 className="req-form-title">Transferência de Clube</h2>

      <div className="req-notice req-notice--info">
        <FontAwesomeIcon icon={faInfoCircle} />
        Tempo médio de aprovação: 2 dias úteis. Sempre passa por análise manual.
      </div>

      {/* Current club (read-only) */}
      <div className="req-field">
        <label className="req-label">Clube atual</label>
        <div className="req-readonly">{profile.clube}</div>
      </div>

      {/* Target club search */}
      <div className="req-field req-search-wrap">
        <label className="req-label" htmlFor="club-search">
          Clube destino
        </label>
        <div className="req-search-input-wrap">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="req-search-icon" />
          <input
            id="club-search"
            type="text"
            className="req-input req-input--search"
            placeholder="Pesquisar clube filiado..."
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 150)}
            autoComplete="off"
          />
        </div>
        {showResults && results.length > 0 && (
          <div className="req-search-results" role="listbox">
            {results.map(club => (
              <button
                key={club}
                type="button"
                role="option"
                className="req-search-result"
                onMouseDown={() => selectClub(club)}
              >
                {club}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reason (optional) */}
      <div className="req-field">
        <label className="req-label" htmlFor="club-reason">
          Motivo <span className="req-label-optional">(opcional)</span>
        </label>
        <textarea
          id="club-reason"
          className="req-textarea"
          rows={3}
          placeholder="Informe o motivo da transferência..."
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
      </div>

      <div className="req-form-actions">
        <button type="button" className="req-btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button
          type="submit"
          className="req-btn-primary"
          disabled={!toClub || submitting}
        >
          {submitting ? 'Enviando...' : 'Enviar solicitação'}
        </button>
      </div>
    </form>
  )
}
