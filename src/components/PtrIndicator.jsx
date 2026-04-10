/**
 * PtrIndicator — bolinha que aparece no topo durante pull-to-refresh.
 * Classes CSS vêm de mobile-enhancements.css.
 *
 * @param {{ loading: boolean, ratio: number }} props
 *   ratio — 0..1+ (progresso do arrasto; >=1 = threshold atingido)
 */
export default function PtrIndicator({ loading, ratio }) {
  const visible = loading || ratio > 0.15
  return (
    <div
      className={[
        'ptr-indicator',
        visible  ? 'ptr-indicator--visible'  : '',
        loading  ? 'ptr-indicator--loading'  : '',
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
      style={!loading ? { opacity: Math.min(ratio, 1) } : undefined}
    >
      <i className="fa-solid fa-arrows-rotate" />
    </div>
  )
}
