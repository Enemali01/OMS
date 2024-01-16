import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import indexRouter from './routers/index.router.js';
import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

const PORT = 5500
app.listen(PORT, () => {
  console.log(`listening on port' + ${PORT}`);
});
