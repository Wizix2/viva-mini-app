// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VIVA Photo Animator",
  description: "AI photo & video generation powered by Telegram",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Весь интерактив мы вынесем в ClientShell */}
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}

/**
 * Этот компонент — клиентский.
 * Он безопасно управляет sidebar, адаптивом и Telegram API.
 */
"use client";

import { useEffect, useState } from "react";
import { VivaSidebar, VivaNavbar } from "@/components/ui/viva";
import { motion } from "framer-motion";

function ClientShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);

  // Определение Telegram WebApp
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) setIsTelegram(true);
  }, []);

  // Адаптив
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
      {/* Sidebar desktop */}
      {!isMobile && <VivaSidebar isMobile={false} isOpen={true} />}

      {/* Sidebar mobile */}
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

        {/* Telegram bottom navigation */}
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
