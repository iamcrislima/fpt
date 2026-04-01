import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const MOCK_USER = {
  name: 'Cris Lima',
  email: 'cris@email.com',
  codigo: 'FPT-2024-0847',
  clube: 'Beach Tennis Curitiba',
  categoria: '7MB',
  classe: 'BTMB',
  anoNasc: 1990,
  altura: '1,82 m',
  peso: '78 kg',
  ladoDominante: 'Destro',
  marcaRaquete: 'Babolat',
  tipoCorda: 'Multifilamento',
  torneiosParticipados: 12,
  role: 'Atleta FPT',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fpt_user')
    return saved ? JSON.parse(saved) : null
  })

  function login(email, password) {
    // Mock login — accept any credentials
    const loggedUser = { ...MOCK_USER, email }
    setUser(loggedUser)
    localStorage.setItem('fpt_user', JSON.stringify(loggedUser))
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('fpt_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
