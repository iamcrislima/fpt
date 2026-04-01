import { useState } from 'react'
import { Tabs, Tab, Button } from '@1doc/1ds-react'
import { useSport } from '../context/SportContext'

const CARD1 = '/images/torneio-card-1.png'
const CARD2 = '/images/torneio-card-2-real.png'
const CARD3 = '/images/torneio-card-3-real.png'
const BT4 = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop'
const BT5 = 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=400&fit=crop'
const BT6 = 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop'

const TN1 = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop'
const TN2 = 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=600&h=400&fit=crop'
const TN3 = 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80'
const TN4 = 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=400&fit=crop'
const TN5 = 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=600&h=400&fit=crop'
const TN6 = 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=600&h=400&fit=crop'

const btTournaments = [
  { img: CARD1, name: 'FPT SERIES 1500 / Curitiba' },
  { img: CARD2, name: 'Interclubes 26 / Caiobá' },
  { img: CARD3, name: 'Finals / Curitiba' },
  { img: BT4,   name: 'FPT Open / Londrina' },
  { img: BT5,   name: 'Grand Slam BT / Foz do Iguaçu' },
  { img: BT6,   name: 'FPT Masters / Maringá' },
]

const tennisTournaments = [
  { img: TN1, name: 'FPT Tênis Series 1500 / Curitiba' },
  { img: TN2, name: 'Interclubes Tênis 26 / Maringá' },
  { img: TN3, name: 'FPT Tênis Finals / Curitiba' },
  { img: TN4, name: 'FPT Open Tênis / Londrina' },
  { img: TN5, name: 'Grand Slam Tênis / Foz do Iguaçu' },
  { img: TN6, name: 'FPT Masters Tênis / Maringá' },
]

const btCourses = [
  { img: BT4,   name: 'Iniciação ao Beach Tennis — Nível 1' },
  { img: BT5,   name: 'Técnica de Saque e Voleio — Nível 2' },
  { img: BT6,   name: 'Tática em Duplas — Avançado' },
  { img: CARD1, name: 'Preparação Física para BT — Todos os Níveis' },
  { img: CARD2, name: 'Regras Oficiais e Arbitragem FPT' },
  { img: CARD3, name: 'Beach Tennis Infantil — 6 a 12 anos' },
]

const tennisCourses = [
  { img: TN4, name: 'Iniciação ao Tênis — Nível 1' },
  { img: TN5, name: 'Técnica de Saque e Voleio — Nível 2' },
  { img: TN6, name: 'Tática em Duplas — Avançado' },
  { img: TN1, name: 'Preparação Física para Tênis — Todos os Níveis' },
  { img: TN2, name: 'Regras Oficiais e Arbitragem FPT Tênis' },
  { img: TN3, name: 'Tênis Infantil — 6 a 12 anos' },
]

const VISIBLE = 3

export default function TournamentsSection({ home = false }) {
  const { sport } = useSport()
  const [activeTab, setActiveTab] = useState('torneios')
  const [tourIdx, setTourIdx] = useState(0)
  const [courseIdx, setCourseIdx] = useState(0)

  const allTournaments = sport === 'tennis' ? tennisTournaments : btTournaments
  const allCourses     = sport === 'tennis' ? tennisCourses     : btCourses

  const idx = home ? (activeTab === 'torneios' ? tourIdx : courseIdx) : tourIdx
  const setIdx = home ? (activeTab === 'torneios' ? setTourIdx : setCourseIdx) : setTourIdx
  const items = home ? (activeTab === 'torneios' ? allTournaments : allCourses) : allTournaments

  const visibleItems = items.slice(idx, idx + VISIBLE)
  const canPrev = idx > 0
  const canNext = idx + VISIBLE < items.length

  return (
    <section className={`tournaments-section${home ? ' tournaments-section--home' : ''}`}>
      <div className="tournaments-top">
        <h2 className="section-title">Próximos torneios e eventos</h2>
        {home && (
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tab index="torneios" label="Torneios" />
            <Tab index="cursos" label="Cursos" />
          </Tabs>
        )}
      </div>

      <div className="tournament-cards">
        {visibleItems.map((t) => (
          <div key={t.name} className="tournament-card">
            <div className="tournament-img-wrap">
              <img src={t.img} alt={t.name} />
            </div>
            <p className="tournament-name">{t.name}</p>
          </div>
        ))}
      </div>

      <div className="carousel-nav">
        <Button
          variant="neutral"
          startIcon="nav-arrow-left"
          className="carousel-btn"
          aria-label="Anterior"
          disabled={!canPrev}
          onClick={() => setIdx(Math.max(0, idx - VISIBLE))}
        />
        <Button
          variant="neutral"
          startIcon="nav-arrow-right"
          className="carousel-btn"
          aria-label="Próximo"
          disabled={!canNext}
          onClick={() => setIdx(Math.min(items.length - VISIBLE, idx + VISIBLE))}
        />
      </div>
    </section>
  )
}
