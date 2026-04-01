import TournamentsSection from '../../components/TournamentsSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const calendarios = [
  'Calendário Torneios INFANTO 2026 (04/03/2026)',
  'Calendário Torneios CLASSES 2026 (04/03/2026)',
  'Calendário Torneios BEACH 2026 (24/02/2026)',
]

export default function Calendario() {
  return (
    <main className="demfin-page">

      <div className="trn-banner">
        <div>
          <p className="trn-banner-title" style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginLeft: 0 }}>
            Transparência
          </p>
          <p className="trn-banner-title" style={{ marginLeft: 0 }}>
            Calendário — Formato PDF
          </p>
        </div>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">
        <h1 className="trs-section-title">Calendário</h1>

        <div className="demfin-grid">
          {calendarios.map((titulo, i) => (
            <div key={i} className="trs-doc-card">
              <div className="trs-doc-card-header">
                {titulo}
              </div>
              <div className="trs-doc-card-body">
                <a href="#" className="trs-download-btn" onClick={e => e.preventDefault()}>
                  <FontAwesomeIcon icon={faDownload} style={{ width: 14, height: 14 }} />
                  Download Arquivo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TournamentsSection />
    </main>
  )
}
