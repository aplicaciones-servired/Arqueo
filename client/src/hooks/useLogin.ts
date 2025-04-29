import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User } from '../types/user'
import { URL_API_LOGIN } from '../utils/constans'
import axios from 'axios'

export function useLogin (): {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  password: string
  errorString: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (ev: React.FormEvent) => void
} {
  const { login, setUsernames, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorString, setErrorString] = useState('')

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()
    axios.post(`${URL_API_LOGIN}/login`, { username, password }) // Reemplaza 'APP_NAME' con el nombre de tu aplicación
      .then((res) => {
        console.log('Respuesta del login:', res.data.user)
        if (res.status === 200) {
          setIsAuthenticated(true)
          login()
          setUsernames(res.data.user as unknown as User)
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
