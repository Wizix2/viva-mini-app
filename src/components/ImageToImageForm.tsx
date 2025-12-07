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
  const [isLoading, setIsLoading] = useState(false);

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
    <form onSubmit={handleSubmit}>
      <UploadZone 
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
      />
      
      <motion.button
        type="submit"
        className="tg-button mt-4"
        disabled={isLoading || !selectedFile}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Generating...' : `Generate ${GENERATION_PRICES['image-image']} credits`}
      </motion.button>
    </form>
  );
}
