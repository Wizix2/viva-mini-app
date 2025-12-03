"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface VivaModel {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  isNew?: boolean;
  creditCost?: number;
  generationTime?: string;
}

interface ModelCardProps {
  model: VivaModel;
  isActive: boolean;
  onClick: () => void;
}

export function ModelCard({ model, isActive, onClick }: ModelCardProps) {
  const Icon = model.icon;
  
  return (
    <motion.div
      whileHover={{ 
        y: -5, 
        boxShadow: isActive 
          ? '0 15px 30px rgba(245, 215, 66, 0.2)' 
          : '0 15px 30px rgba(0, 0, 0, 0.2)'
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative glass cursor-pointer p-5 rounded-[16px] transition-all duration-300
        ${isActive 
          ? 'border-2 border-viva-yellow bg-viva-yellow/10 shadow-[0_0_15px_rgba(245,215,66,0.15)]' 
          : 'border border-viva-border hover:border-viva-yellow/40'}
      `}
    >
      {/* New badge */}
      {model.isNew && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            delay: 0.1 
          }}
          className="absolute -top-2 -right-2 bg-viva-yellow text-viva-bg text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg"
        >
          NEW
        </motion.div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          {/* Icon */}
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center mr-4
            ${isActive 
              ? 'bg-viva-yellow/20 text-viva-yellow' 
              : 'bg-white/10 text-white/70'}
          `}>
            <Icon size={24} />
          </div>
          
          {/* Text content */}
          <div>
            <h3 className={`font-semibold text-lg ${isActive ? 'text-viva-yellow' : 'text-white'}`}>
              {model.name}
            </h3>
            <p className="text-sm text-white/60 mt-1 line-clamp-2">
              {model.description}
            </p>
          </div>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-viva-yellow flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-black" />
          </motion.div>
        )}
      </div>
      
      {/* Footer info */}
      <div className="mt-4 flex items-center justify-between text-xs">
        {model.generationTime && (
          <div className="flex items-center text-white/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {model.generationTime}
          </div>
        )}
        
        {model.creditCost && (
          <div className={`
            px-2.5 py-1 rounded-full flex items-center
            ${isActive 
              ? 'bg-viva-yellow/20 text-viva-yellow' 
              : 'bg-white/10 text-white/70'}
          `}>
            <Sparkles className="w-3 h-3 mr-1" />
            <span className="font-medium">{model.creditCost}</span>
          </div>
        )}
      </div>
      
      {/* Hover effect overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-[16px] pointer-events-none"
      />
    </motion.div>
  );
}

export default ModelCard;
