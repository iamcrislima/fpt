import { useState } from 'react'
import { createPortal } from 'react-dom'
import './Ranking.css'
import { Icon } from '@1doc/1ds-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons'
import TournamentsSection from '../components/TournamentsSection'
import { useSport } from '../context/SportContext'
import { usePullToRefresh } from '../hooks/usePullToRefresh'
import { SkeletonRankingRow, SkeletonRankingPodium, SkeletonList } from '../components/SkeletonLoader'
import PtrIndicator from '../components/PtrIndicator'
import BottomSheetSelect from '../components/BottomSheetSelect'

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

const PLAYER_PHOTOS = {
  'Cristianderson Lima':   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80',
  'José Henrique':         'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&q=80',
  'Paulo Costa':           'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&q=80',
  'Gustavo Couto':         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&q=80',
  'Mauro Lima':            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop&q=80',
  'Gabriel Bortoleto':     'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=60&h=60&fit=crop&q=80',
  'Rafael Scomassão':      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop&q=80',
  'Carlos Silverio':       'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=60&h=60&fit=crop&q=80',
  'Andrea Pazetti':        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&q=80',
  'Débora Campos':         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80',
  'Aleteia Boulade':       'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&q=80',
  'Giselle Moreira':       'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&q=80',
  'Alice Kubo':            'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&q=80',
  'Vera Pimentel':         'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&q=80',
}

// ── Categorias completas ───────────────────────────────────────────────────────
const ALL_CATEGORIES_BT = [
  'Feminino Duplas +35','Feminino Duplas +40','Feminino Duplas +50','Feminino Duplas +60',
  'Feminino Duplas A','Feminino Duplas B','Feminino Duplas C','Feminino Duplas D','Feminino Duplas E',
  'Feminino Duplas Sub-12','Feminino Duplas Sub-14','Feminino Duplas Sub-16','Feminino Duplas Sub-18',
  'Feminino Simples +35','Feminino Simples +40','Feminino Simples +50','Feminino Simples +60',
  'Feminino Simples A','Feminino Simples B','Feminino Simples C','Feminino Simples D','Feminino Simples E',
  'Feminino Simples Sub-12','Feminino Simples Sub-14','Feminino Simples Sub-16','Feminino Simples Sub-18',
  'Masculino Duplas +35','Masculino Duplas +40','Masculino Duplas +50','Masculino Duplas +60',
  'Masculino Duplas A','Masculino Duplas B','Masculino Duplas C','Masculino Duplas D','Masculino Duplas E',
  'Masculino Duplas Sub-12','Masculino Duplas Sub-14','Masculino Duplas Sub-16','Masculino Duplas Sub-18',
  'Masculino Simples +35','Masculino Simples +40','Masculino Simples +50','Masculino Simples +60',
  'Masculino Simples A','Masculino Simples B','Masculino Simples C','Masculino Simples D','Masculino Simples E',
  'Masculino Simples Sub-12','Masculino Simples Sub-14','Masculino Simples Sub-16','Masculino Simples Sub-18',
  'Misto Duplas +35','Misto Duplas +40','Misto Duplas +50','Misto Duplas +60',
  'Misto Duplas A','Misto Duplas B','Misto Duplas C','Misto Duplas D','Misto Duplas E',
  'Misto Duplas Sub-12','Misto Duplas Sub-14','Misto Duplas Sub-16','Misto Duplas Sub-18',
  'Misto Simples +35','Misto Simples +40','Misto Simples +50','Misto Simples +60',
  'Misto Simples A','Misto Simples B','Misto Simples C','Misto Simples D','Misto Simples E',
  'Misto Simples Sub-12','Misto Simples Sub-14','Misto Simples Sub-16','Misto Simples Sub-18',
]

const ALL_CATEGORIES_TENNIS = [
  'Feminino Duplas','Feminino Simples',
  'Masculino Duplas','Masculino Simples',
  'Misto Duplas',
]

const REGIOES = ['Todas as Regiões', 'Estadual', 'Região 41', 'Região 42', 'Região 43', 'Região 44', 'Região 45', 'Região 46']
const GENEROS_FILTER = ['Todos', 'Masculino', 'Feminino', 'Misto']
const ANOS = ['2024', '2025', '2026']

