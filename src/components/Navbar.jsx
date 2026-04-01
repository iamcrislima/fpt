import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { Input, Avatar, Button, Icon } from '@1doc/1ds-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars, faXmark, faRightLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useSport } from '../context/SportContext'
import { useAuth } from '../context/AuthContext'
import UserDropdown from './UserDropdown'

const FPT_LOGO_URL = '/images/fpt-logo.svg'
const USER_AVATAR_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80'

const NAV_LINKS = [
  { path: '', label: 'Início' },
  { path: 'faca-parte', label: 'Faça Parte' },
  { path: 'torneios', label: 'Torneios' },
  { path: 'ranking', label: 'Ranking' },
]

const MAIS_PATHS = [
  { path: 'noticias', label: 'Notícias' },
  { path: 'transparencia', label: 'Transparência' },
  { path: 'regras', label: 'Regras' },
  { path: 'fale-conosco', label: 'Fale Conosco' },
  { path: 'historia', label: 'História' },
  { path: 'demonstrativo-financeiro', label: 'Demonstrativo Financeiro' },
  { path: 'atas-reuniao', label: 'Atas de Reunião' },
  { path: 'regulamento', label: 'Regulamento' },
  { path: 'calendario', label: 'Calendário' },
  { path: 'faq', label: 'FAQ' },
  { path: 'a-federacao', label: 'A Federação' },
  { path: 'filiados', label: 'Filiados' },
  { path: 'clubes-filiados', label: 'Clubes Filiados' },
]

const SPORT_FULL_NAMES = { bt: 'Beach Tennis', tennis: 'Tênis' }

