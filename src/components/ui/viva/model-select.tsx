"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Star, Zap, Clock, Filter, ChevronDown, ChevronUp, Brain, Wand, Brush, Camera, Layers, Box } from 'lucide-react';
import { VivaModel } from './model-card';
import ModelGrid from './model-grid';

interface ModelSelectProps {
  title?: string;
  subtitle?: string;
  onModelSelect?: (modelId: string) => void;
  initialModelId?: string;
  className?: string;
}

export function ModelSelect({
  title = "AI Models",
  subtitle = "Select a model to generate content",
  onModelSelect,
  initialModelId,
  className = ''
}: ModelSelectProps) {
  const [activeModelId, setActiveModelId] = useState<string>(initialModelId || models[0].id);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Filter models based on search term and active filter
  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'new' && model.isNew) ||
                         (activeFilter === 'popular' && model.id.includes('xl')) ||
                         (activeFilter === 'fast' && model.generationTime?.includes('sec'));
    
    return matchesSearch && matchesFilter;
  });
  
  // Handle model selection
  const handleModelSelect = (modelId: string) => {
    setActiveModelId(modelId);
    if (onModelSelect) {
      onModelSelect(modelId);
    }
  };
  
  // Get active model details
  const activeModel = models.find(model => model.id === activeModelId);

  return (
    <div className={`viva-card ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-title-md text-white font-semibold flex items-center">
            <Sparkles className="text-viva-yellow mr-2" size={20} />
            {title}
          </h2>
          <p className="text-white/60 text-sm mt-1">{subtitle}</p>
        </div>
        
        {/* Credits badge */}
        <div className="px-3 py-1.5 bg-viva-yellow/10 rounded-full flex items-center border border-viva-yellow/30">
          <Sparkles className="text-viva-yellow mr-1.5" size={14} />
          <span className="text-viva-yellow font-medium text-sm">120 credits</span>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/50" />
          </div>
          <input
            type="text"
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-viva-yellow/50 focus:border-viva-yellow/50 transition-all"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 overflow-x-auto hide-scrollbar py-1">
            {['all', 'popular', 'new', 'fast'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-viva-yellow text-black font-medium'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {filter === 'all' && 'All Models'}
                {filter === 'popular' && (
                  <span className="flex items-center">
                    <Star className="w-3.5 h-3.5 mr-1" />
                    Popular
                  </span>
                )}
                {filter === 'new' && (
                  <span className="flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    New
                  </span>
                )}
                {filter === 'fast' && (
                  <span className="flex items-center">
                    <Zap className="w-3.5 h-3.5 mr-1" />
                    Fast
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="text-sm">Filters</span>
            {isFilterOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        
        {/* Advanced filters - collapsible */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-white/70 block mb-2">Credit Cost</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                    <option value="any">Any</option>
                    <option value="low">Low (1-5)</option>
                    <option value="medium">Medium (6-10)</option>
                    <option value="high">High (11+)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/70 block mb-2">Generation Time</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                    <option value="any">Any</option>
                    <option value="fast">Fast (&lt;5s)</option>
                    <option value="medium">Medium (5-15s)</option>
                    <option value="slow">Slow (15s+)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Model grid */}
      <ModelGrid
        models={filteredModels}
        activeModelId={activeModelId}
        onModelSelect={handleModelSelect}
      />
      
      {/* Selected model info */}
      {activeModel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeModel.id}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-white/10"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-medium">Selected Model</h3>
              <p className="text-viva-yellow font-semibold text-lg">{activeModel.name}</p>
            </div>
            
            <button className="px-4 py-2 bg-viva-yellow text-black rounded-lg font-medium text-sm hover:bg-viva-yellow-light transition-colors">
              Apply Model
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Sample models data
const models: VivaModel[] = [
  {
    id: "stable-xl",
    name: "Stable XL",
    description: "High-quality image generation with excellent detail and photorealism",
    icon: Brain,
    creditCost: 10,
    generationTime: "~12 sec"
  },
  {
    id: "sd-turbo",
    name: "SD Turbo",
    description: "Fast generation with good quality for quick iterations",
    icon: Zap,
    creditCost: 4,
    generationTime: "~3 sec",
    isNew: true
  },
  {
    id: "realistic-vision",
    name: "Realistic Vision",
    description: "Photorealistic images with lifelike details and natural lighting",
    icon: Camera,
    creditCost: 8,
    generationTime: "~10 sec"
  },
  {
    id: "pixel-art",
    name: "Pixel Art",
    description: "Retro-style pixel art generation perfect for game assets",
    icon: Layers,
    creditCost: 3,
    generationTime: "~5 sec"
  },
  {
    id: "anime-style",
    name: "Anime Style",
    description: "Japanese anime-inspired artwork with vibrant colors",
    icon: Brush,
    creditCost: 5,
    generationTime: "~7 sec"
  },
  {
    id: "3d-render",
    name: "3D Render",
    description: "3D rendered images with depth, texture and realistic lighting",
    icon: Box,
    creditCost: 12,
    generationTime: "~15 sec",
    isNew: true
  },
  {
    id: "concept-art",
    name: "Concept Art",
    description: "Professional concept art for characters, environments and props",
    icon: Wand,
    creditCost: 8,
    generationTime: "~10 sec"
  }
];

export default ModelSelect;
