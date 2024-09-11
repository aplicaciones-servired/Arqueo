import { Router } from "express";
import { Login } from "../controllers/loginControllers.js";

const loginRouter = Router();

loginRouter.post('/login', Login); // Cambiado de /login/:username a /:username

export default loginRouter;
