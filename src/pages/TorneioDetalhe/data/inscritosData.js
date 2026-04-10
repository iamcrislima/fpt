/**
 * Mock data — Lista de inscritos por categoria
 * Estrutura backend-ready: cada item tem categoria, counts, e array de duplas.
 */

export const ALL_CATEGORIES_INSCRICAO = [
  'Todas as categorias',
  '── Feminino Duplas ──','Feminino Duplas +35','Feminino Duplas +40','Feminino Duplas +50','Feminino Duplas +60','Feminino Duplas A','Feminino Duplas B','Feminino Duplas C','Feminino Duplas D','Feminino Duplas E','Feminino Duplas Sub-12','Feminino Duplas Sub-14','Feminino Duplas Sub-16','Feminino Duplas Sub-18',
  '── Feminino Simples ──','Feminino Simples +35','Feminino Simples +40','Feminino Simples +50','Feminino Simples +60','Feminino Simples A','Feminino Simples B','Feminino Simples C','Feminino Simples D','Feminino Simples E','Feminino Simples Sub-12','Feminino Simples Sub-14','Feminino Simples Sub-16','Feminino Simples Sub-18',
  '── Masculino Duplas ──','Masculino Duplas +35','Masculino Duplas +40','Masculino Duplas +50','Masculino Duplas +60','Masculino Duplas A','Masculino Duplas B','Masculino Duplas C','Masculino Duplas D','Masculino Duplas E','Masculino Duplas Sub-12','Masculino Duplas Sub-14','Masculino Duplas Sub-16','Masculino Duplas Sub-18',
  '── Masculino Simples ──','Masculino Simples +35','Masculino Simples +40','Masculino Simples +50','Masculino Simples +60','Masculino Simples A','Masculino Simples B','Masculino Simples C','Masculino Simples D','Masculino Simples E','Masculino Simples Sub-12','Masculino Simples Sub-14','Masculino Simples Sub-16','Masculino Simples Sub-18',
  '── Misto Duplas ──','Misto Duplas +35','Misto Duplas +40','Misto Duplas +50','Misto Duplas +60','Misto Duplas A','Misto Duplas B','Misto Duplas C','Misto Duplas D','Misto Duplas E','Misto Duplas Sub-12','Misto Duplas Sub-14','Misto Duplas Sub-16','Misto Duplas Sub-18',
  '── Misto Simples ──','Misto Simples +35','Misto Simples +40','Misto Simples +50','Misto Simples +60','Misto Simples A','Misto Simples B','Misto Simples C','Misto Simples D','Misto Simples E','Misto Simples Sub-12','Misto Simples Sub-14','Misto Simples Sub-16','Misto Simples Sub-18',
]

export const inscritos = [
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

export const filaEspera = {
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
