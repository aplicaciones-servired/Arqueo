import axios, { type AxiosResponse } from 'axios'
import { API_URL } from '../utils/constans'
export const getLogin = async ({ username, password }: { username: string, password: string }): Promise<unknown> => {
  try {
    // const response: AxiosResponse<unknown> = await axios.post(`${API_URL}/login`, { username, password })
    const response: AxiosResponse<{ token: string }> = await axios.post(`${API_URL}/login`, { username, password })
    // const response: AxiosResponse<{ token: string }> = await axios.post('http://localhost:3000/login', { username, password })
    return response.data
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
      console.error('Database connection refused')
      return { message: 'Error de conexión a la base de datos' }
    } else {
      console.error('Internal server error')
      return { message: 'Error interno del servidor' }
    }
  }
}
