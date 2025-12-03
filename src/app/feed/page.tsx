"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FeedCard,
  FeedItem,
  FeedGrid,
  FeedGridSkeleton,
  FeedFilters,
  FilterType,
  FeedModal
} from "@/components/ui/viva";

// Mock data for feed items
const generateMockFeedItems = (count: number): FeedItem[] => {
  return Array.from({ length: count }).map((_, index) => {
    const isVideo = Math.random() > 0.5;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `item-${index}`,
      type: isVideo ? 'video' : 'image',
      src: isVideo 
        ? `https://picsum.photos/seed/${index + 100}/600/800` // In a real app, this would be a video URL
        : `https://picsum.photos/seed/${index}/600/800`,
      prompt: [
        "A futuristic cityscape with neon lights and flying cars",
        "Abstract digital art with vibrant colors and geometric shapes",
        "Portrait of a woman with cyberpunk aesthetics",
        "Surreal landscape with floating islands and waterfalls",
        "Photorealistic render of a fantasy creature in a forest",
        "Anime-style character in a dynamic action pose",
        "Minimalist architectural design with clean lines",
        "Cosmic scene with galaxies, nebulae, and planets"
      ][Math.floor(Math.random() * 8)],
      timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`,
      dateCreated: date
    };
  });
};

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [allItems, setAllItems] = useState<FeedItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  
  // Initial load
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const initialItems = generateMockFeedItems(12);
      setAllItems(initialItems);
      setDisplayedItems(initialItems);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter items when activeFilter or searchQuery changes
  useEffect(() => {
    if (allItems.length === 0) return;
    
    let filtered = [...allItems];
    
    // Apply type filter
    if (activeFilter === 'images') {
      filtered = filtered.filter(item => item.type === 'image');
    } else if (activeFilter === 'videos') {
      filtered = filtered.filter(item => item.type === 'video');
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.prompt?.toLowerCase().includes(query) || 
        item.id.toLowerCase().includes(query)
      );
    }
    
    setDisplayedItems(filtered);
  }, [activeFilter, searchQuery, allItems]);
  
  // Load more items
  const handleLoadMore = () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      const newItems = generateMockFeedItems(6);
      setAllItems(prev => [...prev, ...newItems]);
      setLoadingMore(false);
    }, 1500);
  };
  
  // Handle item click
  const handleItemClick = (item: FeedItem) => {
    setSelectedItem(item);
    const index = displayedItems.findIndex(i => i.id === item.id);
    setSelectedItemIndex(index);
  };
  
  // Handle modal navigation
  const handlePreviousItem = () => {
    if (selectedItemIndex > 0) {
      setSelectedItemIndex(selectedItemIndex - 1);
      setSelectedItem(displayedItems[selectedItemIndex - 1]);
    }
  };
  
  const handleNextItem = () => {
    if (selectedItemIndex < displayedItems.length - 1) {
      setSelectedItemIndex(selectedItemIndex + 1);
      setSelectedItem(displayedItems[selectedItemIndex + 1]);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        variants={itemVariants}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">Your Creations</h1>
        <p className="text-white/70">
          Browse and manage your generated images and videos
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FeedFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onSearch={setSearchQuery}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        {loading ? (
          <FeedGridSkeleton />
        ) : (
          <FeedGrid
            items={displayedItems}
            onItemClick={handleItemClick}
            loading={loadingMore}
            onLoadMore={handleLoadMore}
          />
        )}
        
        {!loading && displayedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white">No items found</h3>
            <p className="text-white/50 mt-2">Try changing your filters or create something new</p>
            <button className="mt-6 px-6 py-2 bg-viva-yellow text-black rounded-lg font-medium hover:bg-viva-yellow-light transition-colors">
              Create New
            </button>
          </div>
        )}
      </motion.div>
      
      {/* Modal */}
      {selectedItem && (
        <FeedModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onPrevious={handlePreviousItem}
          onNext={handleNextItem}
          hasPrevious={selectedItemIndex > 0}
          hasNext={selectedItemIndex < displayedItems.length - 1}
        />
      )}
    </motion.div>
  );
}