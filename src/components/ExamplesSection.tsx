'use client';

import { motion } from 'framer-motion';
import { SubMode } from '@/types/modes';

interface ExamplesSectionProps {
  examples: string[];
  onSelect: (example: string) => void;
  currentMode: SubMode;
}

export default function ExamplesSection({ examples, onSelect, currentMode }: ExamplesSectionProps) {
  const isTextMode = currentMode === 'text-image' || currentMode === 'text-video';
  
  return (
    <div className="examples-section">
      <h3>Examples</h3>
      <div className="chips-container">
        {examples.map((example, index) => (
          <motion.div
            key={index}
            className="tg-chip"
            onClick={() => onSelect(example)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isTextMode ? "Click to use this prompt" : "Click to apply this style"}
          >
            {example}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
