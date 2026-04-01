import { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './ClubesFiliados.css'

const clubes = [
  { codigo: '3MCC',      nome: '3 Marias Clube de Campo',            cidade: 'Curitiba',                  telefone: '41-3370-3000'  },
  { codigo: '7 BEACH',   nome: '7 Beach Sports',                     cidade: 'Curitiba',                  telefone: ''              },
  { codigo: 'A.S BEACH', nome: 'A.S Escola de Beach Tennis',         cidade: 'Guarapuava',                telefone: '42 9922-7170'  },
  { codigo: 'AGC',       nome: 'Alphaville Graciosa Clube',          cidade: 'Pinhais',                   telefone: '41 35511389'   },
  { codigo: 'ARCA',      nome: 'Arca Beach Sports',                  cidade: 'Pinhais',                   telefone: '41-3588-5792'  },
  { codigo: 'ACE',       nome: 'Ace Arena',                          cidade: 'Marechal Cândido Rondon',   telefone: '45 99911-6500' },
  { codigo: 'ALDEIA',    nome: 'Aldeia Beach Sports',                cidade: 'Maringá',                   telefone: ''              },
  { codigo: 'ARENA 3',   nome: 'Arena 3',                            cidade: 'Curitiba',                  telefone: ''              },
  { codigo: 'B2',        nome: 'Arena B2 Burilli',                   cidade: 'Guaíra',                    telefone: ''              },
  { codigo: 'BATEL CTBA',nome: 'Arena Batel Beach Tennis',           cidade: 'Curitiba',                  telefone: ''              },
  { codigo: 'BEACHCLUB', nome: 'Arena Beach Club',                   cidade: 'Curitiba',                  telefone: ''              },
  { codigo: '2VIZINHOS', nome: 'Arena Beach Dois Vizinhos',          cidade: 'Dois Vizinhos',             telefone: ''              },
  { codigo: 'ATM',       nome: 'Academia de Tênis Maringá',          cidade: 'Maringá',                   telefone: '44 3259-1313'  },
  { codigo: 'ATV',       nome: 'Academia de Tênis Virmond Ltda',     cidade: 'Guarapuava',                telefone: '42 999543884'  },
  { codigo: 'ATP',       nome: 'Academia de Tennis Palotina - ATP',  cidade: 'Palotina',                  telefone: '44 99974-6026' },
  { codigo: 'PEREIRA',   nome: 'Academia Pereira Tennis',            cidade: 'Campo Largo',               telefone: '41 99101-1212' },
  { codigo: 'APT',       nome: 'Academia Point Tênis (Prochet)',     cidade: 'Londrina',                  telefone: '43 3341-9102'  },
  { codigo: 'ATC - B',   nome: 'Academia Tênis Cascavel - Bronoski', cidade: 'Cascavel',                  telefone: '45 99915-0637' },
  { codigo: 'BYTENNIS',  nome: 'Academia By Tennis',                 cidade: 'Curitiba',                  telefone: '41-3235-3332'  },
  { codigo: 'CARIOCA',   nome: 'Areia Carioca',                      cidade: 'Curitiba',                  telefone: '41 99282-0512' },
  { codigo: 'CBS',       nome: 'CBS Beach Sports',                   cidade: 'Curitiba',                  telefone: '41 3244-0000'  },
  { codigo: 'CONTORNO',  nome: 'Contorno da Bola',                   cidade: 'Curitiba',                  telefone: '41 99876-5432' },
  { codigo: 'CAIOBA',    nome: 'Caiobá Beach Tennis',                cidade: 'Matinhos',                  telefone: '41 98765-4321' },
  { codigo: 'ECOPLAY',   nome: 'Ecoplay Academia de Tênis',          cidade: 'Curitiba',                  telefone: '41 3333-2222'  },
  { codigo: 'GRACIOSA',  nome: 'Graciosa Country Club',              cidade: 'Curitiba',                  telefone: '41 3244-1100'  },
  { codigo: 'KIRMAYR',   nome: 'Arena Kirmayr Beach Tennis',         cidade: 'Curitiba',                  telefone: '41 3333-9900'  },
  { codigo: 'PAHRAGON',  nome: 'Pahragon Beach Tennis',              cidade: 'Curitiba',                  telefone: '41 99111-2233' },
  { codigo: 'PALOTINA',  nome: 'Palotina Tênis Clube',               cidade: 'Palotina',                  telefone: '44 3649-0000'  },
  { codigo: 'SANTA MON', nome: 'Santa Mônica Clube',                 cidade: 'Curitiba',                  telefone: '41 3363-5050'  },
  { codigo: 'TABOAO',    nome: 'Taboão Beach Tennis',                cidade: 'Curitiba',                  telefone: '41 99000-1234' },
  { codigo: 'TUIUTI',    nome: 'Tuiuti Esporte Clube',               cidade: 'Curitiba',                  telefone: '41 3233-4455'  },
  { codigo: 'VITA',      nome: 'Vita Beach Sports',                  cidade: 'Curitiba',                  telefone: '41 3362-7070'  },
  { codigo: 'VITA VA',   nome: 'Vita Vista Alegre',                  cidade: 'Curitiba',                  telefone: '41 3371-8899'  },
  { codigo: 'WIN',       nome: 'Win Esportes de Areia',              cidade: 'Curitiba',                  telefone: '41 99555-6677' },
  { codigo: 'YARA',      nome: 'Yara Country Clube',                 cidade: 'Maringá',                   telefone: '44 3025-3030'  },
]

const PER_PAGE = 20

function ClubeRow({ clube }) {
  return (
    <div className="cl-row">
      <span className="cl-col cl-col--codigo">{clube.codigo}</span>
      <span className="cl-col cl-col--nome">{clube.nome}</span>
      <span className="cl-col cl-col--cidade">{clube.cidade}</span>
      <span className="cl-col cl-col--tel">{clube.telefone || '—'}</span>
    </div>
  )
}

export default function ClubesFiliados() {
  const [busca, setBusca]   = useState('')
  const [pagina, setPagina] = useState(1)

  const filtrados = useMemo(() => {
    return [...clubes]
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
      .filter(c => {
        if (!busca) return true
        const q = busca.toLowerCase()
        return c.nome.toLowerCase().includes(q) || c.codigo.toLowerCase().includes(q) || c.cidade.toLowerCase().includes(q)
      })
  }, [busca])

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / PER_PAGE))
  const paginaAtual  = Math.min(pagina, totalPaginas)
  const exibidos     = filtrados.slice((paginaAtual - 1) * PER_PAGE, paginaAtual * PER_PAGE)

  return (
    <main className="rk-page">

      <div className="rk-hero">
        <div className="rk-hero-inner">
          <p className="rk-hero-title">Clubes Filiados</p>
        </div>
      </div>

      <div className="rk-wrapper">
        <div className="rk-content">

          <h1 className="rk-page-title">Clubes Filiados</h1>

          {/* busca */}
          <div className="fil-filters">
            <div className="fil-search-wrap">
              <FontAwesomeIcon icon={faSearch} className="fil-search-icon" />
              <input
                className="fil-search"
                type="text"
                placeholder="Buscar por nome, código ou cidade..."
                value={busca}
                onChange={e => { setBusca(e.target.value); setPagina(1) }}
              />
            </div>
          </div>

          {/* cabeçalho */}
          {exibidos.length > 0 && (
            <div className="cl-table-header">
              <span className="cl-col cl-col--codigo">Código</span>
              <span className="cl-col cl-col--nome">Nome</span>
              <span className="cl-col cl-col--cidade">Cidade</span>
              <span className="cl-col cl-col--tel">Telefone</span>
            </div>
          )}

          {/* lista */}
          {exibidos.length === 0
            ? <p className="fil-empty">Nenhum clube encontrado.</p>
            : (
              <div className="cl-list">
                {exibidos.map(c => <ClubeRow key={c.codigo} clube={c} />)}
              </div>
            )
          }

          {/* paginação */}
          <div className="fil-pagination-wrap">
            <span className="fil-total">{filtrados.length} clube{filtrados.length !== 1 ? 's' : ''}</span>
            {totalPaginas > 1 && (
              <div className="fil-pagination">
                <button className="fil-pg-btn" disabled={paginaAtual === 1} onClick={() => setPagina(p => p - 1)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`fil-pg-btn${n === paginaAtual ? ' fil-pg-btn--active' : ''}`}
                    onClick={() => setPagina(n)}
                  >{n}</button>
                ))}
                <button className="fil-pg-btn" disabled={paginaAtual === totalPaginas} onClick={() => setPagina(p => p + 1)}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}
