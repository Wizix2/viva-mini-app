"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Zap, Lightbulb } from "lucide-react";
import {
  VivaResolutionSelect,
  VivaDurationSelect,
  VivaScrollablePanel,
  VivaMediaCard,
  VivaCreditsBadge,
  ModelSelect,
  ModeSwitcher,
  GenerationMode
} from "@/components/ui/viva";

export default function Home() {
  const [activeMode, setActiveMode] = useState<GenerationMode>("textToImage");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedResolution, setSelectedResolution] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(300);
  
  // Mock cost calculation based on settings
  const calculateCost = () => {
    let cost = 100; // Base cost
    
    // Add cost based on resolution
    if (selectedResolution === "4k") cost += 100;
    else if (selectedResolution === "1080p") cost += 50;
    
    // Add cost based on duration for videos
    if (activeMode.includes("Video")) {
      if (selectedDuration === "long") cost += 100;
      else if (selectedDuration === "medium") cost += 50;
    }
    
    return cost;
  };
  
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">Create</h1>
        <p className="text-white/70">
          Generate stunning AI images and videos with just a few clicks
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ModeSwitcher 
          onModeChange={(mode) => setActiveMode(mode)}
          initialMode="textToImage"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 space-y-6"
        >

          {/* Settings Panel */}
          <div className="bg-black/30 backdrop-blur-2xl rounded-[20px] border border-white/10 p-8 shadow-lg">
            <h2 className="text-xl font-medium text-white mb-6 flex items-center">
              <Fire className="w-5 h-5 text-yellow-400 mr-2" />
              Generation Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">Resolution</label>
                <VivaResolutionSelect onResolutionChange={(res) => setSelectedResolution(res.id)} />
              </div>
              
              <AnimatePresence>
                {(activeTab === "text-to-video" || activeTab === "image-to-video") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-white/70 mb-3">Duration</label>
                    <VivaDurationSelect onDurationChange={(dur) => setSelectedDuration(dur.id)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(245, 215, 66, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-medium rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-yellow-glow text-lg disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Fire className="w-6 h-6" />
                <span>Generate</span>
                <span className="ml-2 px-2 py-0.5 bg-black/20 rounded-md text-sm">
                  {calculateCost()} credits
                </span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Models Panel */}
        <motion.div variants={itemVariants}>
          <ModelSelect
            title="AI Models"
            subtitle="Choose the perfect model for your generation"
            onModelSelect={(modelId) => {
              setSelectedModel(modelId);
              console.log(`Selected model: ${modelId}`);
            }}
          />
        </motion.div>
      </div>

      {/* Explore Section */}
      <motion.div
        variants={itemVariants}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Explore Results</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <VivaMediaCard
                id={`explore-${i}`}
                type={i % 2 === 0 ? "video" : "image"}
                src={`https://picsum.photos/seed/${i + 400}/600/600`}
                prompt={i % 2 === 0 
                  ? "A futuristic cityscape with neon lights and flying cars"
                  : "Abstract digital art with vibrant colors and geometric shapes"
                }
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}