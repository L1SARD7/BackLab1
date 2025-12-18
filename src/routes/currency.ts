import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Currency } from '../entity/Currency';

const router = Router();
const currencyRepo = AppDataSource.getRepository(Currency);

router.post('/', async (req: Request, res: Response) => {
    const { code, name } = req.body;
    if (!code || !name) return res.status(400).json({ error: "Code and Name required" });

    const currency = currencyRepo.create({ code, name });
    try {
        await currencyRepo.save(currency);
        res.status(201).json(currency);
    } catch (e) {
        res.status(400).json({ error: "Currency code must be unique" });
    }
});

router.get('/', async (req, res) => {
    const currencies = await currencyRepo.find();
    res.json(currencies);
});

export default router;
