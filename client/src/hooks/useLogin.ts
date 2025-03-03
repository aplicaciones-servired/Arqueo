import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import { getLogin } from '../services/Login.services'
import { useNavigate } from 'react-router-dom'
import { type User } from '../types/user'

export function useLogin (): {
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
        if (res !== null && res !== undefined) {
          login()
          setUsernames(res as User)
          navigate('/home')
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
