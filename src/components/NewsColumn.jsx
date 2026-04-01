import { Link } from 'react-router-dom'
import { useSport } from '../context/SportContext'

const btNews = [
  {
    img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=160&fit=crop&q=80',
    title: 'FPT SERIES 1500: tudo o que você precisa saber sobre Curitiba',
    slug: 'fpt-series-1500-curitiba',
  },
  {
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=160&fit=crop&q=80',
    title: 'Interclubes 26 reúne os melhores duplas do sul do país em Caiobá',
    slug: 'interclubes-2026-caioba',
  },
  {
    img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=160&fit=crop&q=80',
    title: 'Finals 2026: formato, datas e como se classificar para a grande final',
    slug: 'finals-2026-formato-datas',
  },
]

const tennisNews = [
  {
    img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=160&fit=crop&q=80',
    title: 'FPT Tênis Series 1500 de Curitiba: tudo o que você precisa saber',
    slug: 'fpt-tenis-series-1500-curitiba',
  },
  {
    img: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=400&h=160&fit=crop&q=80',
    title: 'Interclubes de Tênis 2026 reúne os melhores clubes do Paraná em Maringá',
    slug: 'interclubes-tenis-2026-maringa',
  },
  {
    img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=160&fit=crop&q=80',
    title: 'FPT Tênis Finals 2026: formato, datas e como se classificar para a grande final',
    slug: 'tenis-finals-2026-formato-datas',
  },
]

export default function NewsColumn() {
  const { sport } = useSport()
  const news = sport === 'tennis' ? tennisNews : btNews

  return (
    <aside className="news-column">
      {news.map((item) => (
        <Link key={item.title} to={`/${sport}/artigos/${item.slug}`} className="news-card" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="news-card-img-wrap">
            <img src={item.img} alt={item.title} className="news-card-img" />
          </div>
          <p className="news-card-title">{item.title}</p>
        </Link>
      ))}
    </aside>
  )
}
