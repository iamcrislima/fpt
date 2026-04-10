import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faMagnifyingGlass, faLocationDot, faCalendarDays, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useSport } from '../context/SportContext'
import { usePullToRefresh } from '../hooks/usePullToRefresh'
import { SkeletonTournamentCard, SkeletonList } from '../components/SkeletonLoader'
import PtrIndicator from '../components/PtrIndicator'

const BADGE_1500     = '/images/badge-1500.png'
const BADGE_2000     = '/images/badge-2000.png'
const BADGE_2500     = '/images/badge-2500.png'

function getBadge(name) {
  if (/grand.?slam/i.test(name))  return BADGE_2000
  if (/special.?cup/i.test(name)) return BADGE_2500
  return BADGE_1500
}

function getTennisPoints(name) {
  if (/grand.?slam/i.test(name)) return 2000
  if (/special.?cup/i.test(name)) return 2500
  if (/finals/i.test(name)) return 2000
  return 1500
}

// ── Dados BT ────────────────────────────────────────────────────────────────

const andamento = [
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos' },
]

const encerrando = [
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '03/02' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '03/02' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '03/02' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '03/02' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '03/02' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fev', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '03/02' },
]

const abertos = {
  Janeiro: [],
  Fevereiro: [
    { region: 'Região 41', name: '41 - Sun7 Sport', dates: 'Curitiba / 25 a 28 de fev', arena: 'Arena Sun7 Sports', deadline: '02/02' },
    { region: 'Região 46', name: '46 - Sun7 Sport', dates: 'Londrina / 25 a 28 de fev', arena: 'Arena Sun7 Sports', deadline: '02/02' },
    { region: 'Região 44', name: '13 - Youbeach', dates: 'Guarapuava / 05 a 08 de fev', arena: 'Youbeach Arena Sports', deadline: '22/02' },
    { region: 'Região 46', name: '20 - Beach Village', dates: 'Maringá / 05 a 08 de fev', arena: 'Arena Beach Village', deadline: '22/02' },
    { region: 'Região 42', name: '42 - A.S Escola de Beach Tennis', dates: 'Guarapuava / 05 a 08 de fev', arena: 'A.S. Escola de Beach Tennis', deadline: '02/02' },
    { region: 'Região 46', name: '46 - Arena Caiobá - Petra', dates: 'Matinhos / 13 a 15 de fev', arena: 'Arena Caiobá', deadline: '02/02' },
    { region: 'Região 43', name: '22 - Grand Slam - Dois Vizinhos', dates: 'Dois Vizinhos / 05 a 08 de fev', arena: 'Arena Beach Dois Vizinhos', deadline: '02/02' },
    { region: 'Região 46', name: '21 - Grand Slam - Circuito Onix Lake', dates: 'Toledo / 05 a 08 de fev', arena: 'Lake Sports', deadline: '02/02' },
    { region: 'Região 42', name: '38 - Grand Slam - Arena Praia Mar', dates: 'Paranavaí / 19 a 22 de fev', arena: 'Arena Praia Mar', deadline: '16/02' },
    { region: 'Região 46', name: '31 - Grand Slam - Matchpoint', dates: 'Maringá / 19 a 22 de fev', arena: 'Arena Match Point', deadline: '16/02' },
    { region: 'Região 42', name: '31 - Grand Slam - Cresol', dates: 'Guarapuava / 19 a 22 de fev', arena: 'Arena Prime Beach Club', deadline: '16/02' },
    { region: 'Região 41', name: '31 - Grand Slam - Thalia', dates: 'Curitiba / 19 a 22 de fev', arena: 'Sociedade Thalia', deadline: '16/02' },
    { region: 'Região 46', name: '49 - Special Cup - Arena Beltrão', dates: 'Francisco Beltrão / 27 fev a 01 mar', arena: 'Arena Beltrão', deadline: '23/02' },
    { region: 'Região 45', name: '31 - FICC', dates: 'Foz do Iguaçu / 27 fev a 01 mar', arena: 'Foz do Iguaçu Country Club', deadline: '23/02' },
    { region: 'Região 43', name: '45 - Palm Arena', dates: 'Rolândia / 27 fev a 01 mar', arena: 'Palm Arena Gastropark', deadline: '23/02' },
    { region: 'Região 41', name: '44 - Curitiba Beach Sports', dates: 'Curitiba / 27 fev a 01 mar', arena: 'Curitiba Beach Sports', deadline: '23/02' },
    { region: 'Região 45', name: '47 - Arena Miami', dates: 'Quatro Pontes / 27 fev a 01 mar', arena: 'Arena Miami', deadline: '23/02' },
    { region: 'Região 41', name: '45 - Open e Portos Paraná', dates: 'Matinhos / 27 fev a 01 mar', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '23/02' },
  ],
  Março: [
    { region: 'Região 46', name: "46 - Let's go Beach", dates: 'Palmas / 12 a 15 de mar', arena: "Let's Go Beach", deadline: '02/02' },
    { region: 'Região 41', name: '32 - Pahragón', dates: 'Curitiba / 12 a 15 de mar', arena: 'Pahragón Beach Tennis', deadline: '02/02' },
    { region: 'Região 46', name: '46 - New Arena', dates: 'Palmas / 12 a 22 de mar', arena: 'New Arena', deadline: '02/02' },
    { region: 'Região 46', name: '09 - Interclubes Fiat Estadual', dates: 'Matinhos / 05 a 08 de mar', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '02/02' },
  ],
}

