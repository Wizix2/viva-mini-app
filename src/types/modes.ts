export type MainMode = 'image' | 'video';
export type SubMode = 'text-image' | 'image-image' | 'text-video' | 'image-video';

export interface GenerationPrice {
  'text-image': number;
  'image-image': number;
  'text-video': number;
  'image-video': number;
}

export const GENERATION_PRICES: GenerationPrice = {
  'text-image': 50,
  'image-image': 40,
  'text-video': 100,
  'image-video': 120
};
