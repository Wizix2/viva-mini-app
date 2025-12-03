import React from 'react';

interface HomeFiltersProps {
  active?: string;
  className?: string;
}

const HomeFilters: React.FC<HomeFiltersProps> = ({ active = 'popular', className = '' }) => {
  const filters = [
    { id: 'popular', label: 'Популярные' },
    { id: 'new', label: 'Новые' },
    { id: 'animation', label: 'Анимация' },
    { id: 'enhance', label: 'Улучшение' },
    { id: 'video', label: 'Видео' },
  ];

  return (
    <div className={`flex gap-3 overflow-x-auto no-scrollbar py-2 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`rounded-full px-4 py-2 text-sm transition-all duration-300 hover:scale-105 ${
            active === filter.id
              ? 'bg-gradient-button text-white shadow-glow'
              : 'bg-white/5 hover:bg-white/10 text-white/80'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default HomeFilters;
