import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello! Lab 1 is ready.');
});

app.get('/healthcheck', (req: Request, res: Response) => {
    const data = {
        date: new Date().toISOString(),
        status: 'OK'
    };
    res.status(200).json(data);
});
