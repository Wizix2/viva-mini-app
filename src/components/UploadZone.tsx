'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function UploadZone({ onFileSelect, selectedFile }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      className={`tg-upload-zone ${isDragging ? 'border-primary bg-primary/5' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {preview ? (
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-2 overflow-hidden rounded-lg">
            <img 
              src={preview} 
              alt="Preview" 
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-sm text-primary font-medium">{selectedFile?.name}</p>
        </div>
      ) : (
        <div className="text-center">
          <svg className="mx-auto mb-2" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7V5H17V3H15V5H13V7H15V9H17V7H19ZM9 11C10.1 11 11 10.1 11 9C11 7.9 10.1 7 9 7C7.9 7 7 7.9 7 9C7 10.1 7.9 11 9 11ZM9 13C7 13 3 14 3 16V18H15V16C15 14 11 13 9 13Z" fill="rgba(255,255,255,0.7)"/>
          </svg>
          <p className="text-sm opacity-80">Upload image</p>
          <p className="text-xs opacity-50 mt-1">Click or drag & drop</p>
        </div>
      )}
    </motion.div>
  );
}
