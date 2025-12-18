import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Currency } from '../entity/Currency';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dto/CreateUserDto';
import { LoginDto } from '../dto/LoginDto';
import { plainToClass } from 'class-transformer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/auth';

const router = Router();
const userRepo = AppDataSource.getRepository(User);
const currencyRepo = AppDataSource.getRepository(Currency);

// --- REGISTER (Створення юзера з хешуванням пароля) ---
router.post('/register', async (req: Request, res: Response) => {
    const dto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ error: "Validation failed", details: errors });

    // Перевірка чи існує такий юзер
    const existing = await userRepo.findOneBy({ name: dto.name });
    if (existing) return res.status(409).json({ error: "Username already taken" });

    const user = new User();
    user.name = dto.name;
    // Хешуємо пароль перед збереженням!
    user.password = await bcrypt.hash(dto.password, 10);

    if (dto.defaultCurrencyId) {
        const currency = await currencyRepo.findOneBy({ id: dto.defaultCurrencyId });
        if (currency) user.defaultCurrency = currency;
    }

    await userRepo.save(user);
    
    // Не повертаємо пароль
    const { password, ...userResponse } = user;
    res.status(201).json(userResponse);
});

// --- LOGIN (Видача токена) ---
router.post('/login', async (req: Request, res: Response) => {
    const dto = plainToClass(LoginDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ error: "Validation failed" });

    // 1. Шукаємо юзера (додаємо select: ["password"], бо за замовчуванням він прихований)
    const user = await userRepo.findOne({ 
        where: { name: dto.name },
        select: ["id", "name", "password"] 
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // 2. Перевіряємо пароль
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    // 3. Генеруємо токен
    const token = jwt.sign(
        { id: user.id, name: user.name }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.json({ access_token: token });
});

export default router;
