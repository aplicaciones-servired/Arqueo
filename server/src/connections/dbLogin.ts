import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST as string
const DB_PASSWORD = process.env.DB_PASSWORD as string
const DB_USER = process.env.DB_USER as string
const DB_NAME = process.env.DB_NAME as string
const DB_DIALECT_CHAT = process.env.DB_DIALECT_CHAT as string

const getPoolLogin = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  timezone: '-05:00',
});

export { getPoolLogin };
