"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface VivaScrollablePanelProps {
  title: string;
  children: ReactNode;
  viewAllHref?: string;
  className?: string;
}

export function VivaScrollablePanel({
  title,
  children,
  viewAllHref,
  className = '',
}: VivaScrollablePanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      // Initial check
      checkScrollButtons();
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? -200 : -400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 200 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-medium text-white flex items-center"
        >
          {title}
        </motion.h2>
        
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <AnimatedScrollButton
              onClick={scrollLeft}
              icon={<ChevronLeft className="w-5 h-5 text-white/80" />}
              isVisible={showLeftArrow}
              direction="left"
            />
            
            <AnimatedScrollButton
              onClick={scrollRight}
              icon={<ChevronRight className="w-5 h-5 text-white/80" />}
              isVisible={showRightArrow}
              direction="right"
            />
          </div>
          
          {viewAllHref && (
            <Link href={viewAllHref} passHref>
              <motion.a
                whileHover={{ x: 5 }}
                className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center viva-transition"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </motion.a>
            </Link>
          )}
        </div>
      </div>
      
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar snap-x snap-mandatory"
        onScroll={checkScrollButtons}
      >
        {Array.isArray(children) ? 
          children.map((child, index) => (
            <div key={index} className="snap-start">
              {child}
            </div>
          )) : 
          <div className="snap-start">{children}</div>
        }
      </div>
    </div>
  );
}

interface AnimatedScrollButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  isVisible: boolean;
  direction: 'left' | 'right';
}

function AnimatedScrollButton({ onClick, icon, isVisible, direction }: AnimatedScrollButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3, 
        scale: isVisible ? 1 : 0.8,
        x: isVisible ? 0 : (direction === 'left' ? -5 : 5)
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        disabled={!isVisible}
        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {icon}
      </motion.button>
    </motion.div>
  );
}

export default VivaScrollablePanel;
