import { getZona, getArqueo } from '../controllers/arqueoControllers.js'
import { Router } from 'express'

const arqueoRoute = Router();

arqueoRoute.get('/arqueos/:zona', getZona); // Cambiado de /login/:username a /:username

arqueoRoute.get("/arqueos/:zona/:id", getArqueo);

export default arqueoRoute;
