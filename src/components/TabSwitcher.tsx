'use client';

import { motion } from 'framer-motion';
import { MainMode } from '@/types/modes';

interface TabSwitcherProps {
  tabs: string[];
  activeTab: MainMode;
  onChange: (mode: MainMode) => void;
}

export default function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="tg-tabs">
      {tabs.map((tab, index) => {
        const mode = index === 0 ? 'image' : 'video';
        return (
          <motion.button
            key={index}
            className={`tg-tab ${activeTab === mode ? 'active' : ''}`}
            onClick={() => onChange(mode)}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        );
      })}
    </div>
  );
}
