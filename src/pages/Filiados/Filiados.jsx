import { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Filiados.css'

// ── helpers ───────────────────────────────────────────────────────────────────
function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}
const AV_COLORS = ['#194280', '#0F4C30', '#B2132E', '#C47A4A', '#6B21A8', '#0369A1', '#92400E']
function avColor(name) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff
  return AV_COLORS[Math.abs(h) % AV_COLORS.length]
}
function catAbbrev(cat) {
  const g = cat.startsWith('Masculino') ? 'M' : cat.startsWith('Feminino') ? 'F' : 'X'
  const sub = cat.match(/Sub-(\d+)/)
  const plus = cat.match(/\+(\d+)/)
  const letter = cat.match(/\b([A-E])\b/)
  const lvl = sub ? `S${sub[1]}` : plus ? plus[1] : letter ? letter[1] : ''
  return `BT${g}${lvl}`
}

const CATEGORIAS = [
  'Todas as Categorias',
  'Masculino Duplas A','Masculino Duplas B','Masculino Duplas C',
  'Masculino Simples B','Masculino Simples C',
  'Feminino Duplas A','Feminino Duplas B','Feminino Duplas C',
  'Feminino Duplas +40','Feminino Duplas +50',
  'Masculino Duplas +40','Masculino Duplas Sub-18',
  'Misto Duplas B','Misto Duplas C',
]

