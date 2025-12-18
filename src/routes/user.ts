import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Currency } from '../entity/Currency';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dto/CreateUserDto';
import { plainToClass } from 'class-transformer';

const router = Router();
const userRepo = AppDataSource.getRepository(User);
const currencyRepo = AppDataSource.getRepository(Currency);

router.post('/', async (req: Request, res: Response) => {
    const dto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ error: "Validation failed", details: errors });

    const user = new User();
    user.name = dto.name;

    if (dto.defaultCurrencyId) {
        const currency = await currencyRepo.findOneBy({ id: dto.defaultCurrencyId });
        if (currency) user.defaultCurrency = currency;
    }

    await userRepo.save(user);
    res.status(201).json(user);
});

router.get('/:id', async (req: Request, res: Response) => {
    const user = await userRepo.findOne({ 
        where: { id: req.params.id },
        relations: ["defaultCurrency"]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

router.get('/', async (req, res) => {
    const users = await userRepo.find({ relations: ["defaultCurrency"] });
    res.json(users);
});

router.delete('/:id', async (req, res) => {
    const result = await userRepo.delete(req.params.id);
    if (result.affected === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
});

export default router;
