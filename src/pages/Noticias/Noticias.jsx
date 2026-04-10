import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useSport } from '../../context/SportContext'
import { usePullToRefresh } from '../../hooks/usePullToRefresh'
import { SkeletonNtCard, SkeletonList } from '../../components/SkeletonLoader'
import PtrIndicator from '../../components/PtrIndicator'
import './Noticias.css'

const noticiasBT = [
  {
    id: 1,
    categoria: 'Torneios FPT',
    titulo: 'Grand Slam FPT 2025 reúne mais de 400 atletas em Curitiba e marca recorde de participação',
    data: '25 Mar 2026',
    img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop&q=80',
    destaque: true,
  },
  {
    id: 2,
    categoria: 'Beach Tennis',
    titulo: 'Roberto Koch e Cesar Malgueiro conquistam título inédito no Masculino Duplas B',
    data: '24 Mar 2026',
    img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 3,
    categoria: 'Ranking',
    titulo: 'Confira a atualização do Ranking Estadual de Beach Tennis — março 2026',
    data: '22 Mar 2026',
    img: 'https://images.unsplash.com/photo-1527871369852-eb55bcd9f397?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 4,
    categoria: 'Interclubes',
    titulo: 'Interclubes Paranaense de Sêniors tem inscrições abertas até 10 de abril',
    data: '21 Mar 2026',
    img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 5,
    categoria: 'FPT',
    titulo: 'FPT anuncia calendário completo de torneios para o segundo semestre de 2026',
    data: '20 Mar 2026',
    img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 6,
    categoria: 'Tênis',
    titulo: 'Seleção Paranaense de Tênis se prepara para o Campeonato Brasileiro por Equipes',
    data: '18 Mar 2026',
    img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 7,
    categoria: 'Torneios FPT',
    titulo: 'Beach Series 1500 de Taboão bate recorde com 280 duplas inscritas',
    data: '17 Mar 2026',
    img: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 8,
    categoria: 'Beach Tennis',
    titulo: 'FPT lança programa de desenvolvimento de árbitros de Beach Tennis no Paraná',
    data: '15 Mar 2026',
    img: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 9,
    categoria: 'Ranking',
    titulo: 'Cristianderson Lima lidera ranking estadual pelo terceiro mês consecutivo',
    data: '14 Mar 2026',
    img: 'https://images.unsplash.com/photo-1544298621-35a764312526?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 10,
    categoria: 'FPT',
    titulo: 'Assembleia da FPT aprova novas regras para promoção de categoria em 2026',
    data: '12 Mar 2026',
    img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 11,
    categoria: 'Interclubes',
    titulo: 'Win Esportes de Areia vence Interclubes Kids e Infantojuvenil com placar histórico',
    data: '10 Mar 2026',
    img: 'https://images.unsplash.com/photo-1562552476-9a8d0e7c9a3d?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 12,
    categoria: 'Tênis',
    titulo: 'Torneio Open de Tênis de Curitiba confirma 12 cabeças de chave para abril',
    data: '09 Mar 2026',
    img: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 13,
    categoria: 'Beach Tennis',
    titulo: 'Nova resolução do Conselho Técnico atualiza critérios de classificação por nota BT',
    data: '07 Mar 2026',
    img: 'https://images.unsplash.com/photo-1531315396756-905d68d21b56?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 14,
    categoria: 'FPT',
    titulo: 'FPT firma parceria com academia de Londrina para expansão do tênis no norte do Paraná',
    data: '05 Mar 2026',
    img: 'https://images.unsplash.com/photo-1604336759498-0e5e8e1e0e4e?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 15,
    categoria: 'Torneios FPT',
    titulo: 'Copa das Federações 2025 define datas e sedes com Curitiba como palco principal',
    data: '03 Mar 2026',
    img: 'https://images.unsplash.com/photo-1591491719565-9c7f5ebdf6e1?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 16,
    categoria: 'Ranking',
    titulo: 'Andrea Pazetti domina Feminino Duplas B e se consolida entre as melhores do estado',
    data: '01 Mar 2026',
    img: 'https://images.unsplash.com/photo-1617083977289-f4ab4e0ffd93?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 17,
    categoria: 'Interclubes',
    titulo: 'Confira os resultados completos do Interclubes Paranaense de Sêniors OniLX',
    data: '28 Fev 2026',
    img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 18,
    categoria: 'Beach Tennis',
    titulo: 'Beach Tennis Sub-18: talentos paranaenses brilham no Campeonato Nacional',
    data: '26 Fev 2026',
    img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 19,
    categoria: 'Tênis',
    titulo: 'Guia completo para iniciantes: como se filiar à FPT e começar a competir',
    data: '24 Fev 2026',
    img: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 20,
    categoria: 'FPT',
    titulo: 'FPT celebra 76 anos com homenagens a atletas e dirigentes históricos do tênis paranaense',
    data: '17 Jan 2026',
    img: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=800&h=500&fit=crop&q=80',
  },
]

