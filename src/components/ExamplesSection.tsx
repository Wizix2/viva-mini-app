'use client';

import { motion } from 'framer-motion';

interface ExamplesSectionProps {
  examples: string[];
  onSelect: (example: string) => void;
}

export default function ExamplesSection({ examples, onSelect }: ExamplesSectionProps) {
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
          >
            {example}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
