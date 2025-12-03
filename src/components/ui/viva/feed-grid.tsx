"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FeedCard, { FeedItem } from './feed-card';
import { Loader2 } from 'lucide-react';

interface FeedGridProps {
  items: FeedItem[];
  onItemClick: (item: FeedItem) => void;
  loading?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

export function FeedGrid({ 
  items, 
  onItemClick, 
  loading = false,
  onLoadMore,
  className = '' 
}: FeedGridProps) {
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!onLoadMore) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onLoadMore, hasMore, loading]);
  
  // Set hasMore based on items length
  useEffect(() => {
    // This is a mock implementation - in a real app, you'd check if there are more items to load
    setHasMore(items.length < 100);
  }, [items]);
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className={`${className}`}>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
          >
            <FeedCard 
              item={item} 
              onClick={onItemClick} 
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Loading indicator */}
      <div 
        ref={observerTarget} 
        className="w-full py-8 flex justify-center"
      >
        {loading && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-viva-yellow animate-spin" />
            <p className="mt-2 text-white/70">Loading more...</p>
          </div>
        )}
        
        {!loading && !hasMore && items.length > 0 && (
          <p className="text-white/50">You've reached the end</p>
        )}
        
        {!loading && items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No items found</p>
            <p className="text-white/50 mt-2">Try changing your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton loader for the feed grid
export function FeedGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div 
          key={index}
          className="rounded-xl overflow-hidden bg-white/5 animate-pulse"
        >
          <div className="aspect-[3/4] relative bg-white/10"></div>
        </div>
      ))}
    </div>
  );
}

export default FeedGrid;