// ── mock data ─────────────────────────────────────────────────────────────────
const rankingData = [
  // Masculino Duplas B
  { pos: 1,  codigo: '24352', nome: 'Cristianderson Lima',     idade: 32, categoria: 'Masculino Duplas B', clube: 'Win Esportes de Areia', pontos: 10952,
    stats: { notaBT: '55Y', jogos: { disputados: 5, vitorias: 5, derrotas: 0, aproveitamento: '100%' }, sets: { jogados: 5, vencidos: 5, perdidos: 0, aproveitamento: '100%' }, elegivel: true,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 2600 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1950 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1800 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1650 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1500 }] } },
  { pos: 2,  codigo: '32146', nome: 'José Henrique',           idade: 20, categoria: 'Masculino Duplas B', clube: 'Vita Beach Sports',     pontos: 10551,
    stats: { notaBT: '52A', jogos: { disputados: 6, vitorias: 5, derrotas: 1, aproveitamento: '83%' }, sets: { jogados: 6, vencidos: 5, perdidos: 1, aproveitamento: '83%' }, elegivel: true,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 2450 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1950 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1800 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1650 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1500 },{ id: '130', nome: 'FPT Beach Series 1500 - CBS', pontos: 1260 }] } },
  { pos: 3,  codigo: '97653', nome: 'Paulo Costa',             idade: 41, categoria: 'Masculino Duplas B', clube: 'Vita Beach Sports',     pontos: 10346,
    stats: { notaBT: '50B', jogos: { disputados: 7, vitorias: 5, derrotas: 2, aproveitamento: '71%' }, sets: { jogados: 9, vencidos: 6, perdidos: 3, aproveitamento: '67%' }, elegivel: false,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 2350 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1800 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1650 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1500 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1260 }] } },
  { pos: 4,  codigo: '34986', nome: 'Gustavo Couto',           idade: 16, categoria: 'Masculino Duplas B', clube: 'Contorno da Bola',      pontos:  9853,
    stats: { notaBT: '48C', jogos: { disputados: 5, vitorias: 4, derrotas: 1, aproveitamento: '80%' }, sets: { jogados: 7, vencidos: 5, perdidos: 2, aproveitamento: '71%' }, elegivel: true,
      composicao: [{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 2100 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1800 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1500 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1500 },{ id: '130', nome: 'FPT Beach Series 1500 - CBS', pontos: 1020 }] } },
  { pos: 5,  codigo: '46598', nome: 'José Maria Almeida',      idade: 56, categoria: 'Masculino Duplas B', clube: 'Pahragon',              pontos:  9351,
    stats: { notaBT: '45D', jogos: { disputados: 4, vitorias: 3, derrotas: 1, aproveitamento: '75%' }, sets: { jogados: 6, vencidos: 4, perdidos: 2, aproveitamento: '67%' }, elegivel: false,
      composicao: [{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1950 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1650 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1500 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1260 },{ id: '130', nome: 'FPT Beach Series 1500 - CBS', pontos: 1020 }] } },
  { pos: 6,  codigo: '14685', nome: 'Mauro Lima Ferreira',     idade: 26, categoria: 'Masculino Duplas B', clube: 'Taboão',                pontos:  8996,
    stats: { notaBT: '44D', jogos: { disputados: 6, vitorias: 4, derrotas: 2, aproveitamento: '67%' }, sets: { jogados: 8, vencidos: 5, perdidos: 3, aproveitamento: '63%' }, elegivel: true,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 1800 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1800 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1650 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1500 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1260 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1020 }] } },
  { pos: 7,  codigo: '36987', nome: 'Guilherme Dietz',         idade: 26, categoria: 'Masculino Duplas B', clube: 'Taboão',                pontos:  8652,
    stats: { notaBT: '43D', jogos: { disputados: 5, vitorias: 3, derrotas: 2, aproveitamento: '60%' }, sets: { jogados: 7, vencidos: 4, perdidos: 3, aproveitamento: '57%' }, elegivel: false,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 1800 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1650 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1500 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1500 },{ id: '130', nome: 'FPT Beach Series 1500 - CBS', pontos: 1260 },{ id: '047', nome: 'FPT Beach Series 1500 - Arena Isa', pontos: 1020 }] } },
  { pos: 8,  codigo: '25498', nome: 'Pablo Rodrigues',         idade: 23, categoria: 'Masculino Duplas B', clube: 'Contorno da Bola',      pontos:  7154,
    stats: { notaBT: '38E', jogos: { disputados: 4, vitorias: 2, derrotas: 2, aproveitamento: '50%' }, sets: { jogados: 5, vencidos: 3, perdidos: 2, aproveitamento: '60%' }, elegivel: false,
      composicao: [{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1650 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1500 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1260 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1260 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1020 },{ id: '003', nome: 'FPT Beach Series Special Cup 2500 Caiobá', pontos: 756 }] } },
  // Feminino Duplas B
  { pos: 1,  codigo: '51234', nome: 'Andrea Pazetti',          idade: 34, categoria: 'Feminino Duplas B',  clube: 'Pahragon',              pontos:  9800,
    stats: { notaBT: '50B', jogos: { disputados: 5, vitorias: 5, derrotas: 0, aproveitamento: '100%' }, sets: { jogados: 5, vencidos: 5, perdidos: 0, aproveitamento: '100%' }, elegivel: true,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 2450 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1800 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1650 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1500 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1260 }] } },
  { pos: 2,  codigo: '61023', nome: 'Débora Campos',           idade: 29, categoria: 'Feminino Duplas B',  clube: 'Taboão',                pontos:  9200,
    stats: { notaBT: '47B', jogos: { disputados: 6, vitorias: 4, derrotas: 2, aproveitamento: '67%' }, sets: { jogados: 8, vencidos: 5, perdidos: 3, aproveitamento: '63%' }, elegivel: false,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 2100 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1950 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1800 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1500 },{ id: '130', nome: 'FPT Beach Series 1500 - CBS', pontos: 1260 },{ id: '047', nome: 'FPT Beach Series 1500 - Arena Isa', pontos: 756 }] } },
  { pos: 3,  codigo: '72456', nome: 'Aleteia Boulade',         idade: 38, categoria: 'Feminino Duplas B',  clube: 'Caiobá',                pontos:  8750,
    stats: { notaBT: '44C', jogos: { disputados: 5, vitorias: 4, derrotas: 1, aproveitamento: '80%' }, sets: { jogados: 7, vencidos: 5, perdidos: 2, aproveitamento: '71%' }, elegivel: true,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 1950 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1800 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1650 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1500 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1260 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1020 }] } },
  { pos: 4,  codigo: '83901', nome: 'Giselle Moreira',         idade: 27, categoria: 'Feminino Duplas B',  clube: 'Taboão',                pontos:  8100,
    stats: { notaBT: '42C', jogos: { disputados: 4, vitorias: 3, derrotas: 1, aproveitamento: '75%' }, sets: { jogados: 6, vencidos: 4, perdidos: 2, aproveitamento: '67%' }, elegivel: false,
      composicao: [{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1950 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1500 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1500 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1260 },{ id: '047', nome: 'FPT Beach Series 1500 - Arena Isa', pontos: 1020 }] } },
  // Masculino Duplas A
  { pos: 1,  codigo: '11111', nome: 'Rafael Scomassão',        idade: 28, categoria: 'Masculino Duplas A', clube: 'Vita Beach Sports',     pontos: 12500,
    stats: { notaBT: '62A', jogos: { disputados: 8, vitorias: 7, derrotas: 1, aproveitamento: '88%' }, sets: { jogados: 10, vencidos: 8, perdidos: 2, aproveitamento: '80%' }, elegivel: false,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 3000 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 2600 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 2450 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 2100 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1800 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1500 }] } },
  { pos: 2,  codigo: '22222', nome: 'Carlos Silverio',         idade: 31, categoria: 'Masculino Duplas A', clube: 'CBS',                   pontos: 11800,
    stats: { notaBT: '59A', jogos: { disputados: 7, vitorias: 6, derrotas: 1, aproveitamento: '86%' }, sets: { jogados: 9, vencidos: 7, perdidos: 2, aproveitamento: '78%' }, elegivel: false,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 2600 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 2450 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 2100 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1950 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1800 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1500 }] } },
  // Feminino Duplas +40
  { pos: 1,  codigo: '33111', nome: 'Alice Kubo',              idade: 43, categoria: 'Feminino Duplas +40', clube: 'Vita',                 pontos:  8900,
    stats: { notaBT: '45M', jogos: { disputados: 4, vitorias: 4, derrotas: 0, aproveitamento: '100%' }, sets: { jogados: 4, vencidos: 4, perdidos: 0, aproveitamento: '100%' }, elegivel: false,
      composicao: [{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1950 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1800 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1650 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1500 },{ id: '047', nome: 'FPT Beach Series 1500 - Arena Isa', pontos: 1260 }] } },
  { pos: 2,  codigo: '33222', nome: 'Vera Pimentel',           idade: 47, categoria: 'Feminino Duplas +40', clube: 'Vita Vista Alegre',    pontos:  8200,
    stats: { notaBT: '42M', jogos: { disputados: 5, vitorias: 3, derrotas: 2, aproveitamento: '60%' }, sets: { jogados: 6, vencidos: 4, perdidos: 2, aproveitamento: '67%' }, elegivel: false,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 1800 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1650 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1500 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1500 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1260 },{ id: '047', nome: 'FPT Beach Series 1500 - Arena Isa', pontos: 1020 }] } },
  // Masculino Duplas Sub-18
  { pos: 1,  codigo: '44111', nome: 'Henrique Lavorski',       idade: 16, categoria: 'Masculino Duplas Sub-18', clube: 'Pahragon',         pontos:  6500,
    stats: { notaBT: '34S', jogos: { disputados: 3, vitorias: 3, derrotas: 0, aproveitamento: '100%' }, sets: { jogados: 3, vencidos: 3, perdidos: 0, aproveitamento: '100%' }, elegivel: true,
      composicao: [{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1800 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1500 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1260 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1020 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 756 },{ id: '047', nome: 'FPT Beach Series 1500 - Arena Isa', pontos: 540 }] } },
  { pos: 2,  codigo: '44222', nome: 'Bruno Wakano',             idade: 17, categoria: 'Masculino Duplas Sub-18', clube: 'Caiobá',           pontos:  5800,
    stats: { notaBT: '31S', jogos: { disputados: 3, vitorias: 2, derrotas: 1, aproveitamento: '67%' }, sets: { jogados: 4, vencidos: 3, perdidos: 1, aproveitamento: '75%' }, elegivel: false,
      composicao: [{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1500 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1260 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1260 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1020 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 756 },{ id: '047', nome: 'FPT Beach Series 1500 - Arena Isa', pontos: 540 }] } },
  // Misto Duplas B
  { pos: 1,  codigo: '55111', nome: 'Gabriel Bortoleto',       idade: 24, categoria: 'Misto Duplas B',      clube: 'Vita Beach Sports',    pontos:  9100,
    stats: { notaBT: '46X', jogos: { disputados: 5, vitorias: 4, derrotas: 1, aproveitamento: '80%' }, sets: { jogados: 7, vencidos: 5, perdidos: 2, aproveitamento: '71%' }, elegivel: true,
      composicao: [{ id: '287', nome: 'FPT Grand Slam 2000 Curitiba - Contorno da Bola', pontos: 2100 },{ id: '242', nome: 'FPT Beach Series 1500 - Taboão', pontos: 1950 },{ id: '082', nome: 'FPT Beach Series 1500 - Open Beach', pontos: 1800 },{ id: '156', nome: 'FPT 1500 - Chácara Paraíso do Sol', pontos: 1500 },{ id: '166', nome: 'FPT Beach Series 1500 - Win', pontos: 1260 },{ id: '241', nome: 'FPT Beach Series 1500 - Santa Mônica', pontos: 1020 }] } },
]

