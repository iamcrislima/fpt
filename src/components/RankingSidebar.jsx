import { Avatar, Select, Button } from '@1doc/1ds-react'

const FPT_LOGO_SM = '/images/fpt-logo.svg'
const PLAYER_PHOTO = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80'

const players = [
  { rank: '01', name: 'Cris Lima', points: 1000, photo: PLAYER_PHOTO, highlight: true },
  { rank: '02', name: 'Fabiano', points: 998, letter: 'F', highlight: false },
  { rank: '03', name: 'Roberval', points: 952, letter: 'R', highlight: true },
  { rank: '04', name: 'Cleiton da Silva', points: 899, letter: 'C', highlight: false },
  { rank: '05', name: 'Wagner Souza', points: 874, letter: 'W', highlight: true },
  { rank: '06', name: 'Jurandir Menezes', points: 850, letter: 'J', highlight: false },
  { rank: '07', name: 'Paulo Costa', points: 765, letter: 'P', highlight: true },
  { rank: '08', name: 'Inácio Steffen', points: 690, letter: 'I', highlight: false },
  { rank: '09', name: 'Moacir Silva', points: 500, letter: 'M', highlight: true },
  { rank: '10', name: 'Carlos Sousa', points: 275, letter: 'C', highlight: false },
]

const tipoOptions = [
  { value: 'regional', label: 'Regional' },
  { value: 'estadual', label: 'Estadual' },
  { value: 'nacional', label: 'Nacional' },
]

const categoriaOptions = [
  { value: 'masculino-b', label: 'Masculino B' },
  { value: 'masculino-a', label: 'Masculino A' },
  { value: 'feminino-b', label: 'Feminino B' },
  { value: 'feminino-a', label: 'Feminino A' },
]

export default function RankingSidebar() {
  return (
    <aside className="ranking-sidebar">
      <div className="ranking-header">
        <h2 className="ranking-title">RANKING</h2>
        <img src={FPT_LOGO_SM} alt="FPT" width="52" height="24" />
      </div>

      <div className="ranking-filters">
        <Select
          options={tipoOptions}
          value="regional"
          size="small"
          fullWidth
        />
        <Select
          options={categoriaOptions}
          value="masculino-b"
          size="small"
          fullWidth
        />
      </div>

      <div className="ranking-table">
        {players.map((player) => (
          <div key={player.rank} className={`ranking-row${player.highlight ? ' highlight' : ''}`}>
            <div className="ranking-left">
              <span className="rank-num">{player.rank}</span>
              {player.photo ? (
                <Avatar src={player.photo} alt={player.name} size="sm" />
              ) : (
                <Avatar size="sm">{player.letter}</Avatar>
              )}
              <span className="player-name">{player.name}</span>
            </div>
            <span className="player-points">{player.points}</span>
          </div>
        ))}
      </div>

      <Button variant="text" endIcon="arrow-right" className="btn-ver-todos">
        Ver todos
      </Button>
    </aside>
  )
}
