"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Clock, Download, Share2, Bookmark, MoreVertical } from 'lucide-react';
import Image from 'next/image';

export type FeedItemType = 'video' | 'image';

export interface FeedItem {
  id: string;
  type: FeedItemType;
  src: string;
  prompt?: string;
  timestamp: string;
  dateCreated: Date;
}

interface FeedCardProps {
  item: FeedItem;
  onClick: (item: FeedItem) => void;
  className?: string;
}

export function FeedCard({ item, onClick, className = '' }: FeedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatTimestamp = (timestamp: string) => {
    // If it's a relative timestamp already (like "2 days ago"), return as is
    if (timestamp.includes('ago')) return timestamp;
    
    // Otherwise, try to format it
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return timestamp; // Fallback to original timestamp
    }
  };

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image/Video Preview */}
      <div className="aspect-[3/4] relative">
        <Image
          src={item.src}
          alt={item.prompt || 'Generated content'}
          fill
          className="object-cover"
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
          {item.type === 'video' ? (
            <>
              <Play className="w-3.5 h-3.5 text-viva-yellow" />
              <span className="text-xs font-medium text-white">Video</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-viva-yellow" />
              <span className="text-xs font-medium text-white">Image</span>
            </>
          )}
        </div>
        
        {/* Timestamp */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-white/70" />
          <span className="text-xs font-medium text-white/70">{formatTimestamp(item.timestamp)}</span>
        </div>
        
        {/* Video Play Indicator */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"
              initial={{ opacity: 0.6, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Play className="w-6 h-6 text-white" fill="white" />
            </motion.div>
          </div>
        )}
        
        {/* Overlay with prompt text */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.prompt && (
            <p className="text-sm text-white line-clamp-3">{item.prompt}</p>
          )}
          
          {/* Action buttons */}
          <div className="flex justify-between mt-4">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
              >
                <Download className="w-4 h-4 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
              >
                <Share2 className="w-4 h-4 text-white" />
              </motion.button>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
              >
                <Bookmark className="w-4 h-4 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
              >
                <MoreVertical className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FeedCard;
