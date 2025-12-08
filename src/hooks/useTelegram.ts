"use client";

import { useState, useEffect } from "react";

export default function useTelegram() {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function tryInit(attempt = 0) {
      const webapp = (window as any).Telegram?.WebApp;
      if (webapp) {
        setTg(webapp);
        return;
      }

      // Retry because iOS initializes WebApp with delay
      if (attempt < 40) {
        setTimeout(() => tryInit(attempt + 1), 50);
      }
    }

    tryInit();
  }, []);

  return tg;
}