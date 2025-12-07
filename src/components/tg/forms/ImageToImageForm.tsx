'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GENERATION_PRICES } from '@/types/modes';
import UploadZone from './UploadZone';

interface ImageToImageFormProps {
  onSubmit: (file: File) => Promise<void>;
}

export default function ImageToImageForm({ onSubmit }: ImageToImageFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState('Enhance');

  const styles = ['Enhance', 'Stylize', 'Artistic', 'Cartoon', 'Sketch'];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsLoading(true);
    try {
      await onSubmit(selectedFile);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <UploadZone 
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
      />
      
      <div className="mt-4 mb-4">
        <input
          type="text"
          className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="Additional description (optional)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
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
      
      <motion.button
        type="submit"
        className="w-full bg-primary text-black font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || !selectedFile}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Generating...' : `Generate ${GENERATION_PRICES['image-image']} credits`}
      </motion.button>
    </form>
  );
}
