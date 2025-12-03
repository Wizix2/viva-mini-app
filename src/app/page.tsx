"use client";

import { useEffect } from "react";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";
import Layout from "@/components/viva/Layout";
import EffectCard from "@/components/viva/EffectCard";
import FAB from "@/components/viva/FAB";

// Define effect cards
const effectCards = [
  { icon: "🎭", title: "Оживить фото", href: "/upload?effect=animate" },
  { icon: "✨", title: "HD-улучшение", href: "/upload?effect=enhance" },
  { icon: "🌄", title: "AI-фон", href: "/upload?effect=background" },
  { icon: "📺", title: "Cartoon", href: "/upload?effect=cartoon" },
  { icon: "🕰️", title: "Реставрация", href: "/upload?effect=restore" },
  { icon: "👤", title: "4K-портрет", href: "/upload?effect=portrait" },
  { icon: "💄", title: "Ретушь", href: "/upload?effect=retouch" },
  { icon: "👙", title: "Body reshape", href: "/upload?effect=reshape" },
];

export default function Home() {
  const { setupMainButton } = useTelegram();

  useEffect(() => {
    if (!isTelegramWebApp()) return;
    
    // Hide main button on home page
    setupMainButton("", false);
    
    return () => {
      setupMainButton("", false);
    };
  }, [setupMainButton]);

  return (
    <Layout>
      <div className="mt-4 mb-24">
        {/* Grid of effect cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {effectCards.map((card) => (
            <EffectCard
              key={card.href}
              icon={card.icon}
              title={card.title}
              href={card.href}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <FAB 
        href="/upload" 
        label="Загрузить фото"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        }
      />
    </Layout>
  );
}