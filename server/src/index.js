import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config.js';
import indexRoute from './routes/index.routes.js';
import arqueoRoute from './routes/arqueo.routes.js';
import loginRouter from './routes/users.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(indexRoute);
app.use(arqueoRoute);
app.use(loginRouter);

app.listen(PORT);
console.log(" server is running on port 4000");