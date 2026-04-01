import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrophy, faDownload, faCalendarDays, faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { TORNEIOS_PARTICIPADOS } from '../../data/tournamentsData'
import './MeusTorneios.css'

const POS_STYLE = {
  '1º lugar': 'mt-pos--ouro',
  '2º lugar': 'mt-pos--prata',
  '3º lugar': 'mt-pos--bronze',
}

export default function MeusTorneios() {
  function handleDeclaracao(torneio) {
    alert(`Declaração de participação gerada para:\n${torneio.nome}`)
  }

  return (
    <div className="mt-page">
      <div className="mt-inner">
        <div className="mt-header">
          <div>
            <h1 className="mt-title">Meus Torneios</h1>
            <p className="mt-subtitle">Histórico completo de participações.</p>
          </div>
          <div className="mt-summary-pill">
            <FontAwesomeIcon icon={faTrophy} />
            <span>{TORNEIOS_PARTICIPADOS.length} torneios</span>
          </div>
        </div>

        <div className="mt-list">
          {TORNEIOS_PARTICIPADOS.map(t => (
            <div className="mt-card" key={t.id}>
              <div className="mt-card-left">
                <div className={`mt-pos ${POS_STYLE[t.posicao] || 'mt-pos--default'}`}>
                  {t.posicao}
                </div>
                <div className="mt-info">
                  <span className="mt-nome">{t.nome}</span>
                  <div className="mt-meta">
                    <span className="mt-meta-item">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      {t.data}
                    </span>
                    <span className="mt-meta-dot" />
                    <span className="mt-meta-item">{t.categoria}</span>
                    <span className="mt-meta-dot" />
                    <span className="mt-meta-item">
                      <FontAwesomeIcon icon={faUsers} />
                      {t.parceiro}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="mt-decl-btn"
                onClick={() => handleDeclaracao(t)}
                aria-label="Baixar declaração de participação"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Declaração</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
