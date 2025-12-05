"use client";

import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

export default function WebAppMainScreen() {
  const { tg, isReady } = useTelegramWebApp();

  return (
    <div className='p-6 text-white'>
      <h1 className='text-xl font-bold'>VIVA Mini App</h1>

      {!isReady && (
        <p className='text-gray-400 mt-4'>нициализация Telegram...</p>
      )}

      {isReady && (
        <>
          <p className='mt-4'>Telegram WebApp подключён.</p>
          <p className='text-sm opacity-70'>theme: {JSON.stringify(tg?.themeParams)}</p>
        </>
      )}
    </div>
  );
}
