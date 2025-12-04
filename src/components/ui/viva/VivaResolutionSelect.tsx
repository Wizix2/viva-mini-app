"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Resolution {
  id: string;
  label: string;
  width: number;
  height: number;
  creditMultiplier: number;
  description?: string;
}

interface VivaResolutionSelectProps {
  onResolutionChange?: (resolution: Resolution) => void;
}

export function VivaResolutionSelect({ onResolutionChange }: VivaResolutionSelectProps) {
  const [selectedResolution, setSelectedResolution] = useState<string>(resolutions[1].id);

  const handleResolutionChange = (resolutionId: string) => {
    setSelectedResolution(resolutionId);
    
    if (onResolutionChange) {
      const resolution = resolutions.find(r => r.id === resolutionId);
      if (resolution) {
        onResolutionChange(resolution);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="bg-black/20 backdrop-blur-xl rounded-xl p-1.5 flex">
        {resolutions.map((resolution) => {
          const isActive = selectedResolution === resolution.id;
          
          return (
            <motion.button
              key={resolution.id}
              onClick={() => handleResolutionChange(resolution.id)}
              whileHover={{ 
                backgroundColor: isActive ? undefined : "rgba(255, 255, 255, 0.05)" 
              }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex-1 flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "text-black" : "text-white/70 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeResolution"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-yellow-glow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {resolution.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Resolution description */}
      <AnimatedDescription resolutions={resolutions} selectedId={selectedResolution} />
    </div>
  );
}

// Animated description component
function AnimatedDescription({ 
  resolutions, 
  selectedId 
}: { 
  resolutions: Resolution[], 
  selectedId: string 
}) {
  const selectedResolution = resolutions.find(r => r.id === selectedId);
  
  return (
    <motion.div 
      className="h-8 text-xs text-white/50 px-1 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <div className="w-3 h-3 rounded-full bg-yellow-400/30 mr-2"></div>
          <span>
            {selectedResolution?.width}×{selectedResolution?.height}px
            {selectedResolution?.description && ` — ${selectedResolution.description}`}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const resolutions: Resolution[] = [
  {
    id: "square",
    label: "1:1",
    width: 1024,
    height: 1024,
    creditMultiplier: 1.0,
    description: "Perfect for social media posts"
  },
  {
    id: "portrait",
    label: "2:3",
    width: 832,
    height: 1216,
    creditMultiplier: 1.2,
    description: "Ideal for mobile screens and stories"
  },
  {
    id: "landscape",
    label: "16:9",
    width: 1344,
    height: 768,
    creditMultiplier: 1.2,
    description: "Standard widescreen format"
  },
  {
    id: "4k",
    label: "4K",
    width: 3840,
    height: 2160,
    creditMultiplier: 2.0,
    description: "Ultra high definition"
  },
];

export default VivaResolutionSelect;