const noticiasTennis = [
  {
    id: 1,
    categoria: 'TÊNIS FPT',
    titulo: 'Temporada 2026 de Tênis: novos circuitos, categorias e o que esperar do calendário estadual',
    data: '28 Mar 2026',
    img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80',
    destaque: true,
  },
  {
    id: 2,
    categoria: 'Torneios FPT Tênis',
    titulo: 'FPT Tênis Series 1500 de Curitiba: tudo o que você precisa saber',
    data: '26 Mar 2026',
    img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 3,
    categoria: 'Interclubes',
    titulo: 'Interclubes de Tênis 2026 reúne os melhores clubes do Paraná em Maringá',
    data: '24 Mar 2026',
    img: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 4,
    categoria: 'FPT Tênis Finals',
    titulo: 'FPT Tênis Finals 2026: formato, datas e como se classificar para a grande final',
    data: '22 Mar 2026',
    img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 5,
    categoria: 'Ranking',
    titulo: 'Confira a atualização do Ranking Estadual de Tênis — março 2026',
    data: '20 Mar 2026',
    img: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 6,
    categoria: 'FPT',
    titulo: 'FPT anuncia calendário completo de torneios de tênis para o segundo semestre de 2026',
    data: '18 Mar 2026',
    img: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 7,
    categoria: 'Tênis FPT',
    titulo: 'Seleção Paranaense de Tênis se prepara para o Campeonato Brasileiro por Equipes',
    data: '15 Mar 2026',
    img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 8,
    categoria: 'Torneios FPT Tênis',
    titulo: 'Open de Tênis de Curitiba confirma 12 cabeças de chave para abril',
    data: '12 Mar 2026',
    img: 'https://images.unsplash.com/photo-1527871369852-eb55bcd9f397?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 9,
    categoria: 'FPT',
    titulo: 'FPT firma parceria com academia de Londrina para expansão do tênis no norte do Paraná',
    data: '10 Mar 2026',
    img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 10,
    categoria: 'Regulamento',
    titulo: 'Assembleia da FPT Tênis aprova novas regras para promoção de categoria em 2026',
    data: '07 Mar 2026',
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 11,
    categoria: 'Interclubes',
    titulo: 'Confira os resultados completos do Interclubes Paranaense de Tênis Sênior',
    data: '04 Mar 2026',
    img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 12,
    categoria: 'FPT',
    titulo: 'FPT celebra 76 anos com homenagens a atletas e dirigentes históricos do tênis paranaense',
    data: '17 Jan 2026',
    img: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=800&h=500&fit=crop&q=80',
  },
]

const INITIAL_SHOW = 12

function NoticiaCard({ noticia, featured = false }) {
  return (
    <article className={`nt-card${featured ? ' nt-card--featured' : ''}`}>
      <div className="nt-card-img-wrap">
        <img
          src={noticia.img}
          alt={noticia.titulo}
          className="nt-card-img"
          loading="lazy"
          onError={e => { e.target.style.background = '#e5e7eb' }}
        />
      </div>
      <div className="nt-card-body">
        <span className="nt-categoria">{noticia.categoria}</span>
        <h2 className="nt-titulo">{noticia.titulo}</h2>
        <span className="nt-data">{noticia.data}</span>
      </div>
    </article>
  )
}

export default function Noticias() {
  const { sport } = useSport()
  const noticias = sport === 'tennis' ? noticiasTennis : noticiasBT

  const [visiveis, setVisiveis] = useState(INITIAL_SHOW)
  const [carregando, setCarregando] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const exibidas = refreshing ? [] : noticias.slice(0, visiveis)
  const temMais  = visiveis < noticias.length

  function carregarMais() {
    setCarregando(true)
    setTimeout(() => {
      setVisiveis(v => Math.min(v + 6, noticias.length))
      setCarregando(false)
    }, 400)
  }

  async function handleRefresh() {
    setRefreshing(true)
    setVisiveis(INITIAL_SHOW)
    await new Promise(r => setTimeout(r, 700))
    setRefreshing(false)
  }

  const { pulling, loading: ptrLoading, pullRatio, handlers } = usePullToRefresh(handleRefresh)

  const [destaque, ...restante] = exibidas

  return (
    <main className="nt-page" {...handlers}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className={`rk-hero${sport === 'tennis' ? ' rk-hero--tennis rk-hero--noticias-tennis' : ''}`}>
        <div className="rk-hero-inner">
          <p className="rk-hero-title">Notícias</p>
        </div>
      </div>

      <PtrIndicator loading={ptrLoading} ratio={pullRatio} />

      <div className="rk-wrapper">
        <div className="rk-content">
          <h1 className="rk-page-title">Em Destaque</h1>

          {/* ── Grid principal ─────────────────────────────────── */}
          <div className="nt-grid">

            {refreshing ? (
              <SkeletonList Component={SkeletonNtCard} count={6} />
            ) : (
              <>
                {/* Card destaque — ocupa 2 colunas */}
                <NoticiaCard noticia={destaque} featured />

                {/* Restante */}
                {restante.map(n => (
                  <NoticiaCard key={n.id} noticia={n} />
                ))}
              </>
            )}

          </div>

          {/* ── Carregar mais ──────────────────────────────────── */}
          {temMais && (
            <div className="nt-load-more-wrap">
              <button
                className={`nt-load-more${carregando ? ' nt-load-more--loading' : ''}`}
                onClick={carregarMais}
                disabled={carregando}
              >
                {carregando ? 'Carregando...' : (
                  <>
                    Carregar mais
                    <FontAwesomeIcon icon={faChevronDown} className="nt-load-more-icon" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
