import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

function formatDeadline(isoDate) {
  if (!isoDate) return null
  const date = new Date(isoDate + 'T00:00:00')
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function EventCard({ event }) {
  const { title, category, location, registrationDeadline, image } = event
  const deadline = formatDeadline(registrationDeadline)

  return (
    <article className="event-card">
      <div className="event-card__thumb">
        {image
          ? <img src={image} alt={title} loading="lazy" />
          : <div className="event-card__thumb-placeholder" />
        }
      </div>

      <div className="event-card__body">
        <p className="event-card__title" title={title}>{title}</p>
        <p className="event-card__category">{category}</p>

        <div className="event-card__meta">
          <span className="event-card__meta-row">
            <FontAwesomeIcon icon={faLocationDot} fixedWidth />
            {location}
          </span>

          {deadline && (
            <span className="event-card__meta-row">
              <FontAwesomeIcon icon={faCalendarDays} fixedWidth />
              <span className="event-card__deadline-badge">
                Inscrições até {deadline}
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
