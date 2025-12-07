'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TextToVideoFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export default function TextToVideoForm({ onSubmit }: TextToVideoFormProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsLoading(true);
    try {
      await onSubmit(text);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="tg-textarea"
        placeholder="Describe what you want to create..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      
      <motion.button
        type="submit"
        className="tg-button"
        disabled={isLoading || !text.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </motion.button>
    </form>
  );
}