export default function Navbar() {
  const { sport, setSport } = useSport()
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [maisOpen, setMaisOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMaisOpen, setMobileMaisOpen] = useState(false)
  const [switchModalOpen, setSwitchModalOpen] = useState(false)
  const closeTimer = useRef(null)
  const navRef = useRef(null)

  const otherSport = sport === 'bt' ? 'tennis' : 'bt'

  function sportLink(path) {
    if (!sport) return `/${path}`
    return path ? `/${sport}/${path}` : `/${sport}`
  }

  function handleMouseEnter() {
    clearTimeout(closeTimer.current)
    setMaisOpen(true)
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setMaisOpen(false), 150)
  }

  function closeMobileMenu() {
    setMobileOpen(false)
    setMobileMaisOpen(false)
  }

  function confirmSportSwitch() {
    setSwitchModalOpen(false)
    closeMobileMenu()
    const segments = location.pathname.replace(/^\/(bt|tennis)\/?/, '')
    setSport(otherSport)
    navigate(`/${otherSport}${segments ? `/${segments}` : ''}`)
  }

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeMobileMenu()
        setSwitchModalOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close on outside click / touch
  useEffect(() => {
    function handleOutsideClick(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMobileMenu()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [])

  return (
    <>
      {/* Mobile drawer backdrop */}
      <div
        className={`navbar-mobile-backdrop${mobileOpen ? ' navbar-mobile-backdrop--open' : ''}`}
        onClick={closeMobileMenu}
      />

      <header className="navbar" role="navigation" ref={navRef}>
        <div className="navbar-inner">
          <div className="navbar-left">
            <Link to={sport ? `/${sport}` : '/'} className="navbar-logo" onClick={closeMobileMenu}>
              <img src={FPT_LOGO_URL} alt="FPT Logo" />
            </Link>
            <nav className="navbar-links">
              {NAV_LINKS.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={sportLink(path)}
                  end={path === ''}
                >
                  {label}
                </NavLink>
              ))}
              <div className="navbar-mais-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#" className="with-chevron" onClick={e => e.preventDefault()}>
                  Mais
                  <FontAwesomeIcon icon={faChevronDown} style={{ width: 12, height: 12 }} />
                </a>
                {maisOpen && (
                  <div className="navbar-dropdown">
                    <div className="navbar-dropdown-inner">
                      {MAIS_PATHS.map(({ path, label }) => (
                        <NavLink
                          key={path}
                          to={sportLink(path)}
                          className="navbar-dropdown-item"
                          onClick={() => setMaisOpen(false)}
                        >
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="navbar-right">
            <Input
              placeholder="Buscar"
              size="sm"
              iconLeft={<Icon name="search" size="sm" />}
              className="navbar-search-input"
            />
            <div className="navbar-right-sep" />
            {/* Sport switcher pill — shows target sport (not current) */}
            {sport && (
              <button
                className="sport-switcher-pill"
                onClick={() => setSwitchModalOpen(true)}
                title={`Trocar para ${SPORT_FULL_NAMES[otherSport]}`}
                aria-label={`Trocar para ${SPORT_FULL_NAMES[otherSport]}`}
              >
                <FontAwesomeIcon icon={faRightLeft} style={{ width: 11, height: 11 }} />
                <span className="sport-switcher-label">{SPORT_FULL_NAMES[otherSport]}</span>
              </button>
            )}
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="navbar-entrar-btn"
                onClick={() => navigate('/login')}
              >
                Entrar
              </Button>
            )}
          </div>

          {/* Hamburger button — visible only on mobile */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu — fora do <header> para escapar do backdrop-filter */}
      <div className={`navbar-mobile-menu${mobileOpen ? ' navbar-mobile-menu--open' : ''}`}>
        <nav className="navbar-mobile-nav">

          {/* User section */}
          {isLoggedIn ? (
            <div
              className="navbar-mobile-user-header navbar-mobile-user-header--clickable"
              onClick={() => { closeMobileMenu(); navigate(`/${sport}/painel`) }}
            >
              <img src={USER_AVATAR_URL} alt={user.name} className="navbar-mobile-avatar-img" />
              <div className="navbar-mobile-user-info">
                <span className="navbar-mobile-user-name">{user.name}</span>
                <span className="navbar-mobile-user-role">{user.role}</span>
              </div>
            </div>
          ) : (
            <div className="navbar-mobile-entrar-wrap">
              <button
                className="navbar-mobile-entrar-btn"
                onClick={() => { closeMobileMenu(); navigate('/login') }}
              >
                Entrar na minha conta
              </button>
            </div>
          )}

          {/* Sport switcher card — mobile */}
          {sport && (
            <div className="navbar-mobile-sport-card">
              <div className="navbar-mobile-sport-info">
                <span className="navbar-mobile-sport-label">Você está em:</span>
                <span className="navbar-mobile-sport-name">{SPORT_FULL_NAMES[sport]}</span>
              </div>
              <button
                className="navbar-mobile-sport-switch-btn"
                onClick={() => { closeMobileMenu(); setSwitchModalOpen(true) }}
              >
                Trocar para {SPORT_FULL_NAMES[otherSport]}
              </button>
            </div>
          )}

          {NAV_LINKS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={sportLink(path)}
              end={path === ''}
              className="navbar-mobile-link"
              onClick={closeMobileMenu}
            >
              {label}
            </NavLink>
          ))}

          {/* Mais section */}
          <button
            className="navbar-mobile-mais-toggle"
            onClick={() => setMobileMaisOpen(prev => !prev)}
            aria-expanded={mobileMaisOpen}
          >
            <span>Mais</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`navbar-mobile-mais-chevron${mobileMaisOpen ? ' navbar-mobile-mais-chevron--open' : ''}`}
            />
          </button>

          {mobileMaisOpen && (
            <div className="navbar-mobile-mais-list">
              {MAIS_PATHS.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={sportLink(path)}
                  className="navbar-mobile-sub-link"
                  onClick={closeMobileMenu}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Logout — bottom of drawer */}
          {isLoggedIn && (
            <button
              className="navbar-mobile-logout-link"
              onClick={() => { logout(); closeMobileMenu(); navigate(`/${sport}`) }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sair
            </button>
          )}
        </nav>
      </div>

      {/* Sport switch confirmation modal */}
      {switchModalOpen && (
        <div className="sport-switch-backdrop" role="dialog" aria-modal="true" onClick={() => setSwitchModalOpen(false)}>
          <div className="sport-switch-modal" onClick={e => e.stopPropagation()}>
            <h3 className="sport-switch-modal-title">
              Trocar para {SPORT_FULL_NAMES[otherSport]}?
            </h3>
            <p className="sport-switch-modal-body">
              Você será redirecionado para a página inicial de {SPORT_FULL_NAMES[otherSport]}.
            </p>
            <div className="sport-switch-modal-actions">
              <button className="sport-switch-btn sport-switch-btn--cancel" onClick={() => setSwitchModalOpen(false)}>
                Cancelar
              </button>
              <button className="sport-switch-btn sport-switch-btn--confirm" onClick={confirmSportSwitch}>
                Trocar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
