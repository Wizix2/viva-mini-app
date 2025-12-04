"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { VivaSidebar, VivaNavbar } from "@/components/ui/viva";
import { motion } from "framer-motion";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTelegram, setisTelegram] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Безопасный доступ к window.Telegram
    const tgWindow = window as any;

    // Check if we're in Telegram WebApp
    const isTelegramApp =
      typeof window !== "undefined" &&
      tgWindow.Telegram &&
      tgWindow.Telegram.WebApp;

    setisTelegram(isTelegramApp);

    // Check if we're on mobile
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      // Auto-open sidebar on desktop
      if (!isMobileView && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }

      // Auto-close sidebar on mobile
      if (isMobileView && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Add Telegram WebApp class if needed
    if (isTelegramApp) {
      document.body.classList.add("telegram-webapp");
    }

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Don't render anything during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen bg-gradient-to-br from-black to-gray-900"></div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-[#0E0B19] to-[#1A142B]">
          {/* Sidebar - Desktop version */}
          {!isMobile && <VivaSidebar isMobile={false} isOpen={true} />}

          {/* Sidebar - Mobile version */}
          {isMobile && (
            <VivaSidebar
              isMobile={true}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen transition-all duration-300 ${
              !isMobile && isSidebarOpen
                ? "pl-0 md:pl-60"
                : !isMobile
                ? "pl-0 md:pl-20"
                : ""
            }`}
          >
            <VivaNavbar
              toggleSidebar={toggleSidebar}
              isTelegram={isTelegram}
            />

            <div className="pt-20 px-4 md:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
              <div className="stagger-children">{children}</div>
            </div>

            {/* Telegram WebApp Bottom Navigation */}
            {isTelegram && (
              <div className="bottom-nav h-16 flex items-center justify-around px-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center w-16 text-white/70"
                >
                  <span className="text-xs mt-1">Home</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center w-16 text-white/70"
                >
                  <span className="text-xs mt-1">Library</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center w-16 text-white/70"
                >
                  <span className="text-xs mt-1">Profile</span>
                </motion.button>
              </div>
            )}
          </motion.main>
        </div>
      </body>
    </html>
  );
}
