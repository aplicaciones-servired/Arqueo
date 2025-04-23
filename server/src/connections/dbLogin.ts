import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST_LOGIN = process.env.DB_SERVIRE_HOST as string
const DB_PASSWORD_LOGIN = process.env.DB_SERVIRE_PASS as string
const DB_USER_LOGIN = process.env.DB_SERVIRE_USER as string
const DB_NAME_LOGIN = process.env.DB_SERVIRE_USE as string
const DB_DIALECT_CHAT = process.env.DB_DIALECT_CHAT as string

console.log({
  DB_USER_LOGIN: process.env.DB_SERVIRE_USER,
  DB_PASSWORD_LOGIN: process.env.DB_SERVIRE_PASS,
  DB_HOST_LOGIN: process.env.DB_SERVIRE_HOST,
  DB_NAME_LOGIN: process.env.DB_SERVIRE_USE
});


console.log('Usuario:', process.env.DB_SERVIRE_USER);
console.log('Pass:', process.env.DB_SERVIRE_PASS);
console.log('Host:', process.env.DB_SERVIRE_HOST);
console.log('DB:', process.env.DB_SERVIRE_USE);


const getPoolLogin = new Sequelize(DB_NAME_LOGIN, DB_USER_LOGIN, DB_PASSWORD_LOGIN, {
  host: DB_HOST_LOGIN,
  dialect: "mysql",
  port: 3306,
  timezone: '-05:00',
  
});

export { getPoolLogin };
