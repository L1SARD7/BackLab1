import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Секретний ключ (в реальності має бути в .env, для лаби хардкодимо, як в прикладі методички)
export const JWT_SECRET = process.env.JWT_SECRET || "super-secret-lab4-key";

export interface AuthRequest extends Request {
    user?: { id: string; name: string };
}

export const checkJwt = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Отримуємо токен з заголовка: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: "authorization_required", description: "Request does not contain an access token" });
    }

    const token = authHeader.split(' ')[1]; // Беремо частину після "Bearer"

    try {
        // 2. Перевіряємо токен
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; name: string };
        req.user = decoded; // Записуємо дані юзера в запит
        next(); // Пропускаємо далі
    } catch (error) {
        return res.status(401).json({ error: "invalid_token", message: "Signature verification failed or token expired" });
    }
};
