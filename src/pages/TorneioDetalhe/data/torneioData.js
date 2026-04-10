/**
 * Mock data — Torneio details, programação, campeões, constantes
 * Estrutura backend-ready: substituir por fetch quando API estiver pronta.
 */

export const torneio = {
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

export const categorias = ['40+', 'M', 'F', 'MX', '50+', '60+', 'A', 'B', 'C', 'D', 'E', 'SUB12', 'SUB14', 'SUB16', 'SUB18']
export const tabs = ['Visão Geral', 'Lista de inscritos', 'Programação', 'Chaves', 'Campeões', 'Álbum']

export const programacao = [
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

export const campeoes = [
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

// Player photos for avatars (some players have real photos, rest fall back to colored initials)
export const PLAYER_PHOTOS = {
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
  // Lista de inscritos — feminino
  'Andrea Pazetti':      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&q=80',
  'Giselle Moreira':     'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80',
  'Aleteia Boulade':     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&q=80',
  'Debora Campos':       'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&q=80',
  'Alice Kubo':          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&q=80',
  'Cristiane Farhat':    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=60&h=60&fit=crop&q=80',
  'Vera Pimentel':       'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&q=80',
  'Alessandra Veit':     'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&q=80',
}

// Chaveamento filter options
export const GENEROS_CHAVE    = ['Feminino', 'Masculino', 'Misto']
export const MODALIDADES_CHAVE = ['Duplas', 'Simples']
export const NIVEIS_CHAVE     = ['+35', '+40', '+50', '+60', 'A', 'B', 'C', 'D', 'E', 'Sub-12', 'Sub-14', 'Sub-16', 'Sub-18']
