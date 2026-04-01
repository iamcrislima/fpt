import { useState } from 'react'
import { Input, Button } from '@1doc/1ds-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCircleInfo, faRulerVertical, faWeightScale, faHandPaper, faBolt, faTableTennisPaddleBall } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import { useSport } from '../../context/SportContext'
import './Perfil.css'

const AVATAR_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80'

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO',
]

const GENEROS = ['Masculino','Feminino','Prefiro não informar']

const LADOS_DOMINANTES = ['Destro','Canhoto','Ambidestro']

export default function Perfil() {
  const { user } = useAuth()
  const { sport } = useSport()

  const [form, setForm] = useState({
    nomeCompleto: user?.name || '',
    email: user?.email || '',
    nomePai: 'Carlos Lima',
    nomeMae: 'Ana Lima',
    dataNascimento: '15/03/1990',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    endereco: 'Rua das Flores, 123',
    bairro: 'Centro',
    cep: '80010-000',
    estado: 'PR',
    cidade: 'Curitiba',
    celular: '(41) 99999-0000',
    telefoneFixo: '(41) 3333-0000',
    genero: 'Masculino',
    altura: user?.altura || '',
    peso: user?.peso || '',
    ladoDominante: user?.ladoDominante || 'Destro',
    marcaRaquete: user?.marcaRaquete || '',
    tipoCorda: user?.tipoCorda || '',
    alertaTorneios: true,
    alertaComunicados: true,
    alertaPromocoes: false,
  })

  const [saved, setSaved] = useState(false)

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  function handleCheckbox(field) {
    setForm(prev => ({ ...prev, [field]: !prev[field] }))
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Mock save
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const isTennis = sport === 'tennis'

  return (
    <div className="prf-page">
      <div className="prf-inner">

        {/* ── Cartão de identidade do atleta ── */}
        <div className="prf-id-card">
          <div className="prf-id-avatar-wrap">
            <img src={AVATAR_URL} alt={user?.name} className="prf-id-avatar" />
            <button className="prf-id-avatar-btn" aria-label="Alterar foto">
              <FontAwesomeIcon icon={faCamera} />
            </button>
          </div>
          <div className="prf-id-body">
            <div className="prf-id-row">
              <div className="prf-id-field">
                <span className="prf-id-label">Código</span>
                <span className="prf-id-value">{user?.codigo}</span>
              </div>
              <div className="prf-id-field">
                <span className="prf-id-label">Nome</span>
                <span className="prf-id-value">{user?.name}</span>
              </div>
              <div className="prf-id-field">
                <span className="prf-id-label">Clube</span>
                <span className="prf-id-value">{user?.clube}</span>
              </div>
              <div className="prf-id-field">
                <span className="prf-id-label">Ano Nasc.</span>
                <span className="prf-id-value">{user?.anoNasc}</span>
              </div>
              {isTennis && (
                <div className="prf-id-field">
                  <span className="prf-id-label">Classe</span>
                  <span className="prf-id-value prf-id-badge">{user?.classe}</span>
                </div>
              )}
            </div>
            {!isTennis && (
              <div className="prf-id-bt-section">
                <span className="prf-id-bt-title">Beach Tennis</span>
                <div className="prf-id-row">
                  <div className="prf-id-field">
                    <span className="prf-id-label">Categoria</span>
                    <span className="prf-id-value prf-id-badge">{user?.categoria}</span>
                  </div>
                  <div className="prf-id-field">
                    <span className="prf-id-label">Classe</span>
                    <span className="prf-id-value">{user?.classe}</span>
                  </div>
                  <div className="prf-id-field">
                    <span className="prf-id-label">Clube BT</span>
                    <span className="prf-id-value">{user?.clube}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Formulário de edição ── */}
        <form className="prf-form" onSubmit={handleSubmit} noValidate>
          <div className="prf-section">
            <h2 className="prf-section-title">Dados Pessoais</h2>
            <div className="prf-grid">
              <div className="prf-field prf-field--full">
                <label className="prf-label">Nome completo</label>
                <Input value={form.nomeCompleto} onChange={e => handleChange('nomeCompleto', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">E-mail</label>
                <Input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">Data de nascimento</label>
                <Input value={form.dataNascimento} onChange={e => handleChange('dataNascimento', e.target.value)} size="md" placeholder="DD/MM/AAAA" />
              </div>
              <div className="prf-field">
                <label className="prf-label">CPF</label>
                <Input value={form.cpf} onChange={e => handleChange('cpf', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">RG</label>
                <Input value={form.rg} onChange={e => handleChange('rg', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">Gênero</label>
                <select
                  className="prf-select"
                  value={form.genero}
                  onChange={e => handleChange('genero', e.target.value)}
                >
                  {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="prf-field">
                <label className="prf-label">Nome do pai</label>
                <Input value={form.nomePai} onChange={e => handleChange('nomePai', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">Nome da mãe</label>
                <Input value={form.nomeMae} onChange={e => handleChange('nomeMae', e.target.value)} size="md" />
              </div>
            </div>
          </div>

          <div className="prf-section">
            <h2 className="prf-section-title">Contato</h2>
            <div className="prf-grid">
              <div className="prf-field">
                <label className="prf-label">Celular</label>
                <Input value={form.celular} onChange={e => handleChange('celular', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">Telefone fixo</label>
                <Input value={form.telefoneFixo} onChange={e => handleChange('telefoneFixo', e.target.value)} size="md" />
              </div>
            </div>
          </div>

          <div className="prf-section">
            <h2 className="prf-section-title">Dados do Atleta</h2>
            <div className="prf-grid">
              <div className="prf-field">
                <label className="prf-label">
                  <FontAwesomeIcon icon={faRulerVertical} style={{ width: 11 }} /> Altura
                </label>
                <Input
                  value={form.altura}
                  onChange={e => handleChange('altura', e.target.value)}
                  size="md"
                  placeholder="Ex: 1,80 m"
                />
              </div>
              <div className="prf-field">
                <label className="prf-label">
                  <FontAwesomeIcon icon={faWeightScale} style={{ width: 11 }} /> Peso
                </label>
                <Input
                  value={form.peso}
                  onChange={e => handleChange('peso', e.target.value)}
                  size="md"
                  placeholder="Ex: 75 kg"
                />
              </div>
              <div className="prf-field">
                <label className="prf-label">
                  <FontAwesomeIcon icon={faHandPaper} style={{ width: 11 }} /> Lado Dominante
                </label>
                <select
                  className="prf-select"
                  value={form.ladoDominante}
                  onChange={e => handleChange('ladoDominante', e.target.value)}
                >
                  {LADOS_DOMINANTES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="prf-field">
                <label className="prf-label">
                  <FontAwesomeIcon icon={faTableTennisPaddleBall} style={{ width: 11 }} /> Marca da Raquete
                </label>
                <Input
                  value={form.marcaRaquete}
                  onChange={e => handleChange('marcaRaquete', e.target.value)}
                  size="md"
                  placeholder="Ex: Babolat"
                />
              </div>
              <div className="prf-field">
                <label className="prf-label">
                  <FontAwesomeIcon icon={faBolt} style={{ width: 11 }} /> Tipo de Corda
                </label>
                <Input
                  value={form.tipoCorda}
                  onChange={e => handleChange('tipoCorda', e.target.value)}
                  size="md"
                  placeholder="Ex: Multifilamento"
                />
              </div>
            </div>
          </div>

          <div className="prf-section">
            <h2 className="prf-section-title">Endereço</h2>
            <div className="prf-grid">
              <div className="prf-field prf-field--full">
                <label className="prf-label">Endereço</label>
                <Input value={form.endereco} onChange={e => handleChange('endereco', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">Bairro</label>
                <Input value={form.bairro} onChange={e => handleChange('bairro', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">CEP</label>
                <Input value={form.cep} onChange={e => handleChange('cep', e.target.value)} size="md" />
              </div>
              <div className="prf-field">
                <label className="prf-label">Estado</label>
                <select
                  className="prf-select"
                  value={form.estado}
                  onChange={e => handleChange('estado', e.target.value)}
                >
                  {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>
              <div className="prf-field">
                <label className="prf-label">Cidade</label>
                <Input value={form.cidade} onChange={e => handleChange('cidade', e.target.value)} size="md" />
              </div>
            </div>
          </div>

          {/* Clube — read-only com aviso */}
          <div className="prf-section">
            <h2 className="prf-section-title">Clube</h2>
            <div className="prf-clube-row">
              <div className="prf-field">
                <label className="prf-label">Clube atual</label>
                <Input value={user?.clube} disabled size="md" />
              </div>
            </div>
            <div className="prf-info-box">
              <FontAwesomeIcon icon={faCircleInfo} className="prf-info-icon" />
              <p className="prf-info-text">
                Para alterar seu clube, entre em contato com a FPT pelo e-mail{' '}
                <a href="mailto:contato@fpt.org.br" className="prf-info-link">contato@fpt.org.br</a>{' '}
                ou pelo Fale Conosco.
              </p>
            </div>
          </div>

          {/* Alertas */}
          <div className="prf-section">
            <h2 className="prf-section-title">Preferências de comunicação</h2>
            <p className="prf-section-desc">Escolha quais alertas você deseja receber da FPT.</p>
            <div className="prf-checkboxes">
              <label className="prf-check-row">
                <input
                  type="checkbox"
                  className="prf-checkbox"
                  checked={form.alertaTorneios}
                  onChange={() => handleCheckbox('alertaTorneios')}
                />
                <div>
                  <span className="prf-check-title">Torneios</span>
                  <span className="prf-check-desc">Inscrições abertas, prazos e resultados</span>
                </div>
              </label>
              <label className="prf-check-row">
                <input
                  type="checkbox"
                  className="prf-checkbox"
                  checked={form.alertaComunicados}
                  onChange={() => handleCheckbox('alertaComunicados')}
                />
                <div>
                  <span className="prf-check-title">Comunicados</span>
                  <span className="prf-check-desc">Avisos e novidades da federação</span>
                </div>
              </label>
              <label className="prf-check-row">
                <input
                  type="checkbox"
                  className="prf-checkbox"
                  checked={form.alertaPromocoes}
                  onChange={() => handleCheckbox('alertaPromocoes')}
                />
                <div>
                  <span className="prf-check-title">Promoções</span>
                  <span className="prf-check-desc">Ofertas de parceiros e patrocinadores</span>
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="prf-submit-row">
            {saved && <span className="prf-saved-msg">Dados atualizados com sucesso!</span>}
            <Button type="submit" variant="primary" size="md" className="prf-submit-btn">
              Atualizar dados
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
