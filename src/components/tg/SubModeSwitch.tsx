'use client';

import { motion } from 'framer-motion';
import { MainMode, SubMode } from '@/types/modes';

interface SubModeSwitchProps {
  mainMode: MainMode;
  value: SubMode;
  onChange: (mode: SubMode) => void;
}

export default function SubModeSwitch({ mainMode, value, onChange }: SubModeSwitchProps) {
  // Define submodes based on main mode
  const getSubmodes = (): { label: string; mode: SubMode }[] => {
    if (mainMode === 'image') {
      return [
        { label: 'Text → Image', mode: 'text-image' },
        { label: 'Image → Image', mode: 'image-image' }
      ];
    } else {
      return [
        { label: 'Text → Video', mode: 'text-video' },
        { label: 'Image → Video', mode: 'image-video' }
      ];
    }
  };

  const submodes = getSubmodes();

  return (
    <div className="bg-dark-lighter rounded-lg p-1 flex mb-6">
      {submodes.map((submode) => (
        <button
          key={submode.mode}
          className={`flex-1 py-2 px-3 rounded-md text-center text-sm relative ${
            value === submode.mode ? 'text-primary' : 'text-gray-400'
          }`}
          onClick={() => onChange(submode.mode)}
        >
          {submode.label}
          {value === submode.mode && (
            <motion.div
              className="absolute inset-0 bg-primary/10 rounded-md"
              layoutId="activeSubMode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
