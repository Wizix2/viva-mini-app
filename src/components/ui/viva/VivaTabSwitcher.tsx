"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ImageIcon, Video, Wand } from "lucide-react";

export type TabType = "text-to-image" | "image-to-image" | "text-to-video" | "image-to-video";

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

interface VivaTabSwitcherProps {
  onTabChange?: (tab: TabType) => void;
  defaultTab?: TabType;
  className?: string;
}

export function VivaTabSwitcher({ 
  onTabChange, 
  defaultTab = "text-to-image",
  className = ""
}: VivaTabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [containerWidth, setContainerWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<{[key: string]: number}>({});
  const [tabLeftPositions, setTabLeftPositions] = useState<{[key: string]: number}>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{[key: string]: HTMLButtonElement}>({});

  const tabs: Tab[] = [
    {
      id: "text-to-image",
      label: "Text → Image",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      id: "image-to-image",
      label: "Image → Image",
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      id: "text-to-video",
      label: "Text → Video",
      icon: <Video className="w-5 h-5" />,
    },
    {
      id: "image-to-video",
      label: "Image → Video",
      icon: <Wand className="w-5 h-5" />,
    },
  ];

  // Calculate tab dimensions on mount and resize
  useEffect(() => {
    const calculateTabDimensions = () => {
      if (!tabsRef.current) return;
      
      setContainerWidth(tabsRef.current.offsetWidth);
      
      const newTabWidths: {[key: string]: number} = {};
      const newTabLeftPositions: {[key: string]: number} = {};
      
      tabs.forEach(tab => {
        const tabElement = tabRefs.current[tab.id];
        if (tabElement) {
          newTabWidths[tab.id] = tabElement.offsetWidth;
          newTabLeftPositions[tab.id] = tabElement.offsetLeft;
        }
      });
      
      setTabWidths(newTabWidths);
      setTabLeftPositions(newTabLeftPositions);
    };
    
    calculateTabDimensions();
    window.addEventListener('resize', calculateTabDimensions);
    
    return () => window.removeEventListener('resize', calculateTabDimensions);
  }, [tabs]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className={`viva-card p-1.5 ${className}`}>
      <div className="relative flex" ref={tabsRef}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              ref={el => {
                if (el) tabRefs.current[tab.id] = el;
              }}
              onClick={() => handleTabChange(tab.id)}
              whileHover={{ 
                backgroundColor: isActive ? undefined : "rgba(255, 255, 255, 0.1)" 
              }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium z-10 ${
                isActive ? "text-black" : "text-white/80 hover:text-white"
              }`}
            >
              <span className="relative flex items-center">
                <span className="mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </motion.button>
          );
        })}
        
        {/* Animated background pill */}
        <AnimatePresence initial={false}>
          <motion.div
            layoutId="activeTabBackground"
            className="absolute top-0 bottom-0 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-glow"
            style={{ 
              width: tabWidths[activeTab] || `${100 / tabs.length}%`,
              left: tabLeftPositions[activeTab] || `${(tabs.findIndex(t => t.id === activeTab) * 100) / tabs.length}%` 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
          />
        </AnimatePresence>
      </div>
      
      {/* Animated indicator bar */}
      <div className="mt-2 px-2 flex justify-between">
        {tabs.map((tab) => (
          <motion.div 
            key={`indicator-${tab.id}`}
            className="h-1 rounded-full bg-white/10 flex-1 mx-1 overflow-hidden"
          >
            <motion.div 
              className="h-full bg-yellow-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: activeTab === tab.id ? "100%" : "0%" 
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Tab content description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="mt-2 px-3 text-xs text-white/50 h-6 flex items-center"
        >
          {activeTab === "text-to-image" && (
            <span>Create images from text descriptions</span>
          )}
          {activeTab === "image-to-image" && (
            <span>Transform your images with AI</span>
          )}
          {activeTab === "text-to-video" && (
            <span>Generate videos from text prompts</span>
          )}
          {activeTab === "image-to-video" && (
            <span>Animate your images into videos</span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default VivaTabSwitcher;