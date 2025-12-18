import { Router, Request, Response } from 'express';
import { generateId } from '../utils';
import { db } from '../store';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newCategory = { id: generateId(), name };
    db.categories.push(newCategory);
    res.status(201).json(newCategory);
});

router.get('/', (req: Request, res: Response) => {
    res.json(db.categories);
});

router.delete('/', (req: Request, res: Response) => {
    if (req.query.id) {
         const index = db.categories.findIndex(c => c.id === req.query.id);
         if (index !== -1) {
             db.categories.splice(index, 1);
             return res.json({ message: 'Category deleted' });
         }
    }
    return res.status(400).json({ error: 'Provide id as query param' });
});

export default router;