const DEFAULT_CAT = 'Masculino Duplas B'
const DEFAULT_SHOW = 8

// ── PlayerAvatar ──────────────────────────────────────────────────────────────
function PlayerAvatar({ nome, size = 36 }) {
  const photo = PLAYER_PHOTOS[nome]
  if (photo) return <img src={photo} alt={nome} className="rk-avatar-photo" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />
  return (
    <span className="rk-avatar-sm" style={{ background: avColor(nome), width: size, height: size, fontSize: size * 0.35, flexShrink: 0 }}>
      {initials(nome)}
    </span>
  )
}

// ── Podium Card ───────────────────────────────────────────────────────────────
function PodiumCard({ label, player }) {
  return (
    <div className="rk-podium-card">
      <PlayerAvatar nome={player.nome} size={48} />
      <p className="rk-podium-label">{label}</p>
      <p className="rk-podium-name">{player.nome}</p>
      <p className="rk-podium-pts">{player.pontos.toLocaleString('pt-BR')} pts</p>
    </div>
  )
}

// ── Ranking Row ───────────────────────────────────────────────────────────────
function RankingRow({ player, isOpen, onToggle }) {
  const total = player.stats.composicao.reduce((s, c) => s + c.pontos, 0)
  return (
    <div className={`rk-row${isOpen ? ' rk-row--open' : ''}`}>
      <div className="rk-row-accent" />

      {/* Main row */}
      <div className="rk-row-main" onClick={onToggle}>
        <span className="rk-col rk-col--rank">{String(player.pos).padStart(2, '0')}</span>
        <span className="rk-col rk-col--codigo">{player.codigo}</span>
        <span className="rk-col rk-col--nome">
          <PlayerAvatar nome={player.nome} size={32} />
          {player.nome}
        </span>
        <span className="rk-col rk-col--idade">{player.idade}</span>
        <span className="rk-col rk-col--cat">{player.categoria}</span>
        <span className="rk-col rk-col--clube">{player.clube}</span>
        <span className="rk-col rk-col--pontos">{player.pontos.toLocaleString('pt-BR')}</span>
        <button
          className="rk-row-chevron"
          onClick={e => { e.stopPropagation(); onToggle() }}
          aria-label={isOpen ? 'Fechar detalhes' : 'Ver detalhes'}
        >
          <Icon name={isOpen ? 'nav-arrow-up' : 'nav-arrow-down'} size="sm" />
        </button>
      </div>

      {/* Expanded panel */}
      {isOpen && (
        <>
          <div className="rk-row-divider" />
          <div className="rk-mobile-info">
            <span><strong>Código:</strong> {player.codigo}</span>
            <span><strong>Idade:</strong> {player.idade}</span>
            <span><strong>Categoria:</strong> {player.categoria}</span>
            <span><strong>Clube:</strong> {player.clube}</span>
          </div>
          <div className="rk-expanded">

            {/* Left — Nota BT + Desempenho */}
            <div className="rk-left-col">
              <div className="rk-nota-bt">
                <div className="rk-nota-bt-header">
                  <span className="rk-nota-bt-label">Nota BT</span>
                  <span className="rk-nota-bt-value">{player.stats.notaBT}</span>
                </div>
              </div>

              <div className="rk-desempenho">
                <p className="rk-section-title">Desempenho no Ano</p>
                <div className="rk-stats-divider" />
                <div className="rk-stats-grid">
                  <div className="rk-stats-block">
                    <p className="rk-stats-block-title">Jogos</p>
                    <div className="rk-stats-row"><span>Jogos disputados:</span><strong>{player.stats.jogos.disputados}</strong></div>
                    <div className="rk-stats-row"><span>Vitórias:</span><strong>{player.stats.jogos.vitorias}</strong></div>
                    <div className="rk-stats-row"><span>Derrotas:</span><strong>{player.stats.jogos.derrotas}</strong></div>
                    <div className="rk-stats-row"><span>Aproveitamento:</span><strong>{player.stats.jogos.aproveitamento}</strong></div>
                  </div>
                  <div className="rk-stats-block">
                    <p className="rk-stats-block-title">Sets</p>
                    <div className="rk-stats-row"><span>Sets jogados:</span><strong>{player.stats.sets.jogados}</strong></div>
                    <div className="rk-stats-row"><span>Sets vencidos:</span><strong>{player.stats.sets.vencidos}</strong></div>
                    <div className="rk-stats-row"><span>Sets perdidos:</span><strong>{player.stats.sets.perdidos}</strong></div>
                    <div className="rk-stats-row"><span>Aproveitamento:</span><strong>{player.stats.sets.aproveitamento}</strong></div>
                  </div>
                </div>
                <div className="rk-stats-divider" />
                {player.stats.elegivel && (
                  <div className="rk-eligible-tag">
                    <Icon name="check-circle" size="sm" />
                    <span>Elegível para solicitação de promoção de categoria.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Composição */}
            <div className="rk-composicao">
              <p className="rk-section-title">Composição do Ranking</p>
              <div className="rk-composicao-list">
                {player.stats.composicao.map((item, i) => (
                  <div key={i} className="rk-composicao-row">
                    <span className="rk-composicao-nome">{item.id} - {item.nome}</span>
                    <span className="rk-composicao-pontos">{item.pontos.toLocaleString('pt-BR')}</span>
                  </div>
                ))}
                <div className="rk-composicao-row rk-composicao-row--total">
                  <span className="rk-composicao-nome">Total</span>
                  <span className="rk-composicao-pontos">{total.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Ranking() {
  const { sport } = useSport()
  const isTennis = sport === 'tennis'
  const ALL_CATEGORIES = isTennis ? ALL_CATEGORIES_TENNIS : ALL_CATEGORIES_BT

  const [openedRow, setOpenedRow]     = useState(null)
  const [regiao, setRegiao]           = useState('Todas as Regiões')
  const [genero, setGenero]           = useState('Todos')
  const [categoria, setCategoria]     = useState(DEFAULT_CAT)
  const [ano, setAno]                 = useState('2026')
  const [busca, setBusca]             = useState('')
  const [showAll, setShowAll]         = useState(false)
  const [refreshing, setRefreshing]   = useState(false)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  // Count of non-default active filters (for the badge on the Filtrar button)
  const activeFilterCount = [
    regiao !== 'Todas as Regiões',
    genero !== 'Todos',
    categoria !== DEFAULT_CAT,
    ano !== '2026',
  ].filter(Boolean).length

  function clearFilters() {
    setRegiao('Todas as Regiões')
    setGenero('Todos')
    setCategoria(DEFAULT_CAT)
    setAno('2026')
    setFilterDrawerOpen(false)
  }

  async function handleRefresh() {
    setRefreshing(true)
    setBusca('')
    await new Promise(r => setTimeout(r, 700))
    setRefreshing(false)
  }

  const { loading: ptrLoading, pullRatio, handlers } = usePullToRefresh(handleRefresh)

  const toggle = (codigo) => setOpenedRow(prev => prev === codigo ? null : codigo)

  const filtered = rankingData.filter(p => {
    if (genero !== 'Todos' && !p.categoria.startsWith(genero)) return false
    if (categoria !== 'Todas' && p.categoria !== categoria) return false
    if (busca && !p.nome.toLowerCase().includes(busca.toLowerCase())) return false
    return true
  })

  const displayed = showAll ? filtered : filtered.slice(0, DEFAULT_SHOW)
  const top3 = filtered.slice(0, 3)

  return (
    <main className="rk-page" {...handlers}>

      <PtrIndicator loading={ptrLoading} ratio={pullRatio} />

      {/* ── Filter drawer — mobile only (portal to escape page-animate transform stacking context) ── */}
      {createPortal(<>
      <div
        className={`rk-filter-backdrop${filterDrawerOpen ? ' rk-filter-backdrop--open' : ''}`}
        onClick={() => setFilterDrawerOpen(false)}
      />
      <div className={`rk-filter-drawer${filterDrawerOpen ? ' rk-filter-drawer--open' : ''}`}>
        {/* Drag handle */}
        <div className="rk-drawer-handle" />

        {/* Header */}
        <div className="rk-drawer-header">
          <span className="rk-drawer-title">Filtros</span>
          <button className="rk-drawer-close" onClick={() => setFilterDrawerOpen(false)} aria-label="Fechar filtros">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="rk-drawer-body">

          {/* Região */}
          <div className="rk-drawer-section">
            <p className="rk-drawer-section-label">Região</p>
            <div className="rk-drawer-pills">
              {REGIOES.map(r => (
                <button
                  key={r}
                  className={`rk-drawer-pill${regiao === r ? ' rk-drawer-pill--active' : ''}`}
                  onClick={() => setRegiao(r)}
                >{r}</button>
              ))}
            </div>
          </div>

          {/* Gênero */}
          <div className="rk-drawer-section">
            <p className="rk-drawer-section-label">Gênero</p>
            <div className="rk-drawer-pills">
              {GENEROS_FILTER.map(g => (
                <button
                  key={g}
                  className={`rk-drawer-pill${genero === g ? ' rk-drawer-pill--active' : ''}`}
                  onClick={() => { setGenero(g); setCategoria('Todas') }}
                >{g}</button>
              ))}
            </div>
          </div>

          {/* Categoria */}
          <div className="rk-drawer-section">
            <p className="rk-drawer-section-label">Categoria</p>
            <div className="rk-drawer-pills rk-drawer-pills--scroll">
              {[
                { value: 'Todas', label: 'Todas as categorias' },
                ...ALL_CATEGORIES
                  .filter(c => genero === 'Todos' || c.startsWith(genero))
                  .map(c => ({ value: c, label: c })),
              ].map(({ value, label }) => (
                <button
                  key={value}
                  className={`rk-drawer-pill${categoria === value ? ' rk-drawer-pill--active' : ''}`}
                  onClick={() => setCategoria(value)}
                >{label}</button>
              ))}
            </div>
          </div>

          {/* Ano */}
          <div className="rk-drawer-section">
            <p className="rk-drawer-section-label">Ano</p>
            <div className="rk-drawer-pills">
              {ANOS.map(a => (
                <button
                  key={a}
                  className={`rk-drawer-pill${ano === a ? ' rk-drawer-pill--active' : ''}`}
                  onClick={() => setAno(a)}
                >{a}</button>
              ))}
            </div>
          </div>

        </div>

        {/* Fixed footer */}
        <div className="rk-drawer-footer">
          <button className="rk-drawer-btn rk-drawer-btn--clear" onClick={clearFilters}>
            Limpar filtros
          </button>
          <button className="rk-drawer-btn rk-drawer-btn--apply" onClick={() => setFilterDrawerOpen(false)}>
            Aplicar filtros
          </button>
        </div>
      </div>
      </>, document.body)}

      {/* Hero banner */}
      <div className={`rk-hero${isTennis ? ' rk-hero--tennis' : ''}`}>
        <div className="rk-hero-inner">
          <p className="rk-hero-title">{isTennis ? 'Ranking FIAT de Tênis' : 'Ranking FIAT de Beach Tennis'}</p>
        </div>
      </div>

      <div className="rk-wrapper">

        {/* ── Main content box ── */}
        <div className="rk-content">
          <h1 className="rk-page-title">{isTennis ? 'Ranking Fiat de Tênis' : 'Ranking Fiat de Beach Tennis'}</h1>

          {/* Mobile: search + filter button (hidden on desktop via CSS) */}
          <div className="rk-mobile-bar">
            <div className="rk-search-wrap">
              <input
                className="rk-search"
                placeholder="Buscar por nome"
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
              <span className="rk-search-icon"><Icon name="search" size="sm" /></span>
            </div>
            <button
              className="rk-filter-btn"
              onClick={() => setFilterDrawerOpen(true)}
              aria-label="Abrir filtros"
            >
              <FontAwesomeIcon icon={faSliders} />
              <span>Filtrar</span>
              {activeFilterCount > 0 && (
                <span className="rk-filter-badge">{activeFilterCount}</span>
              )}
            </button>
          </div>

          {/* Desktop filters (hidden on mobile via CSS) */}
          <div className="rk-filter-row">
            <span className="rk-filter-label">Filtros:</span>

            <BottomSheetSelect
              value={regiao}
              onChange={setRegiao}
              options={REGIOES}
              title="Região"
              nativeClassName="rk-select"
            />

            <BottomSheetSelect
              value={genero}
              onChange={v => { setGenero(v); setCategoria('Todas') }}
              options={GENEROS_FILTER}
              title="Gênero"
              nativeClassName="rk-select"
            />

            <BottomSheetSelect
              value={categoria}
              onChange={setCategoria}
              options={[
                { value: 'Todas', label: 'Todas as categorias' },
                ...ALL_CATEGORIES
                  .filter(c => genero === 'Todos' || c.startsWith(genero))
                  .map(c => ({ value: c, label: c }))
              ]}
              title="Categoria"
              searchable={ALL_CATEGORIES.length > 10}
              nativeClassName="rk-select"
            />

            <BottomSheetSelect
              value={ano}
              onChange={setAno}
              options={ANOS}
              title="Ano"
              nativeClassName="rk-select"
            />

            <div className="rk-search-wrap">
              <input className="rk-search" placeholder="Buscar por nome" value={busca} onChange={e => setBusca(e.target.value)} />
              <span className="rk-search-icon"><Icon name="search" size="sm" /></span>
            </div>
          </div>

          {/* Top 3 podium */}
          {refreshing ? (
            <SkeletonRankingPodium />
          ) : top3.length >= 3 && (
            <div className="rk-podium">
              <PodiumCard label="Líder do Ranking" player={top3[0]} />
              <PodiumCard label="2º Colocado"       player={top3[1]} />
              <PodiumCard label="3º Colocado"       player={top3[2]} />
            </div>
          )}

          {/* Table header */}
          <div className="rk-table-header">
            <span className="rk-col rk-col--rank">Rank</span>
            <span className="rk-col rk-col--codigo">Código</span>
            <span className="rk-col rk-col--nome">Jogador(a)</span>
            <span className="rk-col rk-col--idade">Idade</span>
            <span className="rk-col rk-col--cat">Categoria</span>
            <span className="rk-col rk-col--clube">Clube</span>
            <span className="rk-col rk-col--pontos">Pontuação</span>
            <span className="rk-col rk-col--action" />
          </div>

          {/* Rows */}
          <div className="rk-rows">
            {refreshing ? (
              <SkeletonList Component={SkeletonRankingRow} count={8} />
            ) : (
              <>
                {displayed.length === 0 && (
                  <div className="rk-empty-state">
                    Nenhum resultado encontrado para os filtros selecionados.
                  </div>
                )}
                {displayed.map(p => (
                  <RankingRow
                    key={p.codigo}
                    player={p}
                    isOpen={openedRow === p.codigo}
                    onToggle={() => toggle(p.codigo)}
                  />
                ))}
              </>
            )}
          </div>

          {/* Mostrar todos */}
          {filtered.length > DEFAULT_SHOW && (
            <button className="rk-show-all" onClick={() => setShowAll(v => !v)}>
              <Icon name={showAll ? 'minus' : 'plus'} size="sm" />
              {showAll ? 'Mostrar menos' : `Mostrar todos (${filtered.length})`}
            </button>
          )}
        </div>

        {/* ── Como é calculado ── */}
        <div className="rk-info-box">
          <div className="rk-info-text">
            <h2 className="rk-info-title">Como o ranking é calculado</h2>
            <p className="rk-info-body">
              {isTennis
                ? 'O Ranking FIAT de Tênis é calculado com base nos resultados dos torneios oficiais da FPT Tênis. Cada torneio contribui com pontos conforme a categoria do evento e a colocação do atleta. São contabilizados os 6 melhores resultados do ano.'
                : 'O Ranking FIAT de Beach Tennis é calculado com base nos resultados dos torneios oficiais da FPT. Cada torneio contribui com pontos conforme a categoria do evento (1000, 1500, 2000 ou 2500) e a colocação do atleta. São contabilizados os 6 melhores resultados do ano. A "Nota BT" representa a pontuação total acumulada pelo atleta ao longo da temporada.'
              }
            </p>
          </div>
          <div className="rk-info-img" aria-hidden="true" />
        </div>

      </div>

      <TournamentsSection />
    </main>
  )
}
