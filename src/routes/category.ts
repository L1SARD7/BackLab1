import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entity/Category';
import { checkJwt } from '../middleware/auth'; // Імпорт middleware

const router = Router();
const categoryRepo = AppDataSource.getRepository(Category);

// Додаємо checkJwt перед обробником
router.post('/', checkJwt, async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const category = categoryRepo.create({ name });
    await categoryRepo.save(category);
    res.status(201).json(category);
});

router.get('/', checkJwt, async (req, res) => {
    const categories = await categoryRepo.find();
    res.json(categories);
});

router.delete('/', checkJwt, async (req: Request, res: Response) => {
    const id = req.query.id as string;
    if (!id) return res.status(400).json({ error: "Provide id as query param" });

    const result = await categoryRepo.delete(id);
    if (result.affected === 0) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
});

export default router;
