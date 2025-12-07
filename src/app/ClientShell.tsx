"use client";

import { useState, useEffect } from "react";
import { VivaSidebar, VivaNavbar } from "@/components/ui/viva";
import { motion } from "framer-motion";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) setIsTelegram(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E0B19] to-[#1A142B]">
      {!isMobile && <VivaSidebar isMobile={false} isOpen={true} />}
      {isMobile && (
        <VivaSidebar
          isMobile
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen transition-all ${
          !isMobile ? (isSidebarOpen ? "md:pl-60" : "md:pl-20") : ""
        }`}
      >
        <VivaNavbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isTelegram={isTelegram}
        />

        <div className="pt-20 px-4 md:px-6 pb-16 max-w-7xl mx-auto">
          {children}
        </div>

        {isTelegram && (
          <div className="bottom-nav h-16 flex items-center justify-around px-4">
            <button className="flex flex-col items-center w-16 text-white/70">
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center w-16 text-white/70">
              <span className="text-xs">Library</span>
            </button>
            <button className="flex flex-col items-center w-16 text-white/70">
              <span className="text-xs">Profile</span>
            </button>
          </div>
        )}
      </motion.main>
    </div>
  );
}
