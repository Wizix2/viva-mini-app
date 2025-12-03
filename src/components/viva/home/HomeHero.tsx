import React from 'react';
import { useRouter } from 'next/navigation';

interface HomeHeroProps {
  className?: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({ className = '' }) => {
  const router = useRouter();
  
  return (
    <div className={`text-center max-w-lg mx-auto py-8 animate-fadeInUp ${className}`}>
      <h1 className="text-3xl font-bold mb-3 bg-gradient-purple bg-clip-text text-transparent">
        Создавай эффекты за секунды
      </h1>
      <p className="text-white/60 mb-6">
        Оживляй фото, создавай видео и улучшай изображения с помощью искусственного интеллекта
      </p>
      <button 
        onClick={() => router.push('/upload')}
        className="bg-gradient-button hover:scale-105 active:scale-95 transition-all duration-300 px-8 py-3 rounded-xl shadow-premium hover:shadow-glow-lg font-medium"
      >
        Загрузить фото
      </button>
    </div>
  );
};

export default HomeHero;
