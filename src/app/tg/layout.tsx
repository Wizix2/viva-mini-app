"use client";

import { useEffect } from "react";
import "./tg.css";

export default function TgLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

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
