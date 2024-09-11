import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const InitialUser: User = { cc_persona: '', id_empresa: '', nombre_persona: '', apellido_persona: '', nombre_cargo: '', nombre_proceso: '', nombre_rol: '', password: '', username: '' }

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

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username))
  }, [username])

  useEffect(() => {
    // Si el usuario está autenticado y está en la página de login, cerrar sesión
    if (isAuthenticated && location.pathname === '/') {
      logout()
    }
  }, [isAuthenticated, location.pathname])

  const login = (): void => {
    setIsAuthenticated(true)
    navigate('/home')
  }

  const logout = (): void => {
    setIsAuthenticated(false)
    navigate('/')
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
