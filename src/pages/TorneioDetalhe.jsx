import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Icon } from '@1doc/1ds-react'
import TournamentsSection from '../components/TournamentsSection'
import InscricaoModal from '../components/InscricaoModal'

const BADGE = '/images/torneio-detalhe-banner.png'

// Categorias completas (backend-ready)
const ALL_CATEGORIES_INSCRICAO = [
  'Todas as categorias',
  '── Feminino Duplas ──','Feminino Duplas +35','Feminino Duplas +40','Feminino Duplas +50','Feminino Duplas +60','Feminino Duplas A','Feminino Duplas B','Feminino Duplas C','Feminino Duplas D','Feminino Duplas E','Feminino Duplas Sub-12','Feminino Duplas Sub-14','Feminino Duplas Sub-16','Feminino Duplas Sub-18',
  '── Feminino Simples ──','Feminino Simples +35','Feminino Simples +40','Feminino Simples +50','Feminino Simples +60','Feminino Simples A','Feminino Simples B','Feminino Simples C','Feminino Simples D','Feminino Simples E','Feminino Simples Sub-12','Feminino Simples Sub-14','Feminino Simples Sub-16','Feminino Simples Sub-18',
  '── Masculino Duplas ──','Masculino Duplas +35','Masculino Duplas +40','Masculino Duplas +50','Masculino Duplas +60','Masculino Duplas A','Masculino Duplas B','Masculino Duplas C','Masculino Duplas D','Masculino Duplas E','Masculino Duplas Sub-12','Masculino Duplas Sub-14','Masculino Duplas Sub-16','Masculino Duplas Sub-18',
  '── Masculino Simples ──','Masculino Simples +35','Masculino Simples +40','Masculino Simples +50','Masculino Simples +60','Masculino Simples A','Masculino Simples B','Masculino Simples C','Masculino Simples D','Masculino Simples E','Masculino Simples Sub-12','Masculino Simples Sub-14','Masculino Simples Sub-16','Masculino Simples Sub-18',
  '── Misto Duplas ──','Misto Duplas +35','Misto Duplas +40','Misto Duplas +50','Misto Duplas +60','Misto Duplas A','Misto Duplas B','Misto Duplas C','Misto Duplas D','Misto Duplas E','Misto Duplas Sub-12','Misto Duplas Sub-14','Misto Duplas Sub-16','Misto Duplas Sub-18',
  '── Misto Simples ──','Misto Simples +35','Misto Simples +40','Misto Simples +50','Misto Simples +60','Misto Simples A','Misto Simples B','Misto Simples C','Misto Simples D','Misto Simples E','Misto Simples Sub-12','Misto Simples Sub-14','Misto Simples Sub-16','Misto Simples Sub-18',
]

