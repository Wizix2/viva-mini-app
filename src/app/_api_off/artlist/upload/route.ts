import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getUploadHeaders } from "@/services/artlistClient";
import { ArtlistUploadResponse } from "@/types/artlist";

export const runtime = "nodejs";

/**
 * Handles image upload for Artlist AI processing
 * Validates file type and size, saves locally, and returns an ID
 */
export async function POST(req: Request) {
  try {
    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded", status: "error" }, 
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are supported", status: "error" }, 
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB", status: "error" }, 
        { status: 400 }
      );
    }

    // Create a unique ID for the image
    const imageId = uuidv4();
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });
    
    // Get file extension
    const fileExtension = file.name.split('.').pop() || 'jpg';
    
    // Create file path
    const fileName = `${imageId}.${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Save file to disk
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);
    
    // In production, we would upload to Artlist API here
    // For now, we'll just return the local file ID
    
    // Mock response for development
    const response: ArtlistUploadResponse = {
      imageId,
      status: 'success'
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error in /api/artlist/upload:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image", status: "error" }, 
      { status: 500 }
    );
  }
}