const encerrados = {
  Janeiro: [],
  Fevereiro: [],
  Março: [],
  Abril: [
    { region: 'Região 46', name: "54 - Let's go Beach", dates: 'Balneário Beltrão / 12 a 15 de mar', arena: "Let's Go Beach" },
    { region: 'Região 41', name: '51 - Pahragón', dates: 'Londrina / 12 a 15 de mar', arena: 'Pahragón Beach Tennis' },
    { region: 'Região 46', name: '46 - New Arena', dates: 'Pato Branco-PR / 12 a 15 de mar', arena: 'New Arena' },
    { region: 'Região 46', name: '09 - Interclubes Fiat Estadual', dates: 'Matinhos / 05 a 08 de mar', arena: 'Praia Brava - Caiobá - Matinhos' },
  ],
}

// ── Dados Tênis ─────────────────────────────────────────────────────────────

const andamentoTenis = [
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba', dates: 'Curitiba / 22 a 23 de mar', arena: 'Clube Curitibano' },
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba', dates: 'Curitiba / 22 a 23 de mar', arena: 'Clube Curitibano' },
  { region: 'Região 46', name: 'Tênis Series 1500 - Maringá', dates: 'Maringá / 29 a 30 de mar', arena: 'Aabb Maringá' },
  { region: 'Região 46', name: 'Tênis Series 1500 - Maringá', dates: 'Maringá / 29 a 30 de mar', arena: 'Aabb Maringá' },
  { region: 'Região 43', name: 'Tênis Series 1500 - Londrina', dates: 'Londrina / 05 a 06 de abr', arena: 'Londrina Tênis Clube' },
  { region: 'Região 45', name: 'Grand Slam Tênis - Foz do Iguaçu', dates: 'Foz do Iguaçu / 12 a 14 de abr', arena: 'Foz Country Club' },
]

const encerrandoTenis = [
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Norte', dates: 'Curitiba / 15 a 16 de mar', arena: 'Clube Curitibano', deadline: '10/03' },
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Norte', dates: 'Curitiba / 15 a 16 de mar', arena: 'Clube Curitibano', deadline: '10/03' },
  { region: 'Região 46', name: 'Interclubes Tênis 26 - Maringá', dates: 'Maringá / 19 a 21 de mar', arena: 'Aabb Maringá', deadline: '13/03' },
  { region: 'Região 41', name: 'FPT Tênis Finals - Curitiba', dates: 'Curitiba / 28 a 30 de mar', arena: 'Esporte Clube Sírio', deadline: '22/03' },
]

