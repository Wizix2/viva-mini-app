"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Image as ImageIcon, Video, Upload, Sparkles, Zap } from 'lucide-react';
import { VivaUploadPanel } from '@/components/ui/viva';

export type GenerationMode = 'textToImage' | 'imageToImage' | 'textToVideo' | 'imageToVideo';

interface ModeSwitcherProps {
  onModeChange?: (mode: GenerationMode) => void;
  initialMode?: GenerationMode;
  className?: string;
}

export function ModeSwitcher({
  onModeChange,
  initialMode = 'textToImage',
  className = ''
}: ModeSwitcherProps) {
  const [activeMode, setActiveMode] = useState<GenerationMode>(initialMode);

  const handleModeChange = (mode: GenerationMode) => {
    setActiveMode(mode);
    if (onModeChange) {
      onModeChange(mode);
    }
  };

  const tabs = [
    {
      id: 'textToImage' as GenerationMode,
      label: 'Text → Image',
      icon: MessageSquare,
      secondIcon: ImageIcon
    },
    {
      id: 'imageToImage' as GenerationMode,
      label: 'Image → Image',
      icon: ImageIcon,
      secondIcon: ImageIcon
    },
    {
      id: 'textToVideo' as GenerationMode,
      label: 'Text → Video',
      icon: MessageSquare,
      secondIcon: Video
    },
    {
      id: 'imageToVideo' as GenerationMode,
      label: 'Image → Video',
      icon: ImageIcon,
      secondIcon: Video
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tabs */}
      <div className="bg-black/20 backdrop-blur-lg rounded-lg p-1 flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeMode === tab.id;
          const Icon = tab.icon;
          const SecondIcon = tab.secondIcon;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleModeChange(tab.id)}
              className={`
                relative flex items-center justify-center px-4 py-2.5 rounded-md flex-1 min-w-[120px] transition-all duration-300
                ${isActive ? 'text-black' : 'text-white/70 hover:text-white'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-viva-yellow rounded-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <span className="flex items-center gap-1.5 relative z-10">
                <Icon className="w-4 h-4" />
                <Zap className="w-3 h-3" />
                <SecondIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-black/30 backdrop-blur-2xl rounded-[20px] border border-white/10 p-6 md:p-8 shadow-lg"
        >
          {/* Text Input for Text modes */}
          {(activeMode === 'textToImage' || activeMode === 'textToVideo') && (
            <TextInputContent mode={activeMode} />
          )}

          {/* Image Upload for Image modes */}
          {(activeMode === 'imageToImage' || activeMode === 'imageToVideo') && (
            <ImageUploadContent mode={activeMode} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Text Input Content Component
function TextInputContent({ mode }: { mode: GenerationMode }) {
  const [prompt, setPrompt] = useState('');
  
  const placeholderText = mode === 'textToImage' 
    ? "Describe the image you want to create..."
    : "Describe the video you want to generate...";
    
  const title = mode === 'textToImage' 
    ? "Create an Image from Text"
    : "Create a Video from Text";
    
  const Icon = mode === 'textToImage' ? ImageIcon : Video;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-viva-yellow/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-viva-yellow" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-white">{title}</h2>
          <p className="text-white/60 text-sm">Use detailed descriptions for better results</p>
        </div>
      </div>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholderText}
        className="w-full h-40 bg-black/30 border border-white/10 rounded-xl p-5 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-viva-yellow/50 focus:border-viva-yellow/50 text-lg"
      />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/70">Prompt suggestions</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Portrait photo", 
            "Landscape", 
            "Cyberpunk", 
            "Fantasy", 
            "Realistic", 
            "Abstract",
            "Cinematic",
            "Neon"
          ].map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 215, 66, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPrompt(prompt ? `${prompt}, ${tag}` : tag)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white/80 border border-white/5 transition-all duration-200"
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Image Upload Content Component
function ImageUploadContent({ mode }: { mode: GenerationMode }) {
  const title = mode === 'imageToImage' 
    ? "Transform an Image"
    : "Create a Video from Image";
    
  const description = mode === 'imageToImage'
    ? "Upload an image to transform its style"
    : "Upload an image to animate it into a video";
    
  const Icon = mode === 'imageToImage' ? ImageIcon : Video;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-viva-yellow/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-viva-yellow" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-white">{title}</h2>
          <p className="text-white/60 text-sm">{description}</p>
        </div>
      </div>
      
      <VivaUploadPanel />
      
      {mode === 'imageToVideo' && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-white/70 mb-3">Animation style</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Realistic', 'Stylized', 'Smooth', 'Dynamic'].map((style) => (
              <button
                key={style}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white/80 border border-white/5 transition-all duration-200"
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {mode === 'imageToImage' && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-white/70 mb-3">Style prompt (optional)</h3>
          <input
            type="text"
            placeholder="Describe the style you want to apply..."
            className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-viva-yellow/50 focus:border-viva-yellow/50"
          />
        </div>
      )}
    </div>
  );
}

export default ModeSwitcher;
