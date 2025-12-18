import { Router, Request, Response } from 'express';
import { generateId } from '../utils';
import { db } from '../store';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    const { user_id, category_id, amount } = req.body;
    
    if (!user_id || !category_id || !amount) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    if (!db.users.find(u => u.id === user_id)) return res.status(404).json({ error: 'User not found' });
    if (!db.categories.find(c => c.id === category_id)) return res.status(404).json({ error: 'Category not found' });

    const newRecord = {
        id: generateId(),
        user_id,
        category_id,
        amount,
        timestamp: new Date().toISOString()
    };
    db.records.push(newRecord);
    res.status(201).json(newRecord);
});

router.get('/:id', (req: Request, res: Response) => {
    const record = db.records.find(r => r.id === req.params.id);
    if (record) return res.json(record);
    res.status(404).json({ error: 'Record not found' });
});

router.get('/', (req: Request, res: Response) => {
    const { user_id, category_id } = req.query;

    if (!user_id && !category_id) {
        return res.status(400).json({ error: 'Filters required' });
    }

    let results = db.records;
    if (user_id) results = results.filter(r => r.user_id === String(user_id));
    if (category_id) results = results.filter(r => r.category_id === String(category_id));

    res.json(results);
});

router.delete('/:id', (req: Request, res: Response) => {
    const index = db.records.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Record not found' });
    
    db.records.splice(index, 1);
    res.status(200).json({ message: 'Record deleted' });
});

export default router;
