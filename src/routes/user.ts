import { Router, Request, Response } from 'express';
import { generateId } from '../utils';
import { db } from '../store';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newUser = { id: generateId(), name };
    db.users.push(newUser);
    res.status(201).json(newUser);
});

router.get('/:id', (req: Request, res: Response) => {
    const user = db.users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

router.get('/', (req: Request, res: Response) => {
    res.json(db.users);
});

router.delete('/:id', (req: Request, res: Response) => {
    const index = db.users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    
    db.users.splice(index, 1);
    res.status(200).json({ message: 'User deleted' });
});

export default router;
