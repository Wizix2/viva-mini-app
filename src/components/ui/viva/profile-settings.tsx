"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, RefreshCw, Settings, Vibrate, BatteryLow, AlertTriangle } from 'lucide-react';

interface ProfileSettingsProps {
  className?: string;
  onClearCache?: () => void;
  onDeleteAccount?: () => void;
}

export function ProfileSettings({
  className = "",
  onClearCache,
  onDeleteAccount
}: ProfileSettingsProps) {
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [powerSaving, setPowerSaving] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
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
      <div className="flex items-center gap-3 mb-5">
        <Settings className="w-5 h-5 text-viva-yellow" />
        <h3 className="text-lg font-semibold text-white">Settings</h3>
      </div>
      
      {/* Toggle switches */}
      <div className="space-y-4 mb-6">
        {/* Haptic Feedback */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Vibrate className="w-5 h-5 text-white/70" />
            <div>
              <div className="text-white">Haptic Feedback</div>
              <div className="text-sm text-white/50">Vibration on actions</div>
            </div>
          </div>
          
          <button 
            onClick={() => setHapticFeedback(!hapticFeedback)}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${hapticFeedback ? 'bg-viva-yellow' : 'bg-white/20'}`}
          >
            <div 
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform duration-300 ${hapticFeedback ? 'translate-x-6' : 'translate-x-0.5'}`}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
            ></div>
          </button>
        </div>
        
        {/* Power Saving */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BatteryLow className="w-5 h-5 text-white/70" />
            <div>
              <div className="text-white">Power Saving Mode</div>
              <div className="text-sm text-white/50">Reduce animations & effects</div>
            </div>
          </div>
          
          <button 
            onClick={() => setPowerSaving(!powerSaving)}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${powerSaving ? 'bg-viva-yellow' : 'bg-white/20'}`}
          >
            <div 
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform duration-300 ${powerSaving ? 'translate-x-6' : 'translate-x-0.5'}`}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
            ></div>
          </button>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onClearCache}
          className="w-full py-3 px-5 bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Clear Cache</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.15)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onDeleteAccount}
          className="w-full py-3 px-5 bg-red-500/10 text-red-400 font-medium rounded-xl flex items-center justify-center gap-2 transition-all border border-red-500/20"
        >
          <AlertTriangle className="w-5 h-5" />
          <span>Delete Account</span>
        </motion.button>
      </div>
      
      {/* App info */}
      <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
        <div className="text-sm text-white/40">
          Version 1.2.5
        </div>
        
        <div className="flex gap-3">
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">Privacy</a>
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">Terms</a>
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">Support</a>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileSettings;
