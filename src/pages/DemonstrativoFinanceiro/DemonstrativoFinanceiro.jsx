import TournamentsSection from '../../components/TournamentsSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const anos = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017,
  2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,
]

export default function DemonstrativoFinanceiro() {
  return (
    <main className="demfin-page">

      <div className="trn-banner">
        <div>
          <p className="trn-banner-title trn-banner-subtitle" style={{ marginLeft: 0 }}>
            Transparência
          </p>
          <p className="trn-banner-title" style={{ marginLeft: 0 }}>
            Demonstrativos Financeiros
          </p>
        </div>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">
        <h1 className="trs-section-title">Demonstrativos Financeiros</h1>

        <div className="demfin-grid">
          {anos.map(ano => (
            <div key={ano} className="trs-doc-card">
              <div className="trs-doc-card-header">
                Demonstrativo de Resultado do Exercício {ano}
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
