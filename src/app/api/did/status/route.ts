import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const auth = Buffer.from(process.env.DID_API_KEY!).toString("base64");

    const statusRes = await fetch(`https://api.d-id.com/talks/${id}`, {
      headers: {
        "Authorization": `Basic ${auth}`,
      }
    });

    const statusJson = await statusRes.json();

    return NextResponse.json(statusJson);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}