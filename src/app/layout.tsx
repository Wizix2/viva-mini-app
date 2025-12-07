import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIVA Photo Animator',
  description: 'Telegram Mini App for photo and video animation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}