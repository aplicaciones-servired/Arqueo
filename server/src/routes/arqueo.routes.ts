import { Router } from "express";
import { getArqueo, getArqueos } from "../controllers/arqueo.controllers";
import { Programacionget, PostProgramacion } from "../controllers/programacion.controllers";

export const arqueoRoute = Router();
 
arqueoRoute.get("/arqueo/:zona", getArqueo); // Cambiado de /login/:username a /:username

arqueoRoute.get("/arqueos/:zona/:id", getArqueos);

arqueoRoute.post("/cronograma/:zona", PostProgramacion);

arqueoRoute.get("/cronograma/:zona", Programacionget);


