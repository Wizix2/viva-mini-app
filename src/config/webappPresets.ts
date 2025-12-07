export type WebAppPreset = {
  label: string;
  prompt: string;
};

/**
 * Presets for Image generation
 */
export const IMAGE_TEXT_PRESETS: WebAppPreset[] = [
  {
    label: "Cinematic portrait",
    prompt: "Cinematic portrait, soft natural light, 85mm lens, shallow depth of field, film look",
  },
  {
    label: "Studio beauty shot",
    prompt: "Ultra detailed studio portrait, soft beauty lighting, smooth skin, high-end retouch",
  },
  {
    label: "Dreamy film look",
    prompt: "Dreamy film-style portrait, soft-focus, pastel tones, slight grain",
  },
  {
    label: "Moody close-up",
    prompt: "Moody portrait, warm color grading, 35mm lens look, strong contrast",
  },
];

export const IMAGE_IMAGE_PRESETS: WebAppPreset[] = [
  {
    label: "Enhance quality",
    prompt: "Enhance sharpness, fix colors, cinematic contrast, keep identity",
  },
  {
    label: "Film color grade",
    prompt: "Apply cinematic teal and orange color grading, subtle grain, soft highlights",
  },
  {
    label: "Soft portrait retouch",
    prompt: "Natural skin retouch, soften blemishes, keep details and texture",
  },
  {
    label: "Stylized illustration",
    prompt: "Turn this photo into a modern digital illustration, clean lines, soft shading",
  },
];

/**
 * Presets for Video generation
 */
export const VIDEO_TEXT_PRESETS: WebAppPreset[] = [
  {
    label: "Subway cinematic shot",
    prompt: "Cinematic slow-motion shot of a woman walking in a subway train, film look, shallow depth of field",
  },
  {
    label: "Epic drone over mountains",
    prompt: "Epic drone shot flying over snowy mountains at sunrise, volumetric light, dramatic sky",
  },
  {
    label: "Cyberpunk street",
    prompt: "Cyberpunk neon street at night, light rain, reflections on wet ground, handheld camera",
  },
  {
    label: "Dreamy clouds",
    prompt: "Dream-like camera flight through soft glowing clouds, slow motion, magical atmosphere",
  },
];

export const VIDEO_IMAGE_PRESETS: WebAppPreset[] = [
  {
    label: "Animate portrait",
    prompt: "Animate this portrait with natural head movements, smooth eye blinking and breathing",
  },
  {
    label: "Parallax depth",
    prompt: "Create a smooth parallax depth animation from this photo, subtle 3D camera movement",
  },
  {
    label: "Cinematic push-in",
    prompt: "Slow cinematic push-in camera movement with film look and light grain",
  },
  {
    label: "Looping subtle motion",
    prompt: "Create a seamless looping video with very subtle motion, perfect for social media",
  },
];
