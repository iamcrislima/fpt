/**
 * SkeletonLoader — coleção de placeholders animados por página.
 * Usa classes de src/styles/Skeleton.css (importado em main.jsx).
 */

/* ── News Card (Home carrossel / Notícias) ─────────────────────────── */
export function SkeletonNewsCard() {
  return (
    <div className="skeleton-news-card">
      <div className="skeleton skeleton-news-card__img" />
      <div className="skeleton-news-card__body">
        <div className="skeleton skeleton-text skeleton-text--sm" style={{ width: '40%' }} />
        <div className="skeleton skeleton-text skeleton-text--lg" />
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
      </div>
    </div>
  )
}

/* ── Event Card (Calendário / Home) ────────────────────────────────── */
export function SkeletonEventCard() {
  return (
    <div className="skeleton-event-card">
      <div className="skeleton skeleton-event-card__date" />
      <div className="skeleton-event-card__body">
        <div className="skeleton skeleton-text skeleton-text--lg" style={{ width: '70%' }} />
        <div className="skeleton skeleton-text skeleton-text--sm" style={{ width: '50%' }} />
        <div className="skeleton skeleton-text skeleton-text--sm" style={{ width: '35%' }} />
      </div>
    </div>
  )
}

/* ── Tournament Card (Torneios) ─────────────────────────────────────── */
export function SkeletonTournamentCard() {
  return (
    <div className="skeleton-tournament-card">
      <div className="skeleton skeleton-tournament-card__img" />
      <div className="skeleton-tournament-card__body">
        <div className="skeleton skeleton-text skeleton-text--sm" style={{ width: '30%' }} />
        <div className="skeleton skeleton-text skeleton-text--lg" />
        <div className="skeleton skeleton-text" style={{ width: '60%' }} />
        <div className="skeleton skeleton-text skeleton-text--sm" style={{ width: '45%' }} />
      </div>
    </div>
  )
}

/* ── Ranking Row ────────────────────────────────────────────────────── */
export function SkeletonRankingRow() {
  return (
    <div className="skeleton-rk-row">
      <div className="skeleton skeleton-rk-row__pos skeleton-circle" />
      <div className="skeleton skeleton-rk-row__avatar skeleton-circle" />
      <div className="skeleton-rk-row__body">
        <div className="skeleton skeleton-text" style={{ width: '55%' }} />
        <div className="skeleton skeleton-text skeleton-text--sm" style={{ width: '35%' }} />
      </div>
      <div className="skeleton skeleton-rk-row__pts" />
    </div>
  )
}

/* ── Ranking Podium (top 3) ─────────────────────────────────────────── */
export function SkeletonRankingPodium() {
  return (
    <div className="skeleton-rk-podium">
      {/* 2º lugar */}
      <div className="skeleton-rk-podium__item">
        <div className="skeleton skeleton-circle skeleton-rk-podium__avatar" />
        <div className="skeleton skeleton-rk-podium__bar" style={{ height: 60 }} />
      </div>
      {/* 1º lugar */}
      <div className="skeleton-rk-podium__item">
        <div className="skeleton skeleton-circle skeleton-rk-podium__avatar skeleton-rk-podium__avatar--lg" />
        <div className="skeleton skeleton-rk-podium__bar" style={{ height: 90 }} />
      </div>
      {/* 3º lugar */}
      <div className="skeleton-rk-podium__item">
        <div className="skeleton skeleton-circle skeleton-rk-podium__avatar" />
        <div className="skeleton skeleton-rk-podium__bar" style={{ height: 44 }} />
      </div>
    </div>
  )
}

/* ── Notícias Card (Noticias page) ──────────────────────────────────── */
export function SkeletonNtCard() {
  return (
    <div className="skeleton-nt-card">
      <div className="skeleton skeleton-nt-card__img" />
      <div className="skeleton-nt-card__body">
        <div className="skeleton skeleton-text skeleton-text--sm" style={{ width: '30%' }} />
        <div className="skeleton skeleton-text skeleton-text--xl" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" style={{ width: '70%' }} />
      </div>
    </div>
  )
}

/* ── Lista de n skeletons ────────────────────────────────────────────── */
export function SkeletonList({ Component, count = 4, ...props }) {
  return Array.from({ length: count }, (_, i) => (
    <Component key={i} {...props} />
  ))
}
