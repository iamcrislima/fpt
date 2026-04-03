import TournamentsSection from '../../components/TournamentsSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const atas = [
  'Assembleia de Prestação de Contas 2025 e Criação da Comissão de Atletas',
  'Estatuto FPT (04/02/2026)',
  'Ata Assembleia - Alteração de Estatuto',
  'Ata de Prestação de Contas 2024',
  'Edital de Convocação AGO Prestação de Contas 2024',
  'Ata de Prestação de Contas 2023',
  'Ata de Prestação de Contas 2022',
  'Ata de Eleição 2022',
  'Ata de Prestação de Contas 2021',
  'Ata Reunião de Diretoria 31/03/2022',
  'Ata de Prestação de Contas 2019/2020',
  'Ata de Prestação de Contas 2018',
  'Ata de Eleição 2018',
  'Ata de Prestação de Contas 2017',
  'Ata de Prestação de Contas 2016 parte 3',
  'Ata de Prestação de Contas 2016 parte 2',
  'Ata de Prestação de Contas 2016 parte 1',
  'Ata de Posse 2014 parte 2',
  'Ata de Posse 2014 parte 1',
  'Ata de Eleição 2014',
  'Ata Assembleia de Prestação de Contas 2015',
  'Ata Reunião de Diretoria 23/01/2015',
  'Ata Assembleia Eletiva Ordinária 2014',
  'Ata de Assembleia de Prestação de Contas 21/03/2014',
]

export default function AtasReuniao() {
  return (
    <main className="demfin-page">

      <div className="trn-banner">
        <div>
          <p className="trn-banner-title trn-banner-subtitle" style={{ marginLeft: 0 }}>
            Transparência
          </p>
          <p className="trn-banner-title" style={{ marginLeft: 0 }}>
            Atas de Reunião
          </p>
        </div>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">
        <h1 className="trs-section-title">Atas de Reunião</h1>

        <div className="demfin-grid">
          {atas.map((titulo, i) => (
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
