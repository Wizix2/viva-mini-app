'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStyle?: (style: string) => void;
  onSelectModel?: (model: string) => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export default function Sidebar({ isOpen, onClose, onSelectStyle, onSelectModel }: SidebarProps) {
  // Quick Styles section
  const quickStyles: MenuItem[] = [
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
  ].map(item => ({
    ...item,
    onClick: () => {
      if (onSelectStyle) {
        onSelectStyle(item.label);
      }
    }
  }));

  // Photo / Video Models section
  const models: MenuItem[] = [
    { label: 'Stable XL' },
    { label: 'SD Turbo' },
    { label: 'Artlist Signature Model' },
    { label: 'Anime Diffusion' },
    { label: 'HyperReal Model' },
  ].map(item => ({
    ...item,
    onClick: () => {
      if (onSelectModel) {
        onSelectModel(item.label);
      }
    }
  }));

  // Profile section
  const profileItems: MenuItem[] = [
    { label: 'Credits' },
    { label: 'Buy Credits' },
    { label: 'Settings' },
    { label: 'Language' },
    { label: 'Logout' },
  ];

  // Support section
  const supportItems: MenuItem[] = [
    { label: 'Contact Support' },
  ];

  const menuSections: MenuSection[] = [
    { title: 'Quick Styles', items: quickStyles },
    { title: 'Photo / Video Models', items: models },
    { title: 'My Profile', items: profileItems },
    { title: 'Support', items: supportItems },
  ];

  // Prevent body scroll when sidebar is open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-full w-72 bg-dark-lighter z-50 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-dark hover:bg-gray-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Menu sections */}
        <div className="p-4">
          {menuSections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-dark transition-colors flex items-center"
                    onClick={item.onClick}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