const abertosTenis = {
  Março: [
    { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Sul', dates: 'Curitiba / 22 a 23 de mar', arena: 'Clube Curitibano', deadline: '17/03' },
    { region: 'Região 46', name: 'Tênis Series 1500 - Maringá', dates: 'Maringá / 29 a 30 de mar', arena: 'Aabb Maringá', deadline: '24/03' },
  ],
  Abril: [
    { region: 'Região 43', name: 'Tênis Series 1500 - Londrina', dates: 'Londrina / 05 a 06 de abr', arena: 'Londrina Tênis Clube', deadline: '31/03' },
    { region: 'Região 45', name: 'Grand Slam Tênis - Foz do Iguaçu', dates: 'Foz do Iguaçu / 12 a 14 de abr', arena: 'Foz Country Club', deadline: '07/04' },
    { region: 'Região 41', name: 'FPT Tênis Finals - Curitiba', dates: 'Curitiba / 26 a 28 de abr', arena: 'Esporte Clube Sírio', deadline: '21/04' },
  ],
}

const encerradosTenis = {
  Março: [
    { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Norte', dates: 'Curitiba / 15 a 16 de mar', arena: 'Clube Curitibano' },
    { region: 'Região 46', name: 'Interclubes Tênis 26 - Maringá', dates: 'Maringá / 19 a 21 de mar', arena: 'Aabb Maringá' },
  ],
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Converte { Mês: [...cards] } → [...cards] eliminando meses vazios */
function flatByMonth(dict) {
  return Object.values(dict).flat()
}

/** Verifica se card bate com a query de busca */
function cardMatches(card, query) {
  if (!query) return true
  const q = query.toLowerCase()
  return [card.name, card.arena, card.dates, card.region]
    .some(f => f?.toLowerCase().includes(q))
}

// ── Sub-components ────────────────────────────────────────────────────────────

/** Badge de série para torneios de Tênis */
function TennisBadge({ name }) {
  const pts = getTennisPoints(name)
  return (
    <div className="trn-tenis-badge">
      <span className="trn-tenis-badge-label">TÊNIS SERIES</span>
      <span className="trn-tenis-badge-points">{pts}</span>
    </div>
  )
}

/**
 * TournamentCard — horizontal, clicável inteiro, sem botão interno.
 *
 * statusVariant: 'open' | 'urgent' | 'live' | 'closed'
 */
const STATUS_LABELS = {
  open:   'Aberto',
  urgent: 'Últimos dias',
  live:   'Em andamento',
  closed: 'Encerrado',
}

function TournamentCard({ card, statusVariant, isTennis }) {
  const navigate = useNavigate()
  const { sport } = useSport()

  // "Curitiba / 25 a 28 de fev"  →  city="Curitiba", dateRange="25 a 28 de fev"
  const slashIdx = card.dates.indexOf(' / ')
  const city      = slashIdx !== -1 ? card.dates.slice(0, slashIdx) : null
  const dateRange = slashIdx !== -1 ? card.dates.slice(slashIdx + 3) : card.dates

  const locationLine = city ? `${city} · ${card.arena}` : card.arena
  const dateLine     = card.deadline ? `${dateRange} • Inscrições até ${card.deadline}` : dateRange

  return (
    <article
      className="trn-compact-card"
      onClick={() => navigate(`/${sport}/torneios/1`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/${sport}/torneios/1`)}
    >
      {/* Thumb */}
      <div className="trn-compact-card__thumb">
        {isTennis
          ? <TennisBadge name={card.name} />
          : <img src={getBadge(card.name)} alt="" loading="lazy" />
        }
      </div>

      {/* Body */}
      <div className="trn-compact-card__body">

        {/* Row 1: title + status badge */}
        <div className="trn-compact-card__top-row">
          <p className="trn-compact-card__title">{card.name}</p>
          <span className={`trn-status-badge trn-status-badge--${statusVariant}`}>
            {STATUS_LABELS[statusVariant]}
          </span>
        </div>

        {/* Row 2: region tag */}
        <p className="trn-compact-card__region">{card.region}</p>

        {/* Row 3: city · arena */}
        <p className="trn-compact-card__location">
          <FontAwesomeIcon icon={faLocationDot} fixedWidth aria-hidden="true" />
          {locationLine}
        </p>

        {/* Row 4: date range • deadline (single line) */}
        <p className="trn-compact-card__dateline">
          <FontAwesomeIcon icon={faCalendarDays} fixedWidth aria-hidden="true" />
          {dateLine}
        </p>

      </div>
    </article>
  )
}

/**
 * CollapsibleSection — seção com header toggle + lista de cards animada.
 * Usa max-height para a transição CSS (sem JS de altura).
 */
function CollapsibleSection({ title, cards, defaultOpen, statusVariant, isTennis }) {
  const [open, setOpen] = useState(defaultOpen)

  // Não renderiza seção vazia
  if (!cards.length) return null

  return (
    <div className="trn-section-box" data-variant={statusVariant}>
      <button
        className="trn-section-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="trn-section-title">{title}</span>
        <div className="trn-section-header-right">
          <span className="trn-section-count">{cards.length}</span>
          <FontAwesomeIcon
            icon={open ? faChevronUp : faChevronDown}
            className="trn-section-chevron"
            aria-hidden="true"
          />
        </div>
      </button>

      <div className={`trn-section-body${open ? ' trn-section-body--open' : ''}`} aria-hidden={!open}>
        <div className="trn-section-grid">
          {cards.map((card, i) => (
            <TournamentCard
              key={i}
              card={card}
              statusVariant={statusVariant}
              isTennis={isTennis}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function Torneios() {
  const { sport } = useSport()
  const isTennis = sport === 'tennis'

  const [query, setQuery] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  // Seleciona dados por modalidade
  const dataAndamento  = isTennis ? andamentoTenis  : andamento
  const dataEncerrando = isTennis ? encerrandoTenis : encerrando
  const dataAbertos    = isTennis ? abertosTenis    : abertos
  const dataEncerrados = isTennis ? encerradosTenis : encerrados

  // Flatten dos dicts por mês → arrays planos
  const allAbertos    = useMemo(() => flatByMonth(dataAbertos),    [dataAbertos])
  const allEncerrados = useMemo(() => flatByMonth(dataEncerrados), [dataEncerrados])

  // Filtro de busca aplicado a todas as seções
  const filter = useCallback((arr) => arr.filter(c => cardMatches(c, query)), [query])

  const filteredAndamento  = useMemo(() => filter(dataAndamento),  [filter, dataAndamento])
  const filteredEncerrando = useMemo(() => filter(dataEncerrando), [filter, dataEncerrando])
  const filteredAbertos    = useMemo(() => filter(allAbertos),     [filter, allAbertos])
  const filteredEncerrados = useMemo(() => filter(allEncerrados),  [filter, allEncerrados])

  const totalVisible =
    filteredAndamento.length + filteredEncerrando.length +
    filteredAbertos.length   + filteredEncerrados.length

  async function handleRefresh() {
    setRefreshing(true)
    await new Promise(r => setTimeout(r, 700))
    setRefreshing(false)
  }

  const { loading: ptrLoading, pullRatio, handlers } = usePullToRefresh(handleRefresh)

  return (
    <main className="torneios-page" {...handlers}>

      <PtrIndicator loading={ptrLoading} ratio={pullRatio} />

      {/* ── Page header ──────────────────────────────────────── */}
      <header className="trn-page-header">
        <div className="page-container">
          <h1 className="trn-page-title">Torneios</h1>
          <p className="trn-page-subtitle">Jogue. Compita. Suba no ranking.</p>
        </div>
      </header>

      {/* ── Search bar — sticky ───────────────────────────────── */}
      <div className="trn-search-bar">
        <div className="page-container trn-search-inner">
          <div className="trn-search-input-wrap">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="trn-search-icon" aria-hidden="true" />
            <input
              className="trn-search-input"
              type="search"
              placeholder="Buscar torneio, arena ou cidade…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoComplete="off"
              aria-label="Buscar torneio"
            />
            {query && (
              <button className="trn-search-clear" onClick={() => setQuery('')} aria-label="Limpar busca">
                <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
              </button>
            )}
          </div>
          {query && (
            <span className="trn-search-results" aria-live="polite">
              {totalVisible === 0 ? 'Nenhum resultado' : `${totalVisible} torneio${totalVisible !== 1 ? 's' : ''}`}
            </span>
          )}
        </div>
      </div>

      {/* ── Seções colapsáveis ───────────────────────────────── */}
      <div className="trn-content">
        <div className="page-container trn-content-inner">

          {refreshing ? (
            <div className="trn-section-grid">
              <SkeletonList Component={SkeletonTournamentCard} count={6} />
            </div>
          ) : (
            <>
              <CollapsibleSection
                title="Inscrições Abertas"
                cards={filteredAbertos}
                defaultOpen
                statusVariant="open"
                isTennis={isTennis}
              />

              <CollapsibleSection
                title="Últimos Dias"
                cards={filteredEncerrando}
                defaultOpen
                statusVariant="urgent"
                isTennis={isTennis}
              />

              <CollapsibleSection
                title="Em Andamento"
                cards={filteredAndamento}
                defaultOpen
                statusVariant="live"
                isTennis={isTennis}
              />

              <CollapsibleSection
                title="Encerrados"
                cards={filteredEncerrados}
                defaultOpen={false}
                statusVariant="closed"
                isTennis={isTennis}
              />

              {/* Estado vazio global */}
              {query && totalVisible === 0 && (
                <div className="trn-empty-state">
                  <p>Nenhum torneio encontrado para <strong>"{query}"</strong></p>
                  <button className="trn-empty-clear" onClick={() => setQuery('')}>
                    Limpar busca
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>

    </main>
  )
}
