"use client";

import { type PropsWithChildren } from 'react';
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { TelegramProvider } from '@/contexts/TelegramContext';
import { DIDProvider } from '@/contexts/DIDContext';
import { useEffect } from 'react';
import { setLocale } from '@/core/i18n/locale';
import { isTelegramWebApp } from '@/lib/isTelegram';

export function Providers({ children }: PropsWithChildren) {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  // Set the user locale.
  useEffect(() => {
    if (!isTelegramWebApp()) return;
    initDataUser && setLocale(initDataUser.language_code);
  }, [initDataUser]);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={
        ['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'
      }
    >
      <TelegramProvider>
        <DIDProvider>
          {children}
        </DIDProvider>
      </TelegramProvider>
    </AppRoot>
  );
}
