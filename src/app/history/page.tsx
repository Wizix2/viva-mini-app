"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import { Layout, SkeletonHistoryItem, EmptyState } from "@/components/viva";

interface HistoryItem {
  id: string;
  type: 'animate' | 'enhance' | 'video';
  model?: string;
  date: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useTelegram();
  const router = useRouter();

  useEffect(() => {
    // Load history from localStorage
    const loadHistory = () => {
      setIsLoading(true);
      try {
        // Get history
        const savedHistory = localStorage.getItem('vivaHistory');
        let historyItems: HistoryItem[] = [];
        
        if (savedHistory) {
          historyItems = JSON.parse(savedHistory);
        }
        
        // Add demo items if history is empty
        if (historyItems.length === 0) {
          const demoItems: HistoryItem[] = [
            {
              id: 'demo1',
              type: 'video',
              model: 'veo',
              date: new Date(Date.now() - 86400000).toISOString() // yesterday
            },
            {
              id: 'demo2',
              type: 'video',
              model: 'sora',
              date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
            },
            {
              id: 'demo3',
              type: 'video',
              model: 'nano',
              date: new Date(Date.now() - 259200000).toISOString() // 3 days ago
            }
          ];
          historyItems = demoItems;
          localStorage.setItem('vivaHistory', JSON.stringify(historyItems));
        }
        
        setHistory(historyItems);
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHistory();
  }, []);

  // Format date function
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

  // View history item function
  const viewHistoryItem = (item: HistoryItem) => {
    // Navigate to the appropriate result page
    if (item.type === 'animate') {
      router.push(`/result/animate?id=${item.id}`);
    } else if (item.type === 'enhance') {
      router.push(`/result/enhance?id=${item.id}`);
    } else {
      router.push(`/result/video?id=${item.id}`);
    }
  };

  // Clear history function
  const clearHistory = () => {
    try {
      localStorage.removeItem('vivaHistory');
      setHistory([]);
      showAlert("История успешно очищена");
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  // Get effect type name
  const getEffectTypeName = (item: HistoryItem) => {
    if (item.type === 'animate') return 'Анимация';
    if (item.type === 'enhance') return 'Улучшение';
    
    // For video type, check model
    if (item.model === 'veo') return 'Full Body Video';
    if (item.model === 'sora') return 'Creative Scene';
    if (item.model === 'nano') return 'Motion Animation';
    
    return 'AI Video';
  };

  // Get effect icon
  const getEffectIcon = (item: HistoryItem) => {
    if (item.type === 'animate') return '🎭';
    if (item.type === 'enhance') return '✨';
    
    // For video type, check model
    if (item.model === 'veo') return '🎬';
    if (item.model === 'sora') return '🎨';
    if (item.model === 'nano') return '💃';
    
    return '🎥';
  };

  return (
    <Layout title="История" showBackButton={true}>
      <div className="mt-6 mb-24">
        {isLoading ? (
          <div className="space-y-5">
            {[...Array(6)].map((_, index) => (
              <SkeletonHistoryItem key={`skeleton-${index}`} />
            ))}
          </div>
        ) : history.length > 0 ? (
          <>
            <div className="flex justify-end mb-5">
              <button 
                onClick={clearHistory}
                className="text-gray-400 hover:text-white text-sm bg-dark-100 hover:bg-dark-200 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Очистить историю
              </button>
            </div>
            
            <div className="space-y-5">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => viewHistoryItem(item)}
                  className="premium-card p-5 cursor-pointer hover:shadow-premium hover:-translate-y-1 transition-all duration-300 rounded-2xl"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-dark-300 mr-5 flex-shrink-0 flex items-center justify-center">
                      <span className="text-3xl">{getEffectIcon(item)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-lg">
                        {getEffectTypeName(item)}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState 
            title="История пуста" 
            description="Здесь будут отображаться ваши генерации"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            }
            action={{
              label: "Создать эффект",
              onClick: () => router.push("/upload")
            }}
          />
        )}
      </div>
    </Layout>
  );
}