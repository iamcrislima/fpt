import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '@1doc/1ds-react'
import { useSport } from '../context/SportContext'

const FPT_LOGO = '/images/fpt-logo.svg'

const BADGE_1500 = '/images/badge-1500.png'
const BADGE_2000 = '/images/badge-2000.png'
const BADGE_2500 = '/images/badge-2500.png'

function getBadge(name) {
  if (/grand.?slam/i.test(name)) return BADGE_2000
  if (/special.?cup/i.test(name)) return BADGE_2500
  return BADGE_1500
}

function getTennisBadge(name) {
  if (/grand.?slam/i.test(name)) return BADGE_2000
  if (/special.?cup/i.test(name)) return BADGE_2500
  return BADGE_1500
}

// ──────────────────────────────────────────────
// Dados — Torneios em Andamento (8 cards)
// ──────────────────────────────────────────────
const andamento = [
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
]

// ──────────────────────────────────────────────
// Dados — Inscrições Encerrando (6 cards)
// ──────────────────────────────────────────────
const encerrando = [
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
  { region: 'Região 41', name: '14 - Caiobá', dates: 'Caiobá - Matinhos / 05 a 08 de fevereiro', arena: 'Praia Brava - Caiobá - Matinhos' },
]

// ──────────────────────────────────────────────
// Dados — Torneios Abertos (por mês)
// ──────────────────────────────────────────────
const abertos = {
  Janeiro: [],
  Fevereiro: [
    { region: 'Região 41', name: '41 - Sun7 Sport', dates: 'Curitiba / 25 a 28 de fevereiro', arena: 'Arena Sun7 Sports', deadline: '02/02' },
    { region: 'Região 46', name: '46 - Sun7 Sport', dates: 'Londrina / 25 a 28 de fevereiro', arena: 'Arena Sun7 Sports', deadline: '02/02' },
    { region: 'Região 44', name: '13 - Youbeach', dates: 'Guarapuava / 05 a 08 de fevereiro', arena: 'Youbeach Arena Sports', deadline: '22/02' },
    { region: 'Região 46', name: '20 - Beach Village', dates: 'Maringá / 05 a 08 de fevereiro', arena: 'Arena Beach Village', deadline: '22/02' },
    { region: 'Região 42', name: '42 - A.S Escola de Beach Tennis', dates: 'Guarapuava / 05 a 08 de fevereiro', arena: 'A.S. Escola de Beach Tennis', deadline: '02/02' },
    { region: 'Região 46', name: '46 - Arena Caiobá - Petra', dates: 'Matinhos / 13 a 15 de fevereiro', arena: 'Arena Caiobá', deadline: '02/02' },
    { region: 'Região 43', name: '22 - Grand Slam - Dois Vizinhos', dates: 'Dois Vizinhos / 05 a 08 de fevereiro', arena: 'Arena Beach Dois Vizinhos', deadline: '02/02' },
    { region: 'Região 46', name: '21 - Grand Slam - Circuito Onix Lake', dates: 'Toledo / 05 a 08 de fevereiro', arena: 'Lake Sports', deadline: '02/02' },
    { region: 'Região 42', name: '38 - Grand Slam - Arena Praia Mar', dates: 'Paranavaí / 19 a 22 de fevereiro', arena: 'Arena Praia Mar', deadline: '16/02' },
    { region: 'Região 46', name: '31 - Grand Slam - Matchpoint', dates: 'Maringá / 19 a 22 de fevereiro', arena: 'Arena Match Point', deadline: '16/02' },
    { region: 'Região 42', name: '31 - Grand Slam - Cresol', dates: 'Guarapuava / 19 a 22 de fevereiro', arena: 'Arena Prime Beach Club', deadline: '16/02' },
    { region: 'Região 41', name: '31 - Grand Slam - Thalia', dates: 'Curitiba / 19 a 22 de fevereiro', arena: 'Sociedade Thalia', deadline: '16/02' },
    { region: 'Região 46', name: '49 - Special Cup - Arena Beltrão', dates: 'Francisco Beltrão / 27 de fevereiro a 01 de março', arena: 'Arena Beltrão', deadline: '23/02' },
    { region: 'Região 45', name: '31 - FICC', dates: 'Foz do Iguaçu / 27 de fevereiro a 01 de março', arena: 'Foz do Iguaçu Country Club', deadline: '23/02' },
    { region: 'Região 43', name: '45 - Palm Arena', dates: 'Rolândia / 27 de fevereiro a 01 de março', arena: 'Palm Arena Gastropark', deadline: '23/02' },
    { region: 'Região 41', name: '44 - Curitiba Beach Sports', dates: 'Curitiba / 27 de fevereiro a 01 de março', arena: 'Curitiba Beach Sports', deadline: '23/02' },
    { region: 'Região 45', name: '47 - Arena Miami', dates: 'Quatro Pontes / 27 de fevereiro a 01 de março', arena: 'Arena Miami', deadline: '23/02' },
    { region: 'Região 41', name: '45 - Open e Portos Paraná - Verão Maior', dates: 'Matinhos / 27 de fevereiro a 01 de março', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '23/02' },
  ],
  Março: [
    { region: 'Região 46', name: '46 - Let\'s go Beach', dates: 'Palmas / 12 a 15 de março', arena: 'Let\'s Go Beach', deadline: '02/02' },
    { region: 'Região 41', name: '32 - Pahragón', dates: 'Curitiba / 12 a 15 de março', arena: 'Pahragón Beach Tennis', deadline: '02/02' },
    { region: 'Região 46', name: '46 - New Arena', dates: 'Palmas / 12 a 22 de março', arena: 'New Arena', deadline: '02/02' },
    { region: 'Região 46', name: '09 - Interclubes Fiat Estadual de Beach Tennis', dates: 'Matinhos / 05 a 08 de março', arena: 'Praia Brava - Caiobá - Matinhos', deadline: '02/02' },
  ],
}

