import { useSport } from '../context/SportContext'

const BANNER_IMG = '/images/second-banner.png'

export default function SecondBanner() {
  const { sport } = useSport()

  if (sport === 'tennis') {
    return (
      <section className="second-banner second-banner--tennis">
        <div className="second-banner-tennis-inner">
          <p className="second-banner-tennis-label">PATROCINADOR OFICIAL</p>
          <p className="second-banner-tennis-text">FPT TÊNIS</p>
        </div>
      </section>
    )
  }

  return (
    <section className="second-banner">
      <img src={BANNER_IMG} alt="Athena Colors Collection" className="second-banner-img" />
    </section>
  )
}
