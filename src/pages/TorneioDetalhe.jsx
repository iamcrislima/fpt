import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Icon } from '@1doc/1ds-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons'
import TournamentsSection from '../components/TournamentsSection'
import InscricaoModal from '../components/InscricaoModal'
import BottomSheetSelect from '../components/BottomSheetSelect'

// ── Data modules (extracted from this file) ──
import { ALL_CATEGORIES_INSCRICAO, inscritos, filaEspera } from './TorneioDetalhe/data/inscritosData'
import {
  torneio, categorias, tabs, programacao, campeoes,
  PLAYER_PHOTOS, GENEROS_CHAVE, MODALIDADES_CHAVE, NIVEIS_CHAVE,
} from './TorneioDetalhe/data/torneioData'
import { getChaveamento } from './TorneioDetalhe/data/chaveamentosData'
import { avBg, initials, abbrevName } from './TorneioDetalhe/utils/bracketHelpers'

const BADGE = '/images/torneio-detalhe-banner.png'
import './TorneioDetalhe/TorneioDetalhe.css'

// ── Sub-components for Chaves ─────────────────────────────────────────────

function PlayerAvatar({ name }) {
  const photo = PLAYER_PHOTOS[name]
  if (photo) return <img src={photo} alt={name} className="player-av print-hide" />
  return (
    <div className="player-av player-av--init print-hide" style={{ background: avBg(name) }}>
      {initials(name)}
    </div>
  )
}

function DuplaAvatars({ p1, p2 }) {
  return (
    <div className="dupla-avs">
      <PlayerAvatar name={p1} />
      <PlayerAvatar name={p2} />
    </div>
  )
}

function DuplaNames({ p1, p2, align }) {
  return (
    <div className={`dupla-names${align === 'right' ? ' dupla-names--right' : ''}`}>
      <span>{p1}</span>
      <span>{p2}</span>
    </div>
  )
}

function GrupoMatchRow({ jogo }) {
  const { ep1, ep2, dp1, dp2, se, sd } = jogo
  const eWins = se !== null && sd !== null && se > sd
  const dWins = se !== null && sd !== null && sd > se
  const hasScore = se !== null && sd !== null
  return (
    <div className="gm-row">
      <div className="gm-side">
        <DuplaAvatars p1={ep1} p2={ep2} />
        <DuplaNames p1={abbrevName(ep1)} p2={abbrevName(ep2)} />
      </div>
      <div className="gm-score-block">
        {hasScore
          ? <span className={`gm-score print-hide${eWins ? ' gm-score--win' : ''}`}>{se}</span>
          : <span className="gm-score gm-score--empty print-hide">—</span>}
        <span className="gm-print-blank print-only">____</span>
        <span className="gm-print-sep print-only">×</span>
        {hasScore
          ? <span className={`gm-score print-hide${dWins ? ' gm-score--win' : ''}`}>{sd}</span>
          : <span className="gm-score gm-score--empty print-hide">—</span>}
        <span className="gm-print-blank print-only">____</span>
      </div>
      <div className="gm-side gm-side--right">
        <DuplaNames p1={abbrevName(dp1)} p2={abbrevName(dp2)} align="right" />
        <DuplaAvatars p1={dp1} p2={dp2} />
      </div>
    </div>
  )
}

function BracketCard({ ep1, ep2, dp1, dp2, se, sd }) {
  const eWins = se !== null && sd !== null && se > sd
  const dWins = se !== null && sd !== null && sd > se
  return (
    <div className="bcard">
      <div className={`bcard-team${eWins ? ' bcard-team--win' : ''}`}>
        <div className="bcard-left">
          <DuplaAvatars p1={ep1 || '—'} p2={ep2 || '—'} />
          <DuplaNames p1={ep1 || '—'} p2={ep2 || '—'} />
          <span className="bcard-name-line print-only" />
        </div>
        <span className={`bcard-score print-hide${eWins ? ' bcard-score--win' : ''}`}>
          {se !== null ? se : <span className="bcard-score-empty">—</span>}
        </span>
        <span className="bcard-score-line print-only" />
      </div>
      <div className="bcard-divider" />
      <div className={`bcard-team${dWins ? ' bcard-team--win' : ''}`}>
        <div className="bcard-left">
          <DuplaAvatars p1={dp1 || '—'} p2={dp2 || '—'} />
          <DuplaNames p1={dp1 || '—'} p2={dp2 || '—'} />
          <span className="bcard-name-line print-only" />
        </div>
        <span className={`bcard-score print-hide${dWins ? ' bcard-score--win' : ''}`}>
          {sd !== null ? sd : <span className="bcard-score-empty">—</span>}
        </span>
        <span className="bcard-score-line print-only" />
      </div>
    </div>
  )
}

// ── PrintView: layout dedicado para impressão ────────────────────────────
function PvBrSlot() {
  return (
    <div className="pv-br-slot">
      <span className="pv-name-line" />
      <span className="pv-score-box" />
    </div>
  )
}

