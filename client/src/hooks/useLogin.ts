import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import { getLogin } from '../services/Login.services'
import { useNavigate } from 'react-router-dom'
import { type User } from '../types/user'

export function useLogin(): {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  password: string
  errorString: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (ev: React.FormEvent) => void
} {
  const { login, setUsernames } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorString, setErrorString] = useState('')

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()
    void getLogin({ username, password })
      .then((res) => {
        console.log('Respuesta del login:', res)
        if (res !== null && typeof res === 'object' && 'username' in res) {
          login()
          setUsernames(res as User)
          navigate('/home')
        } else {
          setErrorString('Datos de usuario inválidos.')
        }
      })

      .catch((error) => {
        const errorMessage = (error.response?.data?.message ?? error.message) as string | undefined
        setErrorString(errorMessage ?? 'Error al iniciar sesión')
        setTimeout(() => {
          setErrorString('')
        }, 5000)
      })
  }

  return { username, setUsername, password, errorString, setPassword, handleSubmit }
}
