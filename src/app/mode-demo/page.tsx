"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ModeSwitcher, GenerationMode } from "@/components/ui/viva";

export default function ModeDemoPage() {
  const [activeMode, setActiveMode] = useState<GenerationMode>("textToImage");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Generation Mode Switcher</h1>
        <p className="text-white/70">
          Artlist-inspired mode switching between text and image inputs for AI generation
        </p>
      </motion.div>

      <div className="space-y-8">
        <ModeSwitcher 
          onModeChange={(mode) => {
            setActiveMode(mode);
            console.log(`Mode changed to: ${mode}`);
          }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="viva-card"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Active Generation Mode</h2>
          <div className="bg-white/10 p-4 rounded-xl">
            <code className="text-viva-yellow">{activeMode}</code>
          </div>
          
          <div className="mt-6 text-white/70">
            <h3 className="font-medium mb-2">Mode Details:</h3>
            {activeMode === 'textToImage' && (
              <p>Generate images from text descriptions using AI models.</p>
            )}
            {activeMode === 'imageToImage' && (
              <p>Transform existing images into new styles or variations.</p>
            )}
            {activeMode === 'textToVideo' && (
              <p>Create videos from text descriptions using AI video generation.</p>
            )}
            {activeMode === 'imageToVideo' && (
              <p>Animate static images into dynamic videos with AI motion.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