// ──────────────────────────────────────────────
// Dados — Torneios Encerrados (por mês)
// ──────────────────────────────────────────────
const encerrados = {
  Janeiro: [],
  Fevereiro: [],
  Março: [],
  Abril: [
    { region: 'Região 46', name: '54 - Let\'s go Beach', dates: 'Balneário Beltrão / 12 a 15 de março', arena: 'Let\'s Go Beach' },
    { region: 'Região 41', name: '51 - Pahragón', dates: 'Londrina / 12 a 15 de março', arena: 'Pahragón Beach Tennis' },
    { region: 'Região 46', name: '46 - New Arena', dates: 'Pato Branco-PR / 12 a 15 de março', arena: 'New Arena' },
    { region: 'Região 46', name: '09 - Interclubes Fiat Estadual de Beach Tennis', dates: 'Matinhos / 05 a 08 de março', arena: 'Praia Brava - Caiobá - Matinhos' },
  ],
}

// ──────────────────────────────────────────────
// Tennis data
// ──────────────────────────────────────────────
const andamentoTenis = [
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba', dates: 'Curitiba / 22 a 23 de março', arena: 'Clube Curitibano' },
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba', dates: 'Curitiba / 22 a 23 de março', arena: 'Clube Curitibano' },
  { region: 'Região 46', name: 'Tênis Series 1500 - Maringá', dates: 'Maringá / 29 a 30 de março', arena: 'Aabb Maringá' },
  { region: 'Região 46', name: 'Tênis Series 1500 - Maringá', dates: 'Maringá / 29 a 30 de março', arena: 'Aabb Maringá' },
  { region: 'Região 43', name: 'Tênis Series 1500 - Londrina', dates: 'Londrina / 05 a 06 de abril', arena: 'Londrina Tênis Clube' },
  { region: 'Região 43', name: 'Tênis Series 1500 - Londrina', dates: 'Londrina / 05 a 06 de abril', arena: 'Londrina Tênis Clube' },
  { region: 'Região 45', name: 'Grand Slam Tênis - Foz do Iguaçu', dates: 'Foz do Iguaçu / 12 a 14 de abril', arena: 'Foz Country Club' },
  { region: 'Região 45', name: 'Grand Slam Tênis - Foz do Iguaçu', dates: 'Foz do Iguaçu / 12 a 14 de abril', arena: 'Foz Country Club' },
]

