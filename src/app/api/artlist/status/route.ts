import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { writeFile } from 'fs/promises';
import { getAuthHeaders, mockArtlistResponse } from "@/services/artlistClient";
import { ArtlistStatusResponse, ArtlistTask } from "@/types/artlist";

export const runtime = "nodejs";

/**
 * Checks the status of a video generation task
 * Returns the current status and video URL if available
 */
export async function GET(request: Request) {
  try {
    // Get task ID from query parameters
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json(
        { error: "Missing task ID", status: "error" }, 
        { status: 400 }
      );
    }

    // In production, we would check the status with Artlist API
    // For now, we'll read the mock task from disk
    
    const taskFilePath = path.join(process.cwd(), "public/tasks", `${taskId}.json`);
    
    // Check if task file exists
    if (!fs.existsSync(taskFilePath)) {
      return NextResponse.json(
        { error: "Task not found", status: "error" }, 
        { status: 404 }
      );
    }
    
    // Read task info
    const taskInfoRaw = await fsPromises.readFile(taskFilePath, 'utf-8');
    const taskInfo = JSON.parse(taskInfoRaw);
    
    // Check if mock task should be completed
    const now = Date.now();
    if (taskInfo._mockCompleteAfter && now > taskInfo._mockCompleteAfter && taskInfo.status !== 'done') {
      // Update task status to done and add video URL
      const { mockVideoUrl } = mockArtlistResponse(taskInfo.model);
      
      taskInfo.status = 'done';
      taskInfo.videoUrl = mockVideoUrl;
      taskInfo.updatedAt = new Date().toISOString();
      
      // Save updated task info
      await writeFile(taskFilePath, JSON.stringify(taskInfo));
    }
    
    // Prepare response
    const response: ArtlistStatusResponse = {
      taskId: taskInfo.taskId,
      status: taskInfo.status,
      model: taskInfo.model,
      videoUrl: taskInfo.videoUrl,
      error: taskInfo.error
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error checking task status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check task status", status: "error" }, 
      { status: 500 }
    );
  }
}

