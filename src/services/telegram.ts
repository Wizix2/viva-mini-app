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
}

// Сервис для работы с Telegram Mini Apps
export const TelegramService = {
  // Получение пользователя из initData
  getUser(): TelegramUser | null {
    if (!isTelegramWebApp()) return null;
    const user = initData.user.value;
    return user ? user : null;
  },

  // Проверка авторизации
  isAuthenticated(): boolean {
    if (!isTelegramWebApp()) return false;
    return !!initData.user.value;
  },

  // Закрытие приложения
  closeApp(): void {
    if (!isTelegramWebApp()) return;
    miniApp.close();
  },

  // Показать всплывающее сообщение
  showAlert(message: string): Promise<void> {
    if (!isTelegramWebApp()) return Promise.resolve();
    return miniApp.showAlert(message);
  },

  // Поделиться контентом
  shareContent(text: string): Promise<boolean> {
    if (!isTelegramWebApp()) return Promise.resolve(false);
    return miniApp.shareContent(text);
  },

  // Настройка кнопки "Назад"
  setupBackButton(isVisible: boolean, callback?: () => void): void {
    if (!isTelegramWebApp()) return;
    miniApp.BackButton.isVisible = isVisible;
    if (callback) {
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
    miniApp.MainButton.text = text;
    miniApp.MainButton.isVisible = isVisible;
    miniApp.MainButton.isActive = isActive;
    
    if (callback) {
      miniApp.MainButton.onClick(callback);
    }
  },

  // Показать индикатор загрузки на основной кнопке
  showMainButtonLoader(isLoading: boolean): void {
    if (!isTelegramWebApp()) return;
    if (isLoading) {
      miniApp.MainButton.showProgress();
    } else {
      miniApp.MainButton.hideProgress();
    }
  },

  // Установка темы
  setupTheme(): void {
    if (!isTelegramWebApp()) return;
    // Получаем цвета из Telegram и применяем их к нашей теме
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
