"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Clock } from "lucide-react";

interface Model {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  icon?: string;
  popular?: boolean;
  fast?: boolean;
}

interface VivaModelSelectProps {
  models: Model[];
  onModelChange?: (modelId: string) => void;
}

export function VivaModelSelect({ 
  models = defaultModels,
  onModelChange 
}: VivaModelSelectProps) {
  const [selectedModel, setSelectedModel] = useState<string>(models[0]?.id || "");

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    if (onModelChange) {
      onModelChange(modelId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {models.map((model) => {
        const isSelected = selectedModel === model.id;
        
        return (
          <motion.div
            key={model.id}
            whileHover={{ 
              y: -4, 
              boxShadow: isSelected 
                ? "0 10px 25px rgba(245, 215, 66, 0.2)" 
                : "0 10px 25px rgba(255, 255, 255, 0.1)" 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleModelChange(model.id)}
            className={`cursor-pointer rounded-xl p-5 border backdrop-blur-xl transition-all duration-300 ${
              isSelected 
                ? "bg-gradient-to-br from-yellow-400/10 to-yellow-500/5 border-yellow-400/30 shadow-yellow-glow" 
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                  isSelected ? "bg-yellow-400/20" : "bg-white/10"
                }`}>
                  <span className="text-xl">{model.icon || "🤖"}</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-white">{model.name}</h3>
                    {model.popular && (
                      <div className="ml-2 px-1.5 py-0.5 bg-yellow-400/20 rounded-sm flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-[10px] text-yellow-400 uppercase font-medium">Popular</span>
                      </div>
                    )}
                    {model.fast && (
                      <div className="ml-2 px-1.5 py-0.5 bg-blue-400/20 rounded-sm flex items-center">
                        <Zap className="w-3 h-3 text-blue-400 mr-1" />
                        <span className="text-[10px] text-blue-400 uppercase font-medium">Fast</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-white/60 mt-1">{model.description}</p>
                </div>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-3 h-3 text-white/40 mr-1" />
                <span className="text-xs text-white/40">~15 sec</span>
              </div>
              <div className="flex items-center px-2 py-1 bg-yellow-400/10 rounded-md">
                <span className="text-xs font-medium text-yellow-400">{model.creditCost}</span>
                <span className="ml-1 text-xs text-yellow-400/70">credits</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Default models for demo purposes
const defaultModels: Model[] = [
  {
    id: "stable-xl",
    name: "Stable XL",
    description: "High-quality image generation with excellent detail",
    creditCost: 100,
    icon: "✨",
    popular: true
  },
  {
    id: "sd-turbo",
    name: "SD Turbo",
    description: "Fast generation with good quality",
    creditCost: 50,
    icon: "🚀",
    fast: true
  },
  {
    id: "realistic-vision",
    name: "Realistic Vision",
    description: "Photorealistic images with lifelike details",
    creditCost: 120,
    icon: "📸"
  },
  {
    id: "pixel-art",
    name: "Pixel Art",
    description: "Retro-style pixel art generation",
    creditCost: 30,
    icon: "🎮"
  },
  {
    id: "anime-style",
    name: "Anime Style",
    description: "Japanese anime-inspired artwork",
    creditCost: 50,
    icon: "🎨"
  },
  {
    id: "3d-render",
    name: "3D Render",
    description: "3D rendered images with depth and texture",
    creditCost: 150,
    icon: "🌐"
  },
];

export default VivaModelSelect;
