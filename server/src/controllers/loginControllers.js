import { LoginService } from "../services/user.services.js";

export const Login = async (req, res) => {
  try {
    const result = await LoginService(req.body); // Asegúrate de que LoginService retorne un resultado esperado
    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
