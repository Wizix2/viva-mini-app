'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageToVideoFormProps {
  onSubmit: (file: File) => Promise<void>;
}

export default function ImageToVideoForm({ onSubmit }: ImageToVideoFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
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
      <label className="tg-upload-zone block">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        {selectedFile ? (
          <div className="text-center">
            <p className="mb-2 text-primary font-medium">Image selected:</p>
            <p className="text-sm opacity-80">{selectedFile.name}</p>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto mb-2" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7V5H17V3H15V5H13V7H15V9H17V7H19ZM9 11C10.1 11 11 10.1 11 9C11 7.9 10.1 7 9 7C7.9 7 7 7.9 7 9C7 10.1 7.9 11 9 11ZM9 13C7 13 3 14 3 16V18H15V16C15 14 11 13 9 13Z" fill="rgba(255,255,255,0.7)"/>
            </svg>
            <p className="text-sm opacity-80">Click to upload an image</p>
          </div>
        )}
      </label>
      
      <motion.button
        type="submit"
        className="tg-button"
        disabled={isLoading || !selectedFile}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Generating...' : 'Generate (100 credits)'}
      </motion.button>
    </form>
  );
}
