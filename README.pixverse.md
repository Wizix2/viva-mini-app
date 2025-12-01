# Интеграция с PixVerse API

## Настройка переменных окружения

Для работы с PixVerse API необходимо создать файл `` в корне проекта со следующим содержимым:

```
# PixVerse API Key - получите ключ на https://pixverse.ai
NEXT_PUBLIC_PIXVERSE_API_KEY=your_pixverse_api_key_here

# Режим разработки
NODE_ENV=development
```

## Использование PixVerse API

Сервис `PixVerseService` предоставляет следующие методы для работы с API:

### Загрузка изображения

```typescript
import PixVerseService from '@/services/pixverse';

// Загрузка изображения
const fileUrl = await PixVerseService.uploadImage(file);
console.log('Uploaded image URL:', fileUrl);
```

### Создание анимации лица

```typescript
// Создание анимации
const { task_id } = await PixVerseService.createAnimation(fileUrl);
console.log('Animation task created:', task_id);
```

### Проверка статуса задачи

```typescript
// Проверка статуса задачи
const status = await PixVerseService.checkStatus(task_id);
console.log('Task status:', status);
```

### Ожидание завершения задачи

```typescript
// Ожидание завершения задачи (long polling)
try {
  const videoUrl = await PixVerseService.pollUntilDone(task_id);
  console.log('Animation completed! Video URL:', videoUrl);
} catch (error) {
  console.error('Animation failed:', error);
}
```

## Пример полного процесса

```typescript
async function processImage(file: File) {
  try {
    // Шаг 1: Загрузка изображения
    const fileUrl = await PixVerseService.uploadImage(file);
    
    // Шаг 2: Создание анимации
    const { task_id } = await PixVerseService.createAnimation(fileUrl);
    
    // Шаг 3: Ожидание результата
    const videoUrl = await PixVerseService.pollUntilDone(task_id);
    
    // Готово! Используем полученное видео
    return videoUrl;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}
```

