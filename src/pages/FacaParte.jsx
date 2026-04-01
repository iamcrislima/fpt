import { useState } from 'react'
import { Input, Select, Checkbox, Button, Avatar } from '@1doc/1ds-react'

const BG_IMG = '/faca-parte-bg.png'

const generoOptions = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'nao_informar', label: 'Prefiro não informar' },
]

const estadoOptions = [
  { value: 'pr', label: 'Paraná' },
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'sc', label: 'Santa Catarina' },
  { value: 'rs', label: 'Rio Grande do Sul' },
  { value: 'mg', label: 'Minas Gerais' },
]

const cidadeOptions = [
  { value: 'cwb', label: 'Curitiba' },
  { value: 'lda', label: 'Londrina' },
  { value: 'mga', label: 'Maringá' },
  { value: 'foz', label: 'Foz do Iguaçu' },
]

const classeOptions = [
  { value: 'a', label: 'Classe A' },
  { value: 'b', label: 'Classe B' },
  { value: 'c', label: 'Classe C' },
  { value: 'd', label: 'Classe D' },
]

const clubeOptions = [
  { value: 'clube1', label: 'Clube Atlético' },
  { value: 'clube2', label: 'Arena Beach' },
  { value: 'clube3', label: 'Centro Esportivo' },
]

const ladoOptions = [
  { value: 'destro', label: 'Destro' },
  { value: 'canhoto', label: 'Canhoto' },
  { value: 'ambidestro', label: 'Ambidestro' },
]

const camisetaOptions = [
  { value: 'pp', label: 'PP' },
  { value: 'p', label: 'P' },
  { value: 'm', label: 'M' },
  { value: 'g', label: 'G' },
  { value: 'gg', label: 'GG' },
  { value: 'xgg', label: 'XGG' },
]

