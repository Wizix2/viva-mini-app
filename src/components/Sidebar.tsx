'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const menuSections: MenuSection[] = [
  {
    title: 'Quick Styles',
    items: [
      { label: 'Cinematic Portrait' },
      { label: 'Anime Character' },
      { label: 'Cyberpunk Glow' },
      { label: 'Realistic Face Animation' },
      { label: 'Artistic Drawing' },
      { label: 'Epic Fantasy FX' },
      { label: 'Trend Filters' },
      { label: 'Preset: Talking Photo' },
      { label: 'Preset: 3D Render' },
      { label: 'Preset: Cartoon Portrait' },
      { label: 'Preset: Age Swap' },
      { label: 'Preset: Gender Swap' },
    ]
  },
  {
    title: 'Photo / Video Models',
    items: [
      { label: 'Stable XL' },
      { label: 'SD Turbo' },
      { label: 'Artlist Signature Model' },
      { label: 'Anime Diffusion' },
      { label: 'HyperReal Model' },
    ]
  },
  {
    title: 'My Profile',
    items: [
      { label: 'Credits' },
      { label: 'Buy Credits' },
      { label: 'Settings' },
      { label: 'Language' },
      { label: 'Logout' },
    ]
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center' },
    ]
  }
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Блокируем прокрутку основного контента при открытом сайдбаре
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Обработчик клика вне сайдбара для закрытия
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Затемняющий оверлей */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        />
      )}

      {/* Сайдбар */}
      <motion.div
        className="fixed top-0 right-0 h-full w-72 bg-dark-lighter z-50 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Заголовок сайдбара */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">VIVA Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Содержимое сайдбара */}
        <div className="p-4">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                {section.title}
              </h3>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button
                      className="w-full text-left py-2 px-2 rounded-lg text-white hover:bg-dark-light transition-colors"
                      onClick={() => {
                        if (item.onClick) item.onClick();
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
