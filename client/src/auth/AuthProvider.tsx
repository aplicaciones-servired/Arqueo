import React, { createContext, useContext, useEffect, useState } from 'react'
import { type User } from '../types/user'

interface IAuthContext {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  username: User
  setUsernames: React.Dispatch<React.SetStateAction<User>>
}

interface Props {
  children: React.ReactNode
}

const InitialUser: User = {
  cc_persona: '',
  nombre_persona: '',
  apellido_persona: '',
  id_empresa: '',
  id_cargo: '',
  id_proceso: '',
  id_rol: '',
  username: '',
  password: '',
  id_estado: '',
  empresa: {
    id_empresa: '',
    nombre_empresa: 'Multired' // or any other valid value of type 'Empresas'
  },
  rol: {
    id_rol: '',
    nombre_rol: ''
  },
  cargo: {
    id_cargo: '',
    nombre_cargo: ''
  },
  proceso: {
    id_proceso: '',
    nombre_proceso: ''
  }

}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    return (storedAuth != null) ? JSON.parse(storedAuth) : false
  })
  const [username, setUsernames] = useState<User>(() => {
    const storedUser = localStorage.getItem('username')
    return (storedUser != null) ? JSON.parse(storedUser) : InitialUser
  })

  let inactivityTimer: ReturnType<typeof setTimeout>

  const resetInactivityTimer = (): void => {
    clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => {
      logout()
    }, 10 * 60 * 1000)
  }

  useEffect(() => {
    const events = ['click', 'keydown', 'mousemove', 'scroll']
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer)
    })

    resetInactivityTimer()

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer)
      })
      clearTimeout(inactivityTimer)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username))
  }, [username])

  useEffect(() => {
    if ((Boolean(isAuthenticated)) && location.pathname === '/') {
      logout()
    }
  }, [isAuthenticated, location.pathname])

  const login = (): void => {
    setIsAuthenticated(true)
  }

  const logout = (): void => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, setUsernames }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
