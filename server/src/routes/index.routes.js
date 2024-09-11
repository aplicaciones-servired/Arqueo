//para saber si estamos conectados a la base de datos
import { Router } from "express";
import { pool } from "../connections/dbArqueo.js";

const router = Router();

router.get("/ping", async (req, res) => {
    const [ rows ] = await pool.query("SELECT 1 + 1 as result");
    console.log(rows[0]);
    res.json(rows);
});

export default router;