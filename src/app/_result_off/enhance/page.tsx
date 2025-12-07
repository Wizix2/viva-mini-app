"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegram } from "@/lib/isTelegram";
import { 
  Layout, 
  SkeletonResultPreview, 
  ErrorState,
  ResultContainer,
  ResultHeader,
  ResultActions
} from "@/components/viva";

interface StatusResponse {
  status: 'created' | 'processing' | 'done' | 'error';
  image_url?: string;
  error?: string;
}

export default function EnhanceResultPage() {
  const [isSharing, setIsSharing] = useState(false);
  const [status, setStatus] = useState<StatusResponse | null>(null);
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

    const check = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/enhance/status?id=${id}`);
        const data = await res.json();
        setStatus(data);
        
        // Если задача все еще выполняется, проверяем снова через 3 секунды
        if (data.status === 'created' || data.status === 'processing') {
          setTimeout(check, 3000);
        }
      } catch (err) {
        console.error("Error checking status:", err);
        setError(err instanceof Error ? err.message : "Failed to check status");
      } finally {
        setIsLoading(false);
      }
    };
    
    check();
  }, [id, router]);

  useEffect(() => {
    if (!isTelegram()) return;

    // Настраиваем главную кнопку в Telegram
    if (status?.status === 'done' && status.image_url) {
      setupMainButton("Поделиться", true, true, handleShare);
    } else {
      setupMainButton("", false);
    }

    return () => {
      setupMainButton("", false);
    };
  }, [status, setupMainButton]);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      // Используем Telegram API для шаринга
      await shareContent("Я улучшил свое фото с помощью VIVA AI! Попробуй и ты: https://t.me/viva_ai_bot");
      await showAlert("Спасибо за то, что поделились!");
    } catch (error) {
      await showAlert("Не удалось поделиться. Попробуйте позже.");
    } finally {
      setIsSharing(false);
    }
  };

  // Processing screen while image is being enhanced
  if (isLoading || status?.status === 'created' || status?.status === 'processing') {
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
    <Layout title="Улучшение фото" showBackButton={true}>
      <div className="mt-6 mb-24">
        {isLoading ? (
          <SkeletonResultPreview />
        ) : error || status?.status === 'error' ? (
          <div className="mb-6">
            <ErrorState 
              message={error || status?.error || "Не удалось создать эффект"} 
              action={{ 
                label: "Попробовать снова", 
                onClick: () => router.push("/upload") 
              }}
            />
          </div>
        ) : (
          <ResultContainer>
            <ResultHeader 
              title="Результат улучшения" 
              tag="Улучшение"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              }
              description={status?.status === 'done' 
                ? "Ваше фото успешно улучшено с помощью ИИ" 
                : "Произошла ошибка при обработке"}
            />

            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              {/* Image result */}
              {status?.status === 'done' && status.image_url ? (
                <div className="aspect-video w-full bg-dark-300">
                  <img 
                    className="w-full h-full object-cover max-h-[60vh]" 
                    src={status.image_url}
                    alt="Улучшенное изображение"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full flex items-center justify-center bg-dark-300">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-red-300">Ошибка при обработке</p>
                    <p className="text-sm text-gray-400 mt-2">{status?.error || "Попробуйте загрузить фото снова"}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                ID задачи: {id || "Не указан"}
              </p>
            </div>

            <ResultActions 
              onShare={handleShare}
              onCreateMore={() => router.push("/upload")}
              isSharing={isSharing}
              showDownload={false}
              disabled={status?.status !== 'done'}
            />
          </ResultContainer>
        )}
      </div>
    </Layout>
  );
}
