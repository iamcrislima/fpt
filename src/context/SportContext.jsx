import { createContext, useContext, useEffect, useState } from 'react'

export const SportContext = createContext(null)

export const SPORT_THEMES = {
  bt: {
    primaryColor: '#BCD405',
    primaryDark: '#6e9200',
    primaryLight: '#edf2d0',
    primaryText: '#333333',
    textColor: '#0f4c30',
    navbarBg: 'linear-gradient(90deg, #8ab800 0%, #d5e207 100%)',
    navbarText: '#0f4c30',
    footerBg: '#BCD405',
    footerText: '#0f4c30',
  },
  tennis: {
    primaryColor: '#123C32',
    primaryDark: '#0a2219',
    primaryLight: '#d4e6df',
    primaryText: '#ffffff',
    textColor: '#123C32',
    navbarBg: '#0a2219',
    navbarText: '#ffffff',
    footerBg: '#123C32',
    footerText: '#ffffff',
  },
}

export function applyTheme(sport) {
  const theme = SPORT_THEMES[sport] || SPORT_THEMES.bt
  const root = document.documentElement
  root.style.setProperty('--sport-primary', theme.primaryColor)
  root.style.setProperty('--sport-primary-dark', theme.primaryDark)
  root.style.setProperty('--sport-primary-light', theme.primaryLight)
  root.style.setProperty('--sport-primary-text', theme.primaryText)
  root.style.setProperty('--sport-navbar-bg', theme.navbarBg)
  root.style.setProperty('--sport-navbar-text', theme.navbarText)
  root.style.setProperty('--sport-footer-bg', theme.footerBg)
  root.style.setProperty('--sport-footer-text', theme.footerText)
  root.style.setProperty('--sport-text', theme.textColor)
  root.setAttribute('data-sport', sport || 'bt')
}

export function SportProvider({ children }) {
  const [sport, setSportState] = useState(() => {
    // URL is source of truth — detect sport from current path
    const path = window.location.pathname
    if (path.startsWith('/tennis')) return 'tennis'
    if (path.startsWith('/bt')) return 'bt'
    return localStorage.getItem('fpt_sport') || null
  })

  function setSport(newSport) {
    setSportState(newSport)
    if (newSport) {
      localStorage.setItem('fpt_sport', newSport)
      applyTheme(newSport)
    }
  }

  useEffect(() => {
    if (sport) {
      applyTheme(sport)
      localStorage.setItem('fpt_sport', sport)
    }
  }, [sport])

  return (
    <SportContext.Provider value={{ sport, setSport, theme: SPORT_THEMES[sport] || SPORT_THEMES.bt }}>
      {children}
    </SportContext.Provider>
  )
}

export function useSport() {
  return useContext(SportContext)
}
