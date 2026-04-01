import { HISTORIA } from './historiaData'
import './Historia.css'

function IconRacket() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function IconFlag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

function IconTrophy() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconBuilding() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

const ICONS = [IconRacket, IconFlag, IconTrophy, IconStar, IconUsers, IconBuilding, IconGlobe]

export default function Historia() {
  return (
    <div className="hist-page">

      {/* ── Hero ── */}
      <div className="hist-hero">
        <div className="hist-hero-inner">
          <span className="hist-hero-tag">FPT — Desde 1946</span>
          <h1 className="hist-hero-title">
            A <span>História</span> da<br />Federação Paranaense
          </h1>
          <p className="hist-hero-subtitle">
            Mais de 75 anos de tênis e beach tennis no Paraná. Conheça a trajetória da FPT, desde os primeiros campeonatos até se tornar referência no esporte nacional.
          </p>
          <div className="hist-hero-years">
            {HISTORIA.map(h => (
              <span key={h.ano} className="hist-hero-year-pill">{h.ano}</span>
            ))}
          </div>
        </div>
        <div className="hist-hero-wave" aria-hidden="true" />
      </div>

      {/* ── Timeline ── */}
      <div className="hist-body">
        <div className="hist-timeline">
          {HISTORIA.map((item, i) => {
            const IconComp = ICONS[i % ICONS.length]
            return (
              <div key={item.ano} className="hist-item">

                {/* Coluna esquerda: badge + ano */}
                <div className="hist-left">
                  <div
                    className="hist-badge"
                    style={{ background: item.cor, color: item.cor }}
                  >
                    <IconComp />
                  </div>
                  <span className="hist-ano">{item.ano}</span>
                </div>

                {/* Card de conteúdo */}
                <div className="hist-card">
                  <div className="hist-card-header">
                    <div
                      className="hist-card-header-bar"
                      style={{ background: item.cor }}
                    />
                    <h2 className="hist-card-titulo">{item.titulo}</h2>
                  </div>

                  <div className="hist-card-body">
                    {item.paragrafos.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>

                  {item.destaque && (
                    <div className="hist-destaque">
                      <p className="hist-destaque-titulo">{item.destaque.titulo}</p>
                      <ul className="hist-destaque-list">
                        {item.destaque.itens.map((it, k) => (
                          <li key={k}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            )
          })}
        </div>

        {/* Nota de rodapé */}
        <div className="hist-footer-note">
          <div className="hist-footer-note-icon">
            <IconGlobe />
          </div>
          <p>
            <strong>A história continua.</strong> A FPT segue crescendo e hoje é referência no Beach Tennis nacional, promovendo centenas de torneios por ano em todo o Paraná. Conheça os torneios e faça parte dessa trajetória.
          </p>
        </div>
      </div>

    </div>
  )
}
