import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Формируем base64 для Basic Auth
    const apiKey = process.env.DID_API_KEY!; 
    const auth = Buffer.from(apiKey).toString("base64");

    // Загружаем фото в D-ID (новый upload endpoint)
    const uploadRes = await fetch("https://api.d-id.com/images", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
      },
      body: file
    });

    const uploadJson = await uploadRes.json();
    if (!uploadJson.id) {
      console.error("Upload error:", uploadJson);
      return NextResponse.json({ error: "Upload failed", details: uploadJson }, { status: 500 });
    }

    // Теперь создаем Talking Portrait
    const createRes = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: `https://api.d-id.com/images/${uploadJson.id}`,
        script: {
          type: "text",
          input: "Hello! Your photo is now animated!",
        },
      }),
    });

    const createJson = await createRes.json();
    console.log("Create response:", createJson);

    return NextResponse.json({ id: createJson.id });
  } catch (e) {
    console.error("ANIMATE ERROR:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}