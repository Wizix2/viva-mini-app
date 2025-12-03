"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Image as ImageIcon, Video, Calendar, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

export type FilterType = 'all' | 'images' | 'videos';

interface FeedFiltersProps {
  onFilterChange: (filter: FilterType) => void;
  onSearch: (query: string) => void;
  activeFilter: FilterType;
  className?: string;
}

export function FeedFilters({
  onFilterChange,
  onSearch,
  activeFilter = 'all',
  className = ''
}: FeedFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white/50" />
        </div>
        <input
          type="text"
          placeholder="Search your creations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-viva-yellow/50 focus:border-viva-yellow/50 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-white/50 hover:text-white/80" />
          </button>
        )}
      </form>
      
      {/* Filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <div className="flex space-x-1 bg-black/30 backdrop-blur-lg rounded-lg p-1">
            {[
              { id: 'all', label: 'All', icon: null },
              { id: 'images', label: 'Images', icon: ImageIcon },
              { id: 'videos', label: 'Videos', icon: Video }
            ].map((filter) => {
              const isActive = activeFilter === filter.id;
              const Icon = filter.icon;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id as FilterType)}
                  className={`
                    relative px-4 py-2 rounded-md flex-1 flex items-center justify-center gap-2
                    ${isActive ? 'text-black' : 'text-white/70 hover:text-white'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBackground"
                      className="absolute inset-0 bg-viva-yellow rounded-md"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-black' : ''} relative z-10`} />}
                  <span className="relative z-10 text-sm font-medium">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Advanced filters button */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-black/40 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70">Filters</span>
          <ChevronDown className={`w-4 h-4 text-white/70 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Advanced filters panel */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showAdvancedFilters ? 'auto' : 0,
          opacity: showAdvancedFilters ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 p-4">
          <div className="space-y-4">
            {/* Date filter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Date Range</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'all', label: 'All Time' },
                  { id: 'today', label: 'Today' },
                  { id: 'week', label: 'This Week' },
                  { id: 'month', label: 'This Month' }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setDateRange(range.id as any)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2
                      ${dateRange === range.id 
                        ? 'bg-viva-yellow/20 text-viva-yellow border border-viva-yellow/30' 
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'}
                      transition-colors
                    `}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{range.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort options */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Sort By</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FeedFilters;
