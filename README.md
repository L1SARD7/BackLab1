# Lab 4: Authentication (JWT)

**Група**: 31
**Варіант**: 1 (Валюти).

## Функціонал
- **Реєстрація**: `POST /user/register` (хешування пароля).
- **Логін**: `POST /user/login` (видача JWT).
- **Захист**: Всі операції з категоріями та витратами потребують заголовок `Authorization: Bearer <token>`.

## Запуск
1. `docker-compose up -d`
2. `npm install && npm run dev`