const encerrandoTenis = [
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Norte', dates: 'Curitiba / 15 a 16 de março', arena: 'Clube Curitibano', deadline: '10/03' },
  { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Norte', dates: 'Curitiba / 15 a 16 de março', arena: 'Clube Curitibano', deadline: '10/03' },
  { region: 'Região 46', name: 'Interclubes Tênis 26 - Maringá', dates: 'Maringá / 19 a 21 de março', arena: 'Aabb Maringá', deadline: '13/03' },
  { region: 'Região 46', name: 'Interclubes Tênis 26 - Maringá', dates: 'Maringá / 19 a 21 de março', arena: 'Aabb Maringá', deadline: '13/03' },
  { region: 'Região 41', name: 'FPT Tênis Finals - Curitiba', dates: 'Curitiba / 28 a 30 de março', arena: 'Esporte Clube Sírio', deadline: '22/03' },
  { region: 'Região 41', name: 'FPT Tênis Finals - Curitiba', dates: 'Curitiba / 28 a 30 de março', arena: 'Esporte Clube Sírio', deadline: '22/03' },
]

const abertosTenis = {
  Março: [
    { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Sul', dates: 'Curitiba / 22 a 23 de março', arena: 'Clube Curitibano', deadline: '17/03' },
    { region: 'Região 46', name: 'Tênis Series 1500 - Maringá', dates: 'Maringá / 29 a 30 de março', arena: 'Aabb Maringá', deadline: '24/03' },
  ],
  Abril: [
    { region: 'Região 43', name: 'Tênis Series 1500 - Londrina', dates: 'Londrina / 05 a 06 de abril', arena: 'Londrina Tênis Clube', deadline: '31/03' },
    { region: 'Região 45', name: 'Grand Slam Tênis - Foz do Iguaçu', dates: 'Foz do Iguaçu / 12 a 14 de abril', arena: 'Foz Country Club', deadline: '07/04' },
    { region: 'Região 41', name: 'FPT Tênis Finals - Curitiba', dates: 'Curitiba / 26 a 28 de abril', arena: 'Esporte Clube Sírio', deadline: '21/04' },
  ],
}

const encerradosTenis = {
  Março: [
    { region: 'Região 41', name: 'Tênis Series 1500 - Curitiba Norte', dates: 'Curitiba / 15 a 16 de março', arena: 'Clube Curitibano' },
    { region: 'Região 46', name: 'Interclubes Tênis 26 - Maringá', dates: 'Maringá / 19 a 21 de março', arena: 'Aabb Maringá' },
  ],
}

// ──────────────────────────────────────────────
// Componentes
// ──────────────────────────────────────────────
function getTennisPoints(name) {
  if (/grand.?slam/i.test(name)) return 2000
  if (/special.?cup/i.test(name)) return 2500
  if (/finals/i.test(name)) return 2000
  return 1500
}

function TennisSeriesBadge({ name }) {
  const points = getTennisPoints(name)
  return (
    <div className="trn-tenis-badge">
      <span className="trn-tenis-badge-label">TÊNIS SERIES</span>
      <span className="trn-tenis-badge-points">{points}</span>
    </div>
  )
}

function TournamentCard({ card, actionLabel, showDeadline, isTennis }) {
  const navigate = useNavigate()
  const { sport } = useSport()
  const base = `/${sport}/torneios`
  return (
    <div className="trn-card" onClick={() => navigate(`${base}/1`)} style={{ cursor: 'pointer' }}>
      <div className="trn-card-badge">
        {isTennis
          ? <TennisSeriesBadge name={card.name} />
          : <img src={getBadge(card.name)} alt={card.name} />
        }
      </div>
      <div className="trn-card-info">
        <span className="trn-card-region">{card.region}</span>
        <span className="trn-card-name">{card.name}</span>
        <span className="trn-card-dates">{card.dates}</span>
        <span className="trn-card-arena">
          <Icon name="map-pin" size="sm" />
          {card.arena}
        </span>
      </div>
      {actionLabel && (
        <div className="trn-card-action" onClick={e => e.stopPropagation()}>
          <Button
            variant="primary"
            size="sm"
            className="trn-card-btn"
            onClick={() => navigate(`${base}/1/inscrever`)}
          >
            {actionLabel}
          </Button>
          {showDeadline && card.deadline && (
            <span className="trn-card-deadline">Inscreva-se até {card.deadline}</span>
          )}
        </div>
      )}
    </div>
  )
}

function CardGrid({ cards, actionLabel, showDeadline, isTennis }) {
  return (
    <div className="trn-card-grid">
      {cards.map((c, i) => (
        <TournamentCard key={i} card={c} actionLabel={actionLabel} showDeadline={showDeadline} isTennis={isTennis} />
      ))}
    </div>
  )
}

function MonthAccordion({ month, cards, defaultOpen, isTennis }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="trn-accordion">
      <button className="trn-accordion-header" onClick={() => setOpen(o => !o)}>
        <span className="trn-accordion-month">{month}</span>
        <Icon name={open ? 'nav-arrow-up' : 'nav-arrow-down'} size="sm" />
      </button>
      {open && cards.length > 0 && (
        <div className="trn-accordion-body">
          <CardGrid cards={cards} actionLabel="Inscrever" showDeadline isTennis={isTennis} />
        </div>
      )}
    </div>
  )
}

function MonthAccordionEncerrado({ month, cards, defaultOpen, isTennis }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="trn-accordion">
      <button className="trn-accordion-header" onClick={() => setOpen(o => !o)}>
        <span className="trn-accordion-month">{month}</span>
        <Icon name={open ? 'nav-arrow-up' : 'nav-arrow-down'} size="sm" />
      </button>
      {open && cards.length > 0 && (
        <div className="trn-accordion-body">
          <CardGrid cards={cards} actionLabel="Ver torneio" isTennis={isTennis} />
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Página principal
// ──────────────────────────────────────────────
export default function Torneios() {
  const { sport } = useSport()
  const isTennis = sport === 'tennis'

  const dataAndamento  = isTennis ? andamentoTenis  : andamento
  const dataEncerrando = isTennis ? encerrandoTenis : encerrando
  const dataAbertos    = isTennis ? abertosTenis    : abertos
  const dataEncerrados = isTennis ? encerradosTenis : encerrados

  const bannerTitle = isTennis ? 'Ranking FIAT de Tênis' : 'Ranking FIAT de Beach Tennis'

  return (
    <main className="torneios-page">

      {/* ── Banner ── */}
      <div className="trn-banner">
        <div className="trn-banner-logos">
          <span className="trn-fiat-logo">FIAT</span>
          <div className="trn-banner-sep" />
          <img src={FPT_LOGO} alt="FPT" className="trn-fpt-logo" />
        </div>
        <p className="trn-banner-title">{bannerTitle}</p>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      {/* ── Conteúdo ── */}
      <div className="trn-content">

        {/* Torneios em Andamento */}
        <div className="trn-colored-section trn-colored-section--green">
          <h2 className="trn-colored-title">Torneios em Andamento</h2>
          <CardGrid cards={dataAndamento} isTennis={isTennis} />
        </div>

        {/* Inscrições Encerrando */}
        <div className="trn-colored-section trn-colored-section--orange">
          <h2 className="trn-colored-title">Inscrições Encerrando</h2>
          <CardGrid cards={dataEncerrando} isTennis={isTennis} />
        </div>

        {/* Torneios Abertos */}
        <section className="trn-plain-section">
          <div className="trn-plain-section-header">
            <h2 className="trn-plain-title">Torneios Abertos</h2>
            <div className="trn-filters">
              <span className="trn-filters-label">Filtros:</span>
              <select className="trn-native-select">
                <option>2026</option>
                <option>2025</option>
              </select>
              <select className="trn-native-select">
                <option>Todos os meses</option>
                {Object.keys(dataAbertos).map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="trn-accordion-list">
            {Object.entries(dataAbertos).map(([month, cards]) => (
              <MonthAccordion
                key={month}
                month={month}
                cards={cards}
                defaultOpen
                isTennis={isTennis}
              />
            ))}
          </div>
        </section>

        {/* Torneios Encerrados */}
        <section className="trn-plain-section">
          <div className="trn-plain-section-header">
            <h2 className="trn-plain-title">Torneios Encerrados</h2>
            <div className="trn-filters">
              <span className="trn-filters-label">Filtros:</span>
              <select className="trn-native-select">
                <option>2026</option>
                <option>2025</option>
              </select>
              <select className="trn-native-select">
                <option>Todos os meses</option>
                {Object.keys(dataEncerrados).map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="trn-accordion-list">
            {Object.entries(dataEncerrados).map(([month, cards]) => (
              <MonthAccordionEncerrado
                key={month}
                month={month}
                cards={cards}
                defaultOpen
                isTennis={isTennis}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Fixed bottom CTA (mobile) */}
      <div className="trn-fixed-cta">
        <Button
          variant="primary"
          size="md"
          className="trn-fixed-cta-btn"
          onClick={() => {}}
        >
          Inscreva-se em um torneio
        </Button>
      </div>

    </main>
  )
}