export default function FacaParte() {
  const [step, setStep] = useState(1)

  return (
    <main className="faca-parte-page">
      <div className="faca-parte-inner">

        {/* PAINEL ESQUERDO */}
        <div className="fp-left">
          <img src={BG_IMG} alt="Beach Tennis — onde o jogo acontece" className="fp-bg-img" />
          <div className="fp-left-overlay">
            <h1 className="fp-left-title">Onde o jogo acontece.</h1>
            <p className="fp-left-subtitle">
              Entre nos torneios oficiais, conquiste pontos no ranking e faça parte da FPT.
            </p>
          </div>
        </div>

        {/* PAINEL DIREITO */}
        <div className="fp-right">
          <div className="fp-dots">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`fp-dot${step === n ? ' fp-dot--active' : ''}`} />
            ))}
          </div>

          <div className="fp-form-wrap">
            <h2 className="fp-form-title">Crie sua conta</h2>

            <div className="fp-step-label">
              <span className="fp-step-num">Passo {step} de 3</span>
              <span className="fp-step-name">
                {step === 1 && 'Dados Pessoais'}
                {step === 2 && 'Endereço'}
                {step === 3 && 'Perfil do Atleta'}
              </span>
            </div>

            {/* PASSO 1 — Dados Pessoais (ordem do Figma) */}
            {step === 1 && (
              <div className="fp-fields">
                {/* Nome completo — largura total */}
                <Input label="Nome completo" placeholder="Nome completo" fullWidth required />

                {/* Data de nascimento + Gênero (Select) */}
                <div className="fp-row">
                  <Input label="Data de nascimento" placeholder="DD/MM/AAAA" fullWidth required />
                  <Select label="Gênero" options={generoOptions} placeholder="Selecione" fullWidth />
                </div>

                {/* CPF + RG */}
                <div className="fp-row">
                  <Input label="CPF" placeholder="000.000.000-00" fullWidth required />
                  <Input label="RG" placeholder="00.000.000-0" fullWidth />
                </div>

                {/* Nome do pai + Nome da mãe */}
                <div className="fp-row">
                  <Input label="Nome do pai" placeholder="Nome completo" fullWidth />
                  <Input label="Nome da mãe" placeholder="Nome completo" fullWidth />
                </div>

                {/* Checkboxes */}
                <div className="fp-checkboxes">
                  <Checkbox label="Sou estrangeiro" name="estrangeiro" />
                  <Checkbox label="Cadeirante" name="cadeirante" />
                </div>

                <div className="fp-divider" />

                <p className="fp-section-label">Informações de Acesso</p>

                {/* E-mail + Celular */}
                <div className="fp-row">
                  <Input label="E-mail" placeholder="seu@email.com" type="email" fullWidth required />
                  <Input label="Celular" placeholder="(00) 00000-0000" fullWidth required />
                </div>

                {/* Senha + Confirmação */}
                <div className="fp-row">
                  <Input label="Senha" placeholder="••••••••" type="password" fullWidth required />
                  <Input label="Confirmar senha" placeholder="••••••••" type="password" fullWidth required />
                </div>

                <div className="fp-actions fp-actions--right">
                  <Button variant="primary" endIcon="nav-arrow-right" onClick={() => setStep(2)}>
                    Próximo
                  </Button>
                </div>
              </div>
            )}

            {/* PASSO 2 — Endereço (ordem do Figma) */}
            {step === 2 && (
              <div className="fp-fields">
                {/* CEP + Estado */}
                <div className="fp-row">
                  <Input label="CEP" placeholder="00000-000" fullWidth required />
                  <Select label="Estado" options={estadoOptions} placeholder="Selecione" fullWidth />
                </div>

                {/* Cidade + Bairro */}
                <div className="fp-row">
                  <Select label="Cidade" options={cidadeOptions} placeholder="Selecione" fullWidth />
                  <Input label="Bairro" placeholder="Bairro" fullWidth />
                </div>

                {/* Rua (maior) + Número (menor) */}
                <div className="fp-row fp-row--rua">
                  <Input label="Rua" placeholder="Nome da rua" className="fp-input-rua" required />
                  <Input label="Número" placeholder="000" className="fp-input-num" required />
                </div>

                {/* Complemento — largura total */}
                <Input label="Complemento" placeholder="Apto, Bloco, Casa..." fullWidth />

                <div className="fp-divider" />

                <div className="fp-actions">
                  <Button variant="secondary" startIcon="nav-arrow-left" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button variant="primary" endIcon="nav-arrow-right" onClick={() => setStep(3)}>
                    Próximo
                  </Button>
                </div>
              </div>
            )}

            {/* PASSO 3 — Perfil do Atleta (ordem do Figma) */}
            {step === 3 && (
              <div className="fp-fields">
                {/* Upload de foto */}
                <div className="fp-avatar-row">
                  <Avatar size="lg">A</Avatar>
                  <Button variant="primary" size="sm">Carregar foto</Button>
                  <span className="fp-no-file">Sem arquivos selecionados</span>
                </div>

                {/* Tênis */}
                <p className="fp-section-label">Tênis</p>
                <div className="fp-row">
                  <Select label="Classe" options={classeOptions} placeholder="Selecione" fullWidth />
                  <Select label="Clube" options={clubeOptions} placeholder="Selecione" fullWidth disabled />
                </div>

                {/* Beach Tennis */}
                <p className="fp-section-label">Beach Tennis</p>
                <div className="fp-row">
                  <Select label="Classe" options={classeOptions} placeholder="Selecione" fullWidth />
                  <Select label="Clube" options={clubeOptions} placeholder="Selecione" fullWidth disabled />
                </div>
                <p className="fp-clube-msg">
                  *Após a regularização da anuidade é possível alterar o clube. Primeiro finalize seu cadastro.
                </p>

                <div className="fp-divider" />

                <div className="fp-row">
                  <Select label="Lado dominante" options={ladoOptions} placeholder="Selecione uma categoria" fullWidth />
                  <Input label="Altura" placeholder="Insira sua altura" fullWidth />
                </div>

                <div className="fp-row">
                  <Input label="Peso*" placeholder="Insira seu peso em Kg" fullWidth />
                  <Select label="Tamanho de camiseta" options={camisetaOptions} placeholder="Selecione um tamanho" fullWidth />
                </div>

                <Checkbox
                  label="Li e aceito os Termos de Uso e a Política de Privacidade da FPT."
                  name="termos"
                />

                <Checkbox
                  label="Aceito receber alertas para torneios, comunicados e promoções da FPT e seus parceiros."
                  name="alertas"
                />

                <div className="fp-actions">
                  <Button variant="secondary" startIcon="nav-arrow-left" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button variant="primary">
                    Finalizar cadastro
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
