import { useSport } from '../context/SportContext'

const HERO_IMG = '/images/hero-banner.png'

export default function HeroBanner() {
  const { sport } = useSport()

  if (sport === 'tennis') {
    return (
      <section className="hero-banner hero-banner--tennis">
        <div className="hero-banner-tennis-overlay" />
        <div className="hero-banner-tennis-content">
          <h1 className="hero-banner-tennis-title">Vista o Jogo.</h1>
          <p className="hero-banner-tennis-subtitle">Roupas Oficiais da Federação Paranaense de Tênis</p>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-banner">
      <img src={HERO_IMG} alt="Vista o Jogo - BAZX Patrocinador Oficial" className="hero-img" />
    </section>
  )
}