// ── mock data (ordem alfabética por nome) ─────────────────────────────────────
const filiados = [
  { codigo: '72456', nome: 'Aleteia Boulade',         clube: 'Caiobá',                     categoria: 'Feminino Duplas B',      classe: '3FA', notaBT: '44C', torneios: 5, anoNasc: 1986, anuidade: 'em-dia',  vencimento: '31/12/2026' },
  { codigo: '51234', nome: 'Andrea Pazetti',           clube: 'Pahragon',                   categoria: 'Feminino Duplas B',      classe: '5FA', notaBT: '50B', torneios: 5, anoNasc: 1990, anuidade: 'em-dia',  vencimento: '31/12/2026' },
  { codigo: '44222', nome: 'Bruno Wakano',             clube: 'Caiobá',                     categoria: 'Masculino Duplas Sub-18',classe: '1MS', notaBT: '31S', torneios: 3, anoNasc: 2008, anuidade: 'vencida', vencimento: '31/12/2025' },
  { codigo: '77020', nome: 'Camila Ribeiro Luz',       clube: 'Win Esportes de Areia',      categoria: 'Feminino Duplas A',      classe: '6FA', notaBT: '51A', torneios: 6, anoNasc: 1996, anuidade: 'vencida', vencimento: '31/12/2025' },
  { codigo: '22222', nome: 'Carlos Silverio',          clube: 'CBS',                        categoria: 'Masculino Duplas A',     classe: '6MA', notaBT: '59A', torneios: 7, anoNasc: 1993, anuidade: 'vencida', vencimento: '31/12/2024' },
  { codigo: '66020', nome: 'Cesar Malgueiro',          clube: 'Taboão',                     categoria: 'Masculino Duplas B',     classe: '5MA', notaBT: '51A', torneios: 5, anoNasc: 1987, anuidade: 'em-dia',  vencimento: '31/12/2026' },
  { codigo: '24352', nome: 'Cristianderson Lima',      clube: 'Win Esportes de Areia',      categoria: 'Masculino Duplas B',     classe: '7MA', notaBT: '55Y', torneios: 5, anoNasc: 1992, anuidade: 'em-dia',  vencimento: '31/12/2026' },
  { codigo: '61023', nome: 'Débora Campos Rocha',      clube: 'Taboão',                     categoria: 'Feminino Duplas B',      classe: '5FA', notaBT: '47B', torneios: 6, anoNasc: 1995, anuidade: 'vencida', vencimento: '31/12/2025' },
  { codigo: '77010', nome: 'Fernanda Souza Torres',    clube: 'CBS',                        categoria: 'Feminino Duplas A',      classe: '6FA', notaBT: '53A', torneios: 7, anoNasc: 1994, anuidade: 'em-dia',  vencimento: '15/02/2027' },
  { codigo: '83901', nome: 'Giselle Moreira Lima',     clube: 'Taboão',                     categoria: 'Feminino Duplas B',      classe: '3FA', notaBT: '42C', torneios: 4, anoNasc: 1997, anuidade: 'vencida', vencimento: '31/12/2024' },
  { codigo: '36987', nome: 'Guilherme Dietz',          clube: 'Taboão',                     categoria: 'Masculino Duplas B',     classe: '4MA', notaBT: '43D', torneios: 5, anoNasc: 1998, anuidade: 'vencida', vencimento: '31/12/2025' },
  { codigo: '34986', nome: 'Gustavo Couto Neto',       clube: 'Contorno da Bola',           categoria: 'Masculino Duplas B',     classe: '7MC', notaBT: '48C', torneios: 5, anoNasc: 2008, anuidade: 'em-dia',  vencimento: '31/12/2026' },
  { codigo: '44111', nome: 'Henrique Lavorski',        clube: 'Pahragon',                   categoria: 'Masculino Duplas Sub-18',classe: '1MS', notaBT: '34S', torneios: 3, anoNasc: 2009, anuidade: 'em-dia',  vencimento: '31/12/2027' },
  { codigo: '46598', nome: 'José Maria Almeida',       clube: 'Pahragon',                   categoria: 'Masculino Duplas B',     classe: '7MC', notaBT: '45D', torneios: 4, anoNasc: 1968, anuidade: 'vencida', vencimento: '31/12/2024' },
  { codigo: '32146', nome: 'José Henrique Melo',       clube: 'Vita Beach Sports',          categoria: 'Masculino Duplas B',     classe: '1MB', notaBT: '52A', torneios: 6, anoNasc: 2004, anuidade: 'em-dia',  vencimento: '31/12/2026' },
  { codigo: '33111', nome: 'Alice Kubo',               clube: 'Vita',                       categoria: 'Feminino Duplas +40',    classe: '4FM', notaBT: '45M', torneios: 4, anoNasc: 1981, anuidade: 'vencida', vencimento: '31/12/2024' },
  { codigo: '14685', nome: 'Mauro Lima Ferreira',      clube: 'Taboão',                     categoria: 'Masculino Duplas B',     classe: '4MA', notaBT: '44D', torneios: 6, anoNasc: 1998, anuidade: 'em-dia',  vencimento: '28/08/2026' },
  { codigo: '55020', nome: 'Marcia Fonseca Dias',      clube: 'Santa Mônica Clube',         categoria: 'Feminino Duplas B',      classe: '4FB', notaBT: '46B', torneios: 5, anoNasc: 1989, anuidade: 'em-dia',  vencimento: '31/12/2026' },
  { codigo: '25498', nome: 'Pablo Rodrigues Santos',   clube: 'Contorno da Bola',           categoria: 'Masculino Duplas B',     classe: '4MB', notaBT: '38E', torneios: 4, anoNasc: 2001, anuidade: 'vencida', vencimento: '31/12/2025' },
  { codigo: '97653', nome: 'Paulo Roberto Costa',      clube: 'Vita Beach Sports',          categoria: 'Masculino Duplas B',     classe: '1MB', notaBT: '50B', torneios: 7, anoNasc: 1983, anuidade: 'vencida', vencimento: '31/12/2024' },
  { codigo: '11111', nome: 'Rafael Scomassão',         clube: 'Vita Beach Sports',          categoria: 'Masculino Duplas A',     classe: '6MA', notaBT: '62A', torneios: 8, anoNasc: 1996, anuidade: 'vencida', vencimento: '10/10/2024' },
  { codigo: '66010', nome: 'Roberto Koch Junior',      clube: 'FPT Open Beach',             categoria: 'Masculino Duplas B',     classe: '5MA', notaBT: '54A', torneios: 6, anoNasc: 1985, anuidade: 'em-dia',  vencimento: '28/08/2026' },
  { codigo: '55010', nome: 'Tatiane Vega Pinheiro',    clube: 'Arena Kirmayr Beach Tennis', categoria: 'Feminino Duplas B',      classe: '5FA', notaBT: '48B', torneios: 4, anoNasc: 1991, anuidade: 'em-dia',  vencimento: '10/10/2024' },
  { codigo: '33222', nome: 'Vera Pimentel',            clube: 'Vita Vista Alegre',          categoria: 'Feminino Duplas +40',    classe: '3FM', notaBT: '42M', torneios: 5, anoNasc: 1977, anuidade: 'vencida', vencimento: '31/12/2024' },
]

