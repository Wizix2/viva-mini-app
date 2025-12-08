"use client";

import { useState, useEffect } from "react";

export default function useTelegram() {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function init() {
      const webapp = (window as any).Telegram?.WebApp;
      if (webapp) {
        setTg(webapp);
      } else {
        setTimeout(init, 50);
      }
    }

    init();
  }, []);

  return tg;
}