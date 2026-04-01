import { useState } from 'react'
import { Button, Icon } from '@1doc/1ds-react'

// ── Dados de categorias ───────────────────────────────────────────────────────
const GRUPOS = {
  Dupla:   ['E', 'D', 'C', 'B', 'A'],
  Simples: ['E', 'D', 'C', 'B', 'A'],
  Sub:     ['Sub-14', 'Sub-16', 'Sub-18'],
  Master:  ['+35', '+40', '+50', '+60'],
}

// Categorias que o usuário logado está habilitado a jogar (mock)
const USER_ELIGIBLE = ['B', '+35']

const parceiraMock = {
  nome: 'Ana Paula Ferreira',
  cpf: '•••.456.789-••',
  cidade: 'Curitiba - PR',
  ranking: '142º',
}

// ── Utilitários ───────────────────────────────────────────────────────────────
function isSolo(tipo) { return tipo === 'Simples' }
function isEligible(cat) { return USER_ELIGIBLE.includes(cat) }

// ── Overlay / estrutura do modal ──────────────────────────────────────────────
function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

// ── Indicador de etapas ───────────────────────────────────────────────────────
const STEP_LABELS = ['Identificação', 'Categorias', 'Pagamento']

function Steps({ current }) {
  return (
    <div className="modal-steps">
      {STEP_LABELS.map((label, i) => {
        const num = i + 1
        const done   = num < current
        const active = num === current
        return (
          <div key={num} className="modal-step-group">
            <div className={`modal-step${active ? ' modal-step--active' : ''}${done ? ' modal-step--done' : ''}`}>
              <span className="modal-step-num">
                {done ? <Icon name="check" size="sm" /> : num}
              </span>
              <span className="modal-step-label">{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`modal-step-line${done ? ' modal-step-line--done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Etapa 1 — Identificação ───────────────────────────────────────────────────
function StepLogin({ onNext, onClose }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [show, setShow]   = useState(false)

  return (
    <>
      <div className="modal-header">
        <div>
          <p className="modal-subtitle">Etapa 01</p>
          <h2 className="modal-title">Entre na sua conta</h2>
        </div>
        <button className="modal-close" onClick={onClose}><Icon name="xmark" size="md" /></button>
      </div>
      <div className="modal-divider" />

      <div className="modal-body">
        <div className="tinscr-fields">
          <div className="tinscr-field">
            <label className="tinscr-label">Email <span className="tinscr-required">*</span></label>
            <input className="tinscr-input" type="email" placeholder="Digite seu email"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="tinscr-field">
            <label className="tinscr-label">Senha <span className="tinscr-required">*</span></label>
            <div className="tinscr-input-wrap">
              <input className="tinscr-input" type={show ? 'text' : 'password'}
                placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
              <button type="button" className="tinscr-eye-btn" onClick={() => setShow(v => !v)}>
                <Icon name={show ? 'eye-off' : 'eye'} size="sm" />
              </button>
            </div>
            <button className="tinscr-forgot-link">Esqueci a senha</button>
          </div>

          <div className="modal-or-divider">
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

      <div className="modal-divider" />
      <div className="modal-footer">
        <Button variant="neutral" size="md" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" size="md" onClick={onNext}>Login</Button>
      </div>
    </>
  )
}

// ── Formulário de uma inscrição ────────────────────────────────────────────────
function InscricaoForm({ onAdd }) {
  const [tipo, setTipo]           = useState('Dupla')
  const [categoria, setCategoria] = useState(null)
  const [busca, setBusca]         = useState('')
  const [parceiro, setParceiro]   = useState(null)

  const cats = GRUPOS[tipo] || []
  const precisaDupla = !isSolo(tipo)
  const pronto = categoria && (isSolo(tipo) || parceiro)

  function handleAdd() {
    if (!pronto) return
    onAdd({ tipo, categoria, parceiro: parceiro?.nome ?? null })
    setTipo('Dupla'); setCategoria(null); setBusca(''); setParceiro(null)
  }

  return (
    <div className="inscr-form-box">
      {/* Tipo */}
      <div className="inscr-tipo-row">
        {Object.keys(GRUPOS).map(t => (
          <button
            key={t}
            className={`inscr-tipo-btn${tipo === t ? ' inscr-tipo-btn--active' : ''}`}
            onClick={() => { setTipo(t); setCategoria(null); setParceiro(null); setBusca('') }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Categorias */}
      <div className="tinscr-field">
        <label className="tinscr-label">Categoria <span className="tinscr-required">*</span></label>
        <div className="tinscr-cat-grid">
          {cats.map(c => {
            const eligible = isEligible(c)
            return (
              <button
                key={c}
                className={`tinscr-cat-chip-btn${categoria === c ? ' tinscr-cat-chip-btn--active' : ''}${!eligible ? ' tinscr-cat-chip-btn--locked' : ''}`}
                disabled={!eligible}
                onClick={() => eligible && setCategoria(c)}
                title={!eligible ? 'Você não está habilitado para esta categoria' : undefined}
              >
                {c}
                {!eligible && <Icon name="lock" size="sm" />}
              </button>
            )
          })}
        </div>
        {cats.some(c => !isEligible(c)) && (
          <p className="inscr-eligible-hint">
            <Icon name="info-circle" size="sm" /> Apenas categorias disponíveis para o seu perfil estão habilitadas.
          </p>
        )}
      </div>

      {/* Dupla (se não for Simples) */}
      {precisaDupla && (
        <div className="tinscr-field">
          <label className="tinscr-label">Dupla <span className="tinscr-required">*</span></label>
          {!parceiro ? (
            <>
              <div className="tinscr-input-wrap">
                <input
                  className="tinscr-input"
                  type="text"
                  placeholder="Buscar por nome ou CPF"
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                />
                <span className="tinscr-eye-btn"><Icon name="search" size="sm" /></span>
              </div>
              {busca.length > 0 && (
                <div className="tinscr-parceiro-result" onClick={() => { setParceiro(parceiraMock); setBusca('') }}>
                  <div className="tinscr-parceiro-avatar">AP</div>
                  <div className="tinscr-parceiro-info">
                    <p className="tinscr-parceiro-nome">{parceiraMock.nome}</p>
                    <p className="tinscr-parceiro-detalhe">{parceiraMock.cpf} · {parceiraMock.cidade} · Ranking {parceiraMock.ranking}</p>
                  </div>
                  <Icon name="chevron-right" size="sm" />
                </div>
              )}
            </>
          ) : (
            <div className="tinscr-parceiro-selecionado">
              <div className="tinscr-parceiro-avatar">AP</div>
              <div className="tinscr-parceiro-info">
                <p className="tinscr-parceiro-nome">{parceiro.nome}</p>
                <p className="tinscr-parceiro-detalhe">{parceiro.cidade} · Ranking {parceiro.ranking}</p>
              </div>
              <button className="tinscr-parceiro-remover" onClick={() => setParceiro(null)}>
                <Icon name="xmark" size="sm" />
              </button>
            </div>
          )}
        </div>
      )}

      <Button variant="primary" size="sm" disabled={!pronto} onClick={handleAdd}>
        + Adicionar inscrição
      </Button>
    </div>
  )
}

// ── Etapa 2 — Categorias ──────────────────────────────────────────────────────
function StepCategorias({ inscricoes, setInscricoes, onNext, onBack, onClose }) {
  function removeInscricao(i) {
    setInscricoes(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <>
      <div className="modal-header">
        <div>
          <p className="modal-subtitle">Etapa 02</p>
          <h2 className="modal-title">Categorias e duplas</h2>
        </div>
        <button className="modal-close" onClick={onClose}><Icon name="xmark" size="md" /></button>
      </div>
      <div className="modal-divider" />

      <div className="modal-body">
        {/* Lista de inscrições já adicionadas */}
        {inscricoes.length > 0 && (
          <div className="inscr-lista">
            <p className="inscr-lista-label">Inscrições adicionadas</p>
            {inscricoes.map((ins, i) => (
              <div key={i} className="inscr-lista-item">
                <div className="inscr-lista-cat">{ins.categoria}</div>
                <div className="inscr-lista-info">
                  <span className="inscr-lista-tipo">{ins.tipo}</span>
                  {ins.parceiro && <span className="inscr-lista-parceiro">· Dupla: {ins.parceiro}</span>}
                </div>
                <button className="tinscr-parceiro-remover" onClick={() => removeInscricao(i)}>
                  <Icon name="xmark" size="sm" />
                </button>
              </div>
            ))}
            <div className="modal-divider" style={{ margin: '16px 0' }} />
          </div>
        )}

        <p className="inscr-add-label">
          {inscricoes.length === 0 ? 'Selecione sua primeira inscrição' : 'Adicionar outra inscrição'}
        </p>
        <InscricaoForm onAdd={ins => setInscricoes(prev => [...prev, ins])} />
      </div>

      <div className="modal-divider" />
      <div className="modal-footer">
        <Button variant="neutral" size="md" onClick={onBack}>Voltar</Button>
        <Button variant="primary" size="md" disabled={inscricoes.length === 0} onClick={onNext}>
          Próximo
        </Button>
      </div>
    </>
  )
}

// ── Etapa 3 — Pagamento ───────────────────────────────────────────────────────
const PRECO = { Dupla: 90, Master: 90, Sub: 60, Simples: 50, '+35': 90 }

function StepPagamento({ inscricoes, onConfirm, onBack, onClose }) {
  const [metodo, setMetodo] = useState(null)
  const total = inscricoes.reduce((sum, ins) => sum + (PRECO[ins.tipo] ?? 90), 0)

  return (
    <>
      <div className="modal-header">
        <div>
          <p className="modal-subtitle">Etapa 03</p>
          <h2 className="modal-title">Pagamento</h2>
        </div>
        <button className="modal-close" onClick={onClose}><Icon name="xmark" size="md" /></button>
      </div>
      <div className="modal-divider" />

      <div className="modal-body">
        {/* Resumo */}
        <div className="tinscr-resumo-box">
          <p className="tinscr-resumo-label">Resumo das inscrições</p>
          {inscricoes.map((ins, i) => (
            <div key={i} className="tinscr-resumo-row">
              <span>
                {ins.tipo} · <strong>{ins.categoria}</strong>
                {ins.parceiro && ` · ${ins.parceiro}`}
              </span>
              <span>R$ {PRECO[ins.tipo] ?? 90},00</span>
            </div>
          ))}
          <div className="tinscr-resumo-row tinscr-resumo-row--total">
            <span>Total</span>
            <span>R$ {total},00</span>
          </div>
        </div>

        {/* Método */}
        <div className="tinscr-field" style={{ marginTop: 16 }}>
          <label className="tinscr-label">Forma de pagamento <span className="tinscr-required">*</span></label>
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
          <div className="tinscr-pix-box" style={{ marginTop: 16 }}>
            <p className="tinscr-pix-label">Escaneie o QR Code ou copie a chave Pix</p>
            <div className="tinscr-pix-qr">QR</div>
            <button className="tinscr-pix-copy"><Icon name="copy" size="sm" /> Copiar chave Pix</button>
          </div>
        )}

        {metodo === 'cartao' && (
          <div className="tinscr-fields" style={{ marginTop: 16 }}>
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
      </div>

      <div className="modal-divider" />
      <div className="modal-footer">
        <Button variant="neutral" size="md" onClick={onBack}>Voltar</Button>
        <Button variant="primary" size="md" disabled={!metodo} onClick={onConfirm}>
          Confirmar inscrição
        </Button>
      </div>
    </>
  )
}

// ── Tela de sucesso ───────────────────────────────────────────────────────────
function StepSucesso({ onClose }) {
  return (
    <>
      <div className="modal-header">
        <div />
        <button className="modal-close" onClick={onClose}><Icon name="xmark" size="md" /></button>
      </div>
      <div className="modal-body modal-sucesso">
        <div className="tinscr-sucesso-icon"><Icon name="check-circle" size="lg" /></div>
        <h2 className="tinscr-sucesso-title">Inscrição confirmada!</h2>
        <p className="tinscr-sucesso-desc">
          Sua inscrição foi realizada com sucesso. Você receberá um e-mail de confirmação em breve.
        </p>
        <Button variant="primary" size="md" onClick={onClose}>Fechar</Button>
      </div>
    </>
  )
}

// ── Componente principal exportado ────────────────────────────────────────────
export default function InscricaoModal({ open, onClose }) {
  const [step, setStep]             = useState(1)
  const [inscricoes, setInscricoes] = useState([])

  function handleClose() {
    setStep(1)
    setInscricoes([])
    onClose()
  }

  function next() { setStep(s => s + 1) }
  function back() { setStep(s => s - 1) }

  return (
    <Modal open={open} onClose={handleClose}>
      {/* Steps indicator (oculto na tela de sucesso) */}
      {step <= 3 && (
        <div className="modal-steps-bar">
          <Steps current={step} />
        </div>
      )}

      {step === 1 && <StepLogin onNext={next} onClose={handleClose} />}
      {step === 2 && (
        <StepCategorias
          inscricoes={inscricoes}
          setInscricoes={setInscricoes}
          onNext={next}
          onBack={back}
          onClose={handleClose}
        />
      )}
      {step === 3 && (
        <StepPagamento
          inscricoes={inscricoes}
          onConfirm={next}
          onBack={back}
          onClose={handleClose}
        />
      )}
      {step === 4 && <StepSucesso onClose={handleClose} />}
    </Modal>
  )
}
