"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import Layout from "@/components/layout/Layout";

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
      <div className="mt-4 mb-24">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          </div>
        ) : history.length > 0 ? (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={clearHistory}
                className="text-gray-400 hover:text-white text-sm bg-dark-100 px-3 py-1 rounded-lg"
              >
                Очистить историю
              </button>
            </div>
            
            <div className="space-y-4">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => viewHistoryItem(item)}
                  className="premium-card p-4 cursor-pointer hover:shadow-premium transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-dark-300 mr-4 flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl">{getEffectIcon(item)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {getEffectTypeName(item)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="premium-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-dark-300 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-white font-medium">История пуста</p>
            <p className="text-sm text-gray-400 mt-2">Здесь будут отображаться ваши генерации</p>
          </div>
        )}
      </div>
    </Layout>
  );
}