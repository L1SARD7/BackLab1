# Lab 1: Node.js REST API

## Як запустити

1. **Локально:**
   ```bash
   npm install
   npm run build
   npm start
   ```

2. **Через Docker:**
   ```bash
   docker-compose up --build
   ```

## Ендпоінти
- `GET /` - Головна сторінка
- `GET /healthcheck` - Перевірка стану (повертає дату і статус)