function PrintView({ dados }) {
  if (!dados) return null
  const { grupos: pvGrupos } = dados
  return (
    <div className="pv print-only">
      {/* Cabeçalho */}
      <div className="pv-header">
        <strong>FPT Beach Series 1500 — Curitiba, 05–07/02</strong>
        <span>Chaveamento</span>
      </div>

      {/* Grupos */}
      {pvGrupos.map(grupo => (
        <div key={grupo.nome} className="pv-grupo">
          <div className="pv-grupo-nome">{grupo.nome}</div>
          <hr className="pv-hr" />
          <div className="pv-grupo-body">

            {/* Classificação */}
            <div className="pv-class">
              <div className="pv-col-label">Classificação</div>
              <table className="pv-class-table">
                <thead>
                  <tr>
                    <th className="pv-th-pos">Pos.</th>
                    <th className="pv-th-dupla">Dupla</th>
                    <th className="pv-th-j">J1</th>
                    <th className="pv-th-j">J2</th>
                    <th className="pv-th-j">J3</th>
                    <th className="pv-th-sg">SG</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.classificacao.map((row, i) => (
                    <tr key={i} className="pv-class-row">
                      <td><span className="pv-sq" /></td>
                      <td className="pv-td-dupla">{row.p1} / {row.p2}</td>
                      <td><span className="pv-sq" /></td>
                      <td><span className="pv-sq" /></td>
                      <td><span className="pv-sq" /></td>
                      <td><span className="pv-sg-line" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Jogos */}
            <div className="pv-jogos">
              <div className="pv-col-label">Jogos</div>
              {grupo.jogos.map((jogo, i) => (
                <div key={i} className="pv-match">
                  <div className="pv-team pv-team--left">
                    <span>{jogo.ep1}</span>
                    <span>{jogo.ep2}</span>
                  </div>
                  <div className="pv-score-block">
                    <span className="pv-score-line" />
                    <span className="pv-x">×</span>
                    <span className="pv-score-line" />
                  </div>
                  <div className="pv-team pv-team--right">
                    <span>{jogo.dp1}</span>
                    <span>{jogo.dp2}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      ))}

      {/* Eliminatórias */}
      <div className="pv-elim">
        <div className="pv-grupo-nome">Eliminatórias</div>
        <hr className="pv-hr" />
        <div className="pv-br">
          <div className="pv-br-headers">
            {['Quartas de final', 'Semifinal', 'Final', 'Campeão'].map(h => (
              <div key={h} className="pv-br-col-hdr">{h}</div>
            ))}
          </div>
          <div className="pv-br-tree">
            {/* Quartas */}
            <div className="pv-br-round">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="pv-br-match">
                  <PvBrSlot /><PvBrSlot />
                </div>
              ))}
            </div>
            {/* Semifinal */}
            <div className="pv-br-round">
              {[0, 1].map(i => (
                <div key={i} className="pv-br-match">
                  <PvBrSlot /><PvBrSlot />
                </div>
              ))}
            </div>
            {/* Final */}
            <div className="pv-br-round">
              <div className="pv-br-match">
                <PvBrSlot /><PvBrSlot />
              </div>
            </div>
            {/* Campeão */}
            <div className="pv-br-round pv-br-round--champion">
              <div className="pv-br-campeao">
                <div className="pv-br-campeao-label">Campeão</div>
                <span className="pv-name-line" />
                <span className="pv-name-line" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function SmallAvatar({ name }) {
  const photo = PLAYER_PHOTOS[name]
  if (photo) return <img src={photo} alt={name} className="mav" />
  return (
    <span className="mav mav--init" style={{ background: avBg(name) }}>
      {initials(name)}
    </span>
  )
}

function MobileMatchCard({ match, label }) {
  if (!match) {
    return (
      <div className="mcard">
        {label && <div className="mcard-header">{label}</div>}
        <div className="mcard-team"><span className="mcard-n mcard-n--tbd">A definir</span></div>
        <div className="mcard-div" />
        <div className="mcard-team"><span className="mcard-n mcard-n--tbd">A definir</span></div>
      </div>
    )
  }
  const { ep1, ep2, dp1, dp2, se, sd } = match
  const eWins = se !== null && sd !== null && se > sd
  const dWins = se !== null && sd !== null && sd > se
  const done = se !== null && sd !== null
  return (
    <div className="mcard">
      {label && <div className="mcard-header">{label}</div>}
      <div className={`mcard-team${eWins ? ' mcard-team--win' : ''}`}>
      <SmallAvatar name={ep1 || '–'} />
        <div className="mcard-names-col">
          <span className="mcard-n">{abbrevName(ep1)}</span>
          <span className="mcard-n mcard-n2">{abbrevName(ep2)}</span>
        </div>
        {done && <span className={`mcard-sc${eWins ? ' mcard-sc--win' : ''}`}>{se}</span>}
      </div>
      <div className="mcard-div" />
      <div className={`mcard-team${dWins ? ' mcard-team--win' : ''}`}>
      <SmallAvatar name={dp1 || '–'} />
        <div className="mcard-names-col">
          <span className="mcard-n">{abbrevName(dp1)}</span>
          <span className="mcard-n mcard-n2">{abbrevName(dp2)}</span>
        </div>
        {done && <span className={`mcard-sc${dWins ? ' mcard-sc--win' : ''}`}>{sd}</span>}
      </div>
    </div>
  )
}

function MobileBracketView({ eliminatorias }) {
  const { rounds, campeao } = eliminatorias
  const [activeRound, setActiveRound] = useState(0)
  const safeRound = Math.min(activeRound, rounds.length - 1)
  const currentRound = rounds[safeRound]
  const nextRound = rounds[safeRound + 1]
  const isLast = safeRound === rounds.length - 1

  const pairs = []
  for (let i = 0; i < currentRound.partidas.length; i += 2) {
    pairs.push({
      a: currentRound.partidas[i],
      b: currentRound.partidas[i + 1] ?? null,
      next: nextRound ? (nextRound.partidas[Math.floor(i / 2)] ?? null) : null,
    })
  }

  return (
    <div className="mbr-wrap">
      <div className="mbr-rounds-bar">
        {rounds.map((r, i) => (
          <button
            key={i}
            className={`mbr-pill${safeRound === i ? ' mbr-pill--active' : ''}`}
            onClick={() => setActiveRound(i)}
          >
            {r.nome}
          </button>
        ))}
      </div>

      <div className="mbr-pairs-list">
        {pairs.map((pair, pi) => {
          const singleLeft = pair.b === null
          return (
            <div key={pi} className="mbr-pair">
              <div className="mbr-left-col">
                <MobileMatchCard match={pair.a} />
                {!singleLeft && <MobileMatchCard match={pair.b} />}
              </div>
              <div className={`mbr-conn${singleLeft ? ' mbr-conn--single' : ''}`} aria-hidden="true" />
              <div className="mbr-right-col">
                {isLast ? (
                  <div className="mbr-champion-card">
          <div className="mbr-champion-trophy">🏆</div>
                    {campeao ? (
                      <div className="mbr-champion-names">
                        <span>{campeao.p1}</span>
                        <span>{campeao.p2}</span>
                      </div>
                    ) : (
            <span className="mbr-champion-tbd">Campeão a definir</span>
                    )}
                  </div>
                ) : (
                  <MobileMatchCard match={pair.next} label={nextRound?.nome} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── ConnectorCol – bracket lines between round columns ─────────────────────────
function ConnectorCol({ layout, matchCount }) {
  const { offset, gap } = layout
  const pairCount = Math.ceil(matchCount / 2)

  return (
    <div className="br-conn-col">
      <div className="br-dyn-round-label" style={{ visibility: 'hidden' }} aria-hidden="true">x</div>
      <div className="br-conn-brackets">
        {Array.from({ length: pairCount }, (_, k) => {
          const hasBottom = 2 * k + 1 < matchCount
          // Top of bracket = center of top card in pair k
          const topPx = offset + 2 * k * (CARD_H + gap) + CARD_H / 2
          if (!hasBottom) {
            return <div key={k} className="br-conn-single" style={{ top: topPx }} />
          }
          // Height = from top card center to bottom card center = CARD_H + gap
          return (
            <div
              key={k}
              className="br-conn-bracket"
              style={{ top: topPx, height: CARD_H + gap }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── BracketDisplay – pure-CSS flex bracket (no pixel math) ──────────────────────
// Each round column uses flex slots (flex:1 each). With all columns stretching
// to the same height, a round with N/2 slots automatically centers each slot
// between the two corresponding slots in the previous round.

function BracketDisplay({ eliminatorias }) {
  const { rounds, campeao } = eliminatorias
  if (!rounds || rounds.length === 0) return null

  return (
    <>
      {/* Mobile: FIFA-style round-by-round bracket */}
      <MobileBracketView eliminatorias={eliminatorias} />

      {/* Desktop: pure-CSS flex bracket */}
      <div className="chaves-desktop-bracket">
        <div className="br2-tree">
          {rounds.flatMap((r, i) => [
            /* Round column */
            <div key={`r${i}`} className="br2-round">
              <div className="br2-label">{r.nome}</div>
              <div className="br2-slots">
                {r.partidas.map((p, j) => (
                  <div key={j} className="br2-slot">
                    <BracketCard {...p} />
                  </div>
                ))}
              </div>
            </div>,
            /* Connector column */
            <div key={`c${i}`} className="br2-conn">
              <div className="br2-label" style={{ visibility: 'hidden' }} aria-hidden="true">x</div>
              <div className="br2-slots">
                {Array.from({ length: Math.ceil(r.partidas.length / 2) }, (_, k) => (
                  <div key={k} className={`br2-conn-slot${r.partidas.length === 1 ? ' br2-conn-slot--single' : ''}`} />
                ))}
              </div>
            </div>,
          ])}

          {/* Champion column */}
          <div className="br2-round">
              <div className="br2-label">Campeão</div>
            <div className="br2-slots">
              <div className="br2-slot">
                {campeao ? (
                  <div className="br-campeao">
                  <div className="br-campeao-trophy">🏆</div>
                    <DuplaAvatars p1={campeao.p1} p2={campeao.p2} />
                    <DuplaNames p1={campeao.p1} p2={campeao.p2} />
                  </div>
                ) : (
                  <div className="br-campeao br-campeao--tbd">
                  <div className="br-campeao-trophy">🏆</div>
                    <span className="br-campeao-tbd">A definir</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


function PairRow({ medal, n1, n2 }) {
  return (
    <div className="camp-podium-row">
      <span className="camp-medal">{medal}</span>
      <div className="camp-pair">
        <PlayerAvatar name={n1} />
        {n2 && <PlayerAvatar name={n2} />}
        <div className="camp-pair-names">
          <span>{n1}</span>
          {n2 && <span>{n2}</span>}
        </div>
      </div>
    </div>
  )
}

function CampeoesTab() {
  return (
    <div className="camp-page">
      <h2 className="camp-title">🏆 Campeões do Torneio</h2>
      <div className="camp-grid">
        {campeoes.map((cat, i) => (
          <div key={i} className="camp-card">
            <div className="camp-card-header">{cat.categoria}</div>
            <div className="camp-card-body">
              <PairRow medal="🥇" n1={cat.p1} n2={cat.p2} />
              <PairRow medal="🥈" n1={cat.s1} n2={cat.s2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImportanteAccordion({ texto }) {
  const [open, setOpen] = useState(false)
  return (
    <section className={`tdet-section tdet-section--alert tdet-importante${open ? ' tdet-importante--open' : ''}`}>
      <button className="tdet-importante-header" onClick={() => setOpen(v => !v)}>
        <h3 className="tdet-subsection-title">Importante</h3>
        <span className="tdet-importante-toggle">
          {open ? 'Ver menos' : 'Ver mais'}
          <Icon name={open ? 'nav-arrow-up' : 'nav-arrow-down'} size="sm" />
        </span>
      </button>
      {open && <p className="tdet-body-text tdet-importante-body">{texto}</p>}
    </section>
  )
}

export default function TorneioDetalhe() {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [showModal, setShowModal] = useState(false)
  const [showAllCats, setShowAllCats] = useState(false)
  const tabsRef = useRef(null)
  const tabRefs = useRef({})
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [chaveDrawerOpen, setChaveDrawerOpen] = useState(false)
  // Draft state — only applied when user taps "Aplicar"
  const [draftGenero,    setDraftGenero]    = useState('')
  const [draftModalidade,setDraftModalidade]= useState('')
  const [draftNivel,     setDraftNivel]     = useState('')

  // Derived from searchParams — declared before the functions that use them
  const genero     = searchParams.get('genero')     || ''
  const modalidade = searchParams.get('modalidade') || ''
  const nivel      = searchParams.get('nivel')      || ''
  const dados      = getChaveamento(genero, modalidade, nivel)

  const setParam = (key, val, ...reset) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set(key, val)
      reset.forEach(k => next.delete(k))
      return next
    })
  }

  const openChaveDrawer = () => {
    setDraftGenero(genero)
    setDraftModalidade(modalidade)
    setDraftNivel(nivel)
    setChaveDrawerOpen(true)
  }
  const applyChaveDrawer = () => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (draftGenero)     next.set('genero', draftGenero);     else next.delete('genero')
      if (draftModalidade) next.set('modalidade', draftModalidade); else next.delete('modalidade')
      if (draftNivel)      next.set('nivel', draftNivel);       else next.delete('nivel')
      return next
    })
    setChaveDrawerOpen(false)
  }
  const clearChaveDrawer = () => {
    setDraftGenero('')
    setDraftModalidade('')
    setDraftNivel('')
  }
  const chaveActiveCount = [genero, modalidade, nivel].filter(Boolean).length

  useEffect(() => {
    const el = tabRefs.current[activeTab]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeTab])

  return (
    <main className="tdet-page">
      <InscricaoModal open={showModal} onClose={() => setShowModal(false)} />

      {/* ── Header do torneio ── */}
      <div className="tdet-header">
        <div className="tdet-header-inner">
          <div className="tdet-header-left">
            <img src={BADGE} alt="Badge" className="tdet-badge" />
            <div className="tdet-header-info">
              <p className="tdet-header-name">{torneio.nome}</p>
              <p className="tdet-header-location">
                <Icon name="map-pin" size="sm" />
                {torneio.cidade} &nbsp;–&nbsp; {torneio.dataRange}
              </p>
              <div className="tdet-cats">
                {(() => {
                  const MAX = 6
                  const visible = showAllCats ? categorias : categorias.slice(0, MAX)
                  const hidden = categorias.length - MAX
                  return (
                    <>
                      {visible.map(c => <span key={c} className="tdet-cat-chip">{c}</span>)}
                      {!showAllCats && hidden > 0 && (
                        <button className="tdet-cat-chip tdet-cat-chip--more" onClick={() => setShowAllCats(true)}>+{hidden} mais</button>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            className="tdet-inscr-btn"
            onClick={() => setShowModal(true)}
          >
            Inscreva-se no torneio
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tdet-tabs-fade-wrap">
        <div className="tdet-tabs-bar" ref={tabsRef}>
          <div className="tdet-tabs-inner">
            {tabs.map(t => (
              <button
                key={t}
                ref={el => tabRefs.current[t] = el}
                className={`tdet-tab${activeTab === t ? ' tdet-tab--active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Conteúdo: Visão Geral ── */}
      {activeTab === tabs[0] && (
        <div className="tdet-content">
          <div className="tdet-main-col">

            {/* Resumo */}
            <section className="tdet-section">
              <h2 className="tdet-section-title">Resumo</h2>
              <div className="tdet-resumo-card">
                <img src={BADGE} alt="Badge" className="tdet-resumo-badge" />
                <div className="tdet-resumo-info">
                  <p className="tdet-resumo-name">{torneio.nome}</p>
                  <p className="tdet-resumo-row">
                    <Icon name="map-pin" size="sm" />
                    {torneio.cidade}
                  </p>
                  <p className="tdet-resumo-row">
                    <Icon name="calendar" size="sm" />
                    {torneio.datas}
                  </p>
                  <p className="tdet-resumo-pts">
                    <strong>{torneio.pontos}</strong>
                    <span>{torneio.pontosChamada}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Informações da arena */}
            <section className="tdet-section">
              <div className="tdet-info-grid">
                <div className="tdet-info-item">
                  <span className="tdet-info-label">Piso</span>
                  <span className="tdet-info-value">{torneio.piso}</span>
                </div>
                <div className="tdet-info-item">
                  <span className="tdet-info-label">Quadras</span>
                  <span className="tdet-info-value">{torneio.quadras}</span>
                </div>
                <div className="tdet-info-item">
                  <span className="tdet-info-label">Bolas</span>
                  <span className="tdet-info-value">{torneio.bolas}</span>
                </div>
              </div>
            </section>

            {/* Endereço + Contato */}
            <div className="tdet-sections-grid">
              <section className="tdet-section">
              <h3 className="tdet-subsection-title">Endereço</h3>
                <p className="tdet-body-text">{torneio.endereco}</p>
              </section>
              <section className="tdet-section">
                <h3 className="tdet-subsection-title">Contato</h3>
                <p className="tdet-body-text">{torneio.contato}</p>
              </section>
            </div>

            {/* Premiação + Categorias */}
            <div className="tdet-sections-grid">
              <section className="tdet-section">
              <h3 className="tdet-subsection-title">Premiação</h3>
                <p className="tdet-body-text">{torneio.premiacao}</p>
              </section>
              <section className="tdet-section">
                <h3 className="tdet-subsection-title">Categorias</h3>
                <p className="tdet-body-text">{torneio.categorias}</p>
              </section>
            </div>

            {/* Importante – accordion */}
            <ImportanteAccordion texto={torneio.importante} />

          </div>

          {/* ── Sidebar ── */}
          <aside className="tdet-sidebar">

              {/* Pontuação */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Pontuação</h3>
              <table className="tdet-pts-table">
                <thead>
                  <tr>
                    <th>Fase</th>
                    <th>Pontos</th>
                  </tr>
                </thead>
                <tbody>
                  {torneio.pontuacao.map((row, i) => (
                    <tr key={i}>
                      <td>{row.fase}</td>
                      <td className="tdet-pts-val">{row.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

              {/* Inscrições */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Inscrições</h3>
              <div className="tdet-inscr-list">
                <div className="tdet-inscr-row">
                  <span>1ª Inscrição</span>
                  <strong>{torneio.inscricoes.primeira}</strong>
                </div>
                <div className="tdet-inscr-row">
                  <span>Demais Inscrições</span>
                  <strong>{torneio.inscricoes.demais}</strong>
                </div>
                <div className="tdet-inscr-row">
                  <span>Categoria fomento</span>
                  <strong>{torneio.inscricoes.fomento}</strong>
                </div>
                <div className="tdet-inscr-row">
                  <span>Taxa não federado</span>
                  <strong>{torneio.inscricoes.naoFederado}</strong>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                className="tdet-inscr-btn tdet-inscr-btn--full"
                onClick={() => setShowModal(true)}
              >
                Inscreva-se no torneio
              </Button>
              <button className="tdet-reg-link">Ver regulamento</button>
            </div>

              {/* Árbitros */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Árbitros</h3>
              <p className="tdet-body-text">{torneio.arbitros}</p>
            </div>

            {/* Hospedagem */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Hospedagem</h3>
              <p className="tdet-body-text">{torneio.hospedagem}</p>
            </div>

          </aside>
        </div>
      )}

      {/* ── Conteúdo: Lista de Inscritos ── */}
      {activeTab === tabs[1] && (
        <div className="tli-page">

          {/* Header */}
          <div className="tli-page-header">
            <h2 className="tli-page-title">Lista de inscritos</h2>
            <div className="tli-filter-row">
              <span className="tli-filter-label">Filtrar:</span>
              <select className="tli-filter-select">
                {ALL_CATEGORIES_INSCRICAO.map(c => (
                  <option key={c} disabled={c.startsWith('──')}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Categorias */}
          {inscritos.map((cat) => (
            <div key={cat.categoria} className="tli-cat-section">
              <div className="tli-cat-banner">
                <div className="inscr-cat-header">
                  <h3 className="inscr-cat-title">{cat.categoria}</h3>
                  <div className="inscr-cat-badges">
                    <span className="inscr-badge inscr-badge--blue">Inscritos: {cat.inscritosCount}</span>
                    {cat.filaCount > 0 && <span className="inscr-badge inscr-badge--yellow">Fila: {cat.filaCount}</span>}
                  </div>
                </div>
              </div>
              <table className="tli-table">
                <thead>
                  <tr>
                    <th className="tli-th tli-th--atleta">Atleta</th>
                    <th className="tli-th tli-th--codigo">Código</th>
                    <th className="tli-th tli-th--clube">Clube</th>
                    <th className="tli-th tli-th--cidade">Cidade</th>
                    <th className="tli-th tli-th--ranking">Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.duplas.map((dupla, di) => (
                    <tr key={di} className="tli-row">
                      <td className="tli-td tli-td--atleta">
                        <div className="tli-dupla-cell">
                          <div className="inscr-dupla-row">
                            <div className="inscr-dupla-avs">
                              <PlayerAvatar name={dupla.atletas[0]} />
                              <PlayerAvatar name={dupla.atletas[1]} />
                            </div>
                            <div className="inscr-dupla-names">
                              <span className="inscr-dupla-name">{dupla.atletas[0]}</span>
                              <span className="inscr-dupla-name">{dupla.atletas[1]}</span>
                              <span className="inscr-dupla-clube">{dupla.clubes[0]} / {dupla.clubes[1]}</span>
                            </div>
                            <div className="inscr-dupla-ranking">
                              <span>{dupla.rankings[0]}</span>
                              <span>{dupla.rankings[1]}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="tli-td tli-td--codigo">
                        <div className="tli-stacked">
                          <span>{dupla.codigos[0]}</span>
                          <span>{dupla.codigos[1]}</span>
                        </div>
                      </td>
                      <td className="tli-td tli-td--clube">
                        <div className="tli-stacked">
                          <span>{dupla.clubes[0]}</span>
                          <span>{dupla.clubes[1]}</span>
                        </div>
                      </td>
                      <td className="tli-td tli-td--cidade">
                        <div className="tli-stacked">
                          <span>{dupla.cidades[0]}</span>
                          <span>{dupla.cidades[1]}</span>
                        </div>
                      </td>
                      <td className="tli-td tli-td--ranking">
                        <div className="tli-stacked tli-stacked--right">
                          <span>{dupla.rankings[0]}</span>
                          <span>{dupla.rankings[1]}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Fila de Espera */}
          <div className="tli-cat-section">
            <div className="tli-cat-banner">
              <span className="tli-cat-name">Fila de Espera</span>
              <span className="tli-cat-count">Esperando: {String(filaEspera.esperando).padStart(2, '0')}</span>
            </div>
            <table className="tli-table">
              <thead>
                <tr>
                  <th className="tli-th tli-th--atleta">Atleta</th>
                    <th className="tli-th tli-th--codigo">Código</th>
                  <th className="tli-th tli-th--clube">Clube</th>
                  <th className="tli-th tli-th--cidade">Cidade</th>
                  <th className="tli-th tli-th--ranking">Ranking</th>
                </tr>
              </thead>
              <tbody>
                {filaEspera.duplas.map((dupla, di) => (
                  <tr key={di} className="tli-row">
                    <td className="tli-td tli-td--atleta">
                      <div className="tli-dupla-cell">
                        <div className="tli-dupla-avs">
                          <PlayerAvatar name={dupla.atletas[0]} />
                          <PlayerAvatar name={dupla.atletas[1]} />
                        </div>
                        <div className="tli-dupla-names">
                          <span>{dupla.atletas[0]}</span>
                          <span>{dupla.atletas[1]}</span>
                        </div>
                      </div>
                    </td>
                    <td className="tli-td tli-td--codigo">
                      <div className="tli-stacked"><span>{dupla.codigos[0]}</span><span>{dupla.codigos[1]}</span></div>
                    </td>
                    <td className="tli-td tli-td--clube">
                      <div className="tli-stacked"><span>{dupla.clubes[0]}</span><span>{dupla.clubes[1]}</span></div>
                    </td>
                    <td className="tli-td tli-td--cidade">
                      <div className="tli-stacked"><span>{dupla.cidades[0]}</span><span>{dupla.cidades[1]}</span></div>
                    </td>
                    <td className="tli-td tli-td--ranking">
                      <div className="tli-stacked tli-stacked--right"><span>{dupla.rankings[0]}</span><span>{dupla.rankings[1]}</span></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ── Conteúdo: Chaves ── */}
      {activeTab === tabs[3] && (
        <div className="chaves-page">

          {/* Print layout (hidden on screen) */}
          <PrintView dados={dados} />

          {/* ── Filtros desktop: 3 selects (ocultos no mobile) ── */}
          <div className="cf-section cf-section--desktop print-hide">
            <div className="cf-selects-row">
              <div className="cf-select-group">
                <label className="cf-select-label">Gênero</label>
                <BottomSheetSelect
                  value={genero}
                  onChange={v => setParam('genero', v, 'modalidade', 'nivel')}
                  options={[{ value: '', label: 'Selecione' }, ...GENEROS_CHAVE.map(g => ({ value: g, label: g }))]}
                  placeholder="Selecione"
                  title="Gênero"
                  nativeClassName="cf-select"
                />
              </div>
              <div className="cf-select-group">
                <label className="cf-select-label">Modalidade</label>
                <BottomSheetSelect
                  value={modalidade}
                  onChange={v => setParam('modalidade', v, 'nivel')}
                  options={[{ value: '', label: 'Selecione' }, ...MODALIDADES_CHAVE.map(m => ({ value: m, label: m }))]}
                  placeholder="Selecione"
                  title="Modalidade"
                  nativeClassName="cf-select"
                />
              </div>
              <div className="cf-select-group">
                <label className="cf-select-label">Nível</label>
                <BottomSheetSelect
                  value={nivel}
                  onChange={v => setParam('nivel', v)}
                  options={[{ value: '', label: 'Selecione' }, ...NIVEIS_CHAVE.map(n => ({ value: n, label: n }))]}
                  placeholder="Selecione"
                  title="Nível"
                  nativeClassName="cf-select"
                />
              </div>
            </div>
          </div>

          {/* ── Botão Filtrar (mobile only) ── */}
          <div className="cf-mobile-bar print-hide">
            <button className="cf-filter-btn" onClick={openChaveDrawer} aria-label="Abrir filtros">
              <FontAwesomeIcon icon={faSliders} />
              <span>Filtrar categoria</span>
              {chaveActiveCount > 0 && <span className="cf-filter-badge">{chaveActiveCount}</span>}
            </button>
            {genero && (
              <span className="cf-active-summary">
                {[genero, modalidade, nivel].filter(Boolean).join(' · ')}
              </span>
            )}
          </div>

          {/* ── Gaveta mobile (portal) ── */}
          {createPortal(<>
            <div
              className={`ch-drawer-backdrop${chaveDrawerOpen ? ' ch-drawer-backdrop--open' : ''}`}
              onClick={() => setChaveDrawerOpen(false)}
            />
            <div className={`ch-drawer${chaveDrawerOpen ? ' ch-drawer--open' : ''}`}>
              <div className="ch-drawer-handle" />
              <div className="ch-drawer-header">
                <span className="ch-drawer-title">Filtrar Chaves</span>
                <button className="ch-drawer-close" onClick={() => setChaveDrawerOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div className="ch-drawer-body">

                <div className="ch-drawer-section">
                  <p className="ch-drawer-section-label">Gênero</p>
                  <div className="ch-drawer-pills">
                    {GENEROS_CHAVE.map(g => (
                      <button
                        key={g}
                        className={`ch-drawer-pill${draftGenero === g ? ' ch-drawer-pill--active' : ''}`}
                        onClick={() => { setDraftGenero(g); setDraftModalidade(''); setDraftNivel('') }}
                      >{g}</button>
                    ))}
                  </div>
                </div>

                <div className="ch-drawer-section">
                  <p className="ch-drawer-section-label">Modalidade</p>
                  <div className="ch-drawer-pills">
                    {MODALIDADES_CHAVE.map(m => (
                      <button
                        key={m}
                        className={`ch-drawer-pill${draftModalidade === m ? ' ch-drawer-pill--active' : ''}`}
                        onClick={() => { setDraftModalidade(m); setDraftNivel('') }}
                      >{m}</button>
                    ))}
                  </div>
                </div>

                <div className="ch-drawer-section">
                  <p className="ch-drawer-section-label">Nível</p>
                  <div className="ch-drawer-pills ch-drawer-pills--wrap">
                    {NIVEIS_CHAVE.map(n => (
                      <button
                        key={n}
                        className={`ch-drawer-pill${draftNivel === n ? ' ch-drawer-pill--active' : ''}`}
                        onClick={() => setDraftNivel(n)}
                      >{n}</button>
                    ))}
                  </div>
                </div>

              </div>
              <div className="ch-drawer-footer">
                <button className="ch-drawer-btn ch-drawer-btn--clear" onClick={clearChaveDrawer}>
                  Limpar
                </button>
                <button className="ch-drawer-btn ch-drawer-btn--apply" onClick={applyChaveDrawer}>
                  Aplicar
                </button>
              </div>
            </div>
          </>, document.body)}

          {/* ── Estado vazio ── */}
          {(!genero || !modalidade || !nivel) && (
            <div className="chaves-empty print-hide">
              <div className="chaves-empty-icon">
                <Icon name="filter" size="lg" />
              </div>
              <p className="chaves-empty-text">
                {!genero
            ? 'Selecione o gênero e a categoria para ver o chaveamento'
                  : 'Selecione a categoria para ver o chaveamento'}
              </p>
            </div>
          )}

          {/* ── Sem dados ── */}
          {genero && modalidade && nivel && !dados && (
            <div className="chaves-empty chaves-empty--noresult print-hide">
              <div className="chaves-empty-icon">
                <Icon name="search" size="lg" />
              </div>
              <p className="chaves-empty-text">
                Nenhum chaveamento encontrado para esta combinação
              </p>
            </div>
          )}

          {/* ── Grupos ── */}
          {dados && <div className="chaves-panel print-hide">
            <div className="chaves-panel-title-bar d-flex a-center j-space-between">
              <span>Chaveamento</span>
              <button className="chaves-print-btn" onClick={() => window.print()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
                </svg>
                Imprimir
              </button>
            </div>
            <div className="chaves-groups-grid d-flex flex-col">
              {dados.grupos.map(grupo => (
                <div key={grupo.nome} className="chaves-grupo">
                  <div className="chaves-grupo-nome">{grupo.nome}</div>

                  <div className="chaves-grupo-body">
                      {/* Classificação */}
                    <div className="chaves-class-col">
                      <div className="chaves-class-card">
                      <div className="chaves-section-hdr">Classificação</div>
                      <table className="chaves-class-table">
                        <thead>
                          <tr>
                            <th className="print-hide">#</th>
                            <th className="print-only col-print-pos">_</th>
                            <th className="col-dupla">Dupla</th>
                            <th className="print-hide">V</th>
                            <th className="print-hide">D</th>
                            <th className="print-hide">SG</th>
                            <th className="print-only col-print-checks">V / D / D</th>
                            <th className="print-only">SG</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grupo.classificacao.map(row => (
                            <tr key={row.pos} className={row.pos <= 2 ? 'row-qualifier' : ''}>
                              <td className="td-pos print-hide">{row.pos}Âº</td>
                              <td className="td-pos print-only">___</td>
                              <td className="td-dupla">
                                <DuplaAvatars p1={row.p1} p2={row.p2} />
                                <DuplaNames p1={row.p1} p2={row.p2} />
                              </td>
                              <td className="print-hide">{row.v}</td>
                              <td className="print-hide">{row.d}</td>
                              <td className="td-sg print-hide">{row.sg > 0 ? `+${row.sg}` : row.sg}</td>
                              <td className="td-checks print-only">☐ ☐ ☐</td>
                              <td className="td-sg print-only">___</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="chaves-legend">
                        <span className="legend-dot" /> Classificado
                      </div>
                      </div>{/* end chaves-class-card */}
                    </div>

                    {/* Jogos */}
                    <div className="chaves-jogos-col">
                      <div className="chaves-section-hdr">Jogos</div>
                      {grupo.jogos.map((jogo, ji) => (
                        <GrupoMatchRow key={ji} jogo={jogo} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}

          {/* ── Eliminatórias ── */}
          {dados && <div className="chaves-panel print-hide">
            <div className="chaves-panel-title-bar d-flex a-center j-space-between">
              <span>Eliminatórias</span>
              <button className="chaves-print-btn" onClick={() => window.print()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
                </svg>
                Imprimir
              </button>
            </div>
            <BracketDisplay eliminatorias={dados.eliminatorias} />
          </div>}

        </div>
      )}

      {/* ── Conteúdo: Programação ── */}
      {activeTab === tabs[2] && (
        <div className="prog-page">

          {/* Header */}
          <div className="prog-header">
          <h2 className="prog-title">Programação</h2>
            <div className="prog-filters">
              <span className="prog-filter-label">Filtrar:</span>
              <BottomSheetSelect
                value="Todas as categorias"
                onChange={() => {}}
                options={['Todas as categorias','Masculino','Feminino','Mista']}
                title="Categoria"
                nativeClassName="prog-filter-select"
              />
              <BottomSheetSelect
                value="Todos os dias"
                onChange={() => {}}
              options={['Todos os dias','Sexta-Feira - 06/02','Sábado - 07/02','Domingo - 08/02']}
                title="Dia"
                nativeClassName="prog-filter-select"
              />
            </div>
          </div>

          {/* Alert */}
          <div className="prog-alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>Programação preliminar. Sujeita a alterações</span>
          </div>

          {/* Schedule panel */}
          <div className="prog-panel">
            {programacao.map((dia, di) => (
              <div key={di} className="prog-dia-block">

                {/* Day header */}
                <div className="prog-dia-header">
                  <span className="prog-dia-nome">{dia.dia}</span>
                </div>

                {/* Time rows */}
                {dia.horarios.map((slot, si) => (
                  <div key={si} className="prog-slot-row">
                    <div className="prog-slot-hora">
                      <span>{slot.hora}</span>
                    </div>
                    <div className="prog-slot-cards">
                      {slot.jogos.map((jogo, ji) => {
                        const isMasc = jogo.categoria.toLowerCase().includes('masculino')
                        const isFem  = jogo.categoria.toLowerCase().includes('feminino')
                        const accent = isMasc ? 'prog-card--masc' : isFem ? 'prog-card--fem' : 'prog-card--mista'
                        return (
                          <div key={ji} className={`prog-card ${accent}`}>
                            <div className="prog-card-top">
                              <span className="prog-card-categoria">{jogo.categoria}</span>
                              <span className="prog-card-fase">{jogo.fase}</span>
                            </div>
                            <div className="prog-card-bottom">
                              <span className="prog-card-label">Grupos</span>
                              <span className="prog-card-grupos">{jogo.grupos}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ── Conteúdo: Campeões ── */}
      {activeTab === tabs[4] && <CampeoesTab />}

      {/* ── Conteúdo: Álbum ── */}
      {activeTab === tabs[5] && (
        <div className="tdet-content tdet-content--center">
          <div className="tdet-album-empty">
            <div className="tdet-album-empty-icon">📷</div>
            <h3 className="tdet-album-empty-title">Álbum em breve</h3>
            <p className="tdet-album-empty-sub">As fotos do evento serão publicadas aqui após o torneio</p>
          </div>
        </div>
      )}

      {/* Outros tabs – placeholder */}
      {!tabs.includes(activeTab) && (
        <div className="tdet-content tdet-content--center">
          <p className="tdet-empty">Conteúdo em breve.</p>
        </div>
      )}

      {/* ── Próximos torneios ── */}
      <div className="print-hide"><TournamentsSection /></div>

      {/* Mobile sticky CTA */}
      <div className="tdet-mobile-cta">
        <Button variant="primary" size="md" className="tdet-mobile-cta-btn" onClick={() => setShowModal(true)}>
          Inscreva-se no torneio
        </Button>
      </div>

    </main>
  )
}
