import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './AFederacao.css'

const colaboradores = [
  { cargo: 'Presidente',                         membros: ['José Guilherme Moraes Danelon'] },
  { cargo: 'Vice-Presidente',                    membros: ['Silvio Pinheiro de Souza', 'Marcelo Tebet', 'Claudio Fernandes Santana'] },
  { cargo: 'Superintendente',                    membros: ['Silvio Pinheiro de Souza'] },
  { cargo: 'Conselho Fiscal — Membros Efetivos', membros: ['Daniel Vila Hreczuck', 'Marino Adashi Adali'] },
  { cargo: 'Conselho Fiscal — Membros Suplentes',membros: [] },
  { cargo: 'Diretoria Técnica',                  membros: ['Claudio Santana'] },
  { cargo: 'Diretoria de Marketing',             membros: [] },
  { cargo: 'Departamento Técnico',               membros: ['Luciana Karina Stolf Pereira'] },
  { cargo: 'Departamento Administrativo/Financeiro', membros: ['Luciana Maria Rosa Vieira'] },
  { cargo: 'Assessoria de Imprensa',             membros: ['Triboo'] },
  { cargo: 'Assessoria de TI',                   membros: ['SOMA Cooperativa'] },
]

const revistas = [
  { titulo: 'Revista FPT 01', link: 'Revista Inmagazine Volume 1' },
  { titulo: 'Revista FPT 02', link: 'Revista Inmagazine Volume 2' },
]

export default function AFederacao() {
  return (
    <>
      <div className="trn-banner">
        <div>
          <p className="trn-banner-title" style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginLeft: 0 }}>
            FPT
          </p>
          <p className="trn-banner-title" style={{ marginLeft: 0 }}>
            A Federação
          </p>
        </div>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">

        {/* ── Informações ─────────────────────────────────────── */}
        <section className="fed-section">
          <h1 className="trs-section-title">Informações</h1>

          <div className="fed-info-grid">
            <div className="fed-info-block">
              <p className="fed-info-row">
                <span className="fed-info-label">Fundação:</span> 17 de Janeiro de 1950
              </p>
              <p className="fed-info-row">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="fed-info-icon" />
                Rua Pastor Manoel Virgínio de Souza, 1020<br />
                Curitiba - PR &nbsp;&nbsp; CEP 82.810-400
              </p>
              <p className="fed-info-row">
                <FontAwesomeIcon icon={faPhone} className="fed-info-icon" />
                Fone: 41 3365-2404 &nbsp;&nbsp; Fax: 0
              </p>
              <p className="fed-info-row">
                <FontAwesomeIcon icon={faEnvelope} className="fed-info-icon" />
                <a href="mailto:fpt@fpt.com.br" className="faq-link">fpt@fpt.com.br</a>
              </p>
            </div>

            <div className="fed-links-block">
              <p className="fed-links-title">Links</p>
              <a href="#" className="fed-doc-link" onClick={e => e.preventDefault()}>
                <FontAwesomeIcon icon={faDownload} style={{ width: 13, height: 13 }} />
                Estatuto
              </a>
              <a href="#" className="fed-doc-link" onClick={e => e.preventDefault()}>
                <FontAwesomeIcon icon={faDownload} style={{ width: 13, height: 13 }} />
                Organograma
              </a>
              <Link to="/regulamento" className="fed-doc-link">
                <FontAwesomeIcon icon={faDownload} style={{ width: 13, height: 13 }} />
                Taxas
              </Link>
            </div>
          </div>
        </section>

        {/* ── Colaboradores ───────────────────────────────────── */}
        <section className="fed-section">
          <h2 className="fed-section-title">Colaboradores</h2>
          <div className="fed-card-grid">
            {colaboradores.map((col, i) => (
              <div key={i} className="trs-doc-card">
                <div className="trs-doc-card-header fed-cargo-header">
                  {col.cargo}
                </div>
                <div className="fed-card-body">
                  {col.membros.length === 0
                    ? <span className="fed-empty">—</span>
                    : col.membros.map((m, j) => (
                        <p key={j} className="fed-membro">{m}</p>
                      ))
                  }
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Revistas ────────────────────────────────────────── */}
        <section className="fed-section">
          <h2 className="fed-section-title">Revistas</h2>
          <div className="fed-card-grid">
            {revistas.map((rev, i) => (
              <div key={i} className="trs-doc-card">
                <div className="trs-doc-card-header fed-cargo-header">
                  {rev.titulo}
                </div>
                <div className="fed-card-body">
                  <a href="#" className="trs-download-btn" onClick={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faDownload} style={{ width: 13, height: 13 }} />
                    {rev.link}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
