"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, Play, Pause, Image as ImageIcon, Film } from 'lucide-react';
import Image from 'next/image';

export type MediaType = 'image' | 'video';

export interface UploadFile {
  id: string;
  file: File;
  url: string;
  type: MediaType;
}

interface UploadPreviewProps {
  files: UploadFile[];
  onRemove: (id: string) => void;
  onReplace: (id: string) => void;
  maxFiles?: number;
  className?: string;
}

export function UploadPreview({
  files,
  onRemove,
  onReplace,
  maxFiles = 1,
  className = ''
}: UploadPreviewProps) {
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const [isHovered, setIsHovered] = useState<Record<string, boolean>>({});
  
  const handlePlayToggle = (id: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Layout variants based on number of files
  const getGridLayout = () => {
    if (files.length === 0) return '';
    if (files.length === 1) return 'grid-cols-1';
    return 'grid-cols-2 gap-4';
  };

  return (
    <div className={`${className}`}>
      <div className={`grid ${getGridLayout()}`}>
        {files.map((file) => (
          <div
            key={file.id}
            className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black/20 backdrop-blur-lg border border-white/10"
            onMouseEnter={() => setIsHovered(prev => ({ ...prev, [file.id]: true }))}
            onMouseLeave={() => setIsHovered(prev => ({ ...prev, [file.id]: false }))}
          >
            {/* Media preview */}
            {file.type === 'image' ? (
              <Image
                src={file.url}
                alt="Uploaded image"
                fill
                className="object-contain"
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={file.url}
                  className="w-full h-full object-contain"
                  autoPlay={false}
                  loop
                  muted
                  playsInline
                  controls={false}
                  onPlay={() => setIsPlaying(prev => ({ ...prev, [file.id]: true }))}
                  onPause={() => setIsPlaying(prev => ({ ...prev, [file.id]: false }))}
                />
                
                {/* Video play/pause overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => handlePlayToggle(file.id)}
                >
                  {!isPlaying[file.id] && (
                    <motion.div
                      initial={{ opacity: 0.7, scale: 1 }}
                      whileHover={{ opacity: 1, scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"
                    >
                      <Play className="w-6 h-6 text-white" fill="white" />
                    </motion.div>
                  )}
                </div>
              </div>
            )}
            
            {/* Type badge */}
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
              {file.type === 'video' ? (
                <>
                  <Film className="w-3.5 h-3.5 text-viva-yellow" />
                  <span className="text-xs font-medium text-white">Video</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-viva-yellow" />
                  <span className="text-xs font-medium text-white">Image</span>
                </>
              )}
            </div>
            
            {/* File name */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-sm text-white truncate">{file.file.name}</p>
              <p className="text-xs text-white/60">
                {(file.file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
            
            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered[file.id] ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 flex gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onReplace(file.id)}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-white" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(file.id)}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadPreview;
