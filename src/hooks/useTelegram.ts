"use client";

import { useState, useEffect } from "react";

export default function useTelegram() {
  const [tg, setTg] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function tryInit(attempt = 0) {
      const webapp = window?.Telegram?.WebApp;
      if (webapp) {
        setTg(webapp);
        return;
      }
      if (attempt < 40) {
        setTimeout(() => tryInit(attempt + 1), 50);
      }
    }

    tryInit();
  }, []);

  return tg;
}