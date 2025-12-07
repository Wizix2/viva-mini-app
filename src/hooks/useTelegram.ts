'use client';

import { useEffect, useState } from 'react';
import type { TelegramWebApp } from '@/types/telegram';

interface UseTelegramReturn {
  tg: TelegramWebApp | null;
  user: {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
  } | null;
  initDataUnsafe: any;
  themeParams: any;
  ready: () => void;
  expand: () => void;
  isReady: boolean;
}

export default function useTelegram(): UseTelegramReturn {
  const [isReady, setIsReady] = useState(false);

  // Server-side safety check
  if (typeof window === 'undefined') {
    return {
      tg: null,
      user: null,
      initDataUnsafe: null,
      themeParams: null,
      ready: () => {},
      expand: () => {},
      isReady: false
    };
  }

  const tg = window.Telegram?.WebApp || null;
  
  const user = tg?.initDataUnsafe?.user ? {
    id: tg.initDataUnsafe.user.id,
    firstName: tg.initDataUnsafe.user.first_name,
    lastName: tg.initDataUnsafe.user.last_name,
    username: tg.initDataUnsafe.user.username,
  } : null;

  const ready = () => {
    if (tg) {
      tg.ready();
      setIsReady(true);
    }
  };

  const expand = () => {
    if (tg) {
      tg.expand();
    }
  };

  useEffect(() => {
    if (tg && !isReady) {
      ready();
      expand();
    }
  }, [tg]);

  return {
    tg,
    user,
    initDataUnsafe: tg?.initDataUnsafe || null,
    themeParams: tg?.themeParams || null,
    ready,
    expand,
    isReady
  };
}
