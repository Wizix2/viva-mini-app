"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Bookmark, MoreVertical, Play, Heart } from "lucide-react";

interface VivaMediaCardProps {
  id: string;
  type: "image" | "video";
  src: string;
  prompt?: string;
  date?: string;
  className?: string;
  onView?: (id: string) => void;
}

export function VivaMediaCard({
  id,
  type,
  src,
  prompt,
  date,
  className = '',
  onView,
}: VivaMediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleView = () => {
    if (onView) {
      onView(id);
    }
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      layoutId={`media-card-${id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`rounded-xl overflow-hidden viva-card p-0 group cursor-pointer viva-transition ${className}`}
      onClick={handleView}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Image with zoom effect on hover */}
        <motion.img
          src={src}
          alt={prompt || "Generated media"}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Video play button */}
        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(245, 215, 66, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center shadow-yellow-glow"
            >
              <Play className="w-6 h-6 text-black ml-1" />
            </motion.div>
          </div>
        )}
        
        {/* Top gradient overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start bg-gradient-to-b from-black/70 via-black/30 to-transparent h-16"
        >
          <div className="text-xs font-medium text-white/90 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full">
            {date || "Today"}
          </div>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              // Handle more options
            }}
          >
            <MoreVertical className="w-4 h-4 text-white" />
          </motion.button>
        </motion.div>
        
        {/* Bottom gradient overlay - always visible for prompt */}
        {prompt && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            <p className="text-sm text-white/90 line-clamp-2 font-medium">{prompt}</p>
          </div>
        )}
        
        {/* Like button overlay */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`absolute top-3 right-14 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isLiked 
              ? 'bg-pink-500/20 text-pink-500' 
              : 'bg-black/30 text-white/70 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500' : ''}`} />
        </motion.button>
      </div>
      
      {/* Action buttons */}
      <div className="p-3 bg-gradient-to-b from-dark-100/50 to-dark-100 backdrop-blur-sm">
        <div className="flex justify-between">
          <div className="flex space-x-1.5">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300"
            >
              <Download className="w-4 h-4 text-white/70" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300"
            >
              <Share2 className="w-4 h-4 text-white/70" />
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300"
          >
            <Bookmark className="w-4 h-4 text-white/70" />
          </motion.button>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ 
              boxShadow: '0 0 20px rgba(245, 215, 66, 0.15), 0 0 5px rgba(245, 215, 66, 0.1) inset',
              zIndex: -1
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default VivaMediaCard;
