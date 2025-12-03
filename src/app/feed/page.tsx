"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";

interface FeedItem {
  id: string;
  type: string;
  imageUrl: string;
  title: string;
  description: string;
}

export default function FeedPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading feed items
    const loadFeed = () => {
      setIsLoading(true);
      
      // Demo feed items
      const demoFeed: FeedItem[] = [
        {
          id: "1",
          type: "animate",
          imageUrl: "https://placehold.co/600x400/1A142B/FFFFFF?text=Animation+1",
          title: "Оживление портрета",
          description: "Реалистичная анимация лица с эмоциями"
        },
        {
          id: "2",
          type: "enhance",
          imageUrl: "https://placehold.co/600x400/1A142B/FFFFFF?text=Enhanced+Photo",
          title: "HD-улучшение фото",
          description: "Повышение качества и детализации"
        },
        {
          id: "3",
          type: "background",
          imageUrl: "https://placehold.co/600x400/1A142B/FFFFFF?text=AI+Background",
          title: "AI-фон: Париж",
          description: "Замена фона на городской пейзаж"
        },
        {
          id: "4",
          type: "cartoon",
          imageUrl: "https://placehold.co/600x400/1A142B/FFFFFF?text=Cartoon",
          title: "Cartoon стиль",
          description: "Преобразование фото в мультяшный стиль"
        }
      ];
      
      setFeedItems(demoFeed);
      setIsLoading(false);
    };
    
    loadFeed();
  }, []);

  return (
    <Layout title="Лента">
      <div className="mt-4 mb-24">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {feedItems.map((item) => (
              <div key={item.id} className="premium-card overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
