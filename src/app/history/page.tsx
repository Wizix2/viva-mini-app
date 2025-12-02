"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";

interface HistoryItem {
  id: string;
  type: 'animate' | 'enhance';
  date: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setupBackButton } = useTelegram();
  const router = useRouter();

  useEffect(() => {
    if (isTelegramWebApp()) {
      // Настраиваем кнопку "Назад" в Telegram
      setupBackButton(true, () => {
        router.push("/");
      });
    }

    // Загружаем историю из localStorage
    const loadHistory = () => {
      setIsLoading(true);
      try {
        // Получаем историю
        const savedHistory = localStorage.getItem('vivaHistory');
        let historyItems: HistoryItem[] = [];
        
        if (savedHistory) {
          historyItems = JSON.parse(savedHistory);
        }
        
        // Для демонстрации, если история пуста, добавляем демо-элементы
        if (historyItems.length === 0) {
          const demoItems: HistoryItem[] = [
            {
              id: 'demo1',
              type: 'animate',
              date: new Date(Date.now() - 86400000).toISOString() // вчера
            },
            {
              id: 'demo2',
              type: 'enhance',
              date: new Date(Date.now() - 172800000).toISOString() // позавчера
            }
          ];
          historyItems = demoItems;
          localStorage.setItem('vivaHistory', JSON.stringify(historyItems));
        }
        
        setHistory(historyItems);
      } catch (error) {
        console.error('Ошибка при загрузке истории:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHistory();

    return () => {
      if (isTelegramWebApp()) {
        // Убираем кнопку при размонтировании компонента
        setupBackButton(false);
      }
    };
  }, [setupBackButton, router]);

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Функция для просмотра элемента истории
  const viewHistoryItem = (item: HistoryItem) => {
    // Переходим на соответствующую страницу результата
    if (item.type === 'animate') {
      router.push(`/result/animate?id=${item.id}`);
    } else {
      router.push(`/result/enhance?id=${item.id}`);
    }
  };

  // Функция для очистки истории
  const clearHistory = () => {
    localStorage.removeItem('vivaHistory');
    setHistory([]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-b from-dark-200 to-dark-300 relative">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-10 w-60 h-60 bg-primary-700 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Навигация */}
      <div className="w-full max-w-lg mb-6 flex items-center">
        <Link href="/" className="text-gray-400 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          На главную
        </Link>
      </div>

      <div className="w-full max-w-lg glass-effect p-6 rounded-2xl z-10 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">История</h1>
          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="text-gray-400 hover:text-white text-sm"
            >
              Очистить
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item) => (
              <div 
                key={item.id}
                className="bg-glass-100 rounded-xl p-3 cursor-pointer hover:bg-glass-200 transition-all"
                onClick={() => viewHistoryItem(item)}
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-primary-900/30 mr-3 flex-shrink-0">
                    {item.type === 'animate' ? (
                      <div className="w-full h-full flex items-center justify-center bg-primary-900/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-900/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {item.type === 'animate' ? 'Анимация' : 'Улучшение'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-400">История пуста</p>
            <p className="text-sm text-gray-500 mt-2">Здесь будут отображаться ваши генерации</p>
          </div>
        )}
      </div>

      <Link 
        href="/upload"
        className="w-full max-w-lg gradient-bg hover:opacity-90 transition-all text-center py-4 rounded-xl text-lg font-medium shadow-lg"
      >
        Создать новую генерацию
      </Link>
    </div>
  );
}
