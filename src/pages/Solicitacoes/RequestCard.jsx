import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { REQUEST_TYPE_LABELS } from './data'
import RequestStatusBadge from './RequestStatusBadge'

function formatDate(iso) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  }).format(new Date(iso))
}

export default function RequestCard({ request, onClick }) {
  return (
    <button className="req-card" onClick={onClick}>
      <div className="req-card-body">
        <div className="req-card-top">
          <span className="req-card-type">
            {REQUEST_TYPE_LABELS[request.type]}
          </span>
          <RequestStatusBadge status={request.status} />
        </div>
        <span className="req-card-date">{formatDate(request.createdAt)}</span>
      </div>
      <FontAwesomeIcon icon={faChevronRight} className="req-card-arrow" />
    </button>
  )
}
