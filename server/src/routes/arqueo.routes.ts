import { Router } from 'express'
import { getArqueo, getArqueos } from '../controllers/arqueo.controllers'

export const arqueoRoute = Router();

arqueoRoute.get('/arqueo/:zona', getArqueo); // Cambiado de /login/:username a /:username

arqueoRoute.get("/arqueos/:zona/:id", getArqueos); 