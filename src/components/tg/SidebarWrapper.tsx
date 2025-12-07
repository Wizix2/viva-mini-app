'use client';

import { ReactNode } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import Sidebar from './Sidebar';
import { AnimatePresence } from 'framer-motion';

interface SidebarWrapperProps {
  children: ReactNode;
  onSelectStyle?: (style: string) => void;
  onSelectModel?: (model: string) => void;
}

export default function SidebarWrapper({ 
  children, 
  onSelectStyle, 
  onSelectModel 
}: SidebarWrapperProps) {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Sidebar 
            isOpen={isOpen} 
            onClose={closeSidebar}
            onSelectStyle={onSelectStyle}
            onSelectModel={onSelectModel}
          />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
