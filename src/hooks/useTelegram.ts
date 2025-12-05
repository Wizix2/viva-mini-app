"use client";

import { useEffect, useState } from "react";

export function useTelegram() {
  const [tg, setTg] = useState<any>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const webApp = (window as any).Telegram?.WebApp;
    if (webApp) {
      setTg(webApp);
      setIsTelegram(true);
    }
  }, []);

  return { tg, isTelegram };
}
