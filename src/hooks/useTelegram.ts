"use client";

import { useEffect, useState } from "react";

export default function useTelegram() {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function init() {
      const webapp = (window as any).Telegram?.WebApp;
      if (webapp) setTg(webapp);
    }

    init();
    const timeout = setTimeout(init, 50);

    return () => clearTimeout(timeout);
  }, []);

  return tg;
}