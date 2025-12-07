'use client';

import './tg.css';
import { SidebarProvider } from '@/contexts/SidebarContext';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function TelegramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-dark">
        <SidebarWrapper>
          {children}
        </SidebarWrapper>
      </div>
    </SidebarProvider>
  );
}