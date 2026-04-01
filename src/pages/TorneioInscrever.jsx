import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '@1doc/1ds-react'

const BADGE = '/images/torneio-detalhe-banner.png'

const torneio = {
  nome: 'FPT Beach Series 1500 - Contorno da bola',
  cidade: 'Curitiba - PR',
  dataRange: '26/03 à 29/03',
  valor: 'R$ 90,00',
}

const categorias = ['M', 'F', 'MX', 'A', 'B', 'C', 'D', 'E', '40+', '50+', '60+', 'SUB12', 'SUB14', 'SUB16', 'SUB18']

const parceiraMock = {
  nome: 'Ana Paula Ferreira',
  cpf: '•••.456.789-••',
  cidade: 'Curitiba - PR',
  ranking: '142º',
}

// ── Indicador de passos ──────────────────────────────────────────────────────
function Steps({ current }) {
  const steps = ['Identificação', 'Dupla', 'Categoria', 'Pagamento']
  return (
    <div className="tinscr-steps">
      {steps.map((label, i) => {
        const num = i + 1
        const done = num < current
        const active = num === current
        return (
          <>
            <div key={num} className={`tinscr-step${active ? ' tinscr-step--active' : ''}${done ? ' tinscr-step--done' : ''}`}>
              <span className="tinscr-step-num">
                {done ? <Icon name="check" size="sm" /> : num}
              </span>
              <span className="tinscr-step-label">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div key={`line-${i}`} className={`tinscr-step-line${done ? ' tinscr-step-line--done' : ''}`} />
            )}
          </>
        )
      })}
    </div>
  )
}

// ── Etapa 1 — Identificação ──────────────────────────────────────────────────
function StepIdentificacao({ onNext }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)

  return (
    <div className="tinscr-form-panel">
      <div className="tinscr-form-header">
        <p className="tinscr-etapa-num">Etapa 01 - Identificação</p>
        <h2 className="tinscr-form-title">Entre na sua conta</h2>
      </div>

      <div className="tinscr-fields">
        <div className="tinscr-field">
          <label className="tinscr-label">Email <span className="tinscr-required">*</span></label>
          <input
            className="tinscr-input"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="tinscr-field">
          <label className="tinscr-label">Senha <span className="tinscr-required">*</span></label>
          <div className="tinscr-input-wrap">
            <input
              className="tinscr-input"
              type={showSenha ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
            <button type="button" className="tinscr-eye-btn" onClick={() => setShowSenha(v => !v)} aria-label="Mostrar senha">
              <Icon name={showSenha ? 'eye-off' : 'eye'} size="sm" />
            </button>
          </div>
          <button className="tinscr-forgot-link">Esqueci a senha</button>
        </div>

        <Button variant="primary" size="md" className="tinscr-login-btn" onClick={onNext}>
          Login
        </Button>

        <div className="tinscr-or-divider">
          <span className="tinscr-or-line" />
          <span className="tinscr-or-text">Ou continuar com</span>
          <span className="tinscr-or-line" />
        </div>

        <div className="tinscr-social-row">
          <button className="tinscr-social-btn" onClick={onNext}>
            <img src="https://www.google.com/favicon.ico" alt="Google" className="tinscr-social-icon" />
            Google
          </button>
          <button className="tinscr-social-btn" onClick={onNext}>
            <img src="https://www.apple.com/favicon.ico" alt="Apple" className="tinscr-social-icon" />
            Apple
          </button>
        </div>

        <div className="tinscr-register-row">
          <span className="tinscr-register-text">Ainda não tem conta?</span>
          <button className="tinscr-register-link">Quero me cadastrar</button>
        </div>
      </div>
    </div>
  )
}

