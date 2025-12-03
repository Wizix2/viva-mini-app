/**
 * Artlist AI Suite TypeScript interfaces
 * These interfaces define the structure of requests and responses for the Artlist AI API
 */

// Supported AI models
export type ArtlistModel = 'veo' | 'sora' | 'nano';

// Generation options interface
export interface GenerationOptions {
  imageId: string;
  prompt: string;
  model: ArtlistModel;
}

// Upload response interface
export interface ArtlistUploadResponse {
  imageId: string;
  status: 'success' | 'error';
  error?: string;
}

// Generation task interface
export interface ArtlistTask {
  taskId: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  model: ArtlistModel;
  createdAt: string;
  updatedAt: string;
  videoUrl?: string;
  error?: string;
}

// Generation response interface
export interface ArtlistGenerateResponse {
  taskId: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  error?: string;
}

// Status response interface
export interface ArtlistStatusResponse {
  taskId: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  videoUrl?: string;
  model?: ArtlistModel;
  error?: string;
}

// Model descriptions for UI display
export const MODEL_DESCRIPTIONS = {
  veo: {
    name: 'Full Body Video (Veo)',
    description: 'Generate realistic full-body videos with natural movements',
    icon: '🎬'
  },
  sora: {
    name: 'Creative Scene (Sora)',
    description: 'Place your image in creative, imaginative scenes',
    icon: '🎨'
  },
  nano: {
    name: 'Motion Body Animation (Nano Banana Pro)',
    description: 'Create smooth animated movements from still images',
    icon: '💃'
  }
};

