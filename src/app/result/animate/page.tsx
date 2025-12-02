"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";

interface StatusResponse {
  status: 'created' | 'processing' | 'done' | 'error';
  video_url?: string;
  error?: string;
}

export default function AnimateResultPage() {
  const [isSharing, setIsSharing] = useState(false);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { shareContent, setupBackButton, showAlert, setupMainButton } = useTelegram();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      router.push("/upload");
      return;
    }

    const check = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/did/status?id=${id}`);
        const data = await res.json();
        setStatus(data);
        
        // Если задача все еще выполняется, проверяем снова через 3 секунды
        if (data.status === 'created' || data.status === 'processing') {
          setTimeout(check, 3000);
        }
      } catch (error) {
        console.error("Error checking status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    check();
  }, [id, router]);

  useEffect(() => {
    if (!isTelegramWebApp()) return;

    // Настраиваем кнопку "Назад" в Telegram
    setupBackButton(true, () => {
      router.push("/");
    });

    // Настраиваем главную кнопку в Telegram
    setupMainButton("Поделиться", true, true, handleShare);

    return () => {
      // Убираем кнопки при размонтировании компонента
      setupBackButton(false);
      setupMainButton("", false);
    };
  }, [setupBackButton, setupMainButton, router]);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      // Используем Telegram API для шаринга
      await shareContent("Я оживил свое фото с помощью VIVA AI! Попробуй и ты: https://t.me/viva_ai_bot");
      await showAlert("Спасибо за то, что поделились!");
    } catch (error) {
      await showAlert("Не удалось поделиться. Попробуйте позже.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-dark-200 to-dark-300 relative">
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

      <div className="w-full max-w-lg glass-effect p-6 rounded-2xl z-10">
        <h1 className="text-3xl font-bold gradient-text mb-2">Анимация</h1>
        <p className="text-gray-300 mb-6">
          {isLoading || status?.status === 'created' || status?.status === 'processing' 
            ? "Ваше фото обрабатывается..." 
            : status?.status === 'done' 
              ? "Ваше фото успешно оживлено с помощью ИИ" 
              : "Произошла ошибка при обработке"}
        </p>

        <div className="rounded-xl overflow-hidden shadow-lg mb-6 bg-black/30">
          {/* Результат обработки */}
          {status?.status === 'done' && status.video_url ? (
            <div className="aspect-square w-full bg-primary-900/30">
              <video 
                className="w-full h-full object-contain" 
                autoPlay 
                loop 
                muted 
                playsInline
                controls
              >
                <source src={status.video_url} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          ) : (
            <div className="aspect-square w-full flex items-center justify-center bg-primary-900/30">
              <div className="text-center p-6">
                {isLoading || status?.status === 'created' || status?.status === 'processing' ? (
                  <>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="animate-spin h-10 w-10 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <p className="text-primary-300">Обработка видео...</p>
                    <p className="text-sm text-gray-400 mt-2">Это может занять до минуты</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-red-300">Ошибка при обработке</p>
                    <p className="text-sm text-gray-400 mt-2">{status?.error || "Попробуйте загрузить фото снова"}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Информация о генерации */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-400">
            ID задачи: {id || "Не указан"}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/upload"
            className="bg-glass-100 hover:bg-glass-200 transition-all text-center py-3 rounded-xl font-medium"
          >
            Повторить
          </Link>
          
          <button 
            onClick={handleShare}
            disabled={isSharing || status?.status !== 'done'}
            className="gradient-bg hover:opacity-90 transition-all text-center py-3 rounded-xl font-medium disabled:opacity-70 flex items-center justify-center"
          >
            {isSharing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Поделиться
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
