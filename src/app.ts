import express from 'express';
import userRouter from './routes/user';
import categoryRouter from './routes/category';
import recordRouter from './routes/record';
import currencyRouter from './routes/currency';

export const app = express();

app.use(express.json());

app.get('/healthcheck', (req, res) => {
    res.json({ date: new Date().toISOString(), status: 'OK', db: 'PostgreSQL' });
});

app.use('/user', userRouter);
app.use('/users', userRouter);
app.use('/category', categoryRouter);
app.use('/record', recordRouter);
app.use('/currency', currencyRouter);
