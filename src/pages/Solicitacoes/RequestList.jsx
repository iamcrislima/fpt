import RequestCard from './RequestCard'

function SkeletonCard() {
  return <div className="req-skeleton" aria-hidden="true" />
}

function EmptyState() {
  return (
    <div className="req-empty">
      <span className="req-empty-icon" role="img" aria-label="Sem solicitações">📋</span>
      <p className="req-empty-title">Nenhuma solicitação</p>
      <p className="req-empty-sub">
        Você ainda não fez nenhuma solicitação administrativa.
      </p>
    </div>
  )
}

export default function RequestList({ requests, loading, error, onSelect }) {
  if (error) {
    return <div className="req-error" role="alert">{error}</div>
  }

  if (loading) {
    return (
      <div className="req-list">
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (requests.length === 0) return <EmptyState />

  return (
    <div className="req-list">
      {requests.map(req => (
        <RequestCard
          key={req.id}
          request={req}
          onClick={() => onSelect(req.id)}
        />
      ))}
    </div>
  )
}
