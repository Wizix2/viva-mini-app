'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GENERATION_PRICES } from '@/types/modes';

interface TextToImageFormProps {
  onSubmit: (text: string) => Promise<{ status: string; taskId?: string; message?: string }>;
}

export default function TextToImageForm({ onSubmit }: TextToImageFormProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState('Realistic');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const styles = ['Realistic', 'Artistic', 'Cinematic', 'Anime', 'Sketch'];

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
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        ref={textareaRef}
        className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-4 text-white mb-4 min-h-[120px] resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        placeholder="Describe what you want to create..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Style</label>
        <select
          className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          disabled={isLoading}
        >
          {styles.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Quality</label>
        <input
          type="range"
          min="1"
          max="5"
          className="w-full h-2 bg-dark-lighter rounded-lg appearance-none cursor-pointer accent-primary"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Draft</span>
          <span>Standard</span>
          <span>HD</span>
        </div>
      </div>
      
      <motion.button
        type="submit"
        className="w-full bg-primary text-black font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || !text.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Generating...' : `Generate ${GENERATION_PRICES['text-image']} credits`}
      </motion.button>
    </form>
  );
}
