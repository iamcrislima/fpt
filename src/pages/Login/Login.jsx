import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input, Button } from '@1doc/1ds-react'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

const FPT_LOGO_URL = '/images/fpt-logo.svg'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const savedSport = localStorage.getItem('fpt_sport') || 'bt'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Preencha e-mail e senha.')
      return
    }
    setLoading(true)
    // Simulate async
    await new Promise(r => setTimeout(r, 600))
    login(email, password)
    navigate(`/${savedSport}/painel`, { replace: true })
  }

  return (
    <div className="login-page">
      {/* Left — form panel */}
      <div className="login-form-panel">
        <div className="login-form-inner">
          <Link to={`/${savedSport}`} className="login-logo-link">
            <img src={FPT_LOGO_URL} alt="FPT" className="login-logo" />
          </Link>

          <h1 className="login-title">Bem-vindo(a) à FPT</h1>
          <p className="login-subtitle">Entre com sua conta para acessar o painel do atleta.</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label className="login-label" htmlFor="login-email">E-mail</label>
              <Input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                size="md"
              />
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="login-password">Senha</label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                size="md"
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
          </form>

          <a href="#" className="login-forgot" onClick={e => e.preventDefault()}>
            Esqueci minha senha
          </a>

          <p className="login-register-hint">
            Não tem conta?{' '}
            <Link to={`/${savedSport}/faca-parte`} className="login-register-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Right — brand panel */}
      <div className="login-brand-panel">
        <div className="login-brand-overlay" />
        <div className="login-brand-content">
          <img src={FPT_LOGO_URL} alt="FPT" className="login-brand-logo" />
          <h2 className="login-brand-title">Federação Paranaense de Tênis</h2>
          <p className="login-brand-text">
            Conectando atletas, clubes e torneios em todo o Paraná.
          </p>
          <div className="login-brand-stats">
            <div className="login-brand-stat">
              <span className="login-brand-stat-number">2.400+</span>
              <span className="login-brand-stat-label">Atletas</span>
            </div>
            <div className="login-brand-stat-sep" />
            <div className="login-brand-stat">
              <span className="login-brand-stat-number">80+</span>
              <span className="login-brand-stat-label">Torneios/ano</span>
            </div>
            <div className="login-brand-stat-sep" />
            <div className="login-brand-stat">
              <span className="login-brand-stat-number">120+</span>
              <span className="login-brand-stat-label">Clubes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
