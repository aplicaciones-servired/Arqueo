import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

//configuracion de la base de datos
export const getPoolLogin = async () => {
  let pool
  try {
    pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_USE,
    })
  } catch (error) {
    console.error('Error creating MySQL pool', error)
    throw new Error('Error al conectar con la base de datos')
  }
  return pool
}

