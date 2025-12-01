import { NextRequest, NextResponse } from "next/server";

/**
 * API маршрут для проверки статуса задачи в PixVerse
 */
export async function GET(request: NextRequest) {
  try {
    // Получаем task_id из query параметров
    const taskId = request.nextUrl.searchParams.get("task_id");
    
    // Проверяем наличие task_id
    if (!taskId) {
      return NextResponse.json(
        { error: "task_id is required" },
        { status: 400 }
      );
    }

    // Отправляем запрос к PixVerse API
    const API_KEY = process.env.NEXT_PUBLIC_PIXVERSE_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_PIXVERSE_BASE_URL || "https://api.pixverse.ai/api/v1";
    
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    // Проверяем статус ответа
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: `Status check failed: ${response.status} ${response.statusText}`, details: errorData },
        { status: response.status }
      );
    }

    // Возвращаем результат клиенту
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in status route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

