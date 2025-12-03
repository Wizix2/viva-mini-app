"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

interface Duration {
  id: string;
  label: string;
  seconds: number;
  creditMultiplier: number;
  description?: string;
}

interface VivaDurationSelectProps {
  onDurationChange?: (duration: Duration) => void;
}

export function VivaDurationSelect({ onDurationChange }: VivaDurationSelectProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>(durations[0].id);

  const handleDurationChange = (durationId: string) => {
    setSelectedDuration(durationId);
    
    if (onDurationChange) {
      const duration = durations.find(d => d.id === durationId);
      if (duration) {
        onDurationChange(duration);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="bg-black/20 backdrop-blur-xl rounded-xl p-1.5 flex">
        {durations.map((duration) => {
          const isActive = selectedDuration === duration.id;
          
          return (
            <motion.button
              key={duration.id}
              onClick={() => handleDurationChange(duration.id)}
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
                  layoutId="activeDuration"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-yellow-glow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {duration.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Duration cost indicator */}
      <div className="flex justify-between items-center px-1">
        <AnimatedDescription durations={durations} selectedId={selectedDuration} />
        
        <div className="flex items-center">
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            {durations.map((duration, index) => {
              const isSelected = selectedDuration === duration.id;
              const selectedIndex = durations.findIndex(d => d.id === selectedDuration);
              const width = `${((index + 1) / durations.length) * 100}%`;
              
              return (
                <motion.div
                  key={duration.id}
                  className="h-full bg-yellow-400"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: index <= selectedIndex ? width : "0%" 
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated description component
function AnimatedDescription({ 
  durations, 
  selectedId 
}: { 
  durations: Duration[], 
  selectedId: string 
}) {
  const selectedDuration = durations.find(d => d.id === selectedId);
  
  return (
    <motion.div 
      className="h-8 text-xs text-white/50 flex items-center"
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
          <Clock className="w-3 h-3 mr-1.5 text-yellow-400/70" />
          <span>
            {selectedDuration?.seconds} seconds
            {selectedDuration?.creditMultiplier > 1 && 
              ` (${selectedDuration.creditMultiplier}x credits)`
            }
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const durations: Duration[] = [
  {
    id: "short",
    label: "3s",
    seconds: 3,
    creditMultiplier: 1.0,
    description: "Quick animation"
  },
  {
    id: "medium",
    label: "6s",
    seconds: 6,
    creditMultiplier: 2.0,
    description: "Standard length"
  },
  {
    id: "long",
    label: "9s",
    seconds: 9,
    creditMultiplier: 3.0,
    description: "Extended animation"
  },
  {
    id: "extra",
    label: "12s",
    seconds: 12,
    creditMultiplier: 4.0,
    description: "Full experience"
  },
];

export default VivaDurationSelect;