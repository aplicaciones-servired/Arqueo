import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST_LOGIN = process.env.DB_SERVIRE_HOST as string
const DB_PASSWORD_LOGIN = process.env.DB_SERVIRE_PASS as string
const DB_USER_LOGIN = process.env.DB_SERVIRE_USER as string
const DB_NAME_LOGIN = process.env.DB_SERVIRE_USE as string
const DB_DIALECT_LOGIN = process.env.DB_DIALECT_ARQUEO as string

const getPoolLogin = new Sequelize(DB_NAME_LOGIN, DB_USER_LOGIN, DB_PASSWORD_LOGIN, {
  host: DB_HOST_LOGIN,
  dialect: DB_DIALECT_LOGIN as Dialect,
  timezone: '-05:00',
});

export { getPoolLogin };
