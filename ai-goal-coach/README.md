## ai-goal-coach

Telegram бот + WebApp для постановки целей, декомпозиции на задачи и трекинга прогресса.

### Быстрый старт

#### Backend
1) Перейдите в `backend/` и скопируйте переменные окружения:

```bash
cp .env.example .env
```

2) Установите зависимости и примените миграции Prisma:

```bash
npm i
npx prisma migrate dev
```

3) Запустите dev-сервер:

```bash
npm run dev
```

#### Frontend
```bash
cd ../frontend
npm i
npm run dev
```

