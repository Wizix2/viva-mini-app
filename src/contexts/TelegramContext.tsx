"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import TelegramService, { TelegramUser } from "@/services/telegram";
import { isTelegram } from "@/lib/isTelegram";
import { TelegramUserFixed } from "@/types/telegram";

interface TelegramContextType {
  user: TelegramUserFixed | null;
  isAuthenticated: boolean;
  isReady: boolean;
  showAlert: (message: string) => Promise<void>;
  shareContent: (text: string) => Promise<boolean>;
  setupBackButton: (isVisible: boolean, callback?: () => void) => void;
  setupMainButton: (
    text: string,
    isVisible?: boolean,
    isActive?: boolean,
    callback?: () => void
  ) => void;
  showMainButtonLoader: (isLoading: boolean) => void;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TelegramUserFixed | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Инициализация Telegram Mini Apps
    try {
      if (!isTelegram()) {
        // Работаем в браузере без Telegram SDK
        setUser(null);
        setIsReady(true);
        return;
      }
      
      // Настройка темы
      TelegramService.setupTheme();
      
      // Получение пользователя
      const currentUser = TelegramService.getUser();
      setUser(currentUser as TelegramUserFixed);
      
      setIsReady(true);
    } catch (error) {
      console.error("Ошибка инициализации Telegram Mini Apps:", error);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: TelegramService.isAuthenticated(),
    isReady,
    showAlert: TelegramService.showAlert,
    shareContent: TelegramService.shareContent,
    setupBackButton: TelegramService.setupBackButton,
    setupMainButton: TelegramService.setupMainButton,
    showMainButtonLoader: TelegramService.showMainButtonLoader,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error("useTelegram must be used within a TelegramProvider");
  }
  return context;
};
