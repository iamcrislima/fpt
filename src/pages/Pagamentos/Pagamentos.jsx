import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf, faCircleCheck, faClock, faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import './Pagamentos.css'

const PAGAMENTOS = [
  {
    numero: '219540',
    referencia: 'Anuidade de Beach Tennis',
    vencimento: '13/01/2026',
    valor: 'R$ 210,00',
    status: 'pago',
  },
  {
    numero: '204371',
    referencia: 'Anuidade de Beach Tennis',
    vencimento: '10/01/2025',
    valor: 'R$ 195,00',
    status: 'pago',
  },
  {
    numero: '189022',
    referencia: 'Anuidade de Beach Tennis',
    vencimento: '15/01/2024',
    valor: 'R$ 180,00',
    status: 'pago',
  },
  {
    numero: '231004',
    referencia: 'Taxa de inscrição — FPT Series 1500',
    vencimento: '01/03/2026',
    valor: 'R$ 90,00',
    status: 'pendente',
  },
  {
    numero: '228850',
    referencia: 'Taxa de inscrição — Interclubes 26',
    vencimento: '10/02/2025',
    valor: 'R$ 80,00',
    status: 'pago',
  },
]

const STATUS_CONFIG = {
  pago: {
    icon: faCircleCheck,
    label: 'Pago',
    className: 'pgmt-status--pago',
  },
  pendente: {
    icon: faClock,
    label: 'Pendente',
    className: 'pgmt-status--pendente',
  },
  vencido: {
    icon: faTriangleExclamation,
    label: 'Vencido',
    className: 'pgmt-status--vencido',
  },
}

export default function Pagamentos() {
  return (
    <div className="pgmt-page">
      <div className="pgmt-inner">
        <div className="pgmt-header">
          <h1 className="pgmt-title">Histórico de Pagamentos</h1>
          <p className="pgmt-subtitle">Acompanhe anuidades e taxas de inscrição.</p>
        </div>

        <div className="pgmt-list">
          {PAGAMENTOS.map(p => {
            const cfg = STATUS_CONFIG[p.status]
            return (
              <div className="pgmt-card" key={p.numero}>
                <div className="pgmt-card-left">
                  <div className="pgmt-card-top">
                    <span className="pgmt-num">#{p.numero}</span>
                    <span className={`pgmt-status ${cfg.className}`}>
                      <FontAwesomeIcon icon={cfg.icon} />
                      {cfg.label}
                    </span>
                  </div>
                  <p className="pgmt-ref">{p.referencia}</p>
                  <div className="pgmt-card-meta">
                    <span className="pgmt-meta-item">
                      <span className="pgmt-meta-label">Vencimento</span>
                      <span className="pgmt-meta-value">{p.vencimento}</span>
                    </span>
                    <span className="pgmt-meta-sep" />
                    <span className="pgmt-meta-item">
                      <span className="pgmt-meta-label">Valor</span>
                      <span className="pgmt-meta-value pgmt-meta-value--valor">{p.valor}</span>
                    </span>
                  </div>
                </div>
                <div className="pgmt-card-right">
                  <button
                    className="pgmt-pdf-btn"
                    onClick={() => {}}
                    aria-label="Abrir PDF"
                  >
                    <FontAwesomeIcon icon={faFilePdf} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
