'use client';

import { ReactNode } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import Sidebar from './Sidebar';
import { AnimatePresence } from 'framer-motion';

interface SidebarWrapperProps {
  children: ReactNode;
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      <AnimatePresence>
        {isOpen && <Sidebar isOpen={isOpen} onClose={closeSidebar} />}
      </AnimatePresence>
      {children}
    </>
  );
}
