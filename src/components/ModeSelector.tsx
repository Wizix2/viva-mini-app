'use client';

import { motion } from 'framer-motion';

interface ModeSelectorProps {
  modes: string[];
  activeMode: number;
  onChange: (index: number) => void;
}

export default function ModeSelector({ modes, activeMode, onChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector">
      {modes.map((mode, index) => (
        <motion.button
          key={index}
          className={activeMode === index ? 'active' : ''}
          onClick={() => onChange(index)}
          whileTap={{ scale: 0.95 }}
        >
          {mode}
        </motion.button>
      ))}
    </div>
  );
}
