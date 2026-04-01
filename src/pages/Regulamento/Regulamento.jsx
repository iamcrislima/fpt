import TournamentsSection from '../../components/TournamentsSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const regulamentos = [
  'Tabela de Pagamentos de Arbitragem - Tênis e Beach 2026',
  'Resolução do Conselho Diretor Nº 02/2024',
  'Filiação a FPT',
  'Uniformes ITF',
  'BT - Regulamento Copa das Federações 2025 (Beach Tennis)',
  'BT - Regulamento Interclubes Estadual 2026 (Beach Tennis)',
  'BT - Solicitação de Alteração de Categoria',
  'Resolução 01/2026 - Conselho Técnico de Beach Tennis 2026',
  'BT - Caderno Encargos Beach Tennis (Promotores) 2026',
  'Regulamento Geral 2026',
  'Regulamento Infantojuvenil 2026',
  'Interclubes Paranaense de Seniors OniLX',
  'BT - Regulamento 2026 (Beach Tennis)',
  'Regulamento Interclubes Kids e Infantojuvenil 2026',
]

export default function Regulamento() {
  return (
    <main className="demfin-page">

      <div className="trn-banner">
        <div>
          <p className="trn-banner-title" style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginLeft: 0 }}>
            Transparência
          </p>
          <p className="trn-banner-title" style={{ marginLeft: 0 }}>
            Regulamento — FPT e Outros
          </p>
        </div>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">
        <h1 className="trs-section-title">Regulamento</h1>

        <div className="demfin-grid">
          {regulamentos.map((titulo, i) => (
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
