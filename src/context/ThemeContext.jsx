import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [colorMode, setColorModeState] = useState(() =>
    localStorage.getItem('fpt_color_mode') || 'light'
  )

  function setColorMode(mode) {
    setColorModeState(mode)
    localStorage.setItem('fpt_color_mode', mode)
    document.documentElement.setAttribute('data-color-mode', mode)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', colorMode)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
