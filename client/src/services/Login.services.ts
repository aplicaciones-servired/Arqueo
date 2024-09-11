import axios, { type AxiosResponse } from 'axios'

export const getLogin = async ({ username, password }: { username: string, password: string }): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post('http://localhost:3000/login', { username, password })
    return response.data
  } catch (error) {
    console.error('Error en la solicitud de login:', error);
    throw error;
  }
}

