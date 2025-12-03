import { initData, miniApp } from '@telegram-apps/sdk-react';
import { isTelegramWebApp } from "@/lib/isTelegram";

// Тип для пользователя Telegram
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

// Сервис для работы с Telegram Mini Apps
export const TelegramService = {
  // Получение пользователя из initData
  getUser(): TelegramUser | null {
    if (!isTelegramWebApp()) return null;
    
    try {
      // @ts-ignore - обходим проблему типов в SDK
      const userData = initData.user;
      if (!userData) return null;
      
      return {
        // @ts-ignore - обходим проблему типов в SDK
        id: userData.id,
        // @ts-ignore - обходим проблему типов в SDK
        first_name: userData.first_name,
        // @ts-ignore - обходим проблему типов в SDK
        last_name: userData.last_name,
        // @ts-ignore - обходим проблему типов в SDK
        username: userData.username,
        // @ts-ignore - обходим проблему типов в SDK
        language_code: userData.language_code,
        // @ts-ignore - обходим проблему типов в SDK
        is_premium: userData.is_premium,
        // @ts-ignore - обходим проблему типов в SDK
        photo_url: userData.photo_url
      };
    } catch (e) {
      console.error("Error getting Telegram user:", e);
      return null;
    }
  },

  // Проверка авторизации
  isAuthenticated(): boolean {
    if (!isTelegramWebApp()) return false;
    try {
      // @ts-ignore - обходим проблему типов в SDK
      return !!initData.user;
    } catch (e) {
      return false;
    }
  },

  // Закрытие приложения
  closeApp(): void {
    if (!isTelegramWebApp()) return;
    // @ts-ignore - обходим проблему типов в SDK
    miniApp.close();
  },

  // Показать всплывающее сообщение
  showAlert(message: string): Promise<void> {
    if (!isTelegramWebApp()) return Promise.resolve();
    // @ts-ignore - обходим проблему типов в SDK
    return miniApp.showAlert(message);
  },

  // Поделиться контентом
  shareContent(text: string): Promise<boolean> {
    if (!isTelegramWebApp()) return Promise.resolve(false);
    // @ts-ignore - обходим проблему типов в SDK
    return miniApp.shareContent(text);
  },

  // Настройка кнопки "Назад"
  setupBackButton(isVisible: boolean, callback?: () => void): void {
    if (!isTelegramWebApp()) return;
    // @ts-ignore - обходим проблему типов в SDK
    miniApp.BackButton.isVisible = isVisible;
    if (callback) {
      // @ts-ignore - обходим проблему типов в SDK
      miniApp.BackButton.onClick(callback);
    }
  },

  // Настройка основной кнопки
  setupMainButton(
    text: string, 
    isVisible: boolean = true, 
    isActive: boolean = true, 
    callback?: () => void
  ): void {
    if (!isTelegramWebApp()) return;
    // @ts-ignore - обходим проблему типов в SDK
    miniApp.MainButton.text = text;
    // @ts-ignore - обходим проблему типов в SDK
    miniApp.MainButton.isVisible = isVisible;
    // @ts-ignore - обходим проблему типов в SDK
    miniApp.MainButton.isActive = isActive;
    
    if (callback) {
      // @ts-ignore - обходим проблему типов в SDK
      miniApp.MainButton.onClick(callback);
    }
  },

  // Показать индикатор загрузки на основной кнопке
  showMainButtonLoader(isLoading: boolean): void {
    if (!isTelegramWebApp()) return;
    if (isLoading) {
      // @ts-ignore - обходим проблему типов в SDK
      miniApp.MainButton.showProgress();
    } else {
      // @ts-ignore - обходим проблему типов в SDK
      miniApp.MainButton.hideProgress();
    }
  },

  // Установка темы
  setupTheme(): void {
    if (!isTelegramWebApp()) return;
    // Получаем цвета из Telegram и применяем их к нашей теме
    // @ts-ignore - обходим проблему типов в SDK
    const colors = miniApp.themeParams;
    
    if (colors) {
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color', 
        colors.bg_color || '#11111b'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-text-color', 
        colors.text_color || '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-button-color', 
        colors.button_color || '#7c3aed'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-button-text-color', 
        colors.button_text_color || '#ffffff'
      );
    }
  },
};

export default TelegramService;