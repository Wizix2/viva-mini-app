import { NextRequest, NextResponse } from "next/server";

/**
 * API маршрут для загрузки изображений в PixVerse
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

    // Создаем новый FormData для отправки на PixVerse API
    const pixverseFormData = new FormData();
    pixverseFormData.append("file", file);

    // Отправляем запрос к PixVerse API
    const API_KEY = process.env.NEXT_PUBLIC_PIXVERSE_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_PIXVERSE_BASE_URL || "https://api.pixverse.ai/api/v1";
    
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      },
      body: pixverseFormData
    });

    // Проверяем статус ответа
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: `Upload failed: ${response.status} ${response.statusText}`, details: errorData },
        { status: response.status }
      );
    }

    // Возвращаем результат клиенту
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in upload route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


