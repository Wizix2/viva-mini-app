'use client';

import { motion } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';

interface HeaderProps {
  credits?: number;
}

export default function Header({ credits = 100 }: HeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="tg-header sticky top-0 z-10 bg-dark-lighter/80 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center">
        {/* Logo and Text */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-black font-bold text-xl mr-3">
            V
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">VIVA Photo Animator</h1>
            <p className="text-xs text-gray-400">Telegram Mini App</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Credits Badge */}
        <motion.div 
          className="tg-credits"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {credits.toLocaleString()} credits
        </motion.div>
        
        {/* Menu Button */}
        <motion.button 
          className="tg-icon-button bg-dark-light"
          onClick={toggleSidebar}
          whileTap={{ scale: 0.9 }}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
          </svg>
        </motion.button>
      </div>
    </header>
  );
}
