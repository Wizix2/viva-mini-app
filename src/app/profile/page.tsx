"use client";

import { useState, useEffect } from "react";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";
import Layout from "@/components/viva/Layout";

export default function ProfilePage() {
  const { user, showAlert } = useTelegram();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get user avatar from Telegram if available
    if (isTelegramWebApp() && user?.photo_url) {
      setAvatarUrl(user.photo_url);
    }
  }, [user]);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('vivaHistory');
      showAlert("История успешно очищена");
    } catch (error) {
      console.error("Error clearing history:", error);
      showAlert("Ошибка при очистке истории");
    }
  };

  const handleSupport = () => {
    window.open("https://t.me/viva_ai_support", "_blank");
  };

  return (
    <Layout title="Профиль">
      <div className="flex flex-col items-center mt-6">
        {/* User Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-dark-100 mb-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* User Name */}
        <h2 className="text-xl font-bold mb-1">
          {user?.first_name || "Пользователь"} {user?.last_name || ""}
        </h2>
        <p className="text-gray-400 mb-8">@{user?.username || "user"}</p>

        {/* User Plan */}
        <div className="premium-card w-full p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Бесплатный тариф</h3>
              <p className="text-gray-400 text-sm">5 генераций в день</p>
            </div>
            <button className="gradient-bg px-4 py-2 rounded-xl text-sm font-medium">
              Улучшить
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="premium-card w-full p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Баланс</h3>
              <p className="text-gray-400 text-sm">3 генерации осталось</p>
            </div>
            <button className="bg-dark-200 px-4 py-2 rounded-xl text-sm font-medium border border-gray-700">
              Пополнить
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-4 mt-4">
          <button 
            onClick={handleClearHistory}
            className="w-full bg-dark-100 hover:bg-dark-200 transition-all text-center py-4 rounded-xl text-lg font-medium"
          >
            Очистить историю
          </button>
          
          <button 
            onClick={handleSupport}
            className="w-full bg-dark-100 hover:bg-dark-200 transition-all text-center py-4 rounded-xl text-lg font-medium"
          >
            Поддержка
          </button>
        </div>
      </div>
    </Layout>
  );
}
