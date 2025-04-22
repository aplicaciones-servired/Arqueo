import axios, { type AxiosResponse } from 'axios'
import { API_URL } from '../utils/constans'

export const getLogin = async ({ username, password }: { username: string, password: string }): Promise<unknown> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    return (Boolean(response.data)) || {} // Devuelve objeto vacío si es undefined
  } catch (error) {
    console.error('Error en login:', error)
    throw error
  }
}
