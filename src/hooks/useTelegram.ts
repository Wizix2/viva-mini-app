"use client";

export default function useTelegram() {
  if (typeof window === "undefined") {
    return null; // на сервере хуки Telegram невозможны
  }

  return (window as any).Telegram?.WebApp ?? null;
}
