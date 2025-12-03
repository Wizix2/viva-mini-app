"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CreditCard, History } from 'lucide-react';

interface ProfileCreditsProps {
  credits: number;
  className?: string;
  onBuyCredits?: () => void;
  onViewTransactions?: () => void;
}

export function ProfileCredits({
  credits = 0,
  className = "",
  onBuyCredits,
  onViewTransactions
}: ProfileCreditsProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: "easeOut"
      }
    }
  };
  
  const pulseAnimation = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-lg font-semibold text-white mb-5">Your Credits</h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Credits display */}
        <motion.div 
          className="flex-1 flex items-center justify-center bg-black/20 p-6 rounded-xl border border-viva-yellow/30 shadow-viva-glow"
          variants={pulseAnimation}
          initial="initial"
          animate="pulse"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-viva-yellow" />
            <div>
              <div className="text-3xl font-bold text-viva-yellow">{credits}</div>
              <div className="text-sm text-white/60">Available Credits</div>
            </div>
          </div>
        </motion.div>
        
        {/* Action buttons */}
        <div className="flex-1 flex flex-col gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#FFE98A" }}
            whileTap={{ scale: 0.97 }}
            onClick={onBuyCredits}
            className="w-full py-3 px-5 bg-viva-yellow text-black font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-viva-glow"
          >
            <CreditCard className="w-5 h-5" />
            <span>Buy Credits</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewTransactions}
            className="w-full py-3 px-5 bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10"
          >
            <History className="w-5 h-5" />
            <span>Transactions</span>
          </motion.button>
        </div>
      </div>
      
      {/* Credit usage info */}
      <div className="mt-5 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/70">Monthly Usage</span>
          <span className="text-sm font-medium text-white">750 / 1000</span>
        </div>
        
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-viva-yellow rounded-full" style={{ width: '75%' }}></div>
        </div>
        
        <div className="mt-3 text-xs text-white/50">
          Your plan resets on December 31, 2025
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCredits;
