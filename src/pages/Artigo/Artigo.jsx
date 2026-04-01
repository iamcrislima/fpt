import { useParams, Link, Navigate } from 'react-router-dom'
import { ARTIGOS } from './artigoData'
import './Artigo.css'

function IconArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ConteudoBloco({ bloco }) {
  if (bloco.tipo === 'paragrafo') {
    return <p className="artigo-paragrafo">{bloco.texto}</p>
  }
  if (bloco.tipo === 'titulo') {
    return <h2 className="artigo-section-title">{bloco.texto}</h2>
  }
  if (bloco.tipo === 'destaque') {
    return (
      <blockquote className="artigo-destaque">
        <p>{bloco.texto}</p>
      </blockquote>
    )
  }
  return null
}

export default function Artigo() {
  const { slug } = useParams()
  const artigo = ARTIGOS.find((a) => a.slug === slug)

  if (!artigo) return <Navigate to="/" replace />

  return (
    <div className="artigo-page">

      {/* Hero */}
      <div className="artigo-hero">
        <img src={artigo.img} alt={artigo.titulo} className="artigo-hero-img" />
        <div className="artigo-hero-overlay" />
        <div className="artigo-hero-content">
          <span className="artigo-categoria-badge">{artigo.categoria}</span>
          <h1 className="artigo-hero-title">{artigo.titulo}</h1>
          <p className="artigo-hero-subtitle">{artigo.subtitulo}</p>
        </div>
      </div>

      {/* Meta bar */}
      <div className="artigo-meta-bar">
        <div className="artigo-meta-inner">
          <span className="artigo-autor">{artigo.autor}</span>
          <span className="artigo-meta-sep" />
          <span className="artigo-data">{artigo.data}</span>
          <div className="artigo-tags">
            {artigo.tags.map((tag) => (
              <span key={tag} className="artigo-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Corpo */}
      <div className="artigo-body">
        <Link to="/" className="artigo-back">
          <IconArrowLeft />
          Voltar para a página inicial
        </Link>

        <div className="artigo-card">
          {artigo.conteudo.map((bloco, i) => (
            <ConteudoBloco key={i} bloco={bloco} />
          ))}
        </div>
      </div>

    </div>
  )
}
