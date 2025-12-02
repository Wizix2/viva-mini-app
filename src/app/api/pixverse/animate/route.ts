import { NextRequest, NextResponse } from "next/server";

/**
 * API маршрут для создания анимации через PixVerse
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем данные от клиента
    const requestData = await request.json();
    
    // Проверяем наличие обязательных полей
    if (!requestData.image_url) {
      return NextResponse.json(
        { error: "image_url is required" },
        { status: 400 }
      );
    }

    // Подготавливаем данные для отправки на PixVerse API
    const pixverseRequestData = {
      task_type: "face_animation",
      input: {
        image_url: requestData.image_url,
        preset: requestData.preset || "face_animation",
        prompt: requestData.prompt || "animate this face, natural movement"
      }
    };

    // Отправляем запрос к PixVerse API
    const API_KEY = process.env.NEXT_PUBLIC_PIXVERSE_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_PIXVERSE_BASE_URL || "https://api.pixverse.ai/api/v1";
    
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pixverseRequestData)
    });

    // Проверяем статус ответа
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: `Animation creation failed: ${response.status} ${response.statusText}`, details: errorData },
        { status: response.status }
      );
    }

    // Возвращаем результат клиенту
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in animate route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