const inscritos = [
  {
    categoria: 'Feminino Duplas +40', inscritosCount: 4, filaCount: 0,
    duplas: [
      { atletas: ['Andrea Pazetti', 'Cyntia Wakano'],       codigos: ['37055', '40632'], clubes: ['Pahragon', 'Grécia'],   cidades: ['Curitiba', 'Curitiba'],             rankings: [22, 35] },
      { atletas: ['Danielli Miranda', 'Tatiane Vega'],      codigos: ['37055', '40632'], clubes: ['Caiobá', 'Vita'],       cidades: ['Matinhos', 'São José dos Pinhais'],  rankings: [116, 99] },
      { atletas: ['Giselle Moreira', 'Adriana Santos'],     codigos: ['37055', '40632'], clubes: ['Taboão', 'AGC'],        cidades: ['Matinhos', 'Matinhos'],             rankings: [68, 54] },
      { atletas: ['Maisa Zambao', 'Ianeglein Klein'],       codigos: ['37055', '40632'], clubes: ['Caiobá', 'Caiobá'],    cidades: ['Matinhos', 'Guaratuba'],            rankings: [31, 29] },
    ],
  },
  {
    categoria: 'Feminino Duplas +50', inscritosCount: 9, filaCount: 0,
    duplas: [
      { atletas: ['Alessandra Veit', 'Selma Avila'],              codigos: ['42320', '16991'], clubes: ['Pahragon', 'Grécia'],  cidades: ['Curitiba', 'Curitiba'],             rankings: [492, 123] },
      { atletas: ['Aleteia Boulade', 'Adriana Fontes'],           codigos: ['24673', '32273'], clubes: ['Caiobá', 'Vita'],      cidades: ['Matinhos', 'São José dos Pinhais'],  rankings: [94, 65] },
      { atletas: ['Ana Dallastella', 'Cindi Carmello'],           codigos: ['41177', '8179'],  clubes: ['Taboão', 'AGC'],       cidades: ['Matinhos', 'Matinhos'],             rankings: [44, 32] },
      { atletas: ['Cristiane Winikes', 'Cristiane Pinerollli'],   codigos: ['25539', '25672'], clubes: ['Caiobá', 'Caiobá'],   cidades: ['Matinhos', 'Guaratuba'],            rankings: [85, 18] },
      { atletas: ['Debora Campos', 'Kelly Possamai'],             codigos: ['22789', '24696'], clubes: ['Taboão', 'AGC'],       cidades: ['Matinhos', 'Matinhos'],             rankings: [4, 7] },
      { atletas: ['Estefania Kahali', 'Adelaide Holzbach'],       codigos: ['39852', '40712'], clubes: ['Caiobá', 'Caiobá'],   cidades: ['Matinhos', 'Guaratuba'],            rankings: [36, 35] },
      { atletas: ['Graziella Minutillo', 'Maristela Sousa'],      codigos: ['37587', '52865'], clubes: ['Taboão', 'AGC'],       cidades: ['Matinhos', 'Matinhos'],             rankings: [7, 9] },
      { atletas: ['Irene Terra', 'Ivanete Oliveira'],             codigos: ['32494', '51013'], clubes: ['Caiobá', 'Caiobá'],   cidades: ['Matinhos', 'Guaratuba'],            rankings: [11, 42] },
      { atletas: ['Rosana Follador', 'Viviane Camargo'],          codigos: ['27799', '25762'], clubes: ['Taboão', 'AGC'],       cidades: ['Matinhos', 'Matinhos'],             rankings: [68, 27] },
    ],
  },
  {
    categoria: 'Feminino Duplas +60', inscritosCount: 8, filaCount: 6,
    duplas: [
      { atletas: ['Alice Kubo', 'Maria Rebellato'],               codigos: ['23804', '28723'], clubes: ['Vita', 'Vita'],              cidades: ['Curitiba', 'Curitiba'], rankings: [88, 84] },
      { atletas: ['Célia Almeida', 'Ivonete Oliveira'],           codigos: ['40732', '44468'], clubes: ['Grecia', 'Grecia'],          cidades: ['Curitiba', 'Curitiba'], rankings: [96, 36] },
      { atletas: ['Cristiane Farhat', 'Nelise Dalledone'],        codigos: ['36686', '14961'], clubes: ['GCC', 'CC'],                  cidades: ['Curitiba', 'Curitiba'], rankings: [18, 11] },
      { atletas: ['Debora Picheth', 'Joyce Belina'],              codigos: ['26379', '28677'], clubes: ['CC', 'CC'],                   cidades: ['Curitiba', 'Curitiba'], rankings: [17, 16] },
      { atletas: ['Marize Buffara', 'Neusa Felipetto'],           codigos: ['36151', '46839'], clubes: ['Taboão', 'Taboão'],          cidades: ['Curitiba', 'Matinhos'], rankings: [17, 22] },
      { atletas: ['Estefania T. Bertolucci', 'Karina Bley'],      codigos: ['44500', '52187'], clubes: ['CBS', 'CBS'],                 cidades: ['Curitiba', 'Curitiba'], rankings: [14, 13] },
      { atletas: ['Vera Pimentel', 'Marcia Carvilhe'],            codigos: ['29469', '50492'], clubes: ['Vita', 'Vita Vista Alegre'],  cidades: ['Curitiba', 'Curitiba'], rankings: [16, 3] },
      { atletas: ['Rosana Follador', 'Viviane Camargo'],          codigos: ['27799', '25762'], clubes: ['Taboão', 'AGC'],              cidades: ['Matinhos', 'Matinhos'], rankings: [68, 27] },
    ],
  },
  {
    categoria: 'Masculino Duplas B', inscritosCount: 8, filaCount: 2,
    duplas: [
      { atletas: ['Roberto Koch Junior', 'Cesar Malgueiro'],    codigos: ['31201', '28540'], clubes: ['Pahragon', 'Pahragon'],  cidades: ['Curitiba', 'Curitiba'],        rankings: [3, 7] },
      { atletas: ['Rafael Scomassao', 'Henrique Possas'],       codigos: ['29873', '41230'], clubes: ['Vita', 'Vita'],          cidades: ['Curitiba', 'Curitiba'],        rankings: [12, 18] },
      { atletas: ['Marcos Costa', 'Matheus Leme'],              codigos: ['33412', '38901'], clubes: ['CBS', 'CBS'],            cidades: ['Curitiba', 'Curitiba'],        rankings: [5, 8] },
      { atletas: ['Carlos Silverio', 'Mauro Ferreti'],          codigos: ['27654', '44321'], clubes: ['Contorno da Bola', 'Win'],cidades: ['Curitiba', 'Curitiba'],       rankings: [2, 11] },
      { atletas: ['Otavio Mesquita', 'Charles Leclerc'],        codigos: ['35612', '29011'], clubes: ['Taboao', 'Taboao'],     cidades: ['Matinhos', 'Matinhos'],        rankings: [9, 14] },
      { atletas: ['Gabriel Bortoleto', 'Ricardinho Silva'],     codigos: ['40123', '37891'], clubes: ['AGC', 'AGC'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [6, 22] },
      { atletas: ['Cris Lima', 'Eduardo Bitencourt'],           codigos: ['24352', '38012'], clubes: ['Win', 'Win'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [15, 20] },
      { atletas: ['Joao Pedro', 'Henrique Silveira'],           codigos: ['31009', '42789'], clubes: ['Grecia', 'Grecia'],     cidades: ['Sao Jose dos Pinhais', 'Curitiba'], rankings: [19, 31] },
    ],
  },
  {
    categoria: 'Masculino Duplas A', inscritosCount: 6, filaCount: 0,
    duplas: [
      { atletas: ['Andre Henrique Furtado', 'Leandro Koch'],    codigos: ['18723', '22341'], clubes: ['Pahragon', 'Vita'],     cidades: ['Curitiba', 'Curitiba'],        rankings: [1, 2] },
      { atletas: ['Paulo Silveira', 'Rodrigo Bento'],           codigos: ['21890', '19456'], clubes: ['CBS', 'CBS'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [3, 5] },
      { atletas: ['Marcelo Viana', 'Thiago Prado'],             codigos: ['24567', '26123'], clubes: ['Win', 'Win'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [4, 6] },
      { atletas: ['Fabio Nascimento', 'Diego Alves'],           codigos: ['23001', '27890'], clubes: ['Taboao', 'Taboao'],    cidades: ['Matinhos', 'Matinhos'],        rankings: [7, 8] },
      { atletas: ['Bruno Ferreira', 'Lucas Menezes'],           codigos: ['25678', '28345'], clubes: ['AGC', 'AGC'],          cidades: ['Curitiba', 'Sao Jose dos Pinhais'], rankings: [9, 11] },
      { atletas: ['Renato Gomes', 'Alexandre Rocha'],           codigos: ['26901', '29012'], clubes: ['Contorno da Bola', 'Grecia'], cidades: ['Curitiba', 'Curitiba'],  rankings: [10, 13] },
    ],
  },
  {
    categoria: 'Feminino Duplas B', inscritosCount: 6, filaCount: 0,
    duplas: [
      { atletas: ['Tatiane Vega', 'Marcia Fonseca'],            codigos: ['40632', '38901'], clubes: ['Vita', 'Vita'],         cidades: ['Sao Jose dos Pinhais', 'Curitiba'], rankings: [4, 8] },
      { atletas: ['Renata Moraes', 'Silvia Braga'],             codigos: ['41230', '39012'], clubes: ['CBS', 'CBS'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [6, 11] },
      { atletas: ['Juliana Carvalho', 'Patricia Luz'],          codigos: ['42567', '40123'], clubes: ['Pahragon', 'Win'],      cidades: ['Curitiba', 'Curitiba'],        rankings: [9, 15] },
      { atletas: ['Fernanda Souza', 'Camila Ribeiro'],          codigos: ['43890', '41456'], clubes: ['AGC', 'Taboao'],        cidades: ['Curitiba', 'Matinhos'],        rankings: [12, 17] },
      { atletas: ['Luciana Torres', 'Beatriz Nunes'],           codigos: ['45123', '42789'], clubes: ['Grecia', 'Grecia'],    cidades: ['Curitiba', 'Curitiba'],        rankings: [14, 20] },
      { atletas: ['Vanessa Lima', 'Sandra Couto'],              codigos: ['46456', '44012'], clubes: ['Contorno da Bola', 'Win'], cidades: ['Curitiba', 'Curitiba'],    rankings: [18, 25] },
    ],
  },
  {
    categoria: 'Masculino Simples C', inscritosCount: 5, filaCount: 0,
    duplas: [
      { atletas: ['Diego Martinelli', 'Felipe Zanon'],          codigos: ['48901', '46234'], clubes: ['Pahragon', 'Vita'],     cidades: ['Curitiba', 'Curitiba'],        rankings: [8, 14] },
      { atletas: ['Thiago Borges', 'Marcelo Saenz'],            codigos: ['50234', '47567'], clubes: ['CBS', 'Win'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [11, 19] },
      { atletas: ['Rodolfo Alves', 'Cristiano Lopes'],          codigos: ['51567', '48890'], clubes: ['AGC', 'Taboao'],        cidades: ['Curitiba', 'Matinhos'],        rankings: [13, 22] },
      { atletas: ['Samuel Ferreira', 'Lucas Andrade'],          codigos: ['52890', '50123'], clubes: ['Grecia', 'Contorno da Bola'], cidades: ['Curitiba', 'Curitiba'], rankings: [16, 24] },
      { atletas: ['Erick Bueno', 'Jonathan Murara'],            codigos: ['54123', '51456'], clubes: ['Win', 'Pahragon'],      cidades: ['Curitiba', 'Curitiba'],        rankings: [20, 27] },
    ],
  },
  {
    categoria: 'Misto Duplas B', inscritosCount: 6, filaCount: 0,
    duplas: [
      { atletas: ['Gabriel Bortoleto', 'Renata Moraes'],        codigos: ['40123', '41230'], clubes: ['AGC', 'CBS'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [6, 6] },
      { atletas: ['Carlos Silverio', 'Silvia Braga'],           codigos: ['27654', '39012'], clubes: ['Contorno da Bola', 'CBS'], cidades: ['Curitiba', 'Curitiba'],     rankings: [2, 11] },
      { atletas: ['Joao Pedro', 'Juliana Carvalho'],            codigos: ['31009', '42567'], clubes: ['Grecia', 'Pahragon'],   cidades: ['Sao Jose dos Pinhais', 'Curitiba'], rankings: [19, 9] },
      { atletas: ['Thiago Borges', 'Patricia Luz'],             codigos: ['50234', '40123'], clubes: ['CBS', 'Win'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [11, 15] },
      { atletas: ['Rodolfo Alves', 'Fernanda Souza'],           codigos: ['51567', '43890'], clubes: ['AGC', 'AGC'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [13, 12] },
      { atletas: ['Lucas Andrade', 'Beatriz Nunes'],            codigos: ['50123', '42789'], clubes: ['Contorno da Bola', 'Grecia'], cidades: ['Curitiba', 'Curitiba'],  rankings: [24, 20] },
    ],
  },
  {
    categoria: 'Masculino Duplas Sub-18', inscritosCount: 4, filaCount: 0,
    duplas: [
      { atletas: ['Henrique Lavorski', 'Bruno Wakano'],         codigos: ['61001', '61002'], clubes: ['Pahragon', 'Caioba'],   cidades: ['Curitiba', 'Matinhos'],        rankings: [1, 3] },
      { atletas: ['Gustavo Neto', 'Felipe Melo'],               codigos: ['61003', '61004'], clubes: ['Vita', 'Win'],          cidades: ['Curitiba', 'Curitiba'],        rankings: [2, 4] },
      { atletas: ['Rafael Duarte', 'Mateus Santos'],            codigos: ['61005', '61006'], clubes: ['CBS', 'AGC'],           cidades: ['Curitiba', 'Curitiba'],        rankings: [5, 7] },
      { atletas: ['Lucas Hoffmann', 'Pedro Almeida'],           codigos: ['61007', '61008'], clubes: ['Taboao', 'Grecia'],    cidades: ['Matinhos', 'Curitiba'],        rankings: [6, 8] },
    ],
  },
  {
    categoria: 'Feminino Simples +50', inscritosCount: 5, filaCount: 0,
    duplas: [
      { atletas: ['Graziella Minutillo', 'Maristela Sousa'],    codigos: ['37587', '52865'], clubes: ['Taboao', 'AGC'],        cidades: ['Matinhos', 'Matinhos'],        rankings: [7, 9] },
      { atletas: ['Alessandra Veit', 'Selma Avila'],            codigos: ['42320', '16991'], clubes: ['Pahragon', 'Grecia'],  cidades: ['Curitiba', 'Curitiba'],        rankings: [3, 6] },
      { atletas: ['Irene Terra', 'Ivanete Oliveira'],           codigos: ['32494', '51013'], clubes: ['Caioba', 'Caioba'],   cidades: ['Matinhos', 'Guaratuba'],       rankings: [11, 14] },
      { atletas: ['Debora Campos', 'Kelly Possamai'],           codigos: ['22789', '24696'], clubes: ['Taboao', 'AGC'],       cidades: ['Matinhos', 'Matinhos'],        rankings: [4, 7] },
      { atletas: ['Rosana Follador', 'Viviane Camargo'],        codigos: ['27799', '25762'], clubes: ['Taboao', 'AGC'],       cidades: ['Matinhos', 'Matinhos'],        rankings: [8, 12] },
    ],
  },

]

const filaEspera = {
  esperando: 6,
  duplas: [
    { atletas: ['Alice Kubo', 'Maria Rebellato'],         codigos: ['23804', '28723'], clubes: ['Vita', 'Vita'],    cidades: ['Curitiba', 'Curitiba'], rankings: [88, 84] },
    { atletas: ['Célia Almeida', 'Ivonete Oliveira'],     codigos: ['40732', '44468'], clubes: ['Grecia', 'Grecia'],cidades: ['Curitiba', 'Curitiba'], rankings: [96, 36] },
    { atletas: ['Cristiane Farhat', 'Nelise Dalledone'],  codigos: ['36686', '14961'], clubes: ['GCC', 'CC'],        cidades: ['Curitiba', 'Curitiba'], rankings: [18, 11] },
    { atletas: ['Debora Picheth', 'Joyce Belina'],        codigos: ['26379', '28677'], clubes: ['CC', 'CC'],         cidades: ['Curitiba', 'Curitiba'], rankings: [17, 16] },
    { atletas: ['Marize Buffara', 'Neusa Felipetto'],     codigos: ['36151', '46839'], clubes: ['Taboão', 'Taboão'],cidades: ['Curitiba', 'Matinhos'], rankings: [17, 22] },
    { atletas: ['Estefania T. Bertolucci', 'Karina Bley'],codigos: ['44500', '52187'], clubes: ['CBS', 'CBS'],       cidades: ['Curitiba', 'Curitiba'], rankings: [14, 13] },
  ],
}

// ── Sub-components for Chaves ─────────────────────────────────────────────

const AV_COLORS = ['#f59e0b','#3b82f6','#8b5cf6','#10b981','#ef4444','#f97316','#06b6d4','#ec4899']
function avBg(name) {
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xFFFF
  return AV_COLORS[h % AV_COLORS.length]
}
function initials(name) {
  const w = name.trim().split(/\s+/)
  return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : (w[0][1] || ''))).toUpperCase()
}

// Assign real photos to some players; rest fall back to colored initials
const PLAYER_PHOTOS = {
  // Chaves — masculino
  'Roberto Koch Junior': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80',
  'Cesar Malgueiro':     'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&q=80',
  'Rafael Scomassão':    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&q=80',
  'Marcos Costa':        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&q=80',
  'Carlos Silverio':     'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop&q=80',
  'Cris Lima':           'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=60&h=60&fit=crop&q=80',
  'Otavio Mesquita':     'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=60&h=60&fit=crop&q=80',
  'Gabriel Bortoleto':   'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=60&h=60&fit=crop&q=80',
  'João Pedro':          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop&q=80',
  'Matheus Leme':        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&q=80',
  // Lista de inscritos — feminino (algumas com foto, outras com iniciais)
  'Andrea Pazetti':      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&q=80',
  'Giselle Moreira':     'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80',
  'Aleteia Boulade':     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&q=80',
  'Debora Campos':       'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&q=80',
  'Alice Kubo':          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&q=80',
  'Cristiane Farhat':    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=60&h=60&fit=crop&q=80',
  'Vera Pimentel':       'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&q=80',
  'Alessandra Veit':     'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&q=80',
}

function PlayerAvatar({ name }) {
  const photo = PLAYER_PHOTOS[name]
  if (photo) return <img src={photo} alt={name} className="player-av print-hide" />
  return (
    <div className="player-av player-av--init print-hide" style={{ background: avBg(name) }}>
      {initials(name)}
    </div>
  )
}

function DuplaAvatars({ p1, p2 }) {
  return (
    <div className="dupla-avs">
      <PlayerAvatar name={p1} />
      <PlayerAvatar name={p2} />
    </div>
  )
}

function DuplaNames({ p1, p2, align }) {
  return (
    <div className={`dupla-names${align === 'right' ? ' dupla-names--right' : ''}`}>
      <span>{p1}</span>
      <span>{p2}</span>
    </div>
  )
}

function GrupoMatchRow({ jogo }) {
  const { ep1, ep2, dp1, dp2, se, sd } = jogo
  const eWins = se !== null && sd !== null && se > sd
  const dWins = se !== null && sd !== null && sd > se
  const hasScore = se !== null && sd !== null
  return (
    <div className="gm-row">
      <div className="gm-side">
        <DuplaAvatars p1={ep1} p2={ep2} />
        <DuplaNames p1={abbrevName(ep1)} p2={abbrevName(ep2)} />
      </div>
      <div className="gm-score-block">
        {hasScore
          ? <span className={`gm-score print-hide${eWins ? ' gm-score--win' : ''}`}>{se}</span>
          : <span className="gm-score gm-score--empty print-hide">—</span>}
        <span className="gm-print-blank print-only">____</span>
        <span className="gm-print-sep print-only">×</span>
        {hasScore
          ? <span className={`gm-score print-hide${dWins ? ' gm-score--win' : ''}`}>{sd}</span>
          : <span className="gm-score gm-score--empty print-hide">—</span>}
        <span className="gm-print-blank print-only">____</span>
      </div>
      <div className="gm-side gm-side--right">
        <DuplaNames p1={abbrevName(dp1)} p2={abbrevName(dp2)} align="right" />
        <DuplaAvatars p1={dp1} p2={dp2} />
      </div>
    </div>
  )
}

function BracketCard({ ep1, ep2, dp1, dp2, se, sd }) {
  const eWins = se !== null && sd !== null && se > sd
  const dWins = se !== null && sd !== null && sd > se
  return (
    <div className="bcard">
      <div className={`bcard-team${eWins ? ' bcard-team--win' : ''}`}>
        <div className="bcard-left">
          <DuplaAvatars p1={ep1 || '—'} p2={ep2 || '—'} />
          <DuplaNames p1={ep1 || '—'} p2={ep2 || '—'} />
          <span className="bcard-name-line print-only" />
        </div>
        <span className={`bcard-score print-hide${eWins ? ' bcard-score--win' : ''}`}>
          {se !== null ? se : <span className="bcard-score-empty">—</span>}
        </span>
        <span className="bcard-score-line print-only" />
      </div>
      <div className="bcard-divider" />
      <div className={`bcard-team${dWins ? ' bcard-team--win' : ''}`}>
        <div className="bcard-left">
          <DuplaAvatars p1={dp1 || '—'} p2={dp2 || '—'} />
          <DuplaNames p1={dp1 || '—'} p2={dp2 || '—'} />
          <span className="bcard-name-line print-only" />
        </div>
        <span className={`bcard-score print-hide${dWins ? ' bcard-score--win' : ''}`}>
          {sd !== null ? sd : <span className="bcard-score-empty">—</span>}
        </span>
        <span className="bcard-score-line print-only" />
      </div>
    </div>
  )
}

// ── PrintView: layout dedicado para impressão ────────────────────────────
function PvBrSlot() {
  return (
    <div className="pv-br-slot">
      <span className="pv-name-line" />
      <span className="pv-score-box" />
    </div>
  )
}

function PrintView({ dados }) {
  if (!dados) return null
  const { grupos: pvGrupos } = dados
  return (
    <div className="pv print-only">
      {/* Cabeçalho */}
      <div className="pv-header">
        <strong>FPT Beach Series 1500 — Curitiba, 05–07/02</strong>
        <span>Chaveamento</span>
      </div>

      {/* Grupos */}
      {pvGrupos.map(grupo => (
        <div key={grupo.nome} className="pv-grupo">
          <div className="pv-grupo-nome">{grupo.nome}</div>
          <hr className="pv-hr" />
          <div className="pv-grupo-body">

            {/* Classificação */}
            <div className="pv-class">
              <div className="pv-col-label">Classificação</div>
              <table className="pv-class-table">
                <thead>
                  <tr>
                    <th className="pv-th-pos">Pos.</th>
                    <th className="pv-th-dupla">Dupla</th>
                    <th className="pv-th-j">J1</th>
                    <th className="pv-th-j">J2</th>
                    <th className="pv-th-j">J3</th>
                    <th className="pv-th-sg">SG</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.classificacao.map((row, i) => (
                    <tr key={i} className="pv-class-row">
                      <td><span className="pv-sq" /></td>
                      <td className="pv-td-dupla">{row.p1} / {row.p2}</td>
                      <td><span className="pv-sq" /></td>
                      <td><span className="pv-sq" /></td>
                      <td><span className="pv-sq" /></td>
                      <td><span className="pv-sg-line" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Jogos */}
            <div className="pv-jogos">
              <div className="pv-col-label">Jogos</div>
              {grupo.jogos.map((jogo, i) => (
                <div key={i} className="pv-match">
                  <div className="pv-team pv-team--left">
                    <span>{jogo.ep1}</span>
                    <span>{jogo.ep2}</span>
                  </div>
                  <div className="pv-score-block">
                    <span className="pv-score-line" />
                    <span className="pv-x">×</span>
                    <span className="pv-score-line" />
                  </div>
                  <div className="pv-team pv-team--right">
                    <span>{jogo.dp1}</span>
                    <span>{jogo.dp2}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      ))}

      {/* Eliminatórias */}
      <div className="pv-elim">
        <div className="pv-grupo-nome">Eliminatórias</div>
        <hr className="pv-hr" />
        <div className="pv-br">
          <div className="pv-br-headers">
            {['Quartas de final', 'Semifinal', 'Final', 'Campeão'].map(h => (
              <div key={h} className="pv-br-col-hdr">{h}</div>
            ))}
          </div>
          <div className="pv-br-tree">
            {/* Quartas */}
            <div className="pv-br-round">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="pv-br-match">
                  <PvBrSlot /><PvBrSlot />
                </div>
              ))}
            </div>
            {/* Semifinal */}
            <div className="pv-br-round">
              {[0, 1].map(i => (
                <div key={i} className="pv-br-match">
                  <PvBrSlot /><PvBrSlot />
                </div>
              ))}
            </div>
            {/* Final */}
            <div className="pv-br-round">
              <div className="pv-br-match">
                <PvBrSlot /><PvBrSlot />
              </div>
            </div>
            {/* Campeão */}
            <div className="pv-br-round pv-br-round--champion">
              <div className="pv-br-campeao">
                <div className="pv-br-campeao-label">Campeão</div>
                <span className="pv-name-line" />
                <span className="pv-name-line" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// ── Mock data — estrutura que virá do backend ─────────────────────────────
const grupos = [
  {
    nome: 'Grupo A',
    classificacao: [
      { pos: 1, p1: 'Roberto Koch Junior', p2: 'Cesar Malgueiro',     v: 3, d: 0, sg: 11 },
      { pos: 2, p1: 'Rafael Scomassão',    p2: 'Henrique Possas',     v: 2, d: 1, sg: -1 },
      { pos: 3, p1: 'Paulo Oliveira',       p2: 'Fernando Hoshina',    v: 1, d: 2, sg: -3 },
      { pos: 4, p1: 'Augusto Moreira',      p2: 'Leco Mainka',         v: 0, d: 3, sg: -7 },
    ],
    jogos: [
      { q: 'A', ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro',  dp1: 'Augusto Moreira',   dp2: 'Leco Mainka',         se: 6, sd: 4 },
      { q: 'A', ep1: 'Rafael Scomassão',   ep2: 'Henrique Possas',  dp1: 'Paulo Oliveira',    dp2: 'Fernando Hoshina',    se: 6, sd: 2 },
      { q: 'A', ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro',  dp1: 'Paulo Oliveira',    dp2: 'Fernando Hoshina',    se: 6, sd: 2 },
      { q: 'A', ep1: 'Rafael Scomassão',   ep2: 'Henrique Possas',  dp1: 'Augusto Moreira',   dp2: 'Leco Mainka',         se: 6, sd: 4 },
      { q: 'A', ep1: 'Paulo Oliveira',      ep2: 'Fernando Hoshina', dp1: 'Augusto Moreira',   dp2: 'Leco Mainka',         se: 6, sd: 3 },
      { q: 'A', ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro',  dp1: 'Rafael Scomassão',  dp2: 'Henrique Possas',     se: 6, sd: 1 },
    ],
  },
  {
    nome: 'Grupo B',
    classificacao: [
      { pos: 1, p1: 'Marcos Costa',   p2: 'Matheus Leme',     v: 3, d: 0, sg: 11 },
      { pos: 2, p1: 'João Pedro',     p2: 'Henrique Silveira', v: 2, d: 1, sg: -1 },
      { pos: 3, p1: 'José Maria',     p2: 'Ricardo Albano',    v: 1, d: 2, sg: -3 },
      { pos: 4, p1: 'Inácio Steffen', p2: 'Maicon Silva',      v: 0, d: 3, sg: -7 },
    ],
    jogos: [
      { q: 'B', ep1: 'Marcos Costa', ep2: 'Matheus Leme',    dp1: 'Augusto Moreira', dp2: 'Maicon Silva',     se: 6, sd: 4 },
      { q: 'B', ep1: 'João Pedro',   ep2: 'Henrique Silveira',dp1: 'José Maria',      dp2: 'Ricardo Albano',   se: 6, sd: 4 },
      { q: 'B', ep1: 'Marcos Costa', ep2: 'Matheus Leme',    dp1: 'José Maria',      dp2: 'Ricardo Albano',   se: 6, sd: 2 },
      { q: 'B', ep1: 'João Pedro',   ep2: 'Henrique Silveira',dp1: 'Inácio Steffen',  dp2: 'Maicon Silva',     se: 6, sd: 4 },
      { q: 'B', ep1: 'José Maria',   ep2: 'Ricardo Albano',  dp1: 'Inácio Steffen',  dp2: 'Maicon Silva',     se: 6, sd: 3 },
      { q: 'B', ep1: 'Marcos Costa', ep2: 'Matheus Leme',    dp1: 'João Pedro',      dp2: 'Henrique Silveira',se: 6, sd: 1 },
    ],
  },
  {
    nome: 'Grupo C',
    classificacao: [
      { pos: 1, p1: 'Carlos Silverio',  p2: 'Mauro Ferreti',       v: 3, d: 0, sg: 11 },
      { pos: 2, p1: 'Cris Lima',        p2: 'Eduardo Bitencourt',   v: 2, d: 1, sg: -1 },
      { pos: 3, p1: 'Josias Fagundes',  p2: 'Haroldo Moreira',      v: 1, d: 2, sg: -3 },
      { pos: 4, p1: 'Chico da Silva',   p2: 'Marcos Lessa',         v: 0, d: 3, sg: -7 },
    ],
    jogos: [
      { q: 'C', ep1: 'Carlos Silverio', ep2: 'Mauro Ferreti',     dp1: 'Chico da Silva',  dp2: 'Marcos Lessa',       se: 6, sd: 4 },
      { q: 'C', ep1: 'Cris Lima',       ep2: 'Eduardo Bitencourt',dp1: 'Josias Fagundes', dp2: 'Haroldo Moreira',    se: 6, sd: 4 },
      { q: 'C', ep1: 'Carlos Silverio', ep2: 'Mauro Ferreti',     dp1: 'Josias Fagundes', dp2: 'Haroldo Moreira',    se: 6, sd: 2 },
      { q: 'C', ep1: 'Cris Lima',       ep2: 'Eduardo Bitencourt',dp1: 'Chico da Silva',  dp2: 'Marcos Lessa',       se: 6, sd: 4 },
      { q: 'C', ep1: 'Josias Fagundes', ep2: 'Haroldo Moreira',   dp1: 'Chico da Silva',  dp2: 'Marcos Lessa',       se: 6, sd: 3 },
      { q: 'C', ep1: 'Carlos Silverio', ep2: 'Mauro Ferreti',     dp1: 'Cris Lima',       dp2: 'Eduardo Bitencourt', se: 6, sd: 1 },
    ],
  },
  {
    nome: 'Grupo D',
    classificacao: [
      { pos: 1, p1: 'Otavio Mesquita',   p2: 'Charles Leclerc',    v: 3, d: 0, sg: 11 },
      { pos: 2, p1: 'Gabriel Bortoleto', p2: 'Ricardinho Silva',    v: 2, d: 1, sg: -1 },
      { pos: 3, p1: 'Marcelo Junior',    p2: 'Andre Henrique',      v: 1, d: 2, sg: -3 },
      { pos: 4, p1: 'Paulo Costa',       p2: 'João Veiga',          v: 0, d: 3, sg: -7 },
    ],
    jogos: [
      { q: 'D', ep1: 'Otavio Mesquita',   ep2: 'Charles Leclerc',  dp1: 'Paulo Costa',       dp2: 'João Veiga',       se: 6, sd: 4 },
      { q: 'D', ep1: 'Gabriel Bortoleto', ep2: 'Ricardinho Silva',  dp1: 'Marcelo Junior',    dp2: 'Andre Henrique',   se: 6, sd: 4 },
      { q: 'D', ep1: 'Otavio Mesquita',   ep2: 'Charles Leclerc',  dp1: 'Marcelo Junior',    dp2: 'Andre Henrique',   se: 6, sd: 2 },
      { q: 'D', ep1: 'Gabriel Bortoleto', ep2: 'Ricardinho Silva',  dp1: 'Paulo Costa',       dp2: 'João Veiga',       se: 6, sd: 4 },
      { q: 'D', ep1: 'Marcelo Junior',    ep2: 'Andre Henrique',   dp1: 'Paulo Costa',       dp2: 'João Veiga',       se: 6, sd: 3 },
      { q: 'D', ep1: 'Otavio Mesquita',   ep2: 'Charles Leclerc',  dp1: 'Gabriel Bortoleto', dp2: 'Ricardinho Silva', se: 6, sd: 1 },
    ],
  },
]

const eliminatorias = {
  quartas: [
    { q: 'A', ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro',   dp1: 'Gabriel Bortoleto', dp2: 'Ricardinho Silva',    se: 6, sd: 2 },
    { q: 'B', ep1: 'Marcos Costa',        ep2: 'Matheus Leme',       dp1: 'Cris Lima',         dp2: 'Eduardo Bitencourt',  se: 4, sd: 6 },
    { q: 'C', ep1: 'Carlos Silverio',     ep2: 'Mauro Ferreti',      dp1: 'João Pedro',        dp2: 'Henrique Silveira',   se: 6, sd: 2 },
    { q: 'D', ep1: 'Otavio Mesquita',     ep2: 'Charles Leclerc',    dp1: 'Rafael Scomassão',  dp2: 'Henrique Possas',     se: 2, sd: 6 },
  ],
  semifinais: [
    { q: 'A', ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro',  dp1: 'Cris Lima',         dp2: 'Eduardo Bitencourt', se: 6, sd: 1 },
    { q: 'B', ep1: 'Carlos Silverio',     ep2: 'Mauro Ferreti',    dp1: 'Rafael Scomassão',  dp2: 'Henrique Possas',    se: 6, sd: 1 },
  ],
  final: { q: 'A', ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro', dp1: 'Carlos Silverio', dp2: 'Mauro Ferreti', se: 6, sd: 3 },
  campeao: { p1: 'Roberto Koch Junior', p2: 'Cesar Malgueiro' },
}

// ── Filtros de chaveamento (selects) ─────────────────────────────────────
const GENEROS_CHAVE    = ['Feminino', 'Masculino', 'Misto']
const MODALIDADES_CHAVE = ['Duplas', 'Simples']
const NIVEIS_CHAVE     = ['+35', '+40', '+50', '+60', 'A', 'B', 'C', 'D', 'E', 'Sub-12', 'Sub-14', 'Sub-16', 'Sub-18']

// ── Mock chaveamentos — formato com rounds[] (backend-ready) ──────────────
// Cada round: { nome, partidas: [{ ep1, ep2, dp1, dp2, se, sd }] }
// Masculino Duplas B — 16 equipes, quartas → semis → final (3 rounds)
const chave_masc_dup_B = {
  grupos,
  eliminatorias: {
    rounds: [
      { nome: 'Quartas de Final', partidas: [
        { ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro',   dp1: 'Gabriel Bortoleto', dp2: 'Ricardinho Silva',    se: 6, sd: 2 },
        { ep1: 'Marcos Costa',        ep2: 'Matheus Leme',       dp1: 'Cris Lima',         dp2: 'Eduardo Bitencourt',  se: 4, sd: 6 },
        { ep1: 'Carlos Silverio',     ep2: 'Mauro Ferreti',      dp1: 'Joao Pedro',        dp2: 'Henrique Silveira',   se: 6, sd: 2 },
        { ep1: 'Otavio Mesquita',     ep2: 'Charles Leclerc',    dp1: 'Rafael Scomassao',  dp2: 'Henrique Possas',     se: 2, sd: 6 },
      ]},
      { nome: 'Semi Final', partidas: [
        { ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro',  dp1: 'Cris Lima',         dp2: 'Eduardo Bitencourt', se: 6, sd: 1 },
        { ep1: 'Carlos Silverio',     ep2: 'Mauro Ferreti',    dp1: 'Rafael Scomassao',  dp2: 'Henrique Possas',    se: 6, sd: 1 },
      ]},
      { nome: 'Final', partidas: [
        { ep1: 'Roberto Koch Junior', ep2: 'Cesar Malgueiro', dp1: 'Carlos Silverio', dp2: 'Mauro Ferreti', se: 6, sd: 3 },
      ]},
    ],
    campeao: { p1: 'Roberto Koch Junior', p2: 'Cesar Malgueiro' },
  },
}

// Feminino Duplas B — 8 equipes, 2 grupos, semis → final (2 rounds)
const gruposFemB = [
  { nome: 'Grupo A', classificacao: [
    { pos: 1, p1: 'Tatiane Vega',     p2: 'Marcia Fonseca',  v: 2, d: 0, sg: 8 },
    { pos: 2, p1: 'Renata Moraes',    p2: 'Silvia Braga',    v: 1, d: 1, sg: 0 },
    { pos: 3, p1: 'Juliana Carvalho', p2: 'Patricia Luz',    v: 0, d: 2, sg: -8 },
  ], jogos: [
    { q: 'A', ep1: 'Tatiane Vega',  ep2: 'Marcia Fonseca', dp1: 'Juliana Carvalho', dp2: 'Patricia Luz',  se: 6, sd: 2 },
    { q: 'A', ep1: 'Renata Moraes', ep2: 'Silvia Braga',   dp1: 'Juliana Carvalho', dp2: 'Patricia Luz',  se: 6, sd: 3 },
    { q: 'A', ep1: 'Tatiane Vega',  ep2: 'Marcia Fonseca', dp1: 'Renata Moraes',    dp2: 'Silvia Braga',  se: 6, sd: 4 },
  ]},
  { nome: 'Grupo B', classificacao: [
    { pos: 1, p1: 'Fernanda Souza', p2: 'Camila Ribeiro', v: 2, d: 0, sg: 7 },
    { pos: 2, p1: 'Luciana Torres', p2: 'Beatriz Nunes',  v: 1, d: 1, sg: 1 },
    { pos: 3, p1: 'Vanessa Lima',   p2: 'Sandra Couto',   v: 0, d: 2, sg: -8 },
  ], jogos: [
    { q: 'B', ep1: 'Fernanda Souza', ep2: 'Camila Ribeiro', dp1: 'Vanessa Lima',   dp2: 'Sandra Couto',  se: 6, sd: 1 },
    { q: 'B', ep1: 'Luciana Torres', ep2: 'Beatriz Nunes',  dp1: 'Vanessa Lima',   dp2: 'Sandra Couto',  se: 6, sd: 4 },
    { q: 'B', ep1: 'Fernanda Souza', ep2: 'Camila Ribeiro', dp1: 'Luciana Torres', dp2: 'Beatriz Nunes', se: 6, sd: 4 },
  ]},
]
const chave_fem_dup_B = {
  grupos: gruposFemB,
  eliminatorias: {
    rounds: [
      { nome: 'Semi Final', partidas: [
        { ep1: 'Tatiane Vega',     ep2: 'Marcia Fonseca',  dp1: 'Luciana Torres', dp2: 'Beatriz Nunes',  se: 6, sd: 3 },
        { ep1: 'Fernanda Souza',   ep2: 'Camila Ribeiro',  dp1: 'Renata Moraes',  dp2: 'Silvia Braga',   se: 6, sd: 2 },
      ]},
      { nome: 'Final', partidas: [
        { ep1: 'Tatiane Vega', ep2: 'Marcia Fonseca', dp1: 'Fernanda Souza', dp2: 'Camila Ribeiro', se: 7, sd: 6 },
      ]},
    ],
    campeao: { p1: 'Tatiane Vega', p2: 'Marcia Fonseca' },
  },
}

// Masculino Duplas A — 32 equipes, 8 grupos, oitavas → quartas → semis → final (4 rounds = SPLIT)
const gruposMascA = [
  { nome: 'Grupo A', classificacao: [
    { pos: 1, p1: 'Andre Furtado',  p2: 'Leandro Koch',  v: 3, d: 0, sg: 11 },
    { pos: 2, p1: 'Paulo Silveira', p2: 'Rodrigo Bento', v: 2, d: 1, sg: -1 },
    { pos: 3, p1: 'Fabio Nascimento', p2: 'Diego Alves', v: 1, d: 2, sg: -3 },
    { pos: 4, p1: 'Renato Gomes',   p2: 'Alexandre Rocha', v: 0, d: 3, sg: -7 },
  ], jogos: [
    { q: 'A', ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Renato Gomes', dp2: 'Alexandre Rocha', se: 6, sd: 1 },
    { q: 'A', ep1: 'Paulo Silveira', ep2: 'Rodrigo Bento', dp1: 'Fabio Nascimento', dp2: 'Diego Alves', se: 6, sd: 3 },
    { q: 'A', ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Fabio Nascimento', dp2: 'Diego Alves', se: 6, sd: 2 },
    { q: 'A', ep1: 'Paulo Silveira', ep2: 'Rodrigo Bento', dp1: 'Renato Gomes', dp2: 'Alexandre Rocha', se: 6, sd: 2 },
    { q: 'A', ep1: 'Fabio Nascimento', ep2: 'Diego Alves', dp1: 'Renato Gomes', dp2: 'Alexandre Rocha', se: 6, sd: 4 },
    { q: 'A', ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Paulo Silveira', dp2: 'Rodrigo Bento', se: 6, sd: 3 },
  ]},
  { nome: 'Grupo B', classificacao: [
    { pos: 1, p1: 'Marcelo Viana', p2: 'Thiago Prado', v: 3, d: 0, sg: 10 },
    { pos: 2, p1: 'Bruno Ferreira', p2: 'Lucas Menezes', v: 2, d: 1, sg: 2 },
    { pos: 3, p1: 'Felipe Zanon', p2: 'Diego Martinelli', v: 1, d: 2, sg: -4 },
    { pos: 4, p1: 'Samuel Ferreira', p2: 'Lucas Andrade', v: 0, d: 3, sg: -8 },
  ], jogos: [
    { q: 'B', ep1: 'Marcelo Viana', ep2: 'Thiago Prado', dp1: 'Samuel Ferreira', dp2: 'Lucas Andrade', se: 6, sd: 2 },
    { q: 'B', ep1: 'Bruno Ferreira', ep2: 'Lucas Menezes', dp1: 'Felipe Zanon', dp2: 'Diego Martinelli', se: 6, sd: 4 },
    { q: 'B', ep1: 'Marcelo Viana', ep2: 'Thiago Prado', dp1: 'Felipe Zanon', dp2: 'Diego Martinelli', se: 6, sd: 1 },
    { q: 'B', ep1: 'Bruno Ferreira', ep2: 'Lucas Menezes', dp1: 'Samuel Ferreira', dp2: 'Lucas Andrade', se: 6, sd: 3 },
    { q: 'B', ep1: 'Felipe Zanon', ep2: 'Diego Martinelli', dp1: 'Samuel Ferreira', dp2: 'Lucas Andrade', se: 6, sd: 3 },
    { q: 'B', ep1: 'Marcelo Viana', ep2: 'Thiago Prado', dp1: 'Bruno Ferreira', dp2: 'Lucas Menezes', se: 6, sd: 4 },
  ]},
  { nome: 'Grupo C', classificacao: [
    { pos: 1, p1: 'Carlos Mendes', p2: 'Roberto Alves', v: 3, d: 0, sg: 9 },
    { pos: 2, p1: 'Pedro Henrique', p2: 'Vitor Costa', v: 2, d: 1, sg: 3 },
    { pos: 3, p1: 'Tiago Rocha', p2: 'Marcos Junior', v: 1, d: 2, sg: -3 },
    { pos: 4, p1: 'Jorge Faria', p2: 'Claudio Melo', v: 0, d: 3, sg: -9 },
  ], jogos: [
    { q: 'C', ep1: 'Carlos Mendes', ep2: 'Roberto Alves', dp1: 'Jorge Faria', dp2: 'Claudio Melo', se: 6, sd: 0 },
    { q: 'C', ep1: 'Pedro Henrique', ep2: 'Vitor Costa', dp1: 'Tiago Rocha', dp2: 'Marcos Junior', se: 6, sd: 3 },
    { q: 'C', ep1: 'Carlos Mendes', ep2: 'Roberto Alves', dp1: 'Tiago Rocha', dp2: 'Marcos Junior', se: 6, sd: 2 },
    { q: 'C', ep1: 'Pedro Henrique', ep2: 'Vitor Costa', dp1: 'Jorge Faria', dp2: 'Claudio Melo', se: 6, sd: 1 },
    { q: 'C', ep1: 'Tiago Rocha', ep2: 'Marcos Junior', dp1: 'Jorge Faria', dp2: 'Claudio Melo', se: 6, sd: 4 },
    { q: 'C', ep1: 'Carlos Mendes', ep2: 'Roberto Alves', dp1: 'Pedro Henrique', dp2: 'Vitor Costa', se: 6, sd: 3 },
  ]},
  { nome: 'Grupo D', classificacao: [
    { pos: 1, p1: 'Eduardo Lopes', p2: 'Fernando Assis', v: 3, d: 0, sg: 8 },
    { pos: 2, p1: 'Henrique Bueno', p2: 'Ivan Simas', v: 2, d: 1, sg: 2 },
    { pos: 3, p1: 'Joao Vitor', p2: 'Kleber Nunes', v: 1, d: 2, sg: -2 },
    { pos: 4, p1: 'Leonardo Cruz', p2: 'Murilo Dias', v: 0, d: 3, sg: -8 },
  ], jogos: [
    { q: 'D', ep1: 'Eduardo Lopes', ep2: 'Fernando Assis', dp1: 'Leonardo Cruz', dp2: 'Murilo Dias', se: 6, sd: 1 },
    { q: 'D', ep1: 'Henrique Bueno', ep2: 'Ivan Simas', dp1: 'Joao Vitor', dp2: 'Kleber Nunes', se: 6, sd: 4 },
    { q: 'D', ep1: 'Eduardo Lopes', ep2: 'Fernando Assis', dp1: 'Joao Vitor', dp2: 'Kleber Nunes', se: 6, sd: 3 },
    { q: 'D', ep1: 'Henrique Bueno', ep2: 'Ivan Simas', dp1: 'Leonardo Cruz', dp2: 'Murilo Dias', se: 6, sd: 2 },
    { q: 'D', ep1: 'Joao Vitor', ep2: 'Kleber Nunes', dp1: 'Leonardo Cruz', dp2: 'Murilo Dias', se: 6, sd: 3 },
    { q: 'D', ep1: 'Eduardo Lopes', ep2: 'Fernando Assis', dp1: 'Henrique Bueno', dp2: 'Ivan Simas', se: 6, sd: 4 },
  ]},
  { nome: 'Grupo E', classificacao: [
    { pos: 1, p1: 'Nelson Mota', p2: 'Oscar Pinto', v: 3, d: 0, sg: 10 },
    { pos: 2, p1: 'Paulo Cezar', p2: 'Quevedo Silva', v: 2, d: 1, sg: 1 },
    { pos: 3, p1: 'Rodrigo Moura', p2: 'Sergio Leal', v: 1, d: 2, sg: -3 },
    { pos: 4, p1: 'Tadeu Ramos', p2: 'Ulisses Faria', v: 0, d: 3, sg: -8 },
  ], jogos: [
    { q: 'E', ep1: 'Nelson Mota', ep2: 'Oscar Pinto', dp1: 'Tadeu Ramos', dp2: 'Ulisses Faria', se: 6, sd: 2 },
    { q: 'E', ep1: 'Paulo Cezar', ep2: 'Quevedo Silva', dp1: 'Rodrigo Moura', dp2: 'Sergio Leal', se: 6, sd: 3 },
    { q: 'E', ep1: 'Nelson Mota', ep2: 'Oscar Pinto', dp1: 'Rodrigo Moura', dp2: 'Sergio Leal', se: 6, sd: 1 },
    { q: 'E', ep1: 'Paulo Cezar', ep2: 'Quevedo Silva', dp1: 'Tadeu Ramos', dp2: 'Ulisses Faria', se: 6, sd: 2 },
    { q: 'E', ep1: 'Rodrigo Moura', ep2: 'Sergio Leal', dp1: 'Tadeu Ramos', dp2: 'Ulisses Faria', se: 6, sd: 4 },
    { q: 'E', ep1: 'Nelson Mota', ep2: 'Oscar Pinto', dp1: 'Paulo Cezar', dp2: 'Quevedo Silva', se: 6, sd: 4 },
  ]},
  { nome: 'Grupo F', classificacao: [
    { pos: 1, p1: 'Valter Greco', p2: 'Wagner Neri', v: 3, d: 0, sg: 9 },
    { pos: 2, p1: 'Xavier Braga', p2: 'Yuri Fontes', v: 2, d: 1, sg: 2 },
    { pos: 3, p1: 'Zeca Mourao', p2: 'Ademir Castro', v: 1, d: 2, sg: -3 },
    { pos: 4, p1: 'Benedito Souza', p2: 'Cesar Fraga', v: 0, d: 3, sg: -8 },
  ], jogos: [
    { q: 'F', ep1: 'Valter Greco', ep2: 'Wagner Neri', dp1: 'Benedito Souza', dp2: 'Cesar Fraga', se: 6, sd: 1 },
    { q: 'F', ep1: 'Xavier Braga', ep2: 'Yuri Fontes', dp1: 'Zeca Mourao', dp2: 'Ademir Castro', se: 6, sd: 3 },
    { q: 'F', ep1: 'Valter Greco', ep2: 'Wagner Neri', dp1: 'Zeca Mourao', dp2: 'Ademir Castro', se: 6, sd: 2 },
    { q: 'F', ep1: 'Xavier Braga', ep2: 'Yuri Fontes', dp1: 'Benedito Souza', dp2: 'Cesar Fraga', se: 6, sd: 1 },
    { q: 'F', ep1: 'Zeca Mourao', ep2: 'Ademir Castro', dp1: 'Benedito Souza', dp2: 'Cesar Fraga', se: 6, sd: 3 },
    { q: 'F', ep1: 'Valter Greco', ep2: 'Wagner Neri', dp1: 'Xavier Braga', dp2: 'Yuri Fontes', se: 6, sd: 4 },
  ]},
  { nome: 'Grupo G', classificacao: [
    { pos: 1, p1: 'Daniel Faria', p2: 'Erick Bueno', v: 3, d: 0, sg: 11 },
    { pos: 2, p1: 'Flavio Lima', p2: 'Giovani Ramos', v: 2, d: 1, sg: -1 },
    { pos: 3, p1: 'Hugo Pires', p2: 'Igor Vieira', v: 1, d: 2, sg: -3 },
    { pos: 4, p1: 'Julio Melo', p2: 'Kaique Santos', v: 0, d: 3, sg: -7 },
  ], jogos: [
    { q: 'G', ep1: 'Daniel Faria', ep2: 'Erick Bueno', dp1: 'Julio Melo', dp2: 'Kaique Santos', se: 6, sd: 2 },
    { q: 'G', ep1: 'Flavio Lima', ep2: 'Giovani Ramos', dp1: 'Hugo Pires', dp2: 'Igor Vieira', se: 6, sd: 4 },
    { q: 'G', ep1: 'Daniel Faria', ep2: 'Erick Bueno', dp1: 'Hugo Pires', dp2: 'Igor Vieira', se: 6, sd: 1 },
    { q: 'G', ep1: 'Flavio Lima', ep2: 'Giovani Ramos', dp1: 'Julio Melo', dp2: 'Kaique Santos', se: 6, sd: 3 },
    { q: 'G', ep1: 'Hugo Pires', ep2: 'Igor Vieira', dp1: 'Julio Melo', dp2: 'Kaique Santos', se: 6, sd: 3 },
    { q: 'G', ep1: 'Daniel Faria', ep2: 'Erick Bueno', dp1: 'Flavio Lima', dp2: 'Giovani Ramos', se: 6, sd: 2 },
  ]},
  { nome: 'Grupo H', classificacao: [
    { pos: 1, p1: 'Laercio Braga', p2: 'Mario Filho', v: 3, d: 0, sg: 10 },
    { pos: 2, p1: 'Neto Cavalcante', p2: 'Olivio Torres', v: 2, d: 1, sg: 2 },
    { pos: 3, p1: 'Plinio Costa', p2: 'Quintino Prado', v: 1, d: 2, sg: -4 },
    { pos: 4, p1: 'Reinaldo Cunha', p2: 'Silvino Matos', v: 0, d: 3, sg: -8 },
  ], jogos: [
    { q: 'H', ep1: 'Laercio Braga', ep2: 'Mario Filho', dp1: 'Reinaldo Cunha', dp2: 'Silvino Matos', se: 6, sd: 1 },
    { q: 'H', ep1: 'Neto Cavalcante', ep2: 'Olivio Torres', dp1: 'Plinio Costa', dp2: 'Quintino Prado', se: 6, sd: 3 },
    { q: 'H', ep1: 'Laercio Braga', ep2: 'Mario Filho', dp1: 'Plinio Costa', dp2: 'Quintino Prado', se: 6, sd: 2 },
    { q: 'H', ep1: 'Neto Cavalcante', ep2: 'Olivio Torres', dp1: 'Reinaldo Cunha', dp2: 'Silvino Matos', se: 6, sd: 2 },
    { q: 'H', ep1: 'Plinio Costa', ep2: 'Quintino Prado', dp1: 'Reinaldo Cunha', dp2: 'Silvino Matos', se: 6, sd: 3 },
    { q: 'H', ep1: 'Laercio Braga', ep2: 'Mario Filho', dp1: 'Neto Cavalcante', dp2: 'Olivio Torres', se: 6, sd: 3 },
  ]},
]
const chave_masc_dup_A = {
  grupos: gruposMascA,
  eliminatorias: {
    // 4 rounds = SPLIT BRACKET (oitavas → quartas → semis → final)
    rounds: [
      { nome: 'Oitavas de Final', partidas: [
        { ep1: 'Andre Furtado',   ep2: 'Leandro Koch',    dp1: 'Neto Cavalcante', dp2: 'Olivio Torres', se: 6, sd: 2 },
        { ep1: 'Paulo Silveira',  ep2: 'Rodrigo Bento',   dp1: 'Laercio Braga',   dp2: 'Mario Filho',   se: 3, sd: 6 },
        { ep1: 'Marcelo Viana',   ep2: 'Thiago Prado',    dp1: 'Daniel Faria',    dp2: 'Erick Bueno',   se: 6, sd: 4 },
        { ep1: 'Bruno Ferreira',  ep2: 'Lucas Menezes',   dp1: 'Flavio Lima',     dp2: 'Giovani Ramos', se: 6, sd: 3 },
        { ep1: 'Carlos Mendes',   ep2: 'Roberto Alves',   dp1: 'Valter Greco',    dp2: 'Wagner Neri',   se: 6, sd: 1 },
        { ep1: 'Pedro Henrique',  ep2: 'Vitor Costa',     dp1: 'Xavier Braga',    dp2: 'Yuri Fontes',   se: 4, sd: 6 },
        { ep1: 'Eduardo Lopes',   ep2: 'Fernando Assis',  dp1: 'Nelson Mota',     dp2: 'Oscar Pinto',   se: 6, sd: 3 },
        { ep1: 'Henrique Bueno',  ep2: 'Ivan Simas',      dp1: 'Paulo Cezar',     dp2: 'Quevedo Silva', se: null, sd: null },
      ]},
      { nome: 'Quartas de Final', partidas: [
        { ep1: 'Andre Furtado',  ep2: 'Leandro Koch',   dp1: 'Marcelo Viana',  dp2: 'Thiago Prado',   se: 6, sd: 2 },
        { ep1: 'Laercio Braga',  ep2: 'Mario Filho',    dp1: 'Bruno Ferreira', dp2: 'Lucas Menezes',  se: 6, sd: 3 },
        { ep1: 'Carlos Mendes',  ep2: 'Roberto Alves',  dp1: 'Eduardo Lopes',  dp2: 'Fernando Assis', se: 6, sd: 4 },
        { ep1: 'Xavier Braga',   ep2: 'Yuri Fontes',    dp1: 'Henrique Bueno', dp2: 'Ivan Simas',     se: null, sd: null },
      ]},
      { nome: 'Semi Final', partidas: [
        { ep1: 'Andre Furtado',  ep2: 'Leandro Koch',   dp1: 'Laercio Braga',  dp2: 'Mario Filho',   se: null, sd: null },
        { ep1: 'Carlos Mendes',  ep2: 'Roberto Alves',  dp1: 'Xavier Braga',   dp2: 'Yuri Fontes',   se: null, sd: null },
      ]},
      { nome: 'Final', partidas: [
        { ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Carlos Mendes', dp2: 'Roberto Alves', se: null, sd: null },
      ]},
    ],
    campeao: null,
  },
}

// Misto Duplas C — 4 equipes, 1 grupo, apenas final (1 round)
const gruposMistoC = [
  { nome: 'Grupo A', classificacao: [
    { pos: 1, p1: 'Carlos Silverio',  p2: 'Silvia Braga',    v: 3, d: 0, sg: 9 },
    { pos: 2, p1: 'Joao Pedro',       p2: 'Juliana Carvalho', v: 2, d: 1, sg: 1 },
    { pos: 3, p1: 'Thiago Borges',    p2: 'Patricia Luz',     v: 1, d: 2, sg: -2 },
    { pos: 4, p1: 'Rodolfo Alves',    p2: 'Fernanda Souza',   v: 0, d: 3, sg: -8 },
  ], jogos: [
    { q: 'A', ep1: 'Carlos Silverio', ep2: 'Silvia Braga',    dp1: 'Rodolfo Alves',  dp2: 'Fernanda Souza',   se: 6, sd: 1 },
    { q: 'A', ep1: 'Joao Pedro',      ep2: 'Juliana Carvalho',dp1: 'Thiago Borges',  dp2: 'Patricia Luz',     se: 6, sd: 3 },
    { q: 'A', ep1: 'Carlos Silverio', ep2: 'Silvia Braga',    dp1: 'Thiago Borges',  dp2: 'Patricia Luz',     se: 6, sd: 2 },
    { q: 'A', ep1: 'Joao Pedro',      ep2: 'Juliana Carvalho',dp1: 'Rodolfo Alves',  dp2: 'Fernanda Souza',   se: 6, sd: 2 },
    { q: 'A', ep1: 'Thiago Borges',   ep2: 'Patricia Luz',    dp1: 'Rodolfo Alves',  dp2: 'Fernanda Souza',   se: 6, sd: 3 },
    { q: 'A', ep1: 'Carlos Silverio', ep2: 'Silvia Braga',    dp1: 'Joao Pedro',     dp2: 'Juliana Carvalho', se: 6, sd: 4 },
  ]},
]
const chave_misto_dup_C = {
  grupos: gruposMistoC,
  eliminatorias: {
    rounds: [
      { nome: 'Final', partidas: [
        { ep1: 'Carlos Silverio', ep2: 'Silvia Braga', dp1: 'Joao Pedro', dp2: 'Juliana Carvalho', se: 6, sd: 3 },
      ]},
    ],
    campeao: { p1: 'Carlos Silverio', p2: 'Silvia Braga' },
  },
}

// Masculino Simples C — 32 equipes, 8 grupos, 16 de final → oitavas → quartas → semis → final (5 rounds)
const gruposMascSimC = gruposMascA.slice(0, 4) // reuse compact groups for display
const chave_masc_sim_C = {
  grupos: gruposMascSimC,
  eliminatorias: {
    // 5 rounds: horizontal scroll
    rounds: [
      { nome: '16 de Final', partidas: [
        { ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Silvino Matos', dp2: 'Reinaldo Cunha', se: 6, sd: 1 },
        { ep1: 'Paulo Silveira', ep2: 'Rodrigo Bento', dp1: 'Quintino Prado', dp2: 'Plinio Costa', se: 6, sd: 3 },
        { ep1: 'Marcelo Viana', ep2: 'Thiago Prado', dp1: 'Olivio Torres', dp2: 'Neto Cavalcante', se: 6, sd: 2 },
        { ep1: 'Bruno Ferreira', ep2: 'Lucas Menezes', dp1: 'Mario Filho', dp2: 'Laercio Braga', se: 3, sd: 6 },
        { ep1: 'Carlos Mendes', ep2: 'Roberto Alves', dp1: 'Kaique Santos', dp2: 'Julio Melo', se: 6, sd: 4 },
        { ep1: 'Pedro Henrique', ep2: 'Vitor Costa', dp1: 'Igor Vieira', dp2: 'Hugo Pires', se: 6, sd: 2 },
        { ep1: 'Eduardo Lopes', ep2: 'Fernando Assis', dp1: 'Giovani Ramos', dp2: 'Flavio Lima', se: 6, sd: 1 },
        { ep1: 'Henrique Bueno', ep2: 'Ivan Simas', dp1: 'Erick Bueno', dp2: 'Daniel Faria', se: 2, sd: 6 },
        { ep1: 'Nelson Mota', ep2: 'Oscar Pinto', dp1: 'Cesar Fraga', dp2: 'Benedito Souza', se: 6, sd: 3 },
        { ep1: 'Paulo Cezar', ep2: 'Quevedo Silva', dp1: 'Ademir Castro', dp2: 'Zeca Mourao', se: 6, sd: 2 },
        { ep1: 'Valter Greco', ep2: 'Wagner Neri', dp1: 'Yuri Fontes', dp2: 'Xavier Braga', se: 4, sd: 6 },
        { ep1: 'Eduardo Lopes', ep2: 'Fernando Assis', dp1: 'Silvino Matos', dp2: 'Reinaldo Cunha', se: 6, sd: 1 },
        { ep1: 'Jorge Faria', ep2: 'Claudio Melo', dp1: 'Murilo Dias', dp2: 'Leonardo Cruz', se: 6, sd: 0 },
        { ep1: 'Kleber Nunes', ep2: 'Joao Vitor', dp1: 'Sergio Leal', dp2: 'Rodrigo Moura', se: 6, sd: 4 },
        { ep1: 'Ulisses Faria', ep2: 'Tadeu Ramos', dp1: 'Marcos Junior', dp2: 'Tiago Rocha', se: 6, sd: 3 },
        { ep1: 'Alexandre Rocha', ep2: 'Renato Gomes', dp1: 'Diego Alves', dp2: 'Fabio Nascimento', se: null, sd: null },
      ]},
      { nome: 'Oitavas de Final', partidas: [
        { ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Paulo Silveira', dp2: 'Rodrigo Bento', se: 6, sd: 2 },
        { ep1: 'Marcelo Viana', ep2: 'Thiago Prado', dp1: 'Laercio Braga', dp2: 'Mario Filho', se: 6, sd: 3 },
        { ep1: 'Carlos Mendes', ep2: 'Roberto Alves', dp1: 'Pedro Henrique', dp2: 'Vitor Costa', se: 6, sd: 1 },
        { ep1: 'Eduardo Lopes', ep2: 'Fernando Assis', dp1: 'Daniel Faria', dp2: 'Erick Bueno', se: 4, sd: 6 },
        { ep1: 'Nelson Mota', ep2: 'Oscar Pinto', dp1: 'Paulo Cezar', dp2: 'Quevedo Silva', se: 6, sd: 3 },
        { ep1: 'Yuri Fontes', ep2: 'Xavier Braga', dp1: 'Eduardo Lopes', dp2: 'Fernando Assis', se: null, sd: null },
        { ep1: 'Jorge Faria', ep2: 'Claudio Melo', dp1: 'Kleber Nunes', dp2: 'Joao Vitor', se: null, sd: null },
        { ep1: 'Ulisses Faria', ep2: 'Tadeu Ramos', dp1: 'Alexandre Rocha', dp2: 'Renato Gomes', se: null, sd: null },
      ]},
      { nome: 'Quartas de Final', partidas: [
        { ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Marcelo Viana', dp2: 'Thiago Prado', se: null, sd: null },
        { ep1: 'Carlos Mendes', ep2: 'Roberto Alves', dp1: 'Daniel Faria', dp2: 'Erick Bueno', se: null, sd: null },
        { ep1: 'Nelson Mota', ep2: 'Oscar Pinto', dp1: 'Yuri Fontes', dp2: 'Xavier Braga', se: null, sd: null },
        { ep1: 'Jorge Faria', ep2: 'Claudio Melo', dp1: 'Ulisses Faria', dp2: 'Tadeu Ramos', se: null, sd: null },
      ]},
      { nome: 'Semi Final', partidas: [
        { ep1: 'Andre Furtado', ep2: 'Leandro Koch', dp1: 'Carlos Mendes', dp2: 'Roberto Alves', se: null, sd: null },
        { ep1: 'Nelson Mota', ep2: 'Oscar Pinto', dp1: 'Jorge Faria', dp2: 'Claudio Melo', se: null, sd: null },
      ]},
      { nome: 'Final', partidas: [
        { ep1: 'A definir', ep2: '', dp1: 'A definir', dp2: '', se: null, sd: null },
      ]},
    ],
    campeao: null,
  },
}

const CHAVEAMENTO_MAP = {
  'Masculino-Duplas-B':  chave_masc_dup_B,
  'Feminino-Duplas-B':   chave_fem_dup_B,
  'Masculino-Duplas-A':  chave_masc_dup_A,
  'Misto-Duplas-C':      chave_misto_dup_C,
  'Masculino-Simples-C': chave_masc_sim_C,
}

function getChaveamento(g, m, n) {
  if (!g || !m || !n) return null
  return CHAVEAMENTO_MAP[`${g}-${m}-${n}`] || null
}

const programacao = [
  {
    dia: 'Sexta-Feira - 06 de fevereiro',
    horarios: [
      {
        hora: '13:00',
        jogos: [
          { categoria: 'Masculino 50+', fase: 'Grupos + Eliminatória', grupos: 'A, B e C' },
          { categoria: 'Feminino 50+',  fase: 'Grupos + Eliminatória', grupos: 'Todos' },
          { categoria: 'Masculino 40+', fase: 'Grupos + Eliminatória', grupos: 'Todos' },
          { categoria: 'Feminino 40+',  fase: 'Grupos + Eliminatória', grupos: 'Todos' },
        ],
      },
    ],
  },
  {
    dia: 'Sábado - 07 de fevereiro',
    horarios: [
      {
        hora: '08:30',
        jogos: [
          { categoria: 'Feminino E',  fase: 'Grupos', grupos: 'Todos' },
          { categoria: 'Masculino E', fase: 'Grupos', grupos: 'Todos' },
        ],
      },
      {
        hora: '10:00',
        jogos: [
          { categoria: 'Masculino D', fase: 'Grupos', grupos: 'Todos' },
          { categoria: 'Feminino D',  fase: 'Grupos', grupos: 'Todos' },
        ],
      },
      {
        hora: '11:30',
        jogos: [
          { categoria: 'Masculino B', fase: 'Grupos', grupos: 'Todos' },
          { categoria: 'Masculino C', fase: 'Grupos', grupos: 'Todos' },
          { categoria: 'Feminino B',  fase: 'Grupos', grupos: 'Todos' },
          { categoria: 'Feminino C',  fase: 'Grupos', grupos: 'Todos' },
        ],
      },
      {
        hora: '14:00',
        jogos: [
          { categoria: 'Masculino D', fase: 'Eliminatória', grupos: 'Todos' },
          { categoria: 'Feminino D',  fase: 'Eliminatória', grupos: 'Todos' },
          { categoria: 'Feminino E',  fase: 'Eliminatória', grupos: 'Todos' },
          { categoria: 'Masculino E', fase: 'Eliminatória', grupos: 'Todos' },
        ],
      },
      {
        hora: '15:00',
        jogos: [
          { categoria: 'Masculino B', fase: 'Eliminatória', grupos: 'Todos' },
          { categoria: 'Masculino C', fase: 'Eliminatória', grupos: 'Todos' },
          { categoria: 'Feminino B',  fase: 'Eliminatória', grupos: 'Todos' },
          { categoria: 'Feminino C',  fase: 'Eliminatória', grupos: 'Todos' },
        ],
      },
    ],
  },
  {
    dia: 'Domingo - 08 de fevereiro',
    horarios: [
      {
        hora: '08:30',
        jogos: [
          { categoria: 'Mista B', fase: 'Grupos + Eliminatória', grupos: 'Todos' },
          { categoria: 'Mista C', fase: 'Grupos + Eliminatória', grupos: 'Todos' },
          { categoria: 'Mista D', fase: 'Grupos + Eliminatória', grupos: 'Todos' },
          { categoria: 'Mista E', fase: 'Grupos + Eliminatória', grupos: 'Todos' },
        ],
      },
    ],
  },
]

// ── Dados estáticos do torneio (mock) ──────────────────────────────────────
const torneio = {
  nome: 'FPT Beach Series 1500 - Contorno da bola',
  cidade: 'Curitiba - PR',
  datas: '05 a 07 de fevereiro',
  dataRange: '26/03 à 29/03',
  pontos: '1500 Pontos',
  pontosChamada: 'Pontuação para o campeão',
  piso: 'Areia de praia',
  quadras: '06',
  bolas: 'Ama',
  endereco: 'Rua Rockefeller, 375 - Rebouças, Curitiba - PR, 80230-200',
  contato: '(41) 99988-7766',
  arbitros: 'Alex Lavorski / Hugo Marczewski / Leandro Lavorski / Marcio Bueno / Gustavo Murara / Diogo Bueno / Vanderlei Souza',
  hospedagem: 'Hotel do Paraná - (41) 3322-5544',
  premiacao: 'Troféu + medalha para os 3 primeiros lugares de cada categoria.',
  categorias: 'Todas as categorias da FPT: M, F, MX, A, B, C, D, E, 40+, 50+, 60+, SUB12, SUB14, SUB16, SUB18.',
  importante: 'Os participantes devem estar com a filiação em dia. A organização reserva-se o direito de cancelar categorias com menos de 4 duplas inscritas.',
  inscricoes: {
    primeira: 'R$90,00',
    demais: 'R$35,00',
    fomento: 'R$50,00',
    naoFederado: 'R$20,00',
  },
  pontuacao: [
    { fase: 'Campeão', pts: '1500' },
    { fase: 'Finalista', pts: '1050' },
    { fase: 'Semi-finalista', pts: '735' },
    { fase: 'Quartas de final', pts: '515' },
    { fase: 'Oitavas de final', pts: '360' },
    { fase: '16 de final', pts: '252' },
    { fase: 'Classificatório', pts: '75' },
  ],
  proximosEventos: [
    { nome: 'FPT SERIES 1500 / Curitiba', dates: '12 a 15 de março' },
    { nome: 'Interclubes 26 / Caiobá', dates: '19 a 22 de março' },
    { nome: 'Finals / Curitiba', dates: '26 a 29 de março' },
  ],
}

const categorias = ['40+', 'M', 'F', 'MX', '50+', '60+', 'A', 'B', 'C', 'D', 'E', 'SUB12', 'SUB14', 'SUB16', 'SUB18']
const tabs = ['Visão Geral', 'Lista de inscritos', 'Programação', 'Chaves', 'Campeões', 'Álbum']


// ── Mobile bracket helpers ─────────────────────────────────────────────────

function abbrevName(name) {
  if (!name || name === '—') return '—'
  const parts = name.trim().split(/\s+/)
  if (parts.length <= 1) return name
  return parts[0] + ' ' + parts[parts.length - 1][0] + '.'
}

function SmallAvatar({ name }) {
  const photo = PLAYER_PHOTOS[name]
  if (photo) return <img src={photo} alt={name} className="mav" />
  return (
    <span className="mav mav--init" style={{ background: avBg(name) }}>
      {initials(name)}
    </span>
  )
}

function MobileMatchCard({ match, label }) {
  if (!match) {
    return (
      <div className="mcard">
        {label && <div className="mcard-header">{label}</div>}
        <div className="mcard-team"><span className="mcard-n mcard-n--tbd">A definir</span></div>
        <div className="mcard-div" />
        <div className="mcard-team"><span className="mcard-n mcard-n--tbd">A definir</span></div>
      </div>
    )
  }
  const { ep1, ep2, dp1, dp2, se, sd } = match
  const eWins = se !== null && sd !== null && se > sd
  const dWins = se !== null && sd !== null && sd > se
  const done = se !== null && sd !== null
  return (
    <div className="mcard">
      {label && <div className="mcard-header">{label}</div>}
      <div className={`mcard-team${eWins ? ' mcard-team--win' : ''}`}>
        <SmallAvatar name={ep1 || '—'} />
        <div className="mcard-names-col">
          <span className="mcard-n">{abbrevName(ep1)}</span>
          <span className="mcard-n mcard-n2">{abbrevName(ep2)}</span>
        </div>
        {done && <span className={`mcard-sc${eWins ? ' mcard-sc--win' : ''}`}>{se}</span>}
      </div>
      <div className="mcard-div" />
      <div className={`mcard-team${dWins ? ' mcard-team--win' : ''}`}>
        <SmallAvatar name={dp1 || '—'} />
        <div className="mcard-names-col">
          <span className="mcard-n">{abbrevName(dp1)}</span>
          <span className="mcard-n mcard-n2">{abbrevName(dp2)}</span>
        </div>
        {done && <span className={`mcard-sc${dWins ? ' mcard-sc--win' : ''}`}>{sd}</span>}
      </div>
    </div>
  )
}

function MobileBracketView({ eliminatorias }) {
  const { rounds, campeao } = eliminatorias
  const [activeRound, setActiveRound] = useState(0)
  const safeRound = Math.min(activeRound, rounds.length - 1)
  const currentRound = rounds[safeRound]
  const nextRound = rounds[safeRound + 1]
  const isLast = safeRound === rounds.length - 1

  const pairs = []
  for (let i = 0; i < currentRound.partidas.length; i += 2) {
    pairs.push({
      a: currentRound.partidas[i],
      b: currentRound.partidas[i + 1] ?? null,
      next: nextRound ? (nextRound.partidas[Math.floor(i / 2)] ?? null) : null,
    })
  }

  return (
    <div className="mbr-wrap">
      <div className="mbr-rounds-bar">
        {rounds.map((r, i) => (
          <button
            key={i}
            className={`mbr-pill${safeRound === i ? ' mbr-pill--active' : ''}`}
            onClick={() => setActiveRound(i)}
          >
            {r.nome}
          </button>
        ))}
      </div>

      <div className="mbr-pairs-list">
        {pairs.map((pair, pi) => {
          const singleLeft = pair.b === null
          return (
            <div key={pi} className="mbr-pair">
              <div className="mbr-left-col">
                <MobileMatchCard match={pair.a} />
                {!singleLeft && <MobileMatchCard match={pair.b} />}
              </div>
              <div className={`mbr-conn${singleLeft ? ' mbr-conn--single' : ''}`} aria-hidden="true" />
              <div className="mbr-right-col">
                {isLast ? (
                  <div className="mbr-champion-card">
                    <div className="mbr-champion-trophy">🏆</div>
                    {campeao ? (
                      <div className="mbr-champion-names">
                        <span>{campeao.p1}</span>
                        <span>{campeao.p2}</span>
                      </div>
                    ) : (
                      <span className="mbr-champion-tbd">Campeão a definir</span>
                    )}
                  </div>
                ) : (
                  <MobileMatchCard match={pair.next} label={nextRound?.nome} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── ConnectorCol — bracket lines between round columns ───────────────────────
function ConnectorCol({ layout, matchCount }) {
  const { offset, gap } = layout
  const pairCount = Math.ceil(matchCount / 2)

  return (
    <div className="br-conn-col">
      <div className="br-dyn-round-label" style={{ visibility: 'hidden' }} aria-hidden="true">x</div>
      <div className="br-conn-brackets">
        {Array.from({ length: pairCount }, (_, k) => {
          const hasBottom = 2 * k + 1 < matchCount
          // Top of bracket = center of top card in pair k
          const topPx = offset + 2 * k * (CARD_H + gap) + CARD_H / 2
          if (!hasBottom) {
            return <div key={k} className="br-conn-single" style={{ top: topPx }} />
          }
          // Height = from top card center to bottom card center = CARD_H + gap
          return (
            <div
              key={k}
              className="br-conn-bracket"
              style={{ top: topPx, height: CARD_H + gap }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── BracketDisplay — pure-CSS flex bracket (no pixel math) ───────────────────
// Each round column uses flex slots (flex:1 each). With all columns stretching
// to the same height, a round with N/2 slots automatically centers each slot
// between the two corresponding slots in the previous round.

function BracketDisplay({ eliminatorias }) {
  const { rounds, campeao } = eliminatorias
  if (!rounds || rounds.length === 0) return null

  return (
    <>
      {/* Mobile: FIFA-style round-by-round bracket */}
      <MobileBracketView eliminatorias={eliminatorias} />

      {/* Desktop: pure-CSS flex bracket */}
      <div className="chaves-desktop-bracket">
        <div className="br2-tree">
          {rounds.flatMap((r, i) => [
            /* Round column */
            <div key={`r${i}`} className="br2-round">
              <div className="br2-label">{r.nome}</div>
              <div className="br2-slots">
                {r.partidas.map((p, j) => (
                  <div key={j} className="br2-slot">
                    <BracketCard {...p} />
                  </div>
                ))}
              </div>
            </div>,
            /* Connector column */
            <div key={`c${i}`} className="br2-conn">
              <div className="br2-label" style={{ visibility: 'hidden' }} aria-hidden="true">x</div>
              <div className="br2-slots">
                {Array.from({ length: Math.ceil(r.partidas.length / 2) }, (_, k) => (
                  <div key={k} className={`br2-conn-slot${r.partidas.length === 1 ? ' br2-conn-slot--single' : ''}`} />
                ))}
              </div>
            </div>,
          ])}

          {/* Champion column */}
          <div className="br2-round">
            <div className="br2-label">Campeão</div>
            <div className="br2-slots">
              <div className="br2-slot">
                {campeao ? (
                  <div className="br-campeao">
                    <div className="br-campeao-trophy">🏆</div>
                    <DuplaAvatars p1={campeao.p1} p2={campeao.p2} />
                    <DuplaNames p1={campeao.p1} p2={campeao.p2} />
                  </div>
                ) : (
                  <div className="br-campeao br-campeao--tbd">
                    <div className="br-campeao-trophy">🏆</div>
                    <span className="br-campeao-tbd">A definir</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ── CampeoesTab ───────────────────────────────────────────────────────────────
// Campeões deste torneio (por categoria): 1º e 2º lugar
const campeoes = [
  { categoria: 'Masculino Duplas B',      p1: 'Roberto Koch Junior', p2: 'Cesar Malgueiro',    s1: 'Carlos Silverio',      s2: 'Mauro Ferreti' },
  { categoria: 'Feminino Duplas B',       p1: 'Tatiane Vega',        p2: 'Marcia Fonseca',      s1: 'Fernanda Souza',       s2: 'Camila Ribeiro' },
  { categoria: 'Masculino Duplas A',      p1: 'Andre Furtado',       p2: 'Leandro Koch',        s1: 'Marcelo Viana',        s2: 'Thiago Prado' },
  { categoria: 'Feminino Duplas +50',     p1: 'Debora Campos',       p2: 'Kelly Possamai',      s1: 'Graziella Minutillo',  s2: 'Maristela Sousa' },
  { categoria: 'Masculino Duplas Sub-18', p1: 'Henrique Lavorski',   p2: 'Bruno Wakano',        s1: 'Gustavo Neto',         s2: 'Felipe Melo' },
  { categoria: 'Misto Duplas B',          p1: 'Carlos Silverio',     p2: 'Silvia Braga',        s1: 'Joao Pedro',           s2: 'Juliana Carvalho' },
  { categoria: 'Feminino Duplas +40',     p1: 'Alice Kubo',          p2: 'Maria Rebellato',     s1: 'Celia Almeida',        s2: 'Ivonete Oliveira' },
  { categoria: 'Masculino Simples C',     p1: 'Diego Martinelli',    p2: 'Felipe Zanon',        s1: 'Thiago Borges',        s2: 'Marcelo Saenz' },
  { categoria: 'Feminino Duplas +60',     p1: 'Cristiane Farhat',    p2: 'Nelise Dalledone',    s1: 'Debora Picheth',       s2: 'Joyce Belina' },
  { categoria: 'Misto Duplas C',          p1: 'Carlos Silverio',     p2: 'Silvia Braga',        s1: 'Joao Pedro',           s2: 'Juliana Carvalho' },
]

function PairRow({ medal, n1, n2 }) {
  return (
    <div className="camp-podium-row">
      <span className="camp-medal">{medal}</span>
      <div className="camp-pair">
        <PlayerAvatar name={n1} />
        {n2 && <PlayerAvatar name={n2} />}
        <div className="camp-pair-names">
          <span>{n1}</span>
          {n2 && <span>{n2}</span>}
        </div>
      </div>
    </div>
  )
}

function CampeoesTab() {
  return (
    <div className="camp-page">
      <h2 className="camp-title">🏆 Campeões do Torneio</h2>
      <div className="camp-grid">
        {campeoes.map((cat, i) => (
          <div key={i} className="camp-card">
            <div className="camp-card-header">{cat.categoria}</div>
            <div className="camp-card-body">
              <PairRow medal="🥇" n1={cat.p1} n2={cat.p2} />
              <PairRow medal="🥈" n1={cat.s1} n2={cat.s2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImportanteAccordion({ texto }) {
  const [open, setOpen] = useState(false)
  return (
    <section className={`tdet-section tdet-section--alert tdet-importante${open ? ' tdet-importante--open' : ''}`}>
      <button className="tdet-importante-header" onClick={() => setOpen(v => !v)}>
        <h3 className="tdet-subsection-title">Importante</h3>
        <span className="tdet-importante-toggle">
          {open ? 'Ver menos' : 'Ver mais'}
          <Icon name={open ? 'nav-arrow-up' : 'nav-arrow-down'} size="sm" />
        </span>
      </button>
      {open && <p className="tdet-body-text tdet-importante-body">{texto}</p>}
    </section>
  )
}

export default function TorneioDetalhe() {
  const [activeTab, setActiveTab] = useState('Visão Geral')
  const [showModal, setShowModal] = useState(false)
  const [showAllCats, setShowAllCats] = useState(false)
  const tabsRef = useRef(null)
  const tabRefs = useRef({})
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const el = tabRefs.current[activeTab]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeTab])

  const genero    = searchParams.get('genero')    || ''
  const modalidade = searchParams.get('modalidade') || ''
  const nivel      = searchParams.get('nivel')      || ''
  const dados     = getChaveamento(genero, modalidade, nivel)

  const setParam = (key, val, ...reset) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set(key, val)
      reset.forEach(k => next.delete(k))
      return next
    })
  }

  return (
    <main className="tdet-page">
      <InscricaoModal open={showModal} onClose={() => setShowModal(false)} />

      {/* ── Header do torneio ── */}
      <div className="tdet-header">
        <div className="tdet-header-inner">
          <div className="tdet-header-left">
            <img src={BADGE} alt="Badge" className="tdet-badge" />
            <div className="tdet-header-info">
              <p className="tdet-header-name">{torneio.nome}</p>
              <p className="tdet-header-location">
                <Icon name="map-pin" size="sm" />
                {torneio.cidade} &nbsp;—&nbsp; {torneio.dataRange}
              </p>
              <div className="tdet-cats">
                {(() => {
                  const MAX = 6
                  const visible = showAllCats ? categorias : categorias.slice(0, MAX)
                  const hidden = categorias.length - MAX
                  return (
                    <>
                      {visible.map(c => <span key={c} className="tdet-cat-chip">{c}</span>)}
                      {!showAllCats && hidden > 0 && (
                        <button className="tdet-cat-chip tdet-cat-chip--more" onClick={() => setShowAllCats(true)}>+{hidden} mais</button>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            className="tdet-inscr-btn"
            onClick={() => setShowModal(true)}
          >
            Inscreva-se no torneio
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tdet-tabs-fade-wrap">
        <div className="tdet-tabs-bar" ref={tabsRef}>
          <div className="tdet-tabs-inner">
            {tabs.map(t => (
              <button
                key={t}
                ref={el => tabRefs.current[t] = el}
                className={`tdet-tab${activeTab === t ? ' tdet-tab--active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Conteúdo: Visão Geral ── */}
      {activeTab === 'Visão Geral' && (
        <div className="tdet-content">
          <div className="tdet-main-col">

            {/* Resumo */}
            <section className="tdet-section">
              <h2 className="tdet-section-title">Resumo</h2>
              <div className="tdet-resumo-card">
                <img src={BADGE} alt="Badge" className="tdet-resumo-badge" />
                <div className="tdet-resumo-info">
                  <p className="tdet-resumo-name">{torneio.nome}</p>
                  <p className="tdet-resumo-row">
                    <Icon name="map-pin" size="sm" />
                    {torneio.cidade}
                  </p>
                  <p className="tdet-resumo-row">
                    <Icon name="calendar" size="sm" />
                    {torneio.datas}
                  </p>
                  <p className="tdet-resumo-pts">
                    <strong>{torneio.pontos}</strong>
                    <span>{torneio.pontosChamada}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Informações da arena */}
            <section className="tdet-section">
              <div className="tdet-info-grid">
                <div className="tdet-info-item">
                  <span className="tdet-info-label">Piso</span>
                  <span className="tdet-info-value">{torneio.piso}</span>
                </div>
                <div className="tdet-info-item">
                  <span className="tdet-info-label">Quadras</span>
                  <span className="tdet-info-value">{torneio.quadras}</span>
                </div>
                <div className="tdet-info-item">
                  <span className="tdet-info-label">Bolas</span>
                  <span className="tdet-info-value">{torneio.bolas}</span>
                </div>
              </div>
            </section>

            {/* Endereço + Contato */}
            <div className="tdet-sections-grid">
              <section className="tdet-section">
                <h3 className="tdet-subsection-title">Endereço</h3>
                <p className="tdet-body-text">{torneio.endereco}</p>
              </section>
              <section className="tdet-section">
                <h3 className="tdet-subsection-title">Contato</h3>
                <p className="tdet-body-text">{torneio.contato}</p>
              </section>
            </div>

            {/* Premiação + Categorias */}
            <div className="tdet-sections-grid">
              <section className="tdet-section">
                <h3 className="tdet-subsection-title">Premiação</h3>
                <p className="tdet-body-text">{torneio.premiacao}</p>
              </section>
              <section className="tdet-section">
                <h3 className="tdet-subsection-title">Categorias</h3>
                <p className="tdet-body-text">{torneio.categorias}</p>
              </section>
            </div>

            {/* Importante — accordion */}
            <ImportanteAccordion texto={torneio.importante} />

          </div>

          {/* ── Sidebar ── */}
          <aside className="tdet-sidebar">

            {/* Pontuação */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Pontuação</h3>
              <table className="tdet-pts-table">
                <thead>
                  <tr>
                    <th>Fase</th>
                    <th>Pontos</th>
                  </tr>
                </thead>
                <tbody>
                  {torneio.pontuacao.map((row, i) => (
                    <tr key={i}>
                      <td>{row.fase}</td>
                      <td className="tdet-pts-val">{row.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inscrições */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Inscrições</h3>
              <div className="tdet-inscr-list">
                <div className="tdet-inscr-row">
                  <span>1ª Inscrição</span>
                  <strong>{torneio.inscricoes.primeira}</strong>
                </div>
                <div className="tdet-inscr-row">
                  <span>Demais Inscrições</span>
                  <strong>{torneio.inscricoes.demais}</strong>
                </div>
                <div className="tdet-inscr-row">
                  <span>Categoria fomento</span>
                  <strong>{torneio.inscricoes.fomento}</strong>
                </div>
                <div className="tdet-inscr-row">
                  <span>Taxa não federado</span>
                  <strong>{torneio.inscricoes.naoFederado}</strong>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                className="tdet-inscr-btn tdet-inscr-btn--full"
                onClick={() => setShowModal(true)}
              >
                Inscreva-se no torneio
              </Button>
              <button className="tdet-reg-link">Ver regulamento</button>
            </div>

            {/* Árbitros */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Árbitros</h3>
              <p className="tdet-body-text">{torneio.arbitros}</p>
            </div>

            {/* Hospedagem */}
            <div className="tdet-sidebar-card">
              <h3 className="tdet-sidebar-title">Hospedagem</h3>
              <p className="tdet-body-text">{torneio.hospedagem}</p>
            </div>

          </aside>
        </div>
      )}

      {/* ── Conteúdo: Lista de Inscritos ── */}
      {activeTab === 'Lista de inscritos' && (
        <div className="tli-page">

          {/* Header */}
          <div className="tli-page-header">
            <h2 className="tli-page-title">Lista de inscritos</h2>
            <div className="tli-filter-row">
              <span className="tli-filter-label">Filtrar:</span>
              <select className="tli-filter-select">
                {ALL_CATEGORIES_INSCRICAO.map(c => (
                  <option key={c} disabled={c.startsWith('──')}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Categorias */}
          {inscritos.map((cat) => (
            <div key={cat.categoria} className="tli-cat-section">
              <div className="tli-cat-banner">
                <div className="inscr-cat-header">
                  <h3 className="inscr-cat-title">{cat.categoria}</h3>
                  <div className="inscr-cat-badges">
                    <span className="inscr-badge inscr-badge--blue">Inscritos: {cat.inscritosCount}</span>
                    {cat.filaCount > 0 && <span className="inscr-badge inscr-badge--yellow">Fila: {cat.filaCount}</span>}
                  </div>
                </div>
              </div>
              <table className="tli-table">
                <thead>
                  <tr>
                    <th className="tli-th tli-th--atleta">Atleta</th>
                    <th className="tli-th tli-th--codigo">Código</th>
                    <th className="tli-th tli-th--clube">Clube</th>
                    <th className="tli-th tli-th--cidade">Cidade</th>
                    <th className="tli-th tli-th--ranking">Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.duplas.map((dupla, di) => (
                    <tr key={di} className="tli-row">
                      <td className="tli-td tli-td--atleta">
                        <div className="tli-dupla-cell">
                          <div className="inscr-dupla-row">
                            <div className="inscr-dupla-avs">
                              <PlayerAvatar name={dupla.atletas[0]} />
                              <PlayerAvatar name={dupla.atletas[1]} />
                            </div>
                            <div className="inscr-dupla-names">
                              <span className="inscr-dupla-name">{dupla.atletas[0]}</span>
                              <span className="inscr-dupla-name">{dupla.atletas[1]}</span>
                              <span className="inscr-dupla-clube">{dupla.clubes[0]} / {dupla.clubes[1]}</span>
                            </div>
                            <div className="inscr-dupla-ranking">
                              <span>{dupla.rankings[0]}</span>
                              <span>{dupla.rankings[1]}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="tli-td tli-td--codigo">
                        <div className="tli-stacked">
                          <span>{dupla.codigos[0]}</span>
                          <span>{dupla.codigos[1]}</span>
                        </div>
                      </td>
                      <td className="tli-td tli-td--clube">
                        <div className="tli-stacked">
                          <span>{dupla.clubes[0]}</span>
                          <span>{dupla.clubes[1]}</span>
                        </div>
                      </td>
                      <td className="tli-td tli-td--cidade">
                        <div className="tli-stacked">
                          <span>{dupla.cidades[0]}</span>
                          <span>{dupla.cidades[1]}</span>
                        </div>
                      </td>
                      <td className="tli-td tli-td--ranking">
                        <div className="tli-stacked tli-stacked--right">
                          <span>{dupla.rankings[0]}</span>
                          <span>{dupla.rankings[1]}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Fila de Espera */}
          <div className="tli-cat-section">
            <div className="tli-cat-banner">
              <span className="tli-cat-name">Fila de Espera</span>
              <span className="tli-cat-count">Esperando: {String(filaEspera.esperando).padStart(2, '0')}</span>
            </div>
            <table className="tli-table">
              <thead>
                <tr>
                  <th className="tli-th tli-th--atleta">Atleta</th>
                  <th className="tli-th tli-th--codigo">Código</th>
                  <th className="tli-th tli-th--clube">Clube</th>
                  <th className="tli-th tli-th--cidade">Cidade</th>
                  <th className="tli-th tli-th--ranking">Ranking</th>
                </tr>
              </thead>
              <tbody>
                {filaEspera.duplas.map((dupla, di) => (
                  <tr key={di} className="tli-row">
                    <td className="tli-td tli-td--atleta">
                      <div className="tli-dupla-cell">
                        <div className="tli-dupla-avs">
                          <PlayerAvatar name={dupla.atletas[0]} />
                          <PlayerAvatar name={dupla.atletas[1]} />
                        </div>
                        <div className="tli-dupla-names">
                          <span>{dupla.atletas[0]}</span>
                          <span>{dupla.atletas[1]}</span>
                        </div>
                      </div>
                    </td>
                    <td className="tli-td tli-td--codigo">
                      <div className="tli-stacked"><span>{dupla.codigos[0]}</span><span>{dupla.codigos[1]}</span></div>
                    </td>
                    <td className="tli-td tli-td--clube">
                      <div className="tli-stacked"><span>{dupla.clubes[0]}</span><span>{dupla.clubes[1]}</span></div>
                    </td>
                    <td className="tli-td tli-td--cidade">
                      <div className="tli-stacked"><span>{dupla.cidades[0]}</span><span>{dupla.cidades[1]}</span></div>
                    </td>
                    <td className="tli-td tli-td--ranking">
                      <div className="tli-stacked tli-stacked--right"><span>{dupla.rankings[0]}</span><span>{dupla.rankings[1]}</span></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ── Conteúdo: Chaves ── */}
      {activeTab === 'Chaves' && (
        <div className="chaves-page">

          {/* Print layout (hidden on screen) */}
          <PrintView dados={dados} />

          {/* ── Filtros: 3 selects (Gênero / Modalidade / Nível) ── */}
          <div className="cf-section print-hide">
            <div className="cf-selects-row">
              <div className="cf-select-group">
                <label className="cf-select-label">Gênero</label>
                <select
                  className="cf-select"
                  value={genero}
                  onChange={e => setParam('genero', e.target.value, 'modalidade', 'nivel')}
                >
                  <option value="">Selecione</option>
                  {GENEROS_CHAVE.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="cf-select-group">
                <label className="cf-select-label">Modalidade</label>
                <select
                  className="cf-select"
                  value={modalidade}
                  onChange={e => setParam('modalidade', e.target.value, 'nivel')}
                  disabled={!genero}
                >
                  <option value="">Selecione</option>
                  {MODALIDADES_CHAVE.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="cf-select-group">
                <label className="cf-select-label">Nível</label>
                <select
                  className="cf-select"
                  value={nivel}
                  onChange={e => setParam('nivel', e.target.value)}
                  disabled={!modalidade}
                >
                  <option value="">Selecione</option>
                  {NIVEIS_CHAVE.map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── Estado vazio ── */}
          {(!genero || !modalidade || !nivel) && (
            <div className="chaves-empty print-hide">
              <div className="chaves-empty-icon">
                <Icon name="filter" size="lg" />
              </div>
              <p className="chaves-empty-text">
                {!genero
                  ? 'Selecione o gênero e a categoria para ver o chaveamento'
                  : 'Selecione a categoria para ver o chaveamento'}
              </p>
            </div>
          )}

          {/* ── Sem dados ── */}
          {genero && modalidade && nivel && !dados && (
            <div className="chaves-empty chaves-empty--noresult print-hide">
              <div className="chaves-empty-icon">
                <Icon name="search" size="lg" />
              </div>
              <p className="chaves-empty-text">
                Nenhum chaveamento encontrado para esta combinação
              </p>
            </div>
          )}

          {/* ── Grupos ── */}
          {dados && <div className="chaves-panel print-hide">
            <div className="chaves-panel-title-bar d-flex a-center j-space-between">
              <span>Chaveamento</span>
              <button className="chaves-print-btn" onClick={() => window.print()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
                </svg>
                Imprimir
              </button>
            </div>
            <div className="chaves-groups-grid d-flex flex-col">
              {dados.grupos.map(grupo => (
                <div key={grupo.nome} className="chaves-grupo">
                  <div className="chaves-grupo-nome">{grupo.nome}</div>

                  <div className="chaves-grupo-body">
                    {/* Classificação */}
                    <div className="chaves-class-col">
                      <div className="chaves-class-card">
                      <div className="chaves-section-hdr">Classificação</div>
                      <table className="chaves-class-table">
                        <thead>
                          <tr>
                            <th className="print-hide">#</th>
                            <th className="print-only col-print-pos">_</th>
                            <th className="col-dupla">Dupla</th>
                            <th className="print-hide">V</th>
                            <th className="print-hide">D</th>
                            <th className="print-hide">SG</th>
                            <th className="print-only col-print-checks">V / D / D</th>
                            <th className="print-only">SG</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grupo.classificacao.map(row => (
                            <tr key={row.pos} className={row.pos <= 2 ? 'row-qualifier' : ''}>
                              <td className="td-pos print-hide">{row.pos}º</td>
                              <td className="td-pos print-only">___</td>
                              <td className="td-dupla">
                                <DuplaAvatars p1={row.p1} p2={row.p2} />
                                <DuplaNames p1={row.p1} p2={row.p2} />
                              </td>
                              <td className="print-hide">{row.v}</td>
                              <td className="print-hide">{row.d}</td>
                              <td className="td-sg print-hide">{row.sg > 0 ? `+${row.sg}` : row.sg}</td>
                              <td className="td-checks print-only">☐ ☐ ☐</td>
                              <td className="td-sg print-only">___</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="chaves-legend">
                        <span className="legend-dot" /> Classificado
                      </div>
                      </div>{/* end chaves-class-card */}
                    </div>

                    {/* Jogos */}
                    <div className="chaves-jogos-col">
                      <div className="chaves-section-hdr">Jogos</div>
                      {grupo.jogos.map((jogo, ji) => (
                        <GrupoMatchRow key={ji} jogo={jogo} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}

          {/* ── Eliminatórias ── */}
          {dados && <div className="chaves-panel print-hide">
            <div className="chaves-panel-title-bar d-flex a-center j-space-between">
              <span>Eliminatórias</span>
              <button className="chaves-print-btn" onClick={() => window.print()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
                </svg>
                Imprimir
              </button>
            </div>
            <BracketDisplay eliminatorias={dados.eliminatorias} />
          </div>}

        </div>
      )}

      {/* ── Conteúdo: Programação ── */}
      {activeTab === 'Programação' && (
        <div className="prog-page">

          {/* Header */}
          <div className="prog-header">
            <h2 className="prog-title">Programação</h2>
            <div className="prog-filters">
              <span className="prog-filter-label">Filtrar:</span>
              <select className="prog-filter-select">
                <option>Todas as categorias</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Mista</option>
              </select>
              <select className="prog-filter-select">
                <option>Todos os dias</option>
                <option>Sexta-Feira - 06/02</option>
                <option>Sábado - 07/02</option>
                <option>Domingo - 08/02</option>
              </select>
            </div>
          </div>

          {/* Alert */}
          <div className="prog-alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>Programação preliminar. Sujeita a alterações</span>
          </div>

          {/* Schedule panel */}
          <div className="prog-panel">
            {programacao.map((dia, di) => (
              <div key={di} className="prog-dia-block">

                {/* Day header */}
                <div className="prog-dia-header">
                  <span className="prog-dia-nome">{dia.dia}</span>
                </div>

                {/* Time rows */}
                {dia.horarios.map((slot, si) => (
                  <div key={si} className="prog-slot-row">
                    <div className="prog-slot-hora">
                      <span>{slot.hora}</span>
                    </div>
                    <div className="prog-slot-cards">
                      {slot.jogos.map((jogo, ji) => {
                        const isMasc = jogo.categoria.toLowerCase().includes('masculino')
                        const isFem  = jogo.categoria.toLowerCase().includes('feminino')
                        const accent = isMasc ? 'prog-card--masc' : isFem ? 'prog-card--fem' : 'prog-card--mista'
                        return (
                          <div key={ji} className={`prog-card ${accent}`}>
                            <div className="prog-card-top">
                              <span className="prog-card-categoria">{jogo.categoria}</span>
                              <span className="prog-card-fase">{jogo.fase}</span>
                            </div>
                            <div className="prog-card-bottom">
                              <span className="prog-card-label">Grupos</span>
                              <span className="prog-card-grupos">{jogo.grupos}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ── Conteúdo: Campeões ── */}
      {activeTab === 'Campeões' && <CampeoesTab />}

      {/* ── Conteúdo: Álbum ── */}
      {activeTab === 'Álbum' && (
        <div className="tdet-content tdet-content--center">
          <div className="tdet-album-empty">
            <div className="tdet-album-empty-icon">📷</div>
            <h3 className="tdet-album-empty-title">Álbum em breve</h3>
            <p className="tdet-album-empty-sub">As fotos do evento serão publicadas aqui após o torneio</p>
          </div>
        </div>
      )}

      {/* Outros tabs — placeholder */}
      {activeTab !== 'Visão Geral' && activeTab !== 'Lista de inscritos' && activeTab !== 'Chaves' && activeTab !== 'Programação' && activeTab !== 'Campeões' && activeTab !== 'Álbum' && (
        <div className="tdet-content tdet-content--center">
          <p className="tdet-empty">Conteúdo em breve.</p>
        </div>
      )}

      {/* ── Próximos torneios ── */}
      <div className="print-hide"><TournamentsSection /></div>

      {/* Mobile sticky CTA */}
      <div className="tdet-mobile-cta">
        <Button variant="primary" size="md" className="tdet-mobile-cta-btn" onClick={() => setShowModal(true)}>
          Inscreva-se no torneio
        </Button>
      </div>

    </main>
  )
}