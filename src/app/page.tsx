"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, Zap, Lightbulb } from "lucide-react";
import {
  VivaResolutionSelect,
  VivaDurationSelect,
  VivaModelSelect,
} from "@/components/ui/viva";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [selectedModel, setSelectedModel] = useState("stable-xl");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Локальный список моделей – по структуре совпадает с Model в VivaModelSelect
  const models = [
    {
      id: "stable-xl",
      name: "Stable XL",
      description: "High-quality animation with excellent details.",
      creditCost: 100,
      icon: "✨",
      popular: true,
    },
    {
      id: "sd-turbo",
      name: "SD Turbo",
      description: "Fast generation with good quality.",
      creditCost: 60,
      icon: "🚀",
      fast: true,
    },
    {
      id: "realistic-vision",
      name: "Realistic Vision",
      description: "Photorealistic motion and smooth face details.",
      creditCost: 120,
      icon: "📸",
    },
    {
      id: "anime-style",
      name: "Anime Style",
      description: "Expressive anime-style motion for portraits.",
      creditCost: 80,
      icon: "🎨",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-yellow-400" />
          Create Animation
        </h1>
        <p className="text-white/60">
          Generate stunning animated videos from a single photo.
        </p>
      </motion.div>

      {/* SETTINGS PANEL */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-6">
          {/* VivaModelSelect с корректными пропсами */}
          <VivaModelSelect
            models={models}
            onModelChange={(id) => setSelectedModel(id)}
          />

          <VivaResolutionSelect />
          <VivaDurationSelect />
        </div>

        {/* Right: Feature Cards */}
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 flex items-center gap-4"
          >
            <Flame className="w-7 h-7 text-orange-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                High-Quality Motion
              </h3>
              <p className="text-white/60 text-sm">
                Smooth, realistic animation based on your photo.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 flex items-center gap-4"
          >
            <Zap className="w-7 h-7 text-blue-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                Fast Processing
              </h3>
              <p className="text-white/60 text-sm">
                Generation takes less than 10 seconds.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 flex items-center gap-4"
          >
            <Lightbulb className="w-7 h-7 text-yellow-300" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                Smart Enhancement
              </h3>
              <p className="text-white/60 text-sm">
                AI improves lighting, colors, and sharpness.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-4 bg-yellow-400 text-black rounded-xl font-bold text-lg"
      >
        Generate Animation (model: {selectedModel})
      </motion.button>
    </div>
  );
}
