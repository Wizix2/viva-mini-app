"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";
import { ArtlistStatusResponse, MODEL_DESCRIPTIONS } from "@/types/artlist";
import { Layout } from "@/components/viva";

export default function VideoResultPage() {
  const [isSharing, setIsSharing] = useState(false);
  const [status, setStatus] = useState<ArtlistStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { shareContent, setupMainButton, showAlert } = useTelegram();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      router.push("/upload");
      return;
    }

    const checkStatus = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/artlist/status?id=${id}`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch status");
        }
        
        const data = await res.json();
        setStatus(data);
        setError(null);
        
        // If task is still processing, check again after 3 seconds
        if (data.status === 'pending' || data.status === 'processing') {
          setTimeout(checkStatus, 3000);
        }
      } catch (err) {
        console.error("Error checking status:", err);
        setError(err instanceof Error ? err.message : "Failed to check status");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkStatus();
  }, [id, router]);

  useEffect(() => {
    if (!isTelegramWebApp()) return;

    // Set up main button for sharing when video is ready
    if (status?.status === 'done' && status.videoUrl) {
      setupMainButton("Поделиться", true, true, handleShare);
    } else {
      setupMainButton("", false);
    }

    return () => {
      setupMainButton("", false);
    };
  }, [status, setupMainButton]);

  const handleShare = async () => {
    if (!status?.videoUrl) return;
    
    setIsSharing(true);
    try {
      // Share content via Telegram
      await shareContent(`Смотри, какое крутое видео я создал с помощью ИИ! Попробуй и ты: https://t.me/viva_ai_bot`);
      await showAlert("Спасибо за то, что поделились!");
    } catch (error) {
      await showAlert("Не удалось поделиться. Попробуйте позже.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = () => {
    if (!status?.videoUrl) return;
    
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = status.videoUrl;
    a.download = `ai-video-${id}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getModelName = () => {
    if (!status?.model) return "AI Video";
    return MODEL_DESCRIPTIONS[status.model]?.name || "AI Video";
  };

  // Processing screen while video is being created
  if (isLoading || status?.status === 'pending' || status?.status === 'processing') {
    return (
      <Layout showBackButton={false} showBottomNav={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-8">
              <svg className="animate-spin h-full w-full text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Обработка...</h2>
            <p className="text-gray-400 text-lg">Это займет 3–7 секунд</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Готово!" showBackButton={true}>
      <div className="mt-6 mb-24">
        <div className="premium-card p-5 mb-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-2">Ваш результат готов!</h2>
          <p className="text-gray-300 mb-5">
            {status?.status === 'done' 
              ? "Видео успешно создано с помощью ИИ" 
              : "Произошла ошибка при создании видео"}
          </p>

          <div className="rounded-2xl overflow-hidden shadow-card mb-5">
            {/* Video result */}
            {status?.status === 'done' && status.videoUrl ? (
              <div className="aspect-video w-full bg-dark-300">
                <video 
                  className="w-full h-full object-contain" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls
                >
                  <source src={status.videoUrl} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              </div>
            ) : (
              <div className="aspect-video w-full flex items-center justify-center bg-dark-300">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-red-300">Ошибка при создании видео</p>
                  <p className="text-sm text-gray-400 mt-2">{error || status?.error || "Попробуйте загрузить фото снова"}</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-400">
              Тип: {getModelName()}
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => router.push("/upload")}
            className="bg-dark-100 hover:bg-dark-200 transition-all duration-300 text-center py-4 rounded-xl font-medium"
          >
            Повторить
          </button>
          
          {status?.status === 'done' && status.videoUrl ? (
            <button 
              onClick={handleDownload}
              className="gradient-bg hover:opacity-90 transition-all duration-300 text-center py-4 rounded-xl font-medium flex items-center justify-center shadow-premium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Скачать
            </button>
          ) : (
            <button 
              onClick={handleShare}
              disabled={isSharing || status?.status !== 'done'}
              className="gradient-bg hover:opacity-90 transition-all duration-300 text-center py-4 rounded-xl font-medium disabled:opacity-70 flex items-center justify-center shadow-premium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Поделиться
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}