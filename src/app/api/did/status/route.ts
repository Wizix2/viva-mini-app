import { NextResponse } from "next/server";
import { getAuthHeader } from "@/services/didClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("task_id");

  if (!taskId) {
    return NextResponse.json({ error: "Missing task_id" }, { status: 400 });
  }

  const url = `https://api.d-id.com/v1/talks/${taskId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": getAuthHeader(),
    },
  });

  const json = await response.json();

  return NextResponse.json(json, { status: response.status });
}