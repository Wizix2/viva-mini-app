"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ModelCard, { VivaModel } from './model-card';

interface ModelGridProps {
  models: VivaModel[];
  activeModelId: string;
  onModelSelect: (modelId: string) => void;
  className?: string;
}

export function ModelGrid({ 
  models, 
  activeModelId, 
  onModelSelect,
  className = ''
}: ModelGridProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className={`overflow-y-auto pr-2 ${className}`} style={{ maxHeight: '500px' }}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {models.map((model) => (
          <motion.div
            key={model.id}
            variants={itemVariants}
          >
            <ModelCard
              model={model}
              isActive={model.id === activeModelId}
              onClick={() => onModelSelect(model.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ModelGrid;
