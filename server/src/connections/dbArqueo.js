import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

export const pool = createPool({
  host: process.env.DB_SERVIRED_HOST,
  user: process.env.DB_SERVIRED_USER,
  password: process.env.DB_SERVIRED_PASS,
  database: process.env.DB_SERVIRED_USE,
});


export const poolMultired = createPool({
  host: process.env.DB_MULTIRED_HOST,
  user: process.env.DB_MULTIRED_USER,
  password: process.env.DB_MULTIRED_PASS,
  database: process.env.DB_MULTIRED_USE,
});
