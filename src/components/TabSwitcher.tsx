'use client';

import { motion } from 'framer-motion';

interface TabSwitcherProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

export default function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="tg-tabs">
      {tabs.map((tab, index) => (
        <motion.button
          key={index}
          className={`tg-tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => onChange(index)}
          whileTap={{ scale: 0.95 }}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  );
}