// ── Etapa 2 — Dupla ──────────────────────────────────────────────────────────
function StepDupla({ onNext, onBack }) {
  const [busca, setBusca] = useState('')
  const [selecionado, setSelecionado] = useState(false)

  return (
    <div className="tinscr-form-panel">
      <div className="tinscr-form-header">
        <p className="tinscr-etapa-num">Etapa 02 - Dupla</p>
        <h2 className="tinscr-form-title">Escolha sua dupla</h2>
      </div>

      <div className="tinscr-fields">
        <div className="tinscr-field">
          <label className="tinscr-label">Buscar parceiro(a) <span className="tinscr-required">*</span></label>
          <div className="tinscr-input-wrap">
            <input
              className="tinscr-input"
              type="text"
              placeholder="Nome ou CPF"
              value={busca}
              onChange={e => { setBusca(e.target.value); setSelecionado(false) }}
            />
            <span className="tinscr-eye-btn">
              <Icon name="search" size="sm" />
            </span>
          </div>
        </div>

        {busca.length > 0 && !selecionado && (
          <div className="tinscr-parceiro-result" onClick={() => setSelecionado(true)}>
            <div className="tinscr-parceiro-avatar">AP</div>
            <div className="tinscr-parceiro-info">
              <p className="tinscr-parceiro-nome">{parceiraMock.nome}</p>
              <p className="tinscr-parceiro-detalhe">{parceiraMock.cpf} · {parceiraMock.cidade} · Ranking {parceiraMock.ranking}</p>
            </div>
            <Icon name="chevron-right" size="sm" />
          </div>
        )}

        {selecionado && (
          <div className="tinscr-parceiro-selecionado">
            <div className="tinscr-parceiro-avatar">AP</div>
            <div className="tinscr-parceiro-info">
              <p className="tinscr-parceiro-nome">{parceiraMock.nome}</p>
              <p className="tinscr-parceiro-detalhe">{parceiraMock.cidade} · Ranking {parceiraMock.ranking}</p>
            </div>
            <button className="tinscr-parceiro-remover" onClick={() => { setSelecionado(false); setBusca('') }}>
              <Icon name="xmark" size="sm" />
            </button>
          </div>
        )}

        <div className="tinscr-nav-btns">
          <Button variant="neutral" size="md" onClick={onBack}>Voltar</Button>
          <Button variant="primary" size="md" disabled={!selecionado} onClick={onNext}>Próximo</Button>
        </div>
      </div>
    </div>
  )
}

// ── Etapa 3 — Categoria ──────────────────────────────────────────────────────
function StepCategoria({ onNext, onBack }) {
  const [selecionada, setSelecionada] = useState(null)

  return (
    <div className="tinscr-form-panel">
      <div className="tinscr-form-header">
        <p className="tinscr-etapa-num">Etapa 03 - Categoria</p>
        <h2 className="tinscr-form-title">Selecione a categoria</h2>
      </div>

      <div className="tinscr-fields">
        <div className="tinscr-cat-grid">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`tinscr-cat-chip-btn${selecionada === cat ? ' tinscr-cat-chip-btn--active' : ''}`}
              onClick={() => setSelecionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {selecionada && (
          <div className="tinscr-resumo-inline">
            <Icon name="check-circle" size="sm" />
            <span>Categoria <strong>{selecionada}</strong> selecionada</span>
          </div>
        )}

        <div className="tinscr-nav-btns">
          <Button variant="neutral" size="md" onClick={onBack}>Voltar</Button>
          <Button variant="primary" size="md" disabled={!selecionada} onClick={onNext}>Próximo</Button>
        </div>
      </div>
    </div>
  )
}

