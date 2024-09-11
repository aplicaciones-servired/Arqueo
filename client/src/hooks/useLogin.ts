import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import { getLogin } from '../services/Login.services'
import { useNavigate } from 'react-router-dom'
import { type User } from '../types/user'

export function useLogin() {
  const { login, setUsernames } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorString, setErrorString] = useState('')

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    void getLogin({ username, password })
      .then(res => {
        if (res) {
          login();
          setUsernames(res as User);
          navigate('/home');
        }
      })
       .catch(error => {
        setErrorString(error.response?.data?.message || error.message || 'Error al iniciar sesión');
        setTimeout(() => {
          setErrorString('');
        }, 5000);
      });
  };

  return { username, setUsername, password, errorString, setPassword, handleSubmit };
}
