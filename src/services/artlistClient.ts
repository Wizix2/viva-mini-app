/**
 * Artlist AI Suite API Client
 * Utility functions for interacting with the Artlist AI API
 */

import { ArtlistModel, ArtlistTask } from "@/types/artlist";

// Helper function to get the API key and base URL
export const getArtlistConfig = () => {
  const apiKey = process.env.ARTLIST_API_KEY;
  const baseUrl = process.env.ARTLIST_API_BASE_URL || 'https://api.artlist.io';

  if (!apiKey) {
    console.warn('ARTLIST_API_KEY is not defined in environment variables');
  }

  return {
    apiKey,
    baseUrl
  };
};

// Helper function to get authorization headers
export const getAuthHeaders = () => {
  const { apiKey } = getArtlistConfig();
  
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };
};

// Helper function for file upload headers
export const getUploadHeaders = () => {
  const { apiKey } = getArtlistConfig();
  
  return {
    'Authorization': `Bearer ${apiKey}`
  };
};

// Mock implementation for local development and testing
export const mockArtlistResponse = (model: ArtlistModel) => {
  // Demo video URLs for different models
  const demoVideos = {
    veo: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    sora: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    nano: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  };

  // Create a mock task
  const mockTask: ArtlistTask = {
    taskId: `demo-task-${model}-${Date.now()}`,
    status: 'pending',
    model,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return {
    mockTask,
    mockVideoUrl: demoVideos[model]
  };
};

