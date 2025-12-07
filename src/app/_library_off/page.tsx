"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, LayoutGrid } from "lucide-react";
import { VivaMediaCard } from "@/components/ui/viva";

export default function Library() {
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "images", name: "Images" },
    { id: "videos", name: "Videos" },
    { id: "favorites", name: "Favorites" },
    { id: "trending", name: "Trending" },
    { id: "new", name: "New" },
  ];

  // Mock data for the gallery
  const galleryItems = Array.from({ length: 20 }).map((_, i) => ({
    id: `item-${i}`,
    type: i % 4 === 0 ? "video" : "image",
    src: `https://picsum.photos/seed/${i + 300}/600/600`,
    prompt:
      i % 2 === 0
        ? "A futuristic cityscape with neon lights and flying cars"
        : "Abstract digital art with vibrant colors and geometric shapes",
    date:
      i % 3 === 0 ? "2 hours ago" : i % 5 === 0 ? "Yesterday" : "Last week",
  }));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">Library</h1>
        <p className="text-white/70">
          Explore trending content and save your favorites
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-yellow-400 text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center space-x-2 bg-black/30 rounded-lg p-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md ${
              viewMode === "grid"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <Grid className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("masonry")}
            className={`p-2 rounded-md ${
              viewMode === "masonry"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md text-white/50 hover:text-white/80"
          >
            <Filter className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-max"
        }`}
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <VivaMediaCard
              id={item.id}
              type={item.type as "image" | "video"}
              src={item.src}
              prompt={item.prompt}
              date={item.date}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
