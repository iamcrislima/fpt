/**
 * Mock data — Chaveamentos (grupos, eliminatórias, brackets)
 * Estrutura backend-ready com rounds[] para suportar qualquer profundidade de bracket.
 *
 * Formato de cada chave:
 *   { grupos: [...], eliminatorias: { rounds: [{ nome, partidas }], campeao } }
 */

// ── Masculino Duplas B — 16 equipes, 4 grupos → quartas → semis → final ──
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

// ── Feminino Duplas B — 8 equipes, 2 grupos, semis → final ──
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

// ── Masculino Duplas A — 32 equipes, 8 grupos, oitavas → quartas → semis → final (SPLIT) ──
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

// ── Misto Duplas C — 4 equipes, 1 grupo, apenas final ──
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

// ── Masculino Simples C — 32 equipes, 5 rounds (horizontal scroll) ──
const gruposMascSimC = gruposMascA.slice(0, 4)
const chave_masc_sim_C = {
  grupos: gruposMascSimC,
  eliminatorias: {
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

// ── Lookup map ──
const CHAVEAMENTO_MAP = {
  'Masculino-Duplas-B':  chave_masc_dup_B,
  'Feminino-Duplas-B':   chave_fem_dup_B,
  'Masculino-Duplas-A':  chave_masc_dup_A,
  'Misto-Duplas-C':      chave_misto_dup_C,
  'Masculino-Simples-C': chave_masc_sim_C,
}

export function getChaveamento(g, m, n) {
  if (!g || !m || !n) return null
  return CHAVEAMENTO_MAP[`${g}-${m}-${n}`] || null
}

// Also export the legacy variables for components that reference them directly
export { grupos, gruposMascA }
