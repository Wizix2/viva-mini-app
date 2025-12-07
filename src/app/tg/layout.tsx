'use client';

import './tg.css';

export default function TelegramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark">
      {children}
    </div>
  );
}