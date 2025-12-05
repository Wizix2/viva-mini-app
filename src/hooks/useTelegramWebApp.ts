"use client";

import { useEffect, useState } from "react";

export interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  BackButton: any;
  MainButton: any;
  themeParams: any;
}

export function useTelegramWebApp() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const webApp = (window as any).Telegram?.WebApp;
    if (!webApp) return;

    setTg(webApp);

    try {
      webApp.ready();
      webApp.expand();
    } catch {}

    setIsReady(true);
  }, []);

  return { tg, isReady };
}
