'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GENERATION_PRICES } from '@/types/modes';

interface TextToVideoFormProps {
  onSubmit: (text: string) => Promise<{ status: string; taskId?: string; message?: string }>;
}

export default function TextToVideoForm({ onSubmit }: TextToVideoFormProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('Standard');
  const [duration, setDuration] = useState('3');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const models = ['Standard', 'Cinematic', 'Realistic', 'Stylized'];
  const durations = ['3', '5', '10', '15'];

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

  // Method for setting text from outside (for examples)
  const setText2 = (newText: string) => {
    setText(newText);
    // Focus on textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Expose method to window for access from examples
  if (typeof window !== 'undefined') {
    // @ts-ignore - adding method for access from outside
    window.setTextToVideoText = setText2;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        ref={textareaRef}
        className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-4 text-white mb-4 min-h-[120px] resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        placeholder="Describe the video you want to create..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Model</label>
          <select
            className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={isLoading}
          >
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-2">Duration (sec)</label>
          <select
            className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            disabled={isLoading}
          >
            {durations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
      
      <motion.button
        type="submit"
        className="w-full bg-primary text-black font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || !text.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Generating...' : `Generate ${GENERATION_PRICES['text-video']} credits`}
      </motion.button>
    </form>
  );
}