// ── Etapa 4 — Pagamento ──────────────────────────────────────────────────────
function StepPagamento({ onBack, onConfirm }) {
  const [metodo, setMetodo] = useState(null)

  return (
    <div className="tinscr-form-panel">
      <div className="tinscr-form-header">
        <p className="tinscr-etapa-num">Etapa 04 - Pagamento</p>
        <h2 className="tinscr-form-title">Forma de pagamento</h2>
      </div>

      <div className="tinscr-fields">
        <div className="tinscr-resumo-box">
          <p className="tinscr-resumo-label">Resumo da inscrição</p>
          <div className="tinscr-resumo-row">
            <span>Torneio</span>
            <span>{torneio.nome}</span>
          </div>
          <div className="tinscr-resumo-row">
            <span>Dupla</span>
            <span>{parceiraMock.nome}</span>
          </div>
          <div className="tinscr-resumo-row tinscr-resumo-row--total">
            <span>Total</span>
            <span>{torneio.valor}</span>
          </div>
        </div>

        <div className="tinscr-field">
          <label className="tinscr-label">Escolha o método de pagamento <span className="tinscr-required">*</span></label>
          <div className="tinscr-payment-opts">
            <button
              className={`tinscr-payment-opt${metodo === 'pix' ? ' tinscr-payment-opt--active' : ''}`}
              onClick={() => setMetodo('pix')}
            >
              <Icon name="qr-code" size="md" />
              <span>Pix</span>
            </button>
            <button
              className={`tinscr-payment-opt${metodo === 'cartao' ? ' tinscr-payment-opt--active' : ''}`}
              onClick={() => setMetodo('cartao')}
            >
              <Icon name="credit-card" size="md" />
              <span>Cartão de crédito</span>
            </button>
          </div>
        </div>

        {metodo === 'pix' && (
          <div className="tinscr-pix-box">
            <p className="tinscr-pix-label">Escaneie o QR Code ou copie a chave Pix</p>
            <div className="tinscr-pix-qr">QR</div>
            <button className="tinscr-pix-copy">
              <Icon name="copy" size="sm" /> Copiar chave Pix
            </button>
          </div>
        )}

        {metodo === 'cartao' && (
          <div className="tinscr-fields">
            <div className="tinscr-field">
              <label className="tinscr-label">Número do cartão</label>
              <input className="tinscr-input" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="tinscr-card-row">
              <div className="tinscr-field">
                <label className="tinscr-label">Validade</label>
                <input className="tinscr-input" placeholder="MM/AA" />
              </div>
              <div className="tinscr-field">
                <label className="tinscr-label">CVV</label>
                <input className="tinscr-input" placeholder="123" />
              </div>
            </div>
            <div className="tinscr-field">
              <label className="tinscr-label">Nome no cartão</label>
              <input className="tinscr-input" placeholder="Como aparece no cartão" />
            </div>
          </div>
        )}

        <div className="tinscr-nav-btns">
          <Button variant="neutral" size="md" onClick={onBack}>Voltar</Button>
          <Button variant="primary" size="md" disabled={!metodo} onClick={onConfirm}>Confirmar inscrição</Button>
        </div>
      </div>
    </div>
  )
}

// ── Tela de sucesso ──────────────────────────────────────────────────────────
function StepSucesso() {
  const navigate = useNavigate()
  return (
    <div className="tinscr-form-panel tinscr-sucesso">
      <div className="tinscr-sucesso-icon">
        <Icon name="check-circle" size="lg" />
      </div>
      <h2 className="tinscr-sucesso-title">Inscrição confirmada!</h2>
      <p className="tinscr-sucesso-desc">
        Sua inscrição no torneio <strong>{torneio.nome}</strong> foi realizada com sucesso.
        Você receberá um e-mail de confirmação em breve.
      </p>
      <Button variant="primary" size="md" onClick={() => navigate('/torneios/1')}>
        Ver detalhes do torneio
      </Button>
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────
export default function TorneioInscrever() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  return (
    <main className="tinscr-page">

      {/* ── Header ── */}
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
                {categorias.map(c => (
                  <span key={c} className="tdet-cat-chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
          <Button variant="primary" size="md" className="tdet-inscr-btn">
            Inscreva-se no torneio
          </Button>
        </div>
      </div>

      {/* ── Conteúdo ── */}
      <div className="tinscr-content">

        {/* Card lateral com steps */}
        {step <= 4 && (
          <div className="tinscr-card">
            <h2 className="tinscr-card-title">Inscrição no torneio</h2>
            <div className="tinscr-torneio-info">
              <img src={BADGE} alt="Badge" className="tinscr-badge" />
              <div>
                <p className="tinscr-torneio-name">{torneio.nome}</p>
                <p className="tinscr-torneio-local">
                  <Icon name="map-pin" size="sm" />
                  {torneio.cidade}
                </p>
                <p className="tinscr-torneio-data">
                  <Icon name="calendar" size="sm" />
                  {torneio.dataRange}
                </p>
              </div>
            </div>
            <Steps current={step} />
          </div>
        )}

        {/* Painel de conteúdo de cada etapa */}
        {step === 1 && <StepIdentificacao onNext={next} />}
        {step === 2 && <StepDupla onNext={next} onBack={back} />}
        {step === 3 && <StepCategoria onNext={next} onBack={back} />}
        {step === 4 && <StepPagamento onBack={back} onConfirm={next} />}
        {step === 5 && <StepSucesso />}

      </div>
    </main>
  )
}
