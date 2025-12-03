import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';

// Обработчик для улучшения изображения
export async function POST(req: Request) {
  try {
    // Получаем FormData с файлом
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Создаем уникальный ID для задачи
    const taskId = uuidv4();
    
    // Создаем директорию для загрузки, если её нет
    const uploadDir = path.join(process.cwd(), "public/uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Директория уже существует или ошибка создания
      console.error("Error creating upload directory:", err);
    }
    
    // Получаем расширение файла
    const fileExtension = file.name.split('.').pop() || 'jpg';
    
    // Создаем путь для сохранения файла
    const fileName = `${taskId}.${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Сохраняем файл
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);
    
    // URL для доступа к файлу
    const fileUrl = `/uploads/${fileName}`;
    
    // В реальном приложении здесь будет вызов API для улучшения изображения
    // Для демонстрации просто сохраняем информацию о задаче
    
    // Сохраняем информацию о задаче
    const taskInfo = {
      id: taskId,
      file_url: fileUrl,
      enhanced_url: fileUrl, // В реальном приложении здесь будет URL улучшенного изображения
      status: 'processing', // Имитируем обработку
      created_at: new Date().toISOString()
    };
    
    // Для демонстрации сохраняем в файл
    const tasksDir = path.join(process.cwd(), "public/tasks");
    try {
      await mkdir(tasksDir, { recursive: true });
    } catch (err) {
      console.error("Error creating tasks directory:", err);
    }
    
    await writeFile(
      path.join(tasksDir, `${taskId}.json`),
      JSON.stringify(taskInfo)
    );
    
    // Имитируем асинхронную обработку
    setTimeout(async () => {
      try {
        // Обновляем статус задачи
        taskInfo.status = 'done';
        await writeFile(
          path.join(tasksDir, `${taskId}.json`),
          JSON.stringify(taskInfo)
        );
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }, 5000); // Задержка в 5 секунд для имитации обработки
    
    return NextResponse.json({ id: taskId }, { status: 200 });
  } catch (err: any) {
    console.error("Error in /api/enhance:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

