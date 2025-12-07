import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIVA Photo Animator',
  description: 'Animate your photos with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="tg-container">
          {children}
        </div>
      </body>
    </html>
  );
}
