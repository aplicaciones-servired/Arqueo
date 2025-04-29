import axios, { type AxiosResponse } from 'axios'
import { URL_API_LOGIN } from '../utils/constans'

export const getLogin = async ({ username, password }: { username: string, password: string, app: string }): Promise<unknown> => {
  try {
    const response: AxiosResponse<unknown> = await axios.post(`${URL_API_LOGIN}/login`, { username, password })
    // const response: AxiosResponse<{ token: string }> = await axios.post('http://localhost:3000/login', { username, password })
    console.log('first', response)
    return response
  } catch (error) {
    console.error('Error en la solicitud de login:', error)
    throw error
  }
}
