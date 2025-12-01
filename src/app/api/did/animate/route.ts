import { NextResponse } from "next/server";
import { getAuthHeader } from "@/services/didClient";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const response = await fetch("https://api.d-id.com/v1/talks", {
      method: "POST",
      headers: {
        "Authorization": getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: data.source_image,
        script: {
          type: "text",
          input: "Hello! I'm alive!",
        },
        // можно добавить конфиг при желании:
        // config: { stitch: true }
      }),
    });
    const json = await response.json();
    return NextResponse.json(json, { status: response.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}