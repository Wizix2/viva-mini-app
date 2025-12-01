# VIVA — AI Mini App для Telegram

VIVA — это приложение для Telegram Mini Apps, которое позволяет оживлять фотографии, улучшать изображения и создавать короткие AI-видео с помощью PixVerse API.

## Функциональность

- **Оживление фото**: анимация лиц на фотографиях
- **Улучшение качества**: повышение четкости и детализации изображений
- **История генераций**: сохранение и просмотр предыдущих результатов
- **Интеграция с Telegram**: шаринг результатов через Telegram

## Технический стек

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [tma.js](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/2-x) (Telegram Mini Apps SDK)
- [PixVerse API](https://pixverse.ai/)
- [Vercel](https://vercel.com/) для деплоя

## Установка зависимостей

```bash
npm install
# или
yarn install
# или
pnpm install
```

## Скрипты

- `dev`: Запуск приложения в режиме разработки
- `dev:https`: Запуск приложения в режиме разработки с использованием SSL-сертификата
- `build`: Сборка приложения для продакшена
- `start`: Запуск Next.js сервера в продакшен-режиме
- `lint`: Проверка кода с помощью ESLint

Для запуска скрипта используйте команду:

```bash
npm run <скрипт>
# Пример: npm run dev
```

## Настройка переменных окружения

Создайте файл `.env.local` в корне проекта и добавьте следующие переменные:

```
NEXT_PUBLIC_PIXVERSE_API_KEY=ваш_ключ_api
NEXT_PUBLIC_PIXVERSE_API_URL=https://api.pixverse.ai
```

## Структура проекта

```
/src
  /app                  # Страницы приложения (App Router)
    /page.tsx           # Главная страница
    /upload/page.tsx    # Страница загрузки фото
    /result/page.tsx    # Страница результата
    /history/page.tsx   # История генераций
  /components           # Компоненты React
  /contexts             # React контексты
    /TelegramContext.tsx
    /PixVerseContext.tsx
  /services             # Сервисы для API
    /telegram.ts
    /pixverse.ts
  /hooks                # React хуки
```

## Деплой на Vercel

Самый простой способ развернуть приложение — использовать [Vercel Platform](https://vercel.com/new).

1. Создайте новый проект на Vercel и подключите его к вашему репозиторию
2. Настройте переменные окружения в настройках проекта:
   - `NEXT_PUBLIC_PIXVERSE_API_KEY`
   - `NEXT_PUBLIC_PIXVERSE_API_URL`
3. Дождитесь завершения деплоя
4. Используйте полученный URL для настройки вашего Telegram бота через [@BotFather](https://t.me/botfather)

## Интеграция с Telegram Mini Apps

1. Создайте бота с помощью [@BotFather](https://t.me/botfather)
2. Отправьте команду `/newapp` боту BotFather
3. Выберите созданного бота
4. Укажите название и короткое описание для Mini App
5. Загрузите иконку
6. Укажите URL вашего приложения (например, `https://your-app.vercel.app`)
7. Сохраните полученный токен и используйте его для авторизации

## Полезные ссылки

- [Документация Telegram Mini Apps](https://docs.telegram-mini-apps.com/)
- [Документация Next.js](https://nextjs.org/docs)
- [Документация TailwindCSS](https://tailwindcss.com/docs)
- [Документация PixVerse API](https://pixverse.ai/docs)
- [Сообщество разработчиков Telegram](https://t.me/devs)