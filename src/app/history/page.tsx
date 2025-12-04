"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Image, 
  Video, 
  Download, 
  Trash2, 
  Filter,
  Search
} from "lucide-react";

interface HistoryItem {
  id: string;
  type: "image" | "video";
  src: string;
  prompt: string;
  date: string;
  model: string;
}

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  
  // Mock data for history items
  const historyItems: HistoryItem[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `history-${i}`,
    type: i % 3 === 0 ? "video" : "image",
    src: `https://picsum.photos/seed/${i + 400}/300/300`,
    prompt: i % 2 === 0 
      ? "A futuristic cityscape with neon lights and flying cars in a cyberpunk style"
      : "Abstract digital art with vibrant colors and geometric shapes, surreal landscape",
    date: i % 5 === 0 
      ? "Today" 
      : i % 3 === 0 
        ? "Yesterday" 
        : `${Math.floor(i / 2) + 1} days ago`,
    model: i % 4 === 0 ? "Stable XL" : i % 3 === 0 ? "SD Turbo" : "Realistic Vision"
  }));
  
  // Filter history items based on search query and filter type
  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">History</h1>
        <p className="text-white/70">
          Your past generations and creations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/70" />
          </div>
          <input
            type="text"
            placeholder="Search by prompt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
          />
        </div>
        
        <div className="flex items-center space-x-2 bg-black/30 rounded-lg p-1 self-end sm:self-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              filterType === "all"
                ? "bg-yellow-400 text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            All
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterType("image")}
            className={`px-3 py-1.5 rounded-md text-sm flex items-center transition-colors ${
              filterType === "image"
                ? "bg-yellow-400 text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Image className="w-4 h-4 mr-1.5" />
            Images
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterType("video")}
            className={`px-3 py-1.5 rounded-md text-sm flex items-center transition-colors ${
              filterType === "video"
                ? "bg-yellow-400 text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Video className="w-4 h-4 mr-1.5" />
            Videos
          </motion.button>
        </div>
      </motion.div>

      {filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-xl font-medium text-white">No results found</h3>
          <p className="text-white/50 mt-2 text-center max-w-md">
            {searchQuery 
              ? "Try using different keywords or removing filters" 
              : "Your generation history will appear here"}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                <img
                  src={item.src}
                  alt={item.prompt}
                  className="w-full h-full object-cover rounded-lg"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                      <Video className="w-5 h-5 text-black ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center">
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/70 mr-2">
                        {item.model}
                      </span>
                      <span className="text-xs text-white/50 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
                      </span>
                    </div>
                    <p className="mt-2 text-white line-clamp-2 sm:line-clamp-1">{item.prompt}</p>
                  </div>
                  
                  <div className="flex space-x-2 self-end sm:self-auto">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 text-white/70" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-white/70" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="text-xs px-2 py-1 bg-white/5 rounded-md text-white/70 flex items-center">
                    {item.type === "image" ? (
                      <Image className="w-3 h-3 mr-1.5" />
                    ) : (
                      <Video className="w-3 h-3 mr-1.5" />
                    )}
                    {item.type === "image" ? "Image" : "Video"}
                  </div>
                  
                  {["#cyberpunk", "#futuristic", "#abstract"].map((tag, i) => (
                    <div key={i} className="text-xs px-2 py-1 bg-white/5 rounded-md text-white/70">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
