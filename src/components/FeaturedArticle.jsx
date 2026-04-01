import { Link } from 'react-router-dom'
import { useSport } from '../context/SportContext'

const ARTICLE_IMG_BT = '/images/featured-article.png'
const ARTICLE_IMG_TENNIS = 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80'

export default function FeaturedArticle() {
  const { sport } = useSport()

  if (sport === 'tennis') {
    return (
      <Link to={`/${sport}/artigos/temporada-2026-tenis`} className="featured-article" style={{ textDecoration: 'none', display: 'block' }}>
        <div className="article-image-wrap">
          <img src={ARTICLE_IMG_TENNIS} alt="FPT Tênis 2026" className="article-img" />
        </div>
        <h1 className="article-title">Temporada 2026 de Tênis: novos circuitos, categorias e o que esperar do calendário estadual</h1>
        <p className="article-subtitle">
          Com mais torneios regionais e uma nova categoria Master, a temporada promete ser a mais competitiva da história da FPT Tênis
        </p>
      </Link>
    )
  }

  return (
    <Link to={`/${sport}/artigos/temporada-2026-beach-tennis`} className="featured-article" style={{ textDecoration: 'none', display: 'block' }}>
      <div className="article-image-wrap">
        <img src={ARTICLE_IMG_BT} alt="FPT 2026" className="article-img" />
      </div>
      <h1 className="article-title">O que esperar da temporada 2026 de Beach Tennis</h1>
      <p className="article-subtitle">
        Novos talentos, circuitos mais disputados, mudanças no ranking e um calendário que promete elevar o nível do esporte
      </p>
    </Link>
  )
}
