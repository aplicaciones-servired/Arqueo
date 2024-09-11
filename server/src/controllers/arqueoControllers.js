import { getArqueos, getArqueoss } from '../services/arqueo.services.js'

export const getZona = async (req, res) => {
  try {
    const { zona } = req.params
    const result = await getArqueos(req.params)
    return res.status(200).json(result)

    // const result = await getArqueos(req.params) // Asegúrate de que LoginService retorne un resultado esperado
    // return res.status(200).json(result)

  } catch (error) {
    console.error('Error in controller:', error)
    return res.status(400).json({ message: error.message })
  }
}


export const getArqueo = async (req, res) => {
  try {
    const { zona, id } = req.params

    const result = await getArqueoss(req.params)
    return res.status(200).json(result)

    // const result = await getArqueos(req.params) // Asegúrate de que LoginService retorne un resultado esperado
    // return res.status(200).json(result)

  } catch (error) {
    console.error('Error in controller:', error)
    return res.status(400).json({ message: error.message })
  }
}

