import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Record } from '../entity/Record';
import { User } from '../entity/User';
import { Category } from '../entity/Category';
import { Currency } from '../entity/Currency';
import { validate } from 'class-validator';
import { CreateRecordDto } from '../dto/CreateRecordDto';
import { plainToClass } from 'class-transformer';
import { checkJwt, AuthRequest } from '../middleware/auth';

const router = Router();
const recordRepo = AppDataSource.getRepository(Record);
const userRepo = AppDataSource.getRepository(User);
const categoryRepo = AppDataSource.getRepository(Category);
const currencyRepo = AppDataSource.getRepository(Currency);

router.post('/', checkJwt, async (req: AuthRequest, res: Response) => {
    const dto = plainToClass(CreateRecordDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ error: "Validation failed", details: errors });

    // Можна додати перевірку, чи створює юзер запис для себе
    // if (req.user!.id !== dto.user_id) return res.status(403).json({ error: "Forbidden" });

    const user = await userRepo.findOne({ 
        where: { id: dto.user_id },
        relations: ["defaultCurrency"]
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const category = await categoryRepo.findOneBy({ id: dto.category_id });
    if (!category) return res.status(404).json({ error: "Category not found" });

    let currency: Currency | null = null;
    if (dto.currency_id) {
        currency = await currencyRepo.findOneBy({ id: dto.currency_id });
    } else if (user.defaultCurrency) {
        currency = user.defaultCurrency;
    }

    if (!currency) return res.status(400).json({ error: "Currency required" });

    const record = new Record();
    record.amount = dto.amount;
    record.user = user;
    record.category = category;
    record.currency = currency;

    await recordRepo.save(record);
    res.status(201).json(record);
});

router.get('/', checkJwt, async (req: Request, res: Response) => {
    const { user_id, category_id } = req.query;
    
    // Тут валідацію фільтрів можна послабити або залишити
    if (!user_id && !category_id) return res.status(400).json({ error: "Filters required" });

    const query = recordRepo.createQueryBuilder("record")
        .leftJoinAndSelect("record.user", "user")
        .leftJoinAndSelect("record.category", "category")
        .leftJoinAndSelect("record.currency", "currency");

    if (user_id) query.andWhere("user.id = :uid", { uid: user_id });
    if (category_id) query.andWhere("category.id = :cid", { cid: category_id });

    const records = await query.getMany();
    res.json(records);
});

router.get('/:id', checkJwt, async (req, res) => {
    const record = await recordRepo.findOne({
        where: { id: req.params.id },
        relations: ["user", "category", "currency"]
    });
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
});

router.delete('/:id', checkJwt, async (req, res) => {
    const result = await recordRepo.delete(req.params.id);
    if (result.affected === 0) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted" });
});

export default router;
