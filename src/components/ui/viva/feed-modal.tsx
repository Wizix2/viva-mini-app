"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Bookmark, MoreVertical, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { FeedItem } from './feed-card';
import Image from 'next/image';

interface FeedModalProps {
  item: FeedItem | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function FeedModal({
  item,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false
}: FeedModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if (e.key === ' ' && item?.type === 'video') {
        e.preventDefault();
        togglePlay();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext, item]);
  
  // Handle video playback
  useEffect(() => {
    if (item?.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
      
      videoRef.current.muted = isMuted;
      
      const updateProgress = () => {
        if (videoRef.current) {
          const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(progress);
        }
      };
      
      const videoElement = videoRef.current;
      videoElement.addEventListener('timeupdate', updateProgress);
      
      return () => {
        videoElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [isPlaying, isMuted, item]);
  
  // Reset state when item changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [item]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Handle seeking in video
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };
  
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex flex-col md:flex-row">
            {/* Media display */}
            <div className="relative w-full md:w-2/3 aspect-square md:aspect-auto">
              {item.type === 'image' ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.prompt || 'Generated image'}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={item.src}
                    className="max-h-full max-w-full"
                    onClick={togglePlay}
                    onEnded={() => setIsPlaying(false)}
                    loop
                  />
                  
                  {/* Video controls overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                      >
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </motion.button>
                    )}
                  </div>
                  
                  {/* Video progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" fill="white" />
                        )}
                      </button>
                      
                      <div 
                        className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
                        onClick={handleSeek}
                      >
                        <div 
                          className="h-full bg-viva-yellow rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Info panel */}
            <div className="w-full md:w-1/3 p-6 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-white">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</h3>
                <p className="text-sm text-white/50">{new Date(item.dateCreated).toLocaleString()}</p>
              </div>
              
              {item.prompt && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white/70 mb-2">Prompt</h4>
                  <p className="text-white/90">{item.prompt}</p>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-viva-yellow text-black rounded-lg font-medium hover:bg-viva-yellow-light transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/10">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/10">
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </button>
                
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/10">
                  <MoreVertical className="w-4 h-4" />
                  <span>More</span>
                </button>
              </div>
              
              {/* Navigation buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    hasPrevious 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Previous
                </button>
                
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    hasNext 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default FeedModal;
