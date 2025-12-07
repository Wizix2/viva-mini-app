'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GENERATION_PRICES } from '@/types/modes';
import UploadZone from './UploadZone';

interface ImageToVideoFormProps {
  onSubmit: (file: File) => Promise<{ status: string; taskId?: string; message?: string }>;
}

export default function ImageToVideoForm({ onSubmit }: ImageToVideoFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState('5');
  const [style, setStyle] = useState('Natural');

  const durations = ['3', '5', '10', '15'];
  const styles = ['Natural', 'Dramatic', 'Subtle', 'Extreme'];

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
      
      <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
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
        
        <div>
          <label className="block text-sm text-gray-400 mb-2">Animation Style</label>
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
      </div>
      
      <motion.button
        type="submit"
        className="w-full bg-primary text-black font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || !selectedFile}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Generating...' : `Generate ${GENERATION_PRICES['image-video']} credits`}
      </motion.button>
    </form>
  );
}
