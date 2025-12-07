'use client';

import { motion } from 'framer-motion';
import { SubMode } from '@/types/modes';

interface ModeSelectorProps {
  modes: string[];
  activeMode: SubMode;
  onChange: (mode: SubMode) => void;
}

export default function ModeSelector({ modes, activeMode, onChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector">
      {modes.map((label, index) => {
        // Определяем значение подрежима на основе индекса и метки
        let mode: SubMode;
        if (label.includes('Text → Image')) {
          mode = 'text-image';
        } else if (label.includes('Image → Image')) {
          mode = 'image-image';
        } else if (label.includes('Text → Video')) {
          mode = 'text-video';
        } else {
          mode = 'image-video';
        }
        
        return (
          <motion.button
            key={index}
            className={activeMode === mode ? 'active' : ''}
            onClick={() => onChange(mode)}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
