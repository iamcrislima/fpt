import { useState } from 'react'
import { CATEGORIAS } from './transparenciaData'
import './Transparencia.css'

export default function Transparencia() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(CATEGORIAS[0].id)
  const categoria = CATEGORIAS.find(c => c.id === categoriaSelecionada)

  return (
    <>
      <div className="trn-banner">
        <div>
          <p className="trn-banner-title" style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginLeft: 0 }}>
            Transparência
          </p>
          <p className="trn-banner-title" style={{ marginLeft: 0 }}>
            Portal de Documentos
          </p>
        </div>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">

        {/* Mobile category selector */}
        <div className="trs-mobile-select-wrap">
          <select
            className="trs-mobile-select"
            value={categoriaSelecionada}
            onChange={e => setCategoriaSelecionada(e.target.value)}
            aria-label="Selecionar categoria"
          >
            {CATEGORIAS.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="trs-layout">

          {/* Sidebar (desktop only) */}
          <aside className="trs-sidebar">
            <p className="trs-sidebar-title">Categorias</p>
            <nav>
              {CATEGORIAS.map(cat => (
                <button
                  key={cat.id}
                  className={`trs-nav-item${categoriaSelecionada === cat.id ? ' active' : ''}`}
                  onClick={() => setCategoriaSelecionada(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Conteúdo */}
          <main className="trs-main">
            <h1 className="trs-section-title">{categoria.label}</h1>

            {categoria.documentos.length === 0 ? (
              <p className="trs-empty">Nenhum documento disponível no momento.</p>
            ) : (
              <div className="trs-grid">
                {categoria.documentos.map((doc, i) => (
                  <div key={i} className="trs-doc-card">
                    <div className="trs-doc-card-header">{doc.titulo}</div>
                    <div className="trs-doc-card-body">
                      <a
                        href={doc.arquivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="trs-download-btn"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Arquivo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </>
  )
}