const PER_PAGE = 20

function FiliadoRow({ filiado }) {
  const cor   = avColor(filiado.nome)
  const idade = new Date().getFullYear() - filiado.anoNasc
  return (
    <div className="fil-row">
      <div className="fil-row-accent" style={{ background: cor }} />

      <span className="fil-col fil-col--codigo">{filiado.codigo}</span>

      <span className="fil-col fil-col--nome">
        {filiado.nome}
      </span>

      <span className="fil-col fil-col--idade">{idade}</span>
      <span className="fil-col fil-col--cat">{catAbbrev(filiado.categoria)}</span>
      <span className="fil-col fil-col--clube">{filiado.clube}</span>
      <span className="fil-col fil-col--classe">{filiado.classe}</span>
      <span className="fil-col fil-col--nota">{filiado.notaBT}</span>
      <span className="fil-col fil-col--torneios">{filiado.torneios}</span>
      <span className="fil-col fil-col--nasc">{filiado.anoNasc}</span>
      <span className="fil-col fil-col--venc">{filiado.vencimento}</span>
    </div>
  )
}

export default function Filiados() {
  const [busca, setBusca]         = useState('')
  const [categoria, setCategoria] = useState('Todas as Categorias')
  const [pagina, setPagina]       = useState(1)

  const filtrados = useMemo(() => {
    return [...filiados]
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
      .filter(f => {
        if (busca && !f.nome.toLowerCase().includes(busca.toLowerCase()) &&
                     !f.codigo.includes(busca)) return false
        if (categoria !== 'Todas as Categorias' && f.categoria !== categoria) return false
        return true
      })
  }, [busca, categoria])

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / PER_PAGE))
  const paginaAtual  = Math.min(pagina, totalPaginas)
  const exibidos     = filtrados.slice((paginaAtual - 1) * PER_PAGE, paginaAtual * PER_PAGE)
  const offset       = (paginaAtual - 1) * PER_PAGE

  function set(fn) { return e => { fn(e.target.value); setPagina(1) } }

  return (
    <main className="rk-page">

      <div className="rk-hero">
        <div className="rk-hero-inner">
          <p className="rk-hero-title">Tenistas Filiados</p>
        </div>
      </div>

      <div className="rk-wrapper">
        <div className="rk-content">

          <h1 className="rk-page-title">Filiados</h1>

          {/* filtros */}
          <div className="fil-filters">
            <div className="fil-search-wrap">
              <FontAwesomeIcon icon={faSearch} className="fil-search-icon" />
              <input
                className="fil-search"
                type="text"
                placeholder="Buscar por nome ou código..."
                value={busca}
                onChange={set(setBusca)}
              />
            </div>
            <select className="fil-select" value={categoria} onChange={set(setCategoria)}>
              {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

        {/* cabeçalho das colunas */}
        {exibidos.length > 0 && (
          <div className="fil-table-header">
            <span className="fil-col fil-col--codigo">Código</span>
            <span className="fil-col fil-col--nome">Nome</span>
            <span className="fil-col fil-col--idade">Idade</span>
            <span className="fil-col fil-col--cat">Cat.</span>
            <span className="fil-col fil-col--clube">Clube</span>
            <span className="fil-col fil-col--classe">Classe</span>
            <span className="fil-col fil-col--nota">Nota</span>
            <span className="fil-col fil-col--torneios">Torneios</span>
            <span className="fil-col fil-col--nasc">Nasc.</span>
            <span className="fil-col fil-col--venc">Anuidade</span>
          </div>
        )}

        {/* lista */}
        {exibidos.length === 0
          ? <p className="fil-empty">Nenhum tenista encontrado.</p>
          : (
            <div className="fil-list">
              {exibidos.map(f => (
                <FiliadoRow key={f.codigo} filiado={f} />
              ))}
            </div>
          )
        }

        {/* paginação */}
        <div className="fil-pagination-wrap">
          <span className="fil-total">{filtrados.length.toLocaleString('pt-BR')} tenista{filtrados.length !== 1 ? 's' : ''}</span>
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
