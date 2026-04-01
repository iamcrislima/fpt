import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faCreditCard, faTrophy, faPalette,
  faRepeat, faRightFromBracket, faChevronRight,
  faSun, faMoon, faTableColumns, faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/AuthContext'
import { useSport } from '../context/SportContext'
import { useTheme } from '../context/ThemeContext'
import './UserDropdown.css'

const USER_AVATAR_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80'

function getInitials(name) {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function UserDropdown() {
  const { user, logout } = useAuth()
  const { sport } = useSport()
  const { colorMode, setColorMode } = useTheme()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false)
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') { setOpen(false); setThemeOpen(false) }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function go(path) {
    setOpen(false)
    setThemeOpen(false)
    navigate(`/${sport}/${path}`)
  }

  function handleLogout() {
    logout()
    setOpen(false)
    navigate(`/${sport}`, { replace: true })
  }

  function handleSwitchSport() {
    localStorage.removeItem('fpt_sport')
    setOpen(false)
    navigate('/', { replace: true })
  }

  function handleSwitchAccount() {
    logout()
    setOpen(false)
    localStorage.removeItem('fpt_sport')
    navigate('/', { replace: true })
  }

  if (!user) return null

  return (
    <div className="ud-wrap" ref={dropRef}>
      {/* Trigger — avatar circle */}
      <button
        className="ud-trigger"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Menu do usuário"
        aria-expanded={open}
      >
        <img src={USER_AVATAR_URL} alt={user.name} className="ud-trigger-img" />
        <span className="ud-trigger-initials" aria-hidden="true">
          {getInitials(user.name)}
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="ud-panel" role="menu">
          {/* Header */}
          <div className="ud-header">
            <img src={USER_AVATAR_URL} alt={user.name} className="ud-header-avatar" />
            <div className="ud-header-info">
              <span className="ud-header-name">{user.name}</span>
              <span className="ud-header-email">{user.email}</span>
            </div>
          </div>

          <div className="ud-divider" />

          <nav className="ud-menu">
            <button className="ud-item" role="menuitem" onClick={() => go('painel')}>
              <span className="ud-item-icon"><FontAwesomeIcon icon={faTableColumns} /></span>
              <span className="ud-item-label">Dashboard</span>
            </button>

            <div className="ud-divider" />

            <button className="ud-item" role="menuitem" onClick={() => go('perfil')}>
              <span className="ud-item-icon"><FontAwesomeIcon icon={faUser} /></span>
              <span className="ud-item-label">Perfil</span>
            </button>

            <button className="ud-item" role="menuitem" onClick={() => go('pagamentos')}>
              <span className="ud-item-icon"><FontAwesomeIcon icon={faCreditCard} /></span>
              <span className="ud-item-label">Pagamentos</span>
            </button>

            <button className="ud-item" role="menuitem" onClick={() => go('meus-torneios')}>
              <span className="ud-item-icon"><FontAwesomeIcon icon={faTrophy} /></span>
              <span className="ud-item-label">Torneios</span>
            </button>

            <div className="ud-divider" />

            {/* Tema com submenu lateral */}
            <div className="ud-item-sub-wrap">
              <button
                className={`ud-item${themeOpen ? ' ud-item--active' : ''}`}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={themeOpen}
                onClick={() => setThemeOpen(prev => !prev)}
              >
                <span className="ud-item-icon"><FontAwesomeIcon icon={faPalette} /></span>
                <span className="ud-item-label">Tema</span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={`ud-item-arrow${themeOpen ? ' ud-item-arrow--open' : ''}`}
                />
              </button>

              {themeOpen && (
                <div className="ud-submenu">
                  <button
                    className={`ud-sub-item${colorMode === 'light' ? ' ud-sub-item--active' : ''}`}
                    onClick={e => { e.stopPropagation(); setColorMode('light') }}
                  >
                    <FontAwesomeIcon icon={faSun} />
                    Claro
                  </button>
                  <button
                    className={`ud-sub-item${colorMode === 'dark' ? ' ud-sub-item--active' : ''}`}
                    onClick={e => { e.stopPropagation(); setColorMode('dark') }}
                  >
                    <FontAwesomeIcon icon={faMoon} />
                    Escuro
                  </button>
                </div>
              )}
            </div>

            <div className="ud-divider" />

            <button className="ud-item" role="menuitem" onClick={handleSwitchSport}>
              <span className="ud-item-icon"><FontAwesomeIcon icon={faArrowRightArrowLeft} /></span>
              <span className="ud-item-label">Trocar modalidade</span>
            </button>

            <button className="ud-item" role="menuitem" onClick={handleSwitchAccount}>
              <span className="ud-item-icon"><FontAwesomeIcon icon={faRepeat} /></span>
              <span className="ud-item-label">Trocar de conta</span>
            </button>

            <button className="ud-item ud-item--danger" role="menuitem" onClick={handleLogout}>
              <span className="ud-item-icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>
              <span className="ud-item-label">Sair</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
