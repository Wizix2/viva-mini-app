"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, FileImage, FilePlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import UploadPreview, { UploadFile, MediaType } from './upload-preview';

interface UploadPanelProps {
  maxFiles?: number;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export function UploadPanel({
  maxFiles = 1,
  maxFileSize = 50, // 50MB default
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'],
  onFilesChange,
  className = ''
}: UploadPanelProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file validation
  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type not supported. Please upload ${allowedTypes.map(type => type.split('/')[1]).join(', ')}`;
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File too large. Maximum size is ${maxFileSize}MB`;
    }
    
    return null;
  };
  
  // Process files
  const processFiles = (files: FileList | null) => {
    if (!files) return;
    
    setError(null);
    
    // Check if adding these files would exceed maxFiles
    if (uploadedFiles.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} file${maxFiles > 1 ? 's' : ''}`);
      return;
    }
    
    const newFiles: UploadFile[] = [];
    const rawFiles: File[] = [];
    
    Array.from(files).forEach(file => {
      const validationError = validateFile(file);
      
      if (validationError) {
        setError(validationError);
        return;
      }
      
      const fileType: MediaType = file.type.startsWith('image/') ? 'image' : 'video';
      const fileUrl = URL.createObjectURL(file);
      
      newFiles.push({
        id: uuidv4(),
        file,
        url: fileUrl,
        type: fileType
      });
      
      rawFiles.push(file);
    });
    
    if (newFiles.length > 0) {
      const updatedFiles = [...uploadedFiles, ...newFiles].slice(0, maxFiles);
      setUploadedFiles(updatedFiles);
      
      if (onFilesChange) {
        onFilesChange(updatedFiles.map(f => f.file));
      }
    }
  };
  
  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    processFiles(e.dataTransfer.files);
  };
  
  // Handle file removal
  const handleRemoveFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== id);
    setUploadedFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles.map(f => f.file));
    }
  };
  
  // Handle file replacement
  const handleReplaceFile = (id: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      
      // Store the ID of the file to replace
      const replaceIndex = uploadedFiles.findIndex(file => file.id === id);
      
      if (replaceIndex !== -1) {
        const handleReplace = (e: Event) => {
          const input = e.target as HTMLInputElement;
          
          if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const validationError = validateFile(file);
            
            if (validationError) {
              setError(validationError);
              return;
            }
            
            const fileType: MediaType = file.type.startsWith('image/') ? 'image' : 'video';
            const fileUrl = URL.createObjectURL(file);
            
            const updatedFiles = [...uploadedFiles];
            updatedFiles[replaceIndex] = {
              id: uuidv4(),
              file,
              url: fileUrl,
              type: fileType
            };
            
            setUploadedFiles(updatedFiles);
            
            if (onFilesChange) {
              onFilesChange(updatedFiles.map(f => f.file));
            }
          }
          
          // Remove the event listener after use
          fileInputRef.current?.removeEventListener('change', handleReplace);
          
          // Reset the input value
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        };
        
        fileInputRef.current.addEventListener('change', handleReplace, { once: true });
      }
    }
  };
  
  // Clear error after 5 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={allowedTypes.join(',')}
        onChange={handleFileInputChange}
        multiple={maxFiles > 1}
      />
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-500/10 backdrop-blur-lg border border-red-500/30 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-200">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* File preview or upload area */}
      {uploadedFiles.length > 0 ? (
        <div className="space-y-4">
          <UploadPreview
            files={uploadedFiles}
            onRemove={handleRemoveFile}
            onReplace={handleReplaceFile}
            maxFiles={maxFiles}
          />
          
          {/* Add more button (if maxFiles > uploadedFiles.length) */}
          {uploadedFiles.length < maxFiles && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
            >
              <FilePlus className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Add Another File</span>
            </motion.button>
          )}
        </div>
      ) : (
        <div
          className={`
            relative p-8 rounded-xl border-2 border-dashed
            ${isDragging 
              ? 'border-viva-yellow bg-viva-yellow/10' 
              : 'border-white/20 bg-black/20'}
            backdrop-blur-xl transition-colors duration-300
            flex flex-col items-center justify-center gap-4
            min-h-[280px]
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.05 : 1 }}
            className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"
          >
            <Upload className="w-8 h-8 text-white/70" />
          </motion.div>
          
          <div className="text-center">
            <h3 className="text-lg font-medium text-white mb-1">
              {isDragging ? 'Drop to Upload' : 'Upload Media'}
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Drag & drop or click to browse
            </p>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-viva-yellow text-black font-medium rounded-xl flex items-center justify-center gap-2 mx-auto hover:bg-viva-yellow-light transition-colors"
            >
              <FileImage className="w-5 h-5" />
              <span>Select File</span>
            </motion.button>
          </div>
          
          <p className="text-xs text-white/40 mt-4">
            Supports: JPG, PNG, WebP, MP4 (max {maxFileSize}MB)
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadPanel;
