import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * API маршрут для загрузки изображений
 * В реальном проекте лучше использовать Cloudflare R2 или другое облачное хранилище
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем FormData от клиента
    const formData = await request.formData();
    
    // Проверяем наличие файла
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    // Создаем уникальное имя файла
    const fileName = `${uuidv4()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
    
    // Путь для сохранения файла
    // В production лучше использовать облачное хранилище
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);
    
    // Преобразуем File в ArrayBuffer и затем в Buffer для записи
    const buffer = Buffer.from(await file.arrayBuffer());
    
    try {
      // Создаем директорию, если она не существует
      await mkdir(uploadDir, { recursive: true });
      
      // Сохраняем файл
      await writeFile(filePath, buffer);
      
      // URL для доступа к файлу
      // В production это будет URL из облачного хранилища
      const fileUrl = `${request.nextUrl.origin}/uploads/${fileName}`;
      
      return NextResponse.json({
        source_image: fileUrl
      });
    } catch (error) {
      console.error("Error saving file:", error);
      return NextResponse.json(
        { error: "Failed to save file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in upload route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
