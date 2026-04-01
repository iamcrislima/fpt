import { useNavigate } from 'react-router-dom'
import { Button } from '@1doc/1ds-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faTrophy, faWallet, faCalendarCheck,
  faRulerVertical, faWeightScale, faHandPaper,
  faCamera, faBolt, faChevronRight, faCircleCheck,
  faTableTennisPaddleBall, faDownload, faCalendarDays, faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import { useSport } from '../../context/SportContext'
import { TORNEIOS_PARTICIPADOS } from '../../data/tournamentsData'
import './Painel.css'

const AVATAR_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80'

const POS_STYLE = {
  '1º lugar': 'painel-trn-pos--ouro',
  '2º lugar': 'painel-trn-pos--prata',
  '3º lugar': 'painel-trn-pos--bronze',
}

export default function Painel() {
  const { user } = useAuth()
  const { sport } = useSport()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login', { replace: true })
    return null
  }

  function handleDeclaracao(t) {
    alert(`Declaração de participação gerada para:\n${t.nome}`)
  }

  return (
    <div className="painel-page">
      <div className="painel-body">

        {/* ── Greeting — full width ── */}
        <div className="painel-greeting">
          <h1 className="painel-greeting-hi">Olá, {user.name}</h1>
          <span className="painel-greeting-sub">Painel do Atleta</span>
        </div>

        {/* ── Sidebar ── */}
        <aside className="painel-sidebar">

          {/* Profile card */}
          <div className="painel-card painel-profile-card">
            <div className="painel-avatar-wrap">
              <img src={AVATAR_URL} alt={user.name} className="painel-avatar" />
              <button className="painel-avatar-edit" aria-label="Alterar foto">
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
            <div className="painel-profile-info">
              <span className="painel-profile-code">{user.codigo}</span>
              <h2 className="painel-profile-name">{user.name}</h2>
              <span className="painel-profile-clube">{user.clube}</span>
              <div className="painel-profile-badges">
                <span className="painel-badge painel-badge--cat">{user.categoria}</span>
                <span className="painel-badge painel-badge--class">{user.classe}</span>
              </div>
            </div>
          </div>

          {/* Anuidade */}
          <div className="painel-card painel-anuidade-card">
            <div className="painel-anuidade-header">
              <FontAwesomeIcon icon={faCircleCheck} className="painel-anuidade-icon" />
              <span className="painel-anuidade-title">Minha Anuidade</span>
            </div>
            <div className="painel-anuidade-status painel-anuidade-status--ok">Em dia</div>
            <p className="painel-anuidade-desc">Anuidade 2025 paga em 10/01/2025</p>
            <a href="#" className="painel-anuidade-link" onClick={e => e.preventDefault()}>
              Ver comprovante
            </a>
          </div>

          {/* Quick links */}
          <button className="painel-card painel-quick-card" onClick={() => navigate(`/${sport}/pagamentos`)}>
            <div className="painel-quick-icon-wrap">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <div className="painel-quick-text">
              <span className="painel-quick-title">Painel Financeiro</span>
              <span className="painel-quick-sub">Pagamentos e histórico</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="painel-quick-arrow" />
          </button>

          <button className="painel-card painel-quick-card" onClick={() => navigate(`/${sport}/calendario`)}>
            <div className="painel-quick-icon-wrap">
              <FontAwesomeIcon icon={faCalendarCheck} />
            </div>
            <div className="painel-quick-text">
              <span className="painel-quick-title">Calendário FPT</span>
              <span className="painel-quick-sub">Próximos eventos</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="painel-quick-arrow" />
          </button>

        </aside>

        {/* ── Main ── */}
        <main className="painel-main">

          {/* Dados do Atleta — alinhado ao topo do card de foto */}
          <div className="painel-card">
            <h3 className="painel-section-title">
              <FontAwesomeIcon icon={faUser} />
              Dados do Atleta
            </h3>
            <div className="painel-data-grid">
              <div className="painel-data-item">
                <span className="painel-data-label">Ano de nascimento</span>
                <span className="painel-data-value">{user.anoNasc}</span>
              </div>
              <div className="painel-data-item">
                <span className="painel-data-label">
                  <FontAwesomeIcon icon={faRulerVertical} style={{ width: 11 }} /> Altura
                </span>
                <span className="painel-data-value">{user.altura}</span>
              </div>
              <div className="painel-data-item">
                <span className="painel-data-label">
                  <FontAwesomeIcon icon={faWeightScale} style={{ width: 11 }} /> Peso
                </span>
                <span className="painel-data-value">{user.peso}</span>
              </div>
              <div className="painel-data-item">
                <span className="painel-data-label">
                  <FontAwesomeIcon icon={faHandPaper} style={{ width: 11 }} /> Lado Dominante
                </span>
                <span className="painel-data-value">{user.ladoDominante}</span>
              </div>
              <div className="painel-data-item">
                <span className="painel-data-label">
                  <FontAwesomeIcon icon={faTableTennisPaddleBall} style={{ width: 11 }} /> Raquete
                </span>
                <span className="painel-data-value">{user.marcaRaquete}</span>
              </div>
              <div className="painel-data-item">
                <span className="painel-data-label">
                  <FontAwesomeIcon icon={faBolt} style={{ width: 11 }} /> Corda
                </span>
                <span className="painel-data-value">{user.tipoCorda}</span>
              </div>
            </div>
            <div className="painel-edit-row">
              <Button
                variant="neutral"
                size="sm"
                startIcon="edit"
                onClick={() => navigate(`/${sport}/perfil`)}
              >
                Editar dados
              </Button>
            </div>
          </div>

          {/* Torneios Participados */}
          <div className="painel-card">
            <div className="painel-section-head">
              <h3 className="painel-section-title">
                <FontAwesomeIcon icon={faTrophy} />
                Torneios Participados
              </h3>
              <span className="painel-section-badge">{user.torneiosParticipados}</span>
            </div>

            <div className="painel-trn-list">
              {TORNEIOS_PARTICIPADOS.slice(0, 4).map(t => (
                <div className="painel-trn-card" key={t.id}>
                  <div className="painel-trn-left">
                    <div className={`painel-trn-pos ${POS_STYLE[t.posicao] || 'painel-trn-pos--default'}`}>
                      {t.posicao}
                    </div>
                    <div className="painel-trn-info">
                      <span
                        className="painel-trn-name painel-trn-name--link"
                        onClick={() => navigate(`/${sport}/torneios/${t.id}`)}
                      >
                        {t.nome}
                      </span>
                      <div className="painel-trn-meta">
                        <span className="painel-trn-meta-item">
                          <FontAwesomeIcon icon={faCalendarDays} />
                          {t.data}
                        </span>
                        <span className="painel-trn-dot" />
                        <span className="painel-trn-meta-item">
                          <FontAwesomeIcon icon={faUsers} />
                          {t.parceiro}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="painel-trn-decl-btn"
                    onClick={() => handleDeclaracao(t)}
                    aria-label="Baixar declaração"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Declaração</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="painel-edit-row">
              <Button
                variant="neutral"
                size="sm"
                endIcon="nav-arrow-right"
                onClick={() => navigate(`/${sport}/meus-torneios`)}
              >
                Ver todos os torneios
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="painel-card painel-cta-card">
            <div className="painel-cta-text">
              <h3 className="painel-cta-title">Próximos torneios abertos</h3>
              <p className="painel-cta-sub">Inscreva-se nos torneios disponíveis para a sua categoria.</p>
            </div>
            <Button
              variant="primary"
              size="md"
              endIcon="nav-arrow-right"
              className="painel-cta-btn"
              onClick={() => navigate(`/${sport}/torneios`)}
            >
              Ver torneios
            </Button>
          </div>

        </main>
      </div>
    </div>
  )
}
