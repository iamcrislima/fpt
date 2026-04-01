import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSport } from '../../context/SportContext'
import './SportSelection.css'

const FPT_LOGO_URL = '/images/fpt-logo.svg'

export default function SportSelection() {
  const navigate  = useNavigate()
  const { setSport } = useSport()
  const [hovered,   setHovered]   = useState(null)   // 'bt' | 'tennis' | null
  const [selecting, setSelecting] = useState(null)   // 'bt' | 'tennis' | null
  const [exiting,   setExiting]   = useState(false)

  function handleSelect(sport) {
    if (selecting) return
    setHovered(null)
    setSelecting(sport)
    setSport(sport)
    setTimeout(() => setExiting(true), 430)
    setTimeout(() => navigate(`/${sport}`), 780)
  }

  function halfClass(side) {
    const cls = [`sport-half sport-half--${side}`]
    if (selecting === side)              cls.push('sport-half--winning')
    else if (selecting)                  cls.push('sport-half--losing')
    else if (hovered === side)           cls.push('sport-half--hovered')
    else if (hovered && hovered !== side) cls.push('sport-half--dimmed')
    return cls.join(' ')
  }

  return (
    <div className={`sport-selection${exiting ? ' sport-selection--exit' : ''}`}>

      {/* ── Beach Tennis ───────────────────────────────────── */}
      <div
        className={halfClass('bt')}
        onMouseEnter={() => !selecting && setHovered('bt')}
        onMouseLeave={() => !selecting && setHovered(null)}
        onClick={() => handleSelect('bt')}
      >
        {/* Foto de fundo */}
        <img
          className="sport-half-photo"
          src="/images/fei-chao-zUbSHj23Wws-unsplash.jpg"
          alt=""
          aria-hidden="true"
          draggable="false"
        />
        {/* Overlay de cor sólida */}
        <div className="sport-half-overlay sport-half-overlay--bt" />
        {/* Véu de escurecimento para o lado não-hovered */}
        <div className="sport-half-veil" />
        <div className="sport-half-content">
          <h2 className="sport-half-title">Beach Tennis</h2>
          <p className="sport-half-subtitle">Areia, sol e competição</p>
          <button
            className="sport-half-btn sport-half-btn--bt"
            onClick={e => { e.stopPropagation(); handleSelect('bt') }}
            tabIndex={-1}
          >
            Entrar
          </button>
        </div>
      </div>

      {/* ── Divisor central com label + logo ───────────────── */}
      <div className="sport-divider" aria-hidden="true">
        <p className="sport-divider-label">Selecione seu esporte</p>
        <div className="sport-divider-logo">
          <img src={FPT_LOGO_URL} alt="FPT" />
        </div>
      </div>

      {/* ── Tênis ──────────────────────────────────────────── */}
      <div
        className={halfClass('tennis')}
        onMouseEnter={() => !selecting && setHovered('tennis')}
        onMouseLeave={() => !selecting && setHovered(null)}
        onClick={() => handleSelect('tennis')}
      >
        <img
          className="sport-half-photo"
          src="/images/j-schiemann-Z4Sxy1_3wdY-unsplash.jpg"
          alt=""
          aria-hidden="true"
          draggable="false"
        />
        <div className="sport-half-overlay sport-half-overlay--tennis" />
        <div className="sport-half-veil" />
        <div className="sport-half-content">
          <h2 className="sport-half-title">Tênis</h2>
          <p className="sport-half-subtitle">Tradição e alta performance</p>
          <button
            className="sport-half-btn sport-half-btn--tennis"
            onClick={e => { e.stopPropagation(); handleSelect('tennis') }}
            tabIndex={-1}
          >
            Entrar
          </button>
        </div>
      </div>

    </div>
  )
}
