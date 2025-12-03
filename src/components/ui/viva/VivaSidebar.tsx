"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Library, 
  History, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Home,
  X
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface VivaSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function VivaSidebar({ isMobile = false, isOpen = true, onClose }: VivaSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Detect if we're in a mobile environment
  useEffect(() => {
    setMounted(true);
    const checkIfMobile = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const navItems: NavItem[] = [
    {
      name: "Generate",
      href: "/",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      name: "Library",
      href: "/library",
      icon: <Library className="w-5 h-5" />,
    },
    {
      name: "History",
      href: "/history",
      icon: <History className="w-5 h-5" />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  // Animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      width: isCollapsed ? 80 : 240,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      x: "-100%",
      width: isCollapsed ? 80 : 240,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40 
      }
    }
  };

  // For desktop mode
  const desktopSidebar = (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 bottom-0 z-30 h-screen glass-dark border-r border-white/10 flex flex-col"
    >
      <div className="flex items-center justify-between h-16 px-4">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="full-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <span className="text-yellow-400 font-bold text-xl">VIVA</span>
              <span className="text-white ml-1 font-light">AI</span>
            </motion.div>
          ) : (
            <motion.div
              key="mini-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              <span className="text-yellow-400 font-bold text-xl">V</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white/70" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white/70" />
          )}
        </motion.button>
      </div>

      <nav className="mt-6 px-2 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ 
                      x: 5, 
                      backgroundColor: isActive ? "rgba(245, 215, 66, 0.15)" : "rgba(255, 255, 255, 0.08)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-400/10 text-yellow-400 shadow-yellow-glow"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 ${isActive ? 'text-yellow-400' : 'text-white/70'}`}>
                      {item.icon}
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-3 font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-yellow-400/10 rounded-xl p-4 text-center border border-yellow-400/20"
            >
              <p className="text-sm text-white/80 mb-2">Need more credits?</p>
              <motion.button 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg font-medium text-sm shadow-yellow-glow transition-all duration-300"
              >
                Upgrade Plan
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );

  // For mobile mode (drawer)
  const mobileSidebar = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] h-screen glass-dark border-r border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center">
                <span className="text-yellow-400 font-bold text-xl">VIVA</span>
                <span className="text-white ml-1 font-light">AI</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300"
              >
                <X className="w-4 h-4 text-white/70" />
              </motion.button>
            </div>

            <nav className="mt-6 px-2 flex-1">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <li key={item.href}>
                      <Link href={item.href} onClick={onClose}>
                        <motion.div
                          whileHover={{ 
                            x: 5, 
                            backgroundColor: isActive ? "rgba(245, 215, 66, 0.15)" : "rgba(255, 255, 255, 0.08)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-yellow-400/10 text-yellow-400 shadow-yellow-glow"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          <div className={`flex items-center justify-center w-8 h-8 ${isActive ? 'text-yellow-400' : 'text-white/70'}`}>
                            {item.icon}
                          </div>
                          <span className="ml-3 font-medium">{item.name}</span>
                        </motion.div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4">
              <div className="bg-yellow-400/10 rounded-xl p-4 text-center border border-yellow-400/20">
                <p className="text-sm text-white/80 mb-2">Need more credits?</p>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg font-medium text-sm shadow-yellow-glow transition-all duration-300"
                >
                  Upgrade Plan
                </motion.button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  
  return isMobile ? mobileSidebar : desktopSidebar;
}

export default VivaSidebar;