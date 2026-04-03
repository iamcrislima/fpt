import { useState } from 'react'
import { Tabs, Tab } from '@1doc/1ds-react'
import EventList from './EventList'

/* ─────────────────────────────────────────────────────────────
   Tab definitions — the "type" value maps to event.type
   ───────────────────────────────────────────────────────────── */
const TABS = [
  { index: 'infantojuvenil', label: 'Infantojuvenil' },
  { index: 'beach-tennis',   label: 'Beach Tennis'   },
  { index: 'cursos',         label: 'Cursos'         },
  { index: 'transferencias', label: 'Transferências' },
]

/* ─────────────────────────────────────────────────────────────
   Mock data — replace with API call when backend is ready.
   Each event must follow the shape:
   { id, title, category, location, registrationDeadline, image, type }
   ───────────────────────────────────────────────────────────── */
const MOCK_EVENTS = [
  // ── Infantojuvenil ──────────────────────────────────────────
  {
    id: 'ij-1', type: 'infantojuvenil',
    title: 'FPT Series Juvenil / Curitiba',
    category: 'Sub-16 · Sub-18',
    location: 'Curitiba, PR',
    registrationDeadline: '2026-04-20',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop',
  },
  {
    id: 'ij-2', type: 'infantojuvenil',
    title: 'Interclubes Infantil / Maringá',
    category: 'Sub-12 · Sub-14',
    location: 'Maringá, PR',
    registrationDeadline: '2026-04-28',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200&h=200&fit=crop',
  },
  {
    id: 'ij-3', type: 'infantojuvenil',
    title: 'Grand Slam Mirim / Londrina',
    category: 'Sub-10 · Sub-12',
    location: 'Londrina, PR',
    registrationDeadline: '2026-05-05',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop',
  },
  {
    id: 'ij-4', type: 'infantojuvenil',
    title: 'FPT Open Júnior / Ponta Grossa',
    category: 'Sub-16 · Open',
    location: 'Ponta Grossa, PR',
    registrationDeadline: '2026-05-12',
    image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=200&h=200&fit=crop',
  },
  {
    id: 'ij-5', type: 'infantojuvenil',
    title: 'Copa Paraná Infantojuvenil',
    category: 'Sub-14 · Sub-16 · Sub-18',
    location: 'Cascavel, PR',
    registrationDeadline: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=200&h=200&fit=crop',
  },
  {
    id: 'ij-6', type: 'infantojuvenil',
    title: 'Finals Juvenil / Foz do Iguaçu',
    category: 'Sub-18 · Classificatório',
    location: 'Foz do Iguaçu, PR',
    registrationDeadline: '2026-06-01',
    image: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=200&h=200&fit=crop',
  },

  // ── Beach Tennis ─────────────────────────────────────────────
  {
    id: 'bt-1', type: 'beach-tennis',
    title: 'FPT Series 1500 / Curitiba',
    category: 'Ranking Estadual · Open',
    location: 'Curitiba, PR',
    registrationDeadline: '2026-04-18',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop',
  },
  {
    id: 'bt-2', type: 'beach-tennis',
    title: 'Interclubes BT 26 / Caiobá',
    category: 'Duplas Mistas · A e B',
    location: 'Matinhos, PR',
    registrationDeadline: '2026-04-25',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200&h=200&fit=crop',
  },
  {
    id: 'bt-3', type: 'beach-tennis',
    title: 'FPT Finals / Curitiba',
    category: 'Elite · Convidados',
    location: 'Curitiba, PR',
    registrationDeadline: '2026-05-02',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop',
  },
  {
    id: 'bt-4', type: 'beach-tennis',
    title: 'FPT Open / Londrina',
    category: 'Ranking Estadual · A/B/C',
    location: 'Londrina, PR',
    registrationDeadline: '2026-05-10',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&h=200&fit=crop',
  },
  {
    id: 'bt-5', type: 'beach-tennis',
    title: 'Grand Slam BT / Foz do Iguaçu',
    category: 'Ranking Estadual · Open Elite',
    location: 'Foz do Iguaçu, PR',
    registrationDeadline: '2026-05-18',
    image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=200&h=200&fit=crop',
  },
  {
    id: 'bt-6', type: 'beach-tennis',
    title: 'FPT Masters / Maringá',
    category: 'Elite · Encerramento de Temporada',
    location: 'Maringá, PR',
    registrationDeadline: '2026-06-05',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=200&h=200&fit=crop',
  },

  // ── Cursos ───────────────────────────────────────────────────
  {
    id: 'cu-1', type: 'cursos',
    title: 'Iniciação ao Beach Tennis — Nível 1',
    category: 'Formação de Atletas · Todos os Níveis',
    location: 'Curitiba, PR',
    registrationDeadline: '2026-04-22',
    image: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=200&h=200&fit=crop',
  },
  {
    id: 'cu-2', type: 'cursos',
    title: 'Técnica de Saque e Voleio — Nível 2',
    category: 'Aperfeiçoamento · Intermediário',
    location: 'Londrina, PR',
    registrationDeadline: '2026-04-29',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop',
  },
  {
    id: 'cu-3', type: 'cursos',
    title: 'Tática em Duplas — Avançado',
    category: 'Alta Performance · Avançado',
    location: 'Maringá, PR',
    registrationDeadline: '2026-05-06',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200&h=200&fit=crop',
  },
  {
    id: 'cu-4', type: 'cursos',
    title: 'Preparação Física para BT',
    category: 'Condicionamento · Todos os Níveis',
    location: 'Cascavel, PR',
    registrationDeadline: '2026-05-13',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&h=200&fit=crop',
  },
  {
    id: 'cu-5', type: 'cursos',
    title: 'Regras Oficiais e Arbitragem FPT',
    category: 'Formação de Árbitros · Certificação',
    location: 'Curitiba, PR',
    registrationDeadline: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop',
  },
  {
    id: 'cu-6', type: 'cursos',
    title: 'Beach Tennis Infantil — 6 a 12 anos',
    category: 'Formação de Base · Crianças',
    location: 'Ponta Grossa, PR',
    registrationDeadline: '2026-05-27',
    image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=200&h=200&fit=crop',
  },

  // ── Transferências ───────────────────────────────────────────
  {
    id: 'tr-1', type: 'transferencias',
    title: 'Transferência Interclube — Período 1',
    category: 'Janela de Transferências · Aberta',
    location: 'Todo o Paraná',
    registrationDeadline: '2026-04-30',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=200&h=200&fit=crop',
  },
  {
    id: 'tr-2', type: 'transferencias',
    title: 'Transferência Estadual — Categoria A',
    category: 'Ranking A · Solicitação Online',
    location: 'Todo o Paraná',
    registrationDeadline: '2026-05-07',
    image: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=200&h=200&fit=crop',
  },
  {
    id: 'tr-3', type: 'transferencias',
    title: 'Transferência Juvenil — Sub-18',
    category: 'Categoria Juvenil · Documentação',
    location: 'Todo o Paraná',
    registrationDeadline: '2026-05-14',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop',
  },
  {
    id: 'tr-4', type: 'transferencias',
    title: 'Transferência Interclubes BT',
    category: 'Beach Tennis · Janela Semestral',
    location: 'Todo o Paraná',
    registrationDeadline: '2026-05-21',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&h=200&fit=crop',
  },
  {
    id: 'tr-5', type: 'transferencias',
    title: 'Transferência Mirim — Sub-12/14',
    category: 'Categoria Base · Documentação',
    location: 'Todo o Paraná',
    registrationDeadline: '2026-05-28',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200&h=200&fit=crop',
  },
  {
    id: 'tr-6', type: 'transferencias',
    title: 'Transferência Internacional',
    category: 'ITF · Documentação Federal',
    location: 'Todo o Paraná',
    registrationDeadline: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200&h=200&fit=crop',
  },
]

/* ─────────────────────────────────────────────────────────────
   EventsSection
   Props:
     events  — array of event objects (defaults to mock data)
     loading — boolean
   ───────────────────────────────────────────────────────────── */
export default function EventsSection({ events = MOCK_EVENTS, loading = false }) {
  const [activeTab, setActiveTab] = useState(TABS[0].index)

  const filteredEvents = events.filter((e) => e.type === activeTab)

  function handleTabChange(tabIndex) {
    setActiveTab(tabIndex)
  }

  return (
    <section className="events-section">
      <div className="events-section__header">
        <h2 className="section-title">Calendário de Eventos</h2>

        <Tabs value={activeTab} onChange={handleTabChange}>
          {TABS.map((tab) => (
            <Tab key={tab.index} index={tab.index} label={tab.label} />
          ))}
        </Tabs>
      </div>

      <EventList events={filteredEvents} loading={loading} key={activeTab} />
    </section>
  )
}
