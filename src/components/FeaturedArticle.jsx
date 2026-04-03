import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSport } from '../context/SportContext'
import Carousel from './Carousel'

const btArticles = [
  {
    slug:     'temporada-2026-beach-tennis',
    image:    '/images/featured-article.png',
    title:    'O que esperar da temporada 2026 de Beach Tennis',
    subtitle: 'Novos talentos, circuitos mais disputados, mudanças no ranking e um calendário que promete elevar o nível do esporte',
  },
  {
    slug:     'fpt-series-1500-curitiba',
    image:    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&q=80',
    title:    'FPT Series 1500 Curitiba: inscrições abertas e o que esperar desta edição',
    subtitle: 'A maior etapa do circuito estadual está chegando com novidades no formato e mais categorias participantes',
  },
  {
    slug:     'interclubes-2026-caioba',
    image:    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=900&q=80',
    title:    'Interclubes 26 reúne os melhores times do sul do país em Caiobá',
    subtitle: 'Times de todo o Paraná e estados vizinhos se preparam para a maior disputa por clubes do ano',
  },
  {
    slug:     'finals-2026-formato-datas',
    image:    'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=900&q=80',
    title:    'Finals 2026: formato, datas e como se classificar para a grande final',
    subtitle: 'Conheça as regras de classificação, os critérios de pontuação e as novidades desta edição histórica',
  },
  {
    slug:     'fpt-open-londrina',
    image:    'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=900&q=80',
    title:    'FPT Open Londrina abre vagas para todas as categorias com prazo até maio',
    subtitle: 'Uma das etapas mais aguardadas do calendário está com inscrições abertas para atletas de todos os níveis',
  },
]

const tennisArticles = [
  {
    slug:     'temporada-2026-tenis',
    image:    'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=900&q=80',
    title:    'Temporada 2026 de Tênis: novos circuitos, categorias e o que esperar do calendário estadual',
    subtitle: 'Com mais torneios regionais e uma nova categoria Master, a temporada promete ser a mais competitiva da história da FPT Tênis',
  },
  {
    slug:     'fpt-tenis-series-1500-curitiba',
    image:    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&q=80',
    title:    'FPT Tênis Series 1500 de Curitiba: tudo o que você precisa saber',
    subtitle: 'A etapa mais importante do circuito terá nomes de destaque do tênis paranaense em quadra',
  },
  {
    slug:     'interclubes-tenis-2026-maringa',
    image:    'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=900&q=80',
    title:    'Interclubes de Tênis 2026 reúne os melhores clubes do Paraná em Maringá',
    subtitle: 'A competição por equipes promete grandes confrontos e transmissão ao vivo pelo canal oficial',
  },
  {
    slug:     'tenis-finals-2026-formato-datas',
    image:    'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=900&q=80',
    title:    'FPT Tênis Finals 2026: formato, datas e como se classificar para a grande final',
    subtitle: 'A disputa final do circuito terá os melhores tenistas do estado em busca do título',
  },
  {
    slug:     'tenis-open-londrina',
    image:    'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=900&q=80',
    title:    'FPT Tênis Open Londrina com vagas abertas para todas as categorias',
    subtitle: 'Uma das etapas mais tradicionais do calendário paranaense abre inscrições para a edição 2026',
  },
]

export default function FeaturedArticle() {
  const { sport } = useSport()
  const [activeIndex, setActiveIndex] = useState(0)

  const articles = sport === 'tennis' ? tennisArticles : btArticles
  const current  = articles[activeIndex]

  return (
    <div className="featured-article">
      {/* ── Image carousel ───────────────────────────────── */}
      <Carousel
        autoPlayMs={5000}
        ariaLabel="Notícias em destaque"
        onActiveChange={setActiveIndex}
      >
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            to={`/${sport}/artigos/${article.slug}`}
            className="fa-carousel__slide-link"
            tabIndex={i === activeIndex ? 0 : -1}
            aria-label={article.title}
          >
            <img
              src={article.image}
              alt={article.title}
              className="article-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </Link>
        ))}
      </Carousel>

      {/* ── Caption — re-mounts on slide change to trigger fade-in ── */}
      <Link
        key={activeIndex}
        to={`/${sport}/artigos/${current.slug}`}
        className="fa-article-caption"
      >
        <h1 className="article-title">{current.title}</h1>
        <p className="article-subtitle">{current.subtitle}</p>
      </Link>
    </div>
  )
}
