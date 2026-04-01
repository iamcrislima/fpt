import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './FAQ.css'

const perguntas = [
  {
    pergunta: 'Como faço para participar dos torneios da FPT?',
    resposta: (
      <>
        <p>
          Primeiramente, você precisa fazer seu cadastro na FPT (gratuito) através do link:{' '}
          <Link to="/faca-parte" className="faq-link">FPT - Novo Filiado</Link>.
        </p>
        <p>Na sequência, você receberá um e-mail validando seu cadastro e criaremos o seu código de identificação.</p>
        <p>Com este código, você conseguirá inscrever-se nos torneios e poderá pagar a anuidade.</p>
      </>
    ),
  },
  {
    pergunta: 'Qual a diferença em ser federado ou Filiado?',
    resposta: (
      <>
        <p>Filiado, são todos os atletas que fazem cadastro na FPT.</p>
        <p>Federado, são os atletas que pagam a taxa de anuidade para ter benefícios.</p>
      </>
    ),
  },
  {
    pergunta: 'Quais os benefícios de ser Federado?',
    resposta: (
      <p>
        Quem paga a taxa de anuidade, ao participar dos torneios tem desconto na taxa de inscrição;
        Também pontua no ranking estadual; Pode escolher seu clube de cadastro;
        Participa dos torneios interclubes.
      </p>
    ),
  },
  {
    pergunta: 'Como faço para filiar meu clube ou academia?',
    resposta: (
      <>
        <p>Todos os clubes e academias podem ser filiadas a FPT.</p>
        <p>
          Além de ser filiado, o clube também pontua no ranking, participa dos interclubes
          e podem promover eventos oficiais da FPT.
        </p>
        <p>
          Para cadastrar seu clube, acesse o link para saber os documentos necessários:{' '}
          <Link to="/regulamento" className="faq-link">FPT - Regulamentos</Link>.
        </p>
      </>
    ),
  },
  {
    pergunta: 'Como sei a categoria que devo me cadastrar?',
    resposta: (
      <p>
        A FPT indica que você procure um professor de um clube filiado para fazer uma análise
        do seu nivelamento.
      </p>
    ),
  },
  {
    pergunta: 'Gostaria de conhecer mais sobre a FPT?',
    resposta: (
      <p>
        Clique no link abaixo e conheça nosso regulamento:{' '}
        <Link to="/regulamento" className="faq-link">FPT - Regulamentos</Link>.
      </p>
    ),
  },
]

function FaqItem({ pergunta, resposta }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(v => !v)}>
        <span>{pergunta}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="faq-chevron"
        />
      </button>
      {open && (
        <div className="faq-answer">
          {resposta}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <>
      <div className="trn-banner">
        <div>
          <p className="trn-banner-title" style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginLeft: 0 }}>
            FAQ
          </p>
          <p className="trn-banner-title" style={{ marginLeft: 0 }}>
            Perguntas Frequentes
          </p>
        </div>
        <div className="trn-banner-waves" aria-hidden="true" />
      </div>

      <div className="trn-content">
        <h1 className="trs-section-title">Perguntas Frequentes</h1>

        <div className="faq-list">
          {perguntas.map((item, i) => (
            <FaqItem key={i} pergunta={item.pergunta} resposta={item.resposta} />
          ))}
        </div>
      </div>
    </>
  )
}
