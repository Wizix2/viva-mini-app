import { NextResponse } from "next/server";
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { getAuthHeaders, mockArtlistResponse } from "@/services/artlistClient";
import { ArtlistGenerateResponse, GenerationOptions } from "@/types/artlist";

export const runtime = "nodejs";

/**
 * Handles video generation requests for Artlist AI
 * Accepts image ID, prompt, and model type
 */
export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    const { imageId, prompt, model } = body as GenerationOptions;

    // Validate required fields
    if (!imageId) {
      return NextResponse.json(
        { error: "Missing imageId", status: "error" }, 
        { status: 400 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt", status: "error" }, 
        { status: 400 }
      );
    }

    if (!model || !['veo', 'sora', 'nano'].includes(model)) {
      return NextResponse.json(
        { error: "Invalid or missing model. Must be one of: veo, sora, nano", status: "error" }, 
        { status: 400 }
      );
    }

    // In production, we would send a request to Artlist API here
    // For now, we'll create a mock task and save it locally

    // Get mock task data
    const { mockTask } = mockArtlistResponse(model);
    
    // Create tasks directory if it doesn't exist
    const tasksDir = path.join(process.cwd(), "public/tasks");
    await mkdir(tasksDir, { recursive: true });
    
    // Save task info to disk
    await writeFile(
      path.join(tasksDir, `${mockTask.taskId}.json`),
      JSON.stringify({
        ...mockTask,
        imageId,
        prompt,
        // Simulate processing that will complete after some time
        _mockCompleteAfter: Date.now() + 10000 // 10 seconds
      })
    );
    
    // Prepare response
    const response: ArtlistGenerateResponse = {
      taskId: mockTask.taskId,
      status: 'pending'
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error in /api/artlist/generate:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate video", status: "error" }, 
      { status: 500 }
    );
  }
}

