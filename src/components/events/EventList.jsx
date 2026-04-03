import EventCard from './EventCard'

const SKELETON_COUNT = 6

function EventSkeleton() {
  return (
    <div className="event-skeleton" aria-hidden="true">
      <div className="event-skeleton__thumb skeleton-block" />
      <div className="event-skeleton__body">
        <div className="skeleton-block" style={{ height: 16, width: '70%' }} />
        <div className="skeleton-block" style={{ height: 13, width: '45%' }} />
        <div className="skeleton-block" style={{ height: 12, width: '55%', marginTop: 4 }} />
        <div className="skeleton-block" style={{ height: 20, width: '60%', marginTop: 2 }} />
      </div>
    </div>
  )
}

function EventEmpty() {
  return (
    <div className="event-empty">
      <span className="event-empty__icon" aria-hidden="true">📅</span>
      <p className="event-empty__text">Nenhum evento disponível nesta categoria no momento.</p>
    </div>
  )
}

export default function EventList({ events, loading }) {
  if (loading) {
    return (
      <div className="events-grid">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <EventSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="events-grid">
        <EventEmpty />
      </div>
    )
  }

  return (
    <div className="events-grid events-tab-panel">
      {events.slice(0, 6).map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
