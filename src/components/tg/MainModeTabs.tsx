'use client';

import { motion } from 'framer-motion';
import { MainMode } from '@/types/modes';

interface MainModeTabsProps {
  value: MainMode;
  onChange: (mode: MainMode) => void;
}

export default function MainModeTabs({ value, onChange }: MainModeTabsProps) {
  const tabs: { label: string; mode: MainMode }[] = [
    { label: 'Image', mode: 'image' },
    { label: 'Video', mode: 'video' }
  ];

  return (
    <div className="flex border-b border-gray-800 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          className={`flex-1 py-3 px-2 text-center relative ${
            value === tab.mode ? 'text-primary font-medium' : 'text-gray-400'
          }`}
          onClick={() => onChange(tab.mode)}
        >
          {tab.label}
          {value === tab.mode && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="activeMainModeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
