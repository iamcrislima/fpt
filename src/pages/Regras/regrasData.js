export const REGRAS = [
  {
    id: "quadra",
    titulo: "A Quadra",
    conteudo: [
      { tipo: "texto", texto: "A quadra deve ser um retângulo de 23,77 m de comprimento por 8,23 m de largura, para os jogos de simples. Para os jogos de duplas, a quadra deve medir 10,97 m de largura." },
      { tipo: "texto", texto: "Deve ser dividida ao meio por uma rede suspensa através de uma corda ou cabo metálico, e ser suspensa por dois postes numa altura de 1,07 m. A rede deve estar completamente estendida de modo que não haja espaço entre os dois postes da rede e ter uma malha suficientemente pequena para que a bola não passe através dela." },
      { tipo: "texto", texto: "A altura da rede no centro da mesma deve ser de 0,914 m, a qual deve estar presa no centro por uma faixa. Uma banda deve tapar a corda metálica ou o cabo do topo da rede. A faixa e a banda da rede devem ser completamente da cor branca." },
      { tipo: "lista", itens: [
        "O diâmetro máximo da corda ou cabo de metal é de 0,8 cm.",
        "A largura máxima da faixa central deve ser de 5 cm.",
        "A faixa da rede deve ter entre 5 cm e 6,35 cm para cada lado."
      ]},
      { tipo: "texto", texto: "Para os jogos de duplas, os centros dos postes da rede devem estar a 0,914 m fora da quadra de dupla de cada lado. Para os jogos de simples, se a rede de simples é usada, os centros dos postes da rede devem estar a 0,914 m fora da quadra de simples de cada lado." },
      { tipo: "lista", itens: [
        "Os postes da rede não podem ter mais que 15 cm de diâmetro.",
        "Os postes de simples não podem ter mais que 7,5 cm de diâmetro.",
        "Os postes da rede e os postes de simples não podem ter mais que 2,5 cm acima do topo da rede."
      ]},
      { tipo: "texto", texto: "As linhas no final da quadra são chamadas de linhas de base e as linhas nas laterais da quadra são chamadas de linhas laterais. Duas linhas devem ser estendidas entre as linhas laterais da quadra, medindo 6,40 m de cada lado da rede paralelas com a rede. Estas linhas são chamadas de linha de serviço." },
      { tipo: "lista", itens: [
        "A linha de centro e a marca central devem ter 5 cm de largura.",
        "As outras linhas da quadra podem ter entre 2,5 cm e 5 cm de largura, exceto as linhas de base, que podem ter até 10 cm."
      ]},
      { tipo: "texto", texto: "Todas as medidas da quadra devem ser feitas de fora das linhas e todas as linhas da quadra devem ser da mesma cor, claramente contrastando com a cor da quadra. Nenhuma propaganda é permitida na quadra, rede, fita ou banda, postes de duplas ou paus de simples." }
    ]
  },
  {
    id: "raquete",
    titulo: "A Raquete",
    conteudo: [
      { tipo: "texto", texto: "Raquetes aprovadas de acordo com as regras de tênis devem estar em conformidade com as especificações do Anexo II. A Federação Internacional de Tênis decide se qualquer raquete ou protótipo está aprovado para o jogo." },
      { tipo: "caso", pergunta: "Caso 1 — Pode haver mais de um jogo de cordas na face de uma raquete?", resposta: "Não. A regra menciona claramente um padrão e não padrões de cordas cruzadas." },
      { tipo: "caso", pergunta: "Caso 2 — Pode um padrão de encordoamento ser considerado uniforme se as cordas são de diferentes bitolas?", resposta: "Não." },
      { tipo: "caso", pergunta: "Caso 3 — Pode o anti-vibrador ser colocado nas cordas da raquete?", resposta: "Sim, mas este dispositivo só pode ser colocado fora das cordas cruzadas." },
      { tipo: "caso", pergunta: "Caso 4 — Um jogador quebra a corda acidentalmente. Pode continuar com essa raquete?", resposta: "Sim, exceto quando especificamente proibido pelos organizadores." },
      { tipo: "caso", pergunta: "Caso 5 — É permitido ao jogador usar mais que uma raquete ao mesmo tempo?", resposta: "Não." },
      { tipo: "caso", pergunta: "Caso 6 — Pode uma bateria que afete as características de jogo ser incorporada à raquete?", resposta: "Não. Uma bateria é proibida pois é uma fonte de energia." }
    ]
  },
  {
    id: "servico-faltoso",
    titulo: "Serviço Faltoso",
    conteudo: [
      { tipo: "subtitulo", texto: "O serviço é uma falta se:" },
      { tipo: "lista", itens: [
        "O sacador quebra as regras 16, 17 e 18;",
        "O sacador erra a bola no ar na tentativa de golpeá-la;",
        "A bola sacada toca uma instalação permanente, paus de simples ou poste da rede antes de tocar no solo;",
        "A bola sacada toca o sacador ou o companheiro do sacador, ou qualquer coisa que eles usem ou carreguem."
      ]},
      { tipo: "caso", pergunta: "Caso 1 — O sacador lança a bola e decide não golpeá-la. Isso é uma falta?", resposta: "Não. O jogador está autorizado a pegar a bola com a mão, com a raquete, ou deixá-la quicar no chão." },
      { tipo: "caso", pergunta: "Caso 2 — A bola sacada toca o pau de simples e cai na quadra de serviço correta. É falta?", resposta: "Sim." }
    ]
  },
  {
    id: "let",
    titulo: "O Let",
    conteudo: [
      { tipo: "texto", texto: "Em todos os casos que o \"let\" é chamado, exceto quando um \"let\" no segundo serviço é chamado, todo o ponto deve ser repetido." },
      { tipo: "caso", pergunta: "Caso 1 — Uma bola entra na quadra e um \"let\" é chamado. O sacador tinha previamente servido uma falta. É permitido ao sacador o primeiro ou segundo serviço?", resposta: "Primeiro serviço. Todo o ponto deve ser repetido." },
      { tipo: "subtitulo", texto: "O \"LET\" DURANTE O SERVIÇO" },
      { tipo: "texto", texto: "O serviço é um \"let\" se:" },
      { tipo: "lista", itens: [
        "A bola sacada toca a rede, faixa ou banda, e de qualquer maneira é boa; ou, após bater na rede, toca o recebedor ou o parceiro antes de bater no solo.",
        "A bola é sacada quando o recebedor não está pronto."
      ]},
      { tipo: "texto", texto: "No caso do serviço ser um \"let\", o saque em particular não conta, e o sacador deve servir novamente, mas um \"let\" de serviço não cancela uma falta prévia." }
    ]
  },
  {
    id: "troca-lado",
    titulo: "Troca de Lado",
    conteudo: [
      { tipo: "texto", texto: "Os jogadores devem trocar de lado ao fim do primeiro, terceiro, e cada subsequente game ímpar de cada set." },
      { tipo: "texto", texto: "Os jogadores também devem trocar de lado ao final de cada set, a não ser que o número total de games seja par — neste caso, os jogadores devem trocar de lado no primeiro game do set seguinte." },
      { tipo: "texto", texto: "Durante o \"Tie-Break\", os jogadores devem trocar de lado após seis pontos." }
    ]
  },
  {
    id: "instalacoes-permanentes",
    titulo: "Instalações Permanentes",
    conteudo: [
      { tipo: "texto", texto: "As instalações permanentes da quadra incluem as partes de trás e as partes do lado, os espectadores, os estandes e as cadeiras dos espectadores, e todas as outras instalações em volta e acima da quadra, o juiz de cadeira, os juízes de linha, o juiz de net e os boleiros em suas reconhecidas posições." },
      { tipo: "subtitulo", texto: "A BOLA TOCA UMA INSTALAÇÃO PERMANENTE" },
      { tipo: "texto", texto: "Se a bola em jogo toca uma instalação permanente após ter tocado na quadra correta, o jogador que golpeou a bola ganha o ponto. Se toca a instalação antes de tocar o solo, o jogador perde o ponto." }
    ]
  },
  {
    id: "sacador-recebedor",
    titulo: "O Sacador e o Recebedor",
    conteudo: [
      { tipo: "texto", texto: "Os jogadores/times ficam em lados opostos à rede. O sacador é o jogador que coloca a bola em jogo para o primeiro ponto. O recebedor é o jogador que está pronto para retornar a bola sacada." },
      { tipo: "caso", pergunta: "Caso 1 — É permitido ao recebedor posicionar-se fora das linhas da quadra?", resposta: "Sim. O recebedor pode ficar em qualquer posição dentro ou fora das linhas do seu lado da rede." }
    ]
  },
  {
    id: "foot-fault",
    titulo: "Foot Fault (Falta de Pé)",
    conteudo: [
      { tipo: "texto", texto: "O sacador, durante a execução do serviço, não poderá:" },
      { tipo: "lista", itens: [
        "Mudar a sua posição andando ou correndo. Pequenos movimentos dos pés são permitidos.",
        "Tocar a linha de base da quadra com qualquer pé.",
        "Tocar a área fora da linha lateral imaginária da extensão da quadra com qualquer pé.",
        "Tocar a extensão imaginária da marca central com qualquer pé."
      ]},
      { tipo: "caso", pergunta: "Caso 1 — O sacador pode servir posicionado atrás da parte da linha de base entre a linha de simples e a linha de duplas?", resposta: "Não." },
      { tipo: "caso", pergunta: "Caso 2 — É permitido ao sacador ter um ou ambos os pés fora do chão?", resposta: "Sim." }
    ]
  },
  {
    id: "segundo-servico",
    titulo: "Segundo Serviço",
    conteudo: [
      { tipo: "texto", texto: "Se o primeiro serviço é uma falta, o sacador deve sacar novamente sem atraso atrás do mesmo lado da quadra o qual a falta prévia foi executada, a não ser que o serviço tenha sido executado do lado errado da quadra." }
    ]
  },
  {
    id: "bola-em-jogo",
    titulo: "Bola em Jogo",
    conteudo: [
      { tipo: "texto", texto: "A não ser por uma falta ou \"let\" chamado, a bola está em jogo desde o momento que o sacador golpeia a bola, e ela se mantém em jogo até o ponto ser decidido." },
      { tipo: "subtitulo", texto: "A BOLA TOCA A LINHA" },
      { tipo: "texto", texto: "Se a bola toca a linha, é considerada como se ela tocasse a quadra marcada por esta linha." }
    ]
  },
  {
    id: "a-bola",
    titulo: "A Bola",
    conteudo: [
      { tipo: "texto", texto: "Bolas aprovadas de acordo com as regras de tênis devem estar em conformidade com as especificações do Anexo I. Para competições até 10 anos, as bolas do Anexo VI devem ser usadas (etapa 1 – verde, etapa 2 – laranja, etapa 3 – vermelha)." },
      { tipo: "subtitulo", texto: "Os organizadores do evento devem anunciar antes das disputas:" },
      { tipo: "lista", itens: [
        "O número de bolas em jogo (2, 3, 4 ou 6).",
        "A política de troca de bolas, se houver."
      ]},
      { tipo: "caso", pergunta: "Caso 1 — Se a bola está um pouco murcha (\"soft\") no final do ponto, o ponto deve ser repetido?", resposta: "Não. Se a bola está murcha mas não estourou, o ponto não deve ser repetido." }
    ]
  },
  {
    id: "escolha-saque-lado",
    titulo: "Escolha de Saque e Lado",
    conteudo: [
      { tipo: "texto", texto: "A troca de lados e a escolha para ser sacador ou recebedor no primeiro game deve ser decidida por sorteio antes do aquecimento." },
      { tipo: "texto", texto: "O jogador/time que vencer o sorteio pode escolher: (a) o direito de sacar ou receber no primeiro game, (b) o lado da quadra para o primeiro game, ou (c) requerer que o oponente faça uma das escolhas acima." },
      { tipo: "caso", pergunta: "Caso 1 — Os jogadores têm direito a novas escolhas se o aquecimento é paralisado?", resposta: "Sim. O resultado original do sorteio permanece, mas novas escolhas podem ser feitas." }
    ]
  },
  {
    id: "o-servico",
    titulo: "O Serviço",
    conteudo: [
      { tipo: "texto", texto: "Na execução do saque, o sacador deve posicionar-se alternadamente do lado direito e esquerdo da quadra, começando do seu lado direito em cada game." },
      { tipo: "texto", texto: "Se ocorre um saque da metade errada da quadra e não é detectado, toda a jogada resultante deve permanecer, mas o posicionamento errado terá de ser corrigido imediatamente após ser descoberto." },
      { tipo: "texto", texto: "A bola que foi sacada deve passar sobre a rede e atingir o solo dentro da área que esteja diagonalmente oposta, ou sobre qualquer linha delimitando tal área, antes do recebedor devolvê-la." }
    ]
  },
  {
    id: "sacando",
    titulo: "Sacando",
    conteudo: [
      { tipo: "texto", texto: "Quando sacando, o jogador deve ficar atrás alternadamente de cada metade da quadra, começando da metade direita em cada game. No \"Tie-Break\", o primeiro sacador inicia da metade direita da quadra." },
      { tipo: "subtitulo", texto: "UM BOM RETORNO" },
      { tipo: "texto", texto: "É um bom retorno se:" },
      { tipo: "lista", itens: [
        "A bola toca a rede, poste, corda, faixa ou banda, e passa por cima e toca o solo da quadra correta.",
        "Após tocar o solo no lado correto, a bola volta sobre a rede e o jogador a alcança sobre a rede jogando-a na quadra correta.",
        "A bola é retornada por fora dos postes da rede e toca na quadra correta.",
        "A bola passa abaixo da rede entre os postes de simples e o poste de duplas sem tocar a rede e toca no solo da quadra correta."
      ]},
      { tipo: "caso", pergunta: "Caso 1 — A bola retornada bate num poste de simples e toca o solo da quadra do adversário. É um bom retorno?", resposta: "Sim. Entretanto, se a bola foi sacada e toca o poste de simples, este serviço é uma falta." },
      { tipo: "caso", pergunta: "Caso 2 — Uma bola em jogo bate em outra bola que estava na quadra. Qual a decisão correta?", resposta: "O jogo continua. Se não está claro qual bola foi retornada, um \"let\" deverá ser chamado." }
    ]
  },
  {
    id: "ordem-servico",
    titulo: "Ordem do Serviço",
    conteudo: [
      { tipo: "texto", texto: "Ao final de cada game, o recebedor então será o sacador e o sacador será o recebedor do próximo game." },
      { tipo: "texto", texto: "Em duplas, o time que está ao serviço no primeiro game de cada set decide qual dos dois jogadores sacará. O parceiro do jogador que sacou no primeiro game deverá sacar no terceiro game, e assim por diante. Esta rotação continua até o final do set." },
      { tipo: "subtitulo", texto: "ORDEM DE RECEBIMENTO DE DUPLAS" },
      { tipo: "texto", texto: "O time que irá receber no primeiro game do set deve decidir qual jogador recebe o primeiro ponto. O jogador parceiro do recebedor do primeiro ponto deve receber o segundo ponto, e essa rotação continua até o final do set." },
      { tipo: "caso", pergunta: "Caso 1 — É permitido a um membro de uma dupla jogar sozinho contra seus oponentes?", resposta: "Não." }
    ]
  },
  {
    id: "jogador-perde-ponto",
    titulo: "O Jogador Perde o Ponto",
    conteudo: [
      { tipo: "texto", texto: "O jogador perde o ponto se:" },
      { tipo: "lista", itens: [
        "Serve duas faltas consecutivas.",
        "Não consegue retornar a bola em jogo antes que ela pique duas vezes.",
        "Retorna a bola e ela toca o solo ou objeto fora da quadra correta.",
        "Retorna a bola e, antes que ela pique, ela toca uma instalação permanente.",
        "Deliberadamente toca ou apanha a bola com a raquete mais de uma vez.",
        "O jogador, raquete ou qualquer coisa que ele carregue toca a rede, postes, corda ou a quadra do oponente enquanto a bola está em jogo.",
        "Golpeia a bola antes que ela passe a rede.",
        "A bola em jogo toca o jogador ou qualquer coisa que ele esteja carregando, exceto a raquete.",
        "Em duplas, ambos os jogadores tocam na bola na tentativa de retorná-la."
      ]},
      { tipo: "caso", pergunta: "Caso 1 — A raquete voa da mão do sacador e toca a rede antes da bola picar. Falta ou perde o ponto?", resposta: "O sacador perde o ponto, porque a raquete toca a rede enquanto a bola está em jogo." },
      { tipo: "caso", pergunta: "Caso 2 — A raquete toca a rede depois que a bola picou fora da área de serviço. Falta ou perde o ponto?", resposta: "Este serviço é uma falta, pois quando a raquete toca a rede a bola não estava mais em jogo." },
      { tipo: "caso", pergunta: "Caso 3 — Pode o jogador perder o ponto se cruza a linha imaginária da extensão da rede?", resposta: "O jogador não perde o ponto, desde que não toque na quadra do oponente." },
      { tipo: "caso", pergunta: "Caso 4 — É permitido ao jogador pular sobre a rede e cair na quadra do oponente enquanto a bola está em jogo?", resposta: "Não. O jogador perde o ponto." }
    ]
  },
  {
    id: "contagem",
    titulo: "Contagem",
    conteudo: [
      { tipo: "subtitulo", texto: "CONTAGEM NO GAME" },
      { tipo: "texto", texto: "A contagem padrão é chamada sempre com o escore do sacador primeiro: Zero / 15 / 30 / 40 / Game. Se ambos os jogadores ganharam três pontos, o escore é \"Iguais\". Após \"Iguais\", o escore é \"Vantagem\" para o jogador que ganhar o próximo ponto. O jogador precisa ganhar dois pontos consecutivos para ganhar o \"Game\"." },
      { tipo: "subtitulo", texto: "\"TIE-BREAK\"" },
      { tipo: "texto", texto: "Durante o \"Tie-Break\", os pontos são chamados: \"Zero\", \"1\", \"2\", \"3\" etc. O jogador ou time que ganhar primeiro sete pontos ganha o \"Game\" e o \"Set\", desde que tenha uma margem de dois pontos sobre o oponente. Os dois pontos seguintes são servidos pelo oponente, e após esse, cada jogador/time deve sacar alternadamente por dois pontos consecutivos." },
      { tipo: "subtitulo", texto: "CONTAGEM NO SET" },
      { tipo: "texto", texto: "a) \"Advantage Set\" (Set Longo): O primeiro jogador/time que ganhar seis games ganha o \"Set\", desde que tenha uma margem de dois games. Se necessário, o \"Set\" continua até esta margem ser atingida." },
      { tipo: "texto", texto: "b) \"Set com Tie-Break\": O primeiro jogador/time a ganhar seis games vence, com margem de dois games. Se o escore chega a seis games iguais, um \"Tie-Break\" deve ser jogado." },
      { tipo: "subtitulo", texto: "CONTAGEM NO JOGO" },
      { tipo: "texto", texto: "O jogo pode ser jogado em melhor de 3 sets (precisa vencer 2 sets) ou melhor de 5 sets (precisa vencer 3 sets)." }
    ]
  },
  {
    id: "corrigindo-erros",
    titulo: "Corrigindo Erros",
    conteudo: [
      { tipo: "texto", texto: "Como princípio, quando um erro a respeito das Regras de Tênis é descoberto, todos os pontos previamente jogados permanecem. Erros descobertos devem ser corrigidos como a seguir:" },
      { tipo: "lista", itens: [
        "Se o jogador saca do lado errado da quadra, deve ser corrigido assim que o erro for descoberto. Uma falta sacada antes do erro ser descoberto permanece.",
        "Se os jogadores estão em lados errados na quadra, o erro deve ser corrigido tão logo seja descoberto.",
        "Se o jogador saca fora da ordem, o jogador que deveria sacar deve fazê-lo tão logo o erro seja descoberto. Se o game foi completado antes, a ordem permanece alterada.",
        "No \"Tie-Break\": se o erro é descoberto após número par de pontos, é corrigido imediatamente; se após número ímpar, a ordem permanece alterada.",
        "Em duplas: erro na ordem de recebimento permanece alterado até o final do game em que o erro foi descoberto.",
        "Se as bolas não são trocadas na sequência correta, o erro é corrigido quando o jogador que deveria sacar com bolas novas for sacar novamente."
      ]}
    ]
  },
  {
    id: "jogo-continuo",
    titulo: "Jogo Contínuo",
    conteudo: [
      { tipo: "texto", texto: "Como princípio, o jogo deve ser contínuo desde o momento que começa até o final." },
      { tipo: "lista", itens: [
        "Entre pontos: máximo de 20 segundos.",
        "Troca de lado no final do game: máximo de 90 segundos.",
        "Após o primeiro game de cada set e durante o \"Tie-Break\": troca sem descanso.",
        "Ao final de cada set: intervalo de até 120 segundos.",
        "Se roupa, tênis ou equipamento estão danificados por razão fora do controle do jogador, é permitido um tempo razoável para retificar.",
        "Condição médica tratável: pode ser permitido um tempo médico de 3 minutos.",
        "Organizadores podem permitir descanso de até 10 minutos (após o 3° set em melhor de 5, ou após o 2° em melhor de 3).",
        "Aquecimento: máximo de 5 minutos."
      ]}
    ]
  },
  {
    id: "instrucao",
    titulo: "Instrução",
    conteudo: [
      { tipo: "texto", texto: "Instrução é considerada como uma comunicação, conselho ou instrução de qualquer tipo, audível ou visível, para o jogador." },
      { tipo: "texto", texto: "Em eventos por equipes, o capitão da equipe pode dar instrução ao(s) jogador(es) durante o \"set break\" e quando os jogadores trocarem de lado na quadra, mas não após o primeiro game de cada set nem durante o \"Tie-Break\". Em todos os outros jogos, a instrução não é permitida." },
      { tipo: "caso", pergunta: "Caso 1 — É permitido ao jogador receber instrução por sinais discretos do técnico?", resposta: "Não." },
      { tipo: "caso", pergunta: "Caso 2 — É permitido ao jogador receber instrução quando a partida está suspensa?", resposta: "Sim." },
      { tipo: "caso", pergunta: "Caso 3 — É permitido ao jogador receber instrução dentro da quadra durante a partida?", resposta: "Não. Os circuitos podem solicitar à ITF aprovação para entrada do técnico durante o jogo." }
    ]
  },
  {
    id: "codigo-arbitros",
    titulo: "Código Para Árbitros",
    conteudo: [
      { tipo: "texto", texto: "Da mesma maneira que se requer dos jogadores um alto nível de profissionalismo, esperamos também um alto nível dos árbitros e todos que trabalham nos torneios." },
      { tipo: "lista", itens: [
        "Os árbitros devem estar em boa condição física.",
        "Os árbitros devem ter uma visão natural ou corrigida 20-20 e audição normal.",
        "Os árbitros devem ser pontuais em todas as partidas em que estiverem designados.",
        "Os árbitros devem estudar, compreender e dominar as Regras e Procedimentos do Tênis.",
        "Os árbitros devem manter sua imagem de forma conveniente à dignidade e integridade do jogo.",
        "Os árbitros não podem ingerir bebidas alcoólicas antes das partidas em que estiverem designados.",
        "Os árbitros não atuarão em partidas em que tenham relação com algum dos jogadores que possa comprometer sua imparcialidade.",
        "Os árbitros não devem criticar chamadas ou decisões de outros árbitros a ninguém, salvo aos próprios árbitros envolvidos e ao árbitro geral.",
        "Os árbitros não podem apostar de nenhuma maneira em qualquer prova tenística.",
        "Os árbitros não poderão conversar com espectadores antes, durante ou após a partida, salvo para controlar o público.",
        "Os árbitros não poderão participar de entrevistas com jornalistas sem prévia autorização do árbitro geral.",
        "Os árbitros deverão manter completa imparcialidade em relação a todos os jogadores.",
        "Os árbitros deverão ter conduta profissional e ética a todo momento, respeitando sempre a autoridade do árbitro geral e de todos os envolvidos no torneio."
      ]}
    ]
  }
]
