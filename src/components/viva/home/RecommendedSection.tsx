import React from 'react';
import { useRouter } from 'next/navigation';

interface RecommendedSectionProps {
  className?: string;
}

const RecommendedSection: React.FC<RecommendedSectionProps> = ({ className = '' }) => {
  const router = useRouter();
  
  return (
    <div className={`mt-8 ${className}`}>
      <h2 className="text-white/80 text-lg font-semibold mb-4">Рекомендуем</h2>
      
      <div 
        onClick={() => router.push('/upload?effect=animate')}
        className="relative h-36 rounded-2xl overflow-hidden bg-dark-100 cursor-pointer group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/40 to-accent-light/40 opacity-70 group-hover:opacity-90 transition-opacity"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <h3 className="text-xl font-bold text-white mb-1">Премиум анимация</h3>
          <p className="text-sm text-white/80">Создайте реалистичное видео из вашего фото</p>
        </div>
        <div className="absolute top-4 right-4 bg-black/30 rounded-full px-3 py-1 text-xs font-medium text-white/90">
          Популярно
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;
