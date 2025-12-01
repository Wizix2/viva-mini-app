// src/app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";

export default function Home() {
  const { setupMainButton } = useTelegram();

  useEffect(() => {
    if (!isTelegramWebApp()) return;
    
    // Скрываем главную кнопку на главной странице
    setupMainButton("", false);
    
    return () => {
      setupMainButton("", false);
    };
  }, [setupMainButton]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-200 to-dark-300 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-700 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        {/* ЛОГОТИП */}
        <div className="mb-6 relative">
          <h1 className="text-6xl font-bold gradient-text">VIVA</h1>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
        </div>

        {/* ЗАГОЛОВОК */}
        <p className="text-center text-xl text-gray-300 mb-8">
          Оживи свои фото с ИИ
        </p>

        {/* Краткое описание */}
        <div className="glass-effect rounded-2xl p-5 mb-8 max-w-xs text-center">
          <p className="text-sm text-gray-300">
            Создавай AI-видео и улучшай фото за 10 секунд прямо в Telegram
          </p>
        </div>

        {/* КНОПКА: Загрузить фото */}
        <Link
          href="/upload"
          className="w-full max-w-xs gradient-bg hover:opacity-90 transition-all text-center py-4 rounded-xl text-lg font-medium mb-4 shadow-lg"
        >
          Загрузить фото
        </Link>

        {/* КНОПКА: История */}
        <Link
          href="/history"
          className="w-full max-w-xs bg-glass-100 text-center py-4 rounded-xl text-lg opacity-70 hover:opacity-80 transition-all"
        >
          История
        </Link>
      </div>
    </div>
  );
}
