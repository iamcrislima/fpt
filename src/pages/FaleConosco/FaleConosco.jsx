import { useState } from 'react'
import './FaleConosco.css'

const BG_IMG = '/faca-parte-bg.png'

const ASSUNTOS = [
  'Dúvidas gerais',
  'Inscrição em torneios',
  'Ranking e pontuação',
  'Filiação / Cadastro',
  'Financeiro',
  'Imprensa',
  'Parcerias e patrocínios',
  'STJD / Questões disciplinares',
  'Outros',
]

const EMAILS = [
  { label: 'Secretaria Geral', email: 'secretaria@fpt.com.br' },
  { label: 'Financeiro', email: 'financeiro@fpt.com.br' },
  { label: 'Atletas e Filiação', email: 'atletas@fpt.com.br' },
  { label: 'Imprensa', email: 'imprensa@fpt.com.br' },
  { label: 'Parcerias e Patrocínios', email: 'parcerias@fpt.com.br' },
]

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconSend() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}

export default function FaleConosco() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nome || !email || !assunto || !mensagem) return
    setEnviado(true)
  }

  const handleNovaMensagem = () => {
    setNome('')
    setEmail('')
    setAssunto('')
    setMensagem('')
    setEnviado(false)
  }

  return (
    <main className="fc-page">
      <div className="fc-inner">

        {/* ── Painel esquerdo ── */}
        <div className="fc-left">
          <img src={BG_IMG} alt="Beach Tennis" className="fp-bg-img" />
          <div className="fc-left-overlay">
            <h1 className="fc-left-title">Entre em contato.</h1>
            <p className="fc-left-subtitle">
              Estamos à disposição para ajudar com dúvidas, sugestões e informações sobre o Beach Tennis.
            </p>

          </div>
        </div>

        {/* ── Painel direito ── */}
        <div className="fc-right">

          {enviado ? (
            <>
              <div className="fc-success">
                <div className="fc-success-icon"><IconCheck /></div>
                <h3>Mensagem enviada!</h3>
                <p>
                  Recebemos sua mensagem e entraremos em contato em breve pelo e-mail informado.
                </p>
                <button className="fc-success-back" onClick={handleNovaMensagem}>
                  Enviar nova mensagem
                </button>
              </div>
              <hr className="fc-divider" />
            </>
          ) : (
            <>
              <h2 className="fc-form-title">Envie uma mensagem</h2>
              <p className="fc-form-subtitle">
                Preencha o formulário abaixo e nossa equipe responderá em até 2 dias úteis.
              </p>

              <form className="fc-fields" onSubmit={handleSubmit}>
                <div className="fc-row">
                  <div className="fc-field">
                    <label className="fc-label">Nome completo <span>*</span></label>
                    <input
                      className="fc-input"
                      type="text"
                      placeholder="Seu nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fc-field">
                    <label className="fc-label">E-mail <span>*</span></label>
                    <input
                      className="fc-input"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="fc-field">
                  <label className="fc-label">Assunto <span>*</span></label>
                  <select
                    className="fc-select"
                    value={assunto}
                    onChange={e => setAssunto(e.target.value)}
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    {ASSUNTOS.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div className="fc-field">
                  <label className="fc-label">Mensagem <span>*</span></label>
                  <textarea
                    className="fc-textarea"
                    placeholder="Descreva sua dúvida ou mensagem..."
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    required
                  />
                </div>

                <div className="fc-actions">
                  <button type="submit" className="fc-submit-btn">
                    <IconSend />
                    Enviar mensagem
                  </button>
                </div>
              </form>

              <hr className="fc-divider" />
            </>
          )}

          {/* ── E-mails por departamento ── */}
          <p className="fc-emails-title">Contato direto por departamento</p>
          <div className="fc-email-list">
            {EMAILS.map(item => (
              <div key={item.email} className="fc-email-item">
                <span className="fc-email-label">{item.label}</span>
                <a href={`mailto:${item.email}`} className="fc-email-link">
                  {item.email}
                </a>
              </div>
            ))}
          </div>

          <hr className="fc-divider" />

          {/* ── Informações de contato ── */}
          <div className="fc-contact-meta">
            <div className="fc-contact-meta-item">
              <IconClock />
              <div>
                <span className="fc-contact-meta-label">Horário de atendimento</span>
                Segunda a Sexta, 08h às 18h
              </div>
            </div>
            <div className="fc-contact-meta-item">
              <IconPhone />
              <div>
                <span className="fc-contact-meta-label">Telefone</span>
                (41) 3344-7000
              </div>
            </div>
            <div className="fc-contact-meta-item">
              <IconMapPin />
              <div>
                <span className="fc-contact-meta-label">Endereço</span>
                R. Comendador Araújo, 143 — Curitiba, PR, 80420-000
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
