import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    // Получаем информацию о задаче из файла
    const taskFilePath = path.join(process.cwd(), "public/tasks", `${id}.json`);
    
    // Проверяем существование файла
    if (!fs.existsSync(taskFilePath)) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    
    // Читаем информацию о задаче
    const taskInfoRaw = await fsPromises.readFile(taskFilePath, 'utf-8');
    const taskInfo = JSON.parse(taskInfoRaw);
    
    // Возвращаем статус клиенту
    return NextResponse.json({
      status: taskInfo.status,
      image_url: taskInfo.enhanced_url || taskInfo.file_url,
      error: taskInfo.error
    });
  } catch (err: any) {
    console.error("Error checking enhance status:", err);
    return NextResponse.json(
      { status: 'error', error: err.message },
      { status: 500 }
    );
  }
}

