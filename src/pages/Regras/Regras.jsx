import { useState } from 'react'
import { REGRAS } from './regrasData'
import './Regras.css'

export default function Regras() {
  const [regraSelecionada, setRegraaSelecionada] = useState(REGRAS[0].id)
  const regra = REGRAS.find(r => r.id === regraSelecionada)

  return (
    <>
      <div className="trn-banner">
        <p className="trn-banner-title trn-banner-subtitle" style={{ marginLeft: 0 }}>
          Regras do Beach Tennis
        </p>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">
        <div className="reg-layout">

          {/* Sidebar de navegação */}
          <aside className="reg-sidebar">
            <p className="reg-sidebar-title">Tópicos</p>
            <nav>
              {REGRAS.map(r => (
                <button
                  key={r.id}
                  className={`reg-nav-item${regraSelecionada === r.id ? ' active' : ''}`}
                  onClick={() => setRegraaSelecionada(r.id)}
                >
                  {r.titulo}
                </button>
              ))}
            </nav>
          </aside>

          {/* Conteúdo da regra selecionada */}
          <main className="reg-main">
            <div className="reg-card">
              <h1 className="reg-card-title">{regra.titulo}</h1>
              <div className="reg-card-body">
                {regra.conteudo.map((bloco, i) => {
                  if (bloco.tipo === 'texto') {
                    return <p key={i}>{bloco.texto}</p>
                  }
                  if (bloco.tipo === 'subtitulo') {
                    return <h3 key={i}>{bloco.texto}</h3>
                  }
                  if (bloco.tipo === 'lista') {
                    return (
                      <ul key={i} style={{ paddingLeft: 20, margin: '8px 0 12px' }}>
                        {bloco.itens.map((item, j) => (
                          <li key={j} style={{ marginBottom: 6 }}>{item}</li>
                        ))}
                      </ul>
                    )
                  }
                  if (bloco.tipo === 'caso') {
                    return (
                      <div key={i} className="reg-case">
                        <strong>{bloco.pergunta}</strong>
                        <span>{bloco.resposta}</span>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </main>

        </div>
      </div>
    </>
  )
}
