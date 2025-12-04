"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Menu, X } from "lucide-react";
import { VivaCreditsBadge } from "./VivaCreditsBadge";
import VivaGlass from "./VivaGlass";

interface VivaNavbarProps {
  toggleSidebar?: () => void;
  isTelegramWebApp?: boolean;
}

export function VivaNavbar({ toggleSidebar, isTelegramWebApp = false }: VivaNavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-20 h-16 glass-dark border-b viva-transition ${
        isScrolled ? 'shadow-lg border-white/10' : 'border-transparent'
      } ${isTelegramWebApp ? 'safe-area-top' : ''}`}
    >
      <div className="flex items-center justify-between h-full w-full max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 mr-4"
          >
            <Menu className="w-5 h-5 text-white/80" />
          </motion.button>

          {!searchExpanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden sm:flex items-center"
            >
              <span className="text-yellow-400 font-bold text-xl">VIVA</span>
              <span className="text-white ml-1 font-light">AI</span>
            </motion.div>
          )}
        </div>

        {/* Search - Desktop */}
        <div className={`hidden sm:block relative ${searchExpanded ? 'w-full max-w-xl' : 'w-full max-w-md'} mx-4 viva-transition`}>
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-opacity ${
              searchFocused ? "opacity-100" : "opacity-70"
            }`}
          >
            <Search className="h-4 w-4 text-white" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => {
              setSearchFocused(true);
              setSearchExpanded(true);
            }}
            onBlur={() => {
              setSearchFocused(false);
              setSearchExpanded(false);
            }}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
          />
        </div>

        {/* Search - Mobile */}
        <AnimatePresence>
          {isMobile && searchExpanded && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: 0 }}
              className="absolute left-0 top-0 h-full flex items-center px-4 bg-black/80 backdrop-blur-xl z-30"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none"
                />
              </div>
              <button 
                onClick={() => setSearchExpanded(false)}
                className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile search trigger */}
          {isMobile && !searchExpanded && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchExpanded(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <Search className="w-4 h-4 text-white/70" />
            </motion.button>
          )}
          
          <VivaCreditsBadge credits={120} />
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 relative"
          >
            <Bell className="w-5 h-5 text-white/80" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(245, 215, 66, 0.3)" }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-medium shadow-yellow-glow transition-all duration-300 cursor-pointer"
          >
            JD
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default VivaNavbar;